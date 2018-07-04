function NeuralNet(_layers, _cost) {
	this.cost = undefined;
	this.cost_name = _cost;
	if (_cost === 'quadratic') {
		this.cost = quadraticCost;
	} else if (_cost === 'crossEntropy') {
		this.cost = crossEntropyCost;
	} else if (_cost === 'logLikelihood') {
		this.cost = logLikelihoodCost;
	} else {
		this.cost = quadraticCost;
		this.cost_name = 'quadratic';
	}

	this.layers = _layers;

	var activations = {
		'sigmoid':sigmoid,
		'tanh':tanh,
		'relu':relu,
		'lrelu':lrelu,
		'linear':identity
	}

	var activation_derivatives = {
		'sigmoid':sigmoid_prime,
		'tanh':tanh_prime,
		'relu':relu_prime,
		'lrelu':lrelu_prime,
		'linear':identity_prime
	}

	this.max_size = -1;
	for (let i = 0; i<this.layers.length; i++) {
		if (this.layers[i].size > this.max_size) {
			this.max_size = this.layers[i].size;
		}
	}

	let L = this.layers.length;
	this.weights = new Array(L-1);
	this.biases = new Array(L-1);

	this.weights_have_been_initialized = false;	

	this.max_weight = -10;
	this.min_weight = 10;

	this.initializeWeights = function() {
		this.weights_have_been_initialized = true;

		this.max_weight = -10;
		this.min_weight = 10;

		for (let l = 0; l<L-1; l++) {
			this.weights[l] = new Array(this.layers[l+1].size);
			this.biases[l] = new Float32Array(this.layers[l+1].size);

			for (let i = 0, n=this.weights[l].length; i<n; i++) {
				this.weights[l][i] = new Float32Array(this.layers[l].size);

				for (let j = 0, m=this.weights[l][i].length; j<m; j++) {
					this.weights[l][i][j] = gaussRandom();
					if (this.weights[l][i][j] > this.max_weight) this.max_weight = this.weights[l][i][j];
					else if (this.weights[l][i][j] < this.min_weight) this.min_weight = this.weights[l][i][j];
				}
				this.biases[l][i] = gaussRandom();
				if (this.biases[l][i] > this.max_weight) this.max_weight = this.biases[l][i];
				else if (this.biases[l][i] < this.min_weight) this.min_weight = this.biases[l][i];
			}
		}
	}

	this.feedforward = function(input, just_the_output) {
		if (just_the_output) {
			let a = new Float32Array(input);

			for (let l = 1; l<L; l++) {
				z = vector_addition(matrix_vector_multiply(this.weights[l-1], a), this.biases[l-1], true);
				a = sigma(z, this.layers[l].activation);
			}
			return a
		} else {
			let z = new Array(L);
			let a = new Array(L);
			a[0] = input;

			for (let l = 1; l<L; l++) {
				z[l] = vector_addition(matrix_vector_multiply(this.weights[l-1], a[l-1]), this.biases[l-1], true); // true is to return new object
				a[l] = sigma(z[l], this.layers[l].activation);
			}

			return [a, z];
		}
	}

	this.backpropagate = function(expected, a, z) {
		let delta = new Array(L);
		// delta[L-1] = hadamard(vector_subtraction(a[L-1], expected, true), sigma_prime(z[L-1],this.layers[L-1].activation));
		// just assume using the best cost for output activation;
		delta[L-1] = vector_subtraction(a[L-1], expected, true);
		for (let l = L-2; l>=1; l--) {
			delta[l] = hadamard(matrix_transpose_multiply(this.weights[l], delta[l+1]), sigma_prime(z[l],this.layers[l].activation));
		}
		return delta
	}

	// Stochastic Gradient Descent
	// aka make sure browser memory doesn't fill up and crash everything
	this.SGD = function(learning_rate, a, delta, m) {
		let alpha = (learning_rate / m);
		let sum_weights;
		let sum_biases;

		for (let l = L-1; l>=1; l--) {
			for (let x = 0; x<m; x++) {
				scalar_multiply(alpha, delta[x][l]);
				if (x === 0) {

					sum_weights = vector_multiply_tranpose(delta[x][l], a[x][l-1]);
					sum_biases = delta[x][l];

				} else {

					matrix_addition(sum_weights, vector_multiply_tranpose(delta[x][l], a[x][l-1]), false);
					vector_addition(sum_biases, delta[x][l], false);
				}
			}

			matrix_subtraction(this.weights[l-1], sum_weights, false);
			vector_subtraction(this.biases[l-1], sum_biases, false);
		}
	}
	

	// data is assumed to be in the form
	// [ [[input vector], [output vector]], [[input vector], [output vector]], ...  ]
	this.train = function(data, learning_rate) {
		if (this.weights_have_been_initialized) {
			let data_len = data.length;
			let activations = new Array(data_len);
			let zs = new Array(data_len);
			let errors = new Array(data_len);
	
			let temp;
			let cost = 0;
			let y, a;

			for (let i = 0; i<data_len; i++) {
				// *****************
				// ** feedforward **
				// *****************
				temp = this.feedforward(data[i][0], false);
				activations[i] = temp[0];
				zs[i] = temp[1];

				// *******************
				// ** backpropagate **
				// *******************
				errors[i] = this.backpropagate(data[i][1], activations[i], zs[i]);
			
				cost += this.cost(temp[0][L-1], data[i][1]);
			}

			// *****************************************
			// ** gradient descent (with minibatches) **
			// *****************************************
			this.SGD(learning_rate, activations, errors, data_len);

			return cost/data_len;
		}
	}


	// ***********************************************
	// ** using the p5.js library for visualization **
	// ***********************************************
	this.show = function(center_x, center_y, w, h, r, colors) {
		let layer_sep = w/(this.layers.length-1);

		let neuron_sep = h/(this.max_size-1);
		let wght = 0;
		let bs = 0;
		let x1,y1,x2,y2;
		let half_num_layers = 0.5*this.layers.length;
		let half_layer_l_size, half_layer_l_p_size;

		for (let l = 0; l<L-1; l++) {
			x1 = center_x - w/2 + l*layer_sep;
			x2 = x1 + layer_sep;
			half_layer_l_size = 0.5*(this.layers[l].size-1)*neuron_sep;
			half_layer_l_p_size = 0.5*(this.layers[l+1].size-1)*neuron_sep;
			for (let j = 0; j<this.weights[l].length; j++) {
				y2 = center_y - half_layer_l_p_size + j*neuron_sep;
				for (let i = 0; i<this.weights[l][j].length; i++) {
					y1 = center_y - half_layer_l_size + i*neuron_sep;
					wght = (this.weights[l][j][i]-this.min_weight)/(this.max_weight-this.min_weight);
					if (colors) stroke(colors(wght));
					else stroke(255*wght);
					strokeWeight(1+4*wght);
					line(x1, y1, x2, y2);
				}
				noStroke();
				bs = (this.biases[l][j]-this.min_weight)/(this.max_weight-this.min_weight);
				if (colors) fill(colors(bs));
				else fill(255*bs);
				ellipse(x2, y2, 2*r, 2*r);
			}
			fill(255);
			text(this.layers[l+1].activation, x2, center_y+h/2 + 20);
		}
		fill(255)
		text('cost function : '+this.cost_name, width/2, 50);
		strokeWeight(1);
	}

	function quadraticCost(output, expected) {
		let c = 0;
		for (let i = 0; i<output.length; i++) {
			c += 0.5*Math.pow((output[i]-expected[i]),2);
		}
		return c;
	}

	function crossEntropyCost(output, expected) {
		let c = 0;
		for (let i = 0; i<output.length; i++) {
			c -= expected[i]*Math.log(output[i]) + (1-expected[i])*Math.log(1-output[i]);
		}
		return c;
		// (c<2)?c:2;
	}

	// in this case, we are doing classification
	function logLikelihoodCost(output, expected) {
		let ind = -1;
		for (let i = 0; i<expected.length; i++) {
			if (expected[i]===1) {
				ind = i;
				break;
			}
		}
		return -Math.log(output[ind]);
	}

	// box-muller
	function gaussRandom() {
		return Math.sqrt(-2*Math.log(Math.random()))*Math.cos(2*Math.PI*Math.random());
	}

	function hadamard(vector1, vector2) {
		// assert vector1.length === vector2.length
		let output = new Float32Array(vector1.length);
		for (let i = 0; i<output.length; i++) {
			output[i] = vector1[i]*vector2[i];
		}
		return output;
	}

	function matrix_addition(matrix1, matrix2, return_new) {
		if (return_new) {
			let output = new Array(matrix1.length);
			// assert they have the same dimensions
			for (let i = 0; i<matrix1.length; i++) {
				output[i] = new Array(matrix1[0].length);
				for (let j = 0; j<matrix1[0].length; j++) {
					output[i][j] = matrix1[i][j] + matrix2[i][j];
				}
			}
			return output;
		} else {
			for (let i = 0; i<matrix1.length; i++) {
				for (let j = 0; j<matrix1[0].length; j++) {
					// modify matrix directly... maybe help with GC and mem problems?
					matrix1[i][j] = matrix1[i][j] + matrix2[i][j];
				}
			}
		}
	}

	// matrix1 - matrix2
	function matrix_subtraction(matrix1, matrix2, return_new) {
		if (return_new) {
			let output = new Array(matrix1.length);
			// assert they have the same dimensions
			for (let i = 0; i<matrix1.length; i++) {
				output[i] = new Array(matrix1[0].length);
				for (let j = 0; j<matrix1[0].length; j++) {
					output[i][j] = matrix1[i][j] - matrix2[i][j];

					if (output[i][j] > this.max_weight) this.max_weight = output[i][j];
					else if (output[i][j] < this.min_weight) this.min_weight = output[i][j];
				}
			}
			return output;
		} else {
			for (let i = 0; i<matrix1.length; i++) {
				for (let j = 0; j<matrix1[0].length; j++) {
					matrix1[i][j] = matrix1[i][j] - matrix2[i][j];

					if (matrix1[i][j] > this.max_weight) this.max_weight = matrix1[i][j];
					else if (matrix1[i][j] < this.min_weight) this.min_weight = matrix1[i][j];

				}
			}
		}
	}

	function vector_addition(vector1, vector2, return_new) {
		if (return_new) {
			let output = new Float32Array(vector1.length);
			for (let i = 0; i<vector1.length; i++) {
				output[i] = vector1[i] + vector2[i];
			}
			return output;
		} else {
			for (let i = 0; i<vector1.length; i++) {
				vector1[i] = vector1[i] + vector2[i];
			}
		}
	}

	// v1 - v2
	function vector_subtraction(vector1, vector2, return_new) {
		if (return_new) {
			let output = new Float32Array(vector1.length);
			for (let i = 0; i<vector1.length; i++) {
				output[i] = vector1[i] - vector2[i];
				if (output[i] > this.max_weight) this.max_weight = output[i];
				else if (output[i] < this.min_weight) this.min_weight = output[i];				
				// if (output[i] > this.max_bias) this.max_bias = output[i];
				// else if (output[i] < this.min_bias) this.min_bias = output[i];
			}
			return output;
		} else {
			for (let i = 0; i<vector1.length; i++) {
				vector1[i] = vector1[i] - vector2[i];
				if (vector1[i] > this.max_weight) this.max_weight = vector1[i];
				else if (vector1[i] < this.min_weight) this.min_weight = vector1[i];	
				// if (vector1[i] > this.max_bias) this.max_bias = vector1[i];
				// else if (vector1[i] < this.min_bias) this.min_bias = vector1[i];
			}
		}	
	}

	function scalar_multiply (r, vector) {
		// let output = new Float32Array(vector.length);
		for (let i = 0; i<vector.length; i++) {
			// output[i] = r*vector[i];
			vector[i] *= r;
		}
		// return output;
	}

	function vector_multiply_tranpose(vector1, vector2) {
		let output = new Array(vector1.length);
		for (let i = 0; i<vector1.length; i++) {
			output[i] = new Float32Array(vector2.length);
			for (let j = 0; j<vector2.length; j++) {
				output[i][j] = vector1[i]*vector2[j];
			}
		}
		return output;
	}

	function matrix_vector_multiply(matrix, vector) {
		let output = new Float32Array(matrix.length);
		for (let i = 0; i<matrix.length; i++) {
			output[i] = 0;
			for (let j =  0; j<matrix[0].length; j++) {
				output[i] += matrix[i][j]*vector[j];
			}
		}
		return output;
	}

	// faster than tranposing and then passing to multiply
	function matrix_transpose_multiply(matrix, vector) {
		let output = new Float32Array(matrix[0].length);

		for (let j = 0; j<matrix[0].length; j++) {
			output[j] = 0;
			for (let i = 0; i <matrix.length; i++) {
				output[j] += matrix[i][j]*vector[i];
			}
		}
		return output;
	}

	function sigma(vector, activation) {
		if (activation === 'softmax') {
			return softmax(vector);
		} else {
			let output = new Float32Array(vector.length);
			let f = activations[activation];
			for (let i = 0, len=vector.length; i<len; i++) { output[i] = f(vector[i]); }
			return output;
		}
	}

	function sigma_prime (vector, activation) {
		let output = new Float32Array(vector.length);
		let dfdx = activation_derivatives[activation];
		for (let i = 0, len=vector.length; i<len; i++) { output[i] = dfdx(vector[i]); }
		return output;
	}

	function identity(x) {
		return x;
	}
	function identity_prime(x) {
		return 1;
	}

	// by default just squash sigmoid (by 4)
	function sigmoid(x) {
		return 1.0/(1.0+Math.exp(-4*x));
	}

	// and so the 4 comes out in the derivative as well.
	function sigmoid_prime(x) {
		let s = sigmoid(x);
		return 4*s*(1-s);
	}

	function tanh(x) {
		let s = Math.exp(2*x);
		return (s-1)/(s+1);
	}

	function tanh(x) {
		let s = Math.exp(2*x);
		return (s-1)/(s+1);
	}

	function tanh_prime(x) {
		// let s = Math.exp(2*x);
		// return 4*s/((s+1)**2);
		let t = tanh(x);
		return 1-t*t;
	}

	function relu(x) {
		return max(0,x);
	}

	function relu_prime(x) {
		return (x<=0)?0:1;
	}

	// leaky rectifier
	// maybe have a class variable for epsilon?
	function lrelu(x) {
		return max(0.1*x,x)
	}

	function lrelu_prime(x) {
		return (x<=0)?0.1:1;
	}

	function softmax(vector) {
		let sum = 0;
		let output = new Float32Array(vector.length);

		for (let i = 0; i<vector.length; i++) {
			output[i] = Math.exp(vector[i]);
			sum += output[i];
		}
		for (let i = 0; i<vector.length; i++) { output[i]/=sum; }

		return output;
	}
}

// // making sure weights work
// this.weights[0] = new Array(2);
// this.biases[0] = new Float32Array(2);

// this.weights[0][0] = new Float32Array(2);
// this.weights[0][0][0] = 1//2*Math.random();//1
// this.weights[0][0][1] = 1//2*Math.random();//1;
// this.biases[0][0] = -0.5//-0.5;

// this.weights[0][1] = new Float32Array(2);
// this.weights[0][1][0] = -1//-1//-1-2*Math.random();
// this.weights[0][1][1] = -1//-1//-2//*Math.random();

// this.biases[0][1] = 1.5//1.5;

// this.weights[1] = new Array(1);
// this.biases[1] = new Float32Array(1);
// this.weights[1][0] = new Float32Array(2);
// this.weights[1][0][0] = 1//1//0.6+0.5*Math.random();
// this.weights[1][0][1] = 1//1//0.6+0.6*Math.random();

// this.biases[1][0] = -1.5//-1.5//-2*Math.random();//-1.5;


// // calibrating with https://stevenmiller888.github.io/mind-how-to-build-a-neural-network/
// this.min_weight = 0;
// this.max_weight = 1;
// this.min_bias = 0;
// this.max_bias = 0;
// ///
// this.weights[0] = new Array(3);
// this.biases[0] = new Float32Array(3);

// this.weights[0][0] = new Float32Array(2);
// this.weights[0][0][0] = 0.8;
// this.weights[0][0][1] = 0.2;

// this.biases[0][0] = 0;


// this.weights[0][1] = new Float32Array(2);
// this.weights[0][1][0] = 0.4;
// this.weights[0][1][1] = 0.9;

// this.biases[0][1] = 0;


// this.weights[0][2] = new Float32Array(2);
// this.weights[0][2][0] = 0.3;
// this.weights[0][2][1] = 0.5;

// this.biases[0][2] = 0;


// this.weights[1] = new Array(1);
// this.biases[1] = new Float32Array(1);

// this.weights[1][0] = new Float32Array(3);
// this.weights[1][0][0] = 0.3;
// this.weights[1][0][1] = 0.5;
// this.weights[1][0][2] = 0.9;

// this.biases[1][0] = 0;