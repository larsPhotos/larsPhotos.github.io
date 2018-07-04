// function test_speed() {
// 	let sizes = [
// 		[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],[2,10],
// 		[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],
// 		[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],
// 		[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],
// 		[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10],
// 		[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8],[7,9],[7,10],
// 		[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9],[8,10],
// 		[9,2],[9,3],[9,4],[9,5],[9,6],[9,9],[9,8],[9,9],[9,10],
// 		[10,2],[10,3],[10,4],[10,5],[10,6],[10,10],[10,8],[10,9],[10,10]
// 	]
// 	let matrix;// = new Array(sizes.length);
// 	let vector;// = new Array(sizes.length);
// 	let max = -1;
// 	let times = new Array(sizes.length);
// 	let start;
// 	let num_trials = 20;
// 	for (let i = 0; i<sizes.length; i++) {
// 		times[i] = new Array(2);
// 		times[i][0] = 0;
// 		times[i][1] = 0;
// 		for (let j = 0; j<num_trials; j++) {
// 			matrix = generate_random_matrix(sizes[i]);
// 			vector = generate_random_vector(sizes[i][0]);

// 			start = performance.now();
// 			matrix_transpose_multiply(matrix, vector);
// 			times[i][0] += (performance.now() - start)/num_trials;
// 			start = performance.now();
// 			matrix_transpose_multiply_2(matrix, vector);
// 			times[i][1] += (performance.now() - start)/num_trials;
// 		}
// 		if (times[i][0] > max) max = times[i][0];
// 		if (times[i][1] > max) max = times[i][1];
// 	}
// 	let y11,y12,y21,y22;
// 	let x1,x2;
// 	for (let i = 1; i<times.length; i++) {
// 		// console.log(times[i][0])
// 		x1 = width*(i-1)/times.length
// 		x2 = width*i/times.length

// 		stroke(255,100,20);
// 		y11 = map(times[i-1][0], 0, max, height-50, 10);
// 		y12 = map(times[i][0], 0, max, height-50, 10);
// 		line(x1, y11, x2, y12);

// 		stroke(20,100,255);
// 		y21 = map(times[i-1][1], 0, max, height-50, 10);
// 		y22 = map(times[i][1], 0, max, height-50, 10);
// 		line(x1, y21, x2, y22);

// 		noStroke();
// 		fill(255);
// 		text(sizes[i][0]+'\n'+sizes[i][1],x2,height-40)
// 	}
// 	noLoop();
// }

// function generate_random_matrix (size) {
// 	let output = new Array(size[0]);
// 	for (let i = 0; i<size[0]; i++) {
// 		output[i] = new Array(size[1]);
// 		for (let j = 0; j<size[1]; j++) {
// 			output[i][j] = Math.random()*100 - 50;
// 		}
// 	}
// 	return output;
// }

// function generate_random_vector(size) {
// 	let output = new Array(size);
// 	for (let i = 0; i<size; i++) {
// 		output[i] = Math.random()*100 - 50;
// 	}
// 	return output;
// }



function NeuralNet(layers) {
	// TODO: add cost function option
	// // implement cross-entropy
	// update
	// layer_sizes is now layers
	// and layers = 
	// [
	// 		{
	// 			size: 3,
	// 			activation: 'sigmoid'
	// 		},
	// 		{
	// 			size: 7,
	// 			activation: 'relu'
	// 		},
	// 		{
	// 			size: 2,
	// 			activation: 'identity'
	// 		}
	// ]
	// 
	// 3, 7, 2
	// this.weights is an array of matrices
	// there are layer_size.length-1 many matrices
	// with dimensions
	// 7x3, 2x7
	// so the first matrix looks like
	// [
	// 		[0,1,2],
	// 		[0,1,2],
	// 		...
	// 		[0,1,2]
	// 	]
	// aka
	// layer_sizes[1]xlayer_sizes[0]
	// layer_sizes[2]xlayer_sizes[1]
	// ...
	// layer_sizes[l]xlayer_sizes[l-1]
	
	// number of layers
	
	// this.layers = layers;
	let L = layers.length;
	this.weights = new Array(L-1);
	this.biases = new Array(L-1);

	this.weights_have_been_initialized = false;

	this.max_weight = 3;
	this.min_weight = -3;

	this.max_bias = 3;
	this.min_bias = -3;

	this.learning_rate = 0.5;

	this.initializeWeights = function() {
		this.weights_have_been_initialized = true;

		for (let l = 0; l<L-1; l++) {
			this.weights[l] = new Array(layers[l+1].size);
			this.biases[l] = new Float32Array(layers[l+1].size);

			for (let i = 0, n=this.weights[l].length; i<n; i++) {
				this.weights[l][i] = new Float32Array(layers[l].size);

				for (let j = 0, m=this.weights[l][i].length; j<m; j++) {
					this.weights[l][i][j] = this.min_weight + Math.random()*(this.max_weight-this.min_weight);
				}
				this.biases[l][i] = this.min_bias + Math.random()*(this.max_bias-this.min_bias);
			}
		}
		
		// // cheating a little bit for the sake of example
		// this.weights[0] = new Array(2);
		// this.biases[0] = new Array(2);

		// this.weights[0][0] = new Array(2);
		// this.weights[0][0][0] = 2*Math.random();//1
		// this.weights[0][0][1] = 2*Math.random();//1;
		// this.biases[0][0] = -Math.random()//-0.5;

		// this.weights[0][1] = new Array(2);
		// this.weights[0][1][0] = -1-2*Math.random();
		// this.weights[0][1][1] = -2//*Math.random();
		
		// this.biases[0][1] = 2*Math.random()//1.5;

		// this.weights[1] = new Array(1);
		// this.biases[1] = new Array(1);
		// this.weights[1][0] = new Array(2);
		// this.weights[1][0][0] = 1//0.6+0.5*Math.random();
		// this.weights[1][0][1] = 1//0.6+0.6*Math.random();

		// this.biases[1][0] = -2*Math.random()//-1.5;
	}

	this.feedforward = function(input, just_the_output) {
		let z = new Array(L);
		let a = new Array(L);
		a[0] = input;

		for (let l = 1; l<L; l++) {
			z[l] = vector_addition(matrix_vector_multiply(this.weights[l-1], a[l-1]), this.biases[l-1], true); // true is to return new object
			a[l] = sigma(z[l]);
		}

		return (just_the_output)? a[L-1]:[a, z];
	}

	this.backpropagate = function(expected, a, z) {
		let delta = new Array(L);
		// backpropagate
		// delta[L-1] = (a[L-1] - expected) hadamard sigma_prime(z[L-1])
		delta[L-1] = hadamard(vector_subtraction(a[L-1], expected, true), sigma_prime(z[L-1]));
		// console.log('expected')
		// console.log(expected)
		// console.log('a['+(L-1)+'] = ')
		// console.log(a[L-1])
		// console.log('sigma\'(z['+(L-1)+']) = ');
		// console.log(sigma_prime(z[L-1]));
		// console.log('vector_subtraction(a['+(L-1)+'] - y) = ');
		// console.log(vector_subtraction(a[L-1], expected, true));
		// console.log('delta['+(L-1)+']')
		// console.log(delta[L-1]);

		for (let l = L-2; l>=1; l--) {
			// delta[l] = transpose(W[l+1])*delta[l+1] hadamard sigma_prime(z[l]);
			delta[l] = hadamard(matrix_transpose_multiply(this.weights[l], delta[l+1]), sigma_prime(z[l]));
		}
		return delta
	}

	// this.gradientDescent = function(learning_rate, a, z, delta) {
	// 	for (let l = L-1; l>=1; l--) {
	// 		delta[l] = scalar_multiply(learning_rate, delta[l]);
	// 		// this.weights[l-1] = 
	// 		matrix_subtraction(this.weights[l-1], vector_multiply_tranpose(delta[l], a[l-1]));
	// 		// this.biases[l-1] = 
	// 		vector_subtraction(this.biases[l-1], delta[l], false);

	// 		// scalar matrix multiplication is nice and associative, so 
	// 		// scalar * (matrix * matrix) = (scalar * matrix) * matrix
	// 		// W[l] = W[l] -  (learning_rate*delta[l]) * transpose(a[l-1]));
	// 		// b[l] -= learning_rate*delta[l]
	// 	}
	// }

	this.SGD = function(learning_rate, a, delta, m) {
		// stoachastic gradient descent
		// aka minibatches
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
					// sum_weights = 
					matrix_addition(sum_weights, vector_multiply_tranpose(delta[x][l], a[x][l-1]), false);
					// sum_biases = 
					vector_addition(sum_biases, delta[x][l], false);
				}
			}

			// this.weights[l-1] = 
			matrix_subtraction(this.weights[l-1], sum_weights, false);
			// this.biases[l-1] = 
			vector_subtraction(this.biases[l-1], sum_biases, false);
		}
	}
	
	this.train = function(data) {
		if (this.weights_have_been_initialized) {
			let data_len = data.length;
			let activations = new Array(data_len);
			let zs = new Array(data_len);
			let errors = new Array(data_len);
	
			let temp;
			let cost = 0;
			let y, a;
			for (let i = 0; i<data_len; i++) {
				// ***************
				// * feedforward *
				// ***************

				temp = this.feedforward(data[i][0], false);
				activations[i] = temp[0];
				zs[i] = temp[1];

				// *****************
				// * backpropagate *
				// *****************
				errors[i] = this.backpropagate(data[i][1], activations[i], zs[i]);
				// this.gradientDescent(0.1, activations[0], activations[1], errors);
			
				// if (Math.round(temp[0][L-1][0]) === data[i][1][0]) {
				// 	accuracy++;
				// }
			
				// quadratic cost
				cost += 0.5*(temp[0][L-1][0] - data[i][1][0])**2;
				
				// cross-entropy
				// y = data[i][1][0];
				// a = temp[0][L-1][0];
				// cost -= 
				// y*Math.log(a) + (1-y)*(1-Math.log(a));
				// = y*log(a) + 1 - log(a) - y + y*log(a)
				// = 2*y*log(a) + 1 - log(a) - y
				// = (2*y - 1)*log(a) + 1 - y
			}
			// console.log(accuracy/data_len);
			costs.push(cost/data_len);
			// ellipse(width*costs.length/100, height - cost*height/2, 5, 5)

			// ***************************************
			// * gradient descent (with minibatches) *
			// ***************************************
			this.SGD(this.learning_rate, activations, errors, data_len);
			this.learning_rate *= 0.999;
		}
	}

	this.show = function() {
		// actual weight matrices
		// stroke(0)
		// let x = 120;
		// if (this.weights_have_been_initialized) {
		// 	for (let l = 2; l<=L; l++) {
		// 		for (let i = 0, n = this.weights[l].length; i<n; i++) {
		// 			for (let j = 0, m = this.weights[l][0].length; j<m; j++) {
		// 				fill(255*(this.weights[l][i][j]+this.max)/(2*this.max));
		// 				rect(x + j*30, 40 + i*30, 30, 30);
		// 			}
		// 		}
		// 		x += 30*this.weights[l][0].length + 10;
		// 	}
		// }

		strokeWeight(3);
		let layer_sep = 100;
		let neuron_sep = 50;
		let wght = 0;
	// // w[l][j][i] = weight from neuron i in layer l-1 to j in layer l
		for (let l = 0; l<L-1; l++) {
			for (let j = 0; j<this.weights[l].length; j++) {
				for (let i = 0; i<this.weights[l][j].length; i++) {
					wght = (this.weights[l][j][i]-this.min_weight)/(this.max_weight-this.min_weight);
					if (wght<0) console.log(this.weights[l][j][i]);
					else if (wght>1) console.log(this.weights[l][j][i]);
					stroke(color_map2(wght));
					// strokeWeight(1+4*wght);
					line(100 + l*layer_sep, 100 + i*neuron_sep,
						100 + l*layer_sep+layer_sep, 100 + j*neuron_sep);
					// text(this.weights[l][j][i].toFixed(2), 100+(l-0.5)*layer_sep, 100 + neuron_sep*(i+j)/2)
				}
				noStroke();
				fill(color_map2((this.biases[l][j]-this.min_bias)/(this.max_bias-this.min_bias)));
				ellipse(100 + l*layer_sep+layer_sep, 100 + j*neuron_sep, 15, 15)
			}
		}

		strokeWeight(1);
	}

	function hadamard(vector1, vector2) {
		// assert vector1.length === vector2.length
		// console.log('hadamard')
		// console.log(vector1)
		// console.log(vector2)
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
					// modify matrix directly... maybe help with GC and mem porblems?
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
				if (output[i] > this.max_bias) this.max_bias = output[i];
				else if (output[i] < this.min_bias) this.min_bias = output[i];
			}
			return output;
		} else {
			for (let i = 0; i<vector1.length; i++) {
				vector1[i] = vector1[i] - vector2[i];
				if (vector1[i] > this.max_bias) this.max_bias = vector1[i];
				else if (vector1[i] < this.min_bias) this.min_bias = vector1[i];
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
		// u * v^T
		// [u0][v0 v1 v2]
		// [u1]
		// [u2]
		// [u3]
		// =
		// [u0v0 u0v1 u0v2]
		// [u1v0 u1v1 u1v2]
		// [u2v0 u2v1 u2v2]
		// [u3v0 u3v1 u3v2]
		// aka
		// M[i][j] = u[i]*v[j]
		// console.log('vector_multiply_tranpose')
		// console.log('inputs')
		// console.log('v1')
		// console.log(vector1)
		// console.log('v2')
		// console.log(vector2)
		let output = new Array(vector1.length);
		for (let i = 0; i<vector1.length; i++) {
			output[i] = new Float32Array(vector2.length);
			for (let j = 0; j<vector2.length; j++) {
				output[i][j] = vector1[i]*vector2[j];
			}
		}
		// console.log('output of vector_multiply_tranpose')
		// console.log(output)
		return output;
	}

	function matrix_vector_multiply(matrix, vector) {
		// probably insanely inefficient
		// and definitely should use numpy
		// or at least some optimized javascript math package
		let output = new Float32Array(matrix.length);
		//[m00 m01 m02] [v0]
		//[m10 m11 m12] [v1]
		//[m20 m21 m22] [v2]
		//[m30 m31 m32]
		//=
		//[m00v0 + m01v1 + m02v2]
		//[m10v0 + m11v1 + m12v2]
		//[m20v0 + m21v1 + m22v2]
		//[m30v0 + m31v1 + m32v2]
		// aka 
		// out[i] = sum_j=0^vectorlen (m[i][j]*v[j])
		for (let i = 0; i<matrix.length; i++) {
			output[i] = 0;
			for (let j =  0; j<matrix[0].length; j++) {
				output[i] += matrix[i][j]*vector[j];
			}
		}
		return output;
	}
	// slower
	// function matrix_transpose_multiply(matrix, vector) {
	// 	let transposed = new Array(matrix[0].length);
	// 	for (let j = 0; j<matrix[0].length; j++) {
	// 		transposed[j] = new Array(matrix.length);
	// 		for (let i = 0; i <matrix.length; i++) {
	// 			transposed[j][i] = matrix[i][j];
	// 		}
	// 	}
	// 	return matrix_vector_multiply(transposed, vector);
	// }

	function matrix_transpose_multiply(matrix, vector) {
		let output = new Float32Array(matrix[0].length);
		//[m00 m01 m02]^T 	[v0]
		//[m10 m11 m12] 	[v1]
		//[m20 m21 m22] 	[v2]
		//[m30 m31 m32]		[v3]
		//=
		//[m00v0 + m10v1 + m20v2 + m30v3]
		//[m01v0 + m11v1 + m21v2 + m31v3]
		//[m02v0 + m12v1 + m22v2 + m32v3]

		for (let j = 0; j<matrix[0].length; j++) {
			output[j] = 0;
			for (let i = 0; i <matrix.length; i++) {
				output[j] += matrix[i][j]*vector[i];
			}
		}
		return output;
	}

	function sigma(vector) {
		let output = new Array(vector.length);
		for (let i = 0, len=vector.length; i<len; i++) {
			output[i] = sigmoid(vector[i]);
		}
		return output;
	}
	function sigma_prime (vector) {
		let output = new Array(vector.length);
		for (let i = 0, len=vector.length; i<len; i++) {
			output[i] = sigmoid_prime(vector[i]);
		}
		return output;
	}

	function sigmoid(x) {
		return 1.0/(1.0+Math.exp(-4*x));
	}

	function sigmoid_prime(x) {
		let s = sigmoid(x);
		return 4*s*(1.0-s);
	}
}


// function test_speed() {
// 	let sizes = [
// 		[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],[2,10],
// 		[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],
// 		[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],
// 		[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],
// 		[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10],
// 		[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8],[7,9],[7,10],
// 		[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9],[8,10],
// 		[9,2],[9,3],[9,4],[9,5],[9,6],[9,9],[9,8],[9,9],[9,10],
// 		[10,2],[10,3],[10,4],[10,5],[10,6],[10,10],[10,8],[10,9],[10,10]
// 	]
// 	let matrix;// = new Array(sizes.length);
// 	let vector;// = new Array(sizes.length);
// 	let max = -1;
// 	let times = new Array(sizes.length);
// 	let start;
// 	let num_trials = 20;
// 	for (let i = 0; i<sizes.length; i++) {
// 		times[i] = new Array(2);
// 		times[i][0] = 0;
// 		times[i][1] = 0;
// 		for (let j = 0; j<num_trials; j++) {
// 			matrix = generate_random_matrix(sizes[i]);
// 			vector = generate_random_vector(sizes[i][0]);

// 			start = performance.now();
// 			matrix_transpose_multiply(matrix, vector);
// 			times[i][0] += (performance.now() - start)/num_trials;
// 			start = performance.now();
// 			matrix_transpose_multiply_2(matrix, vector);
// 			times[i][1] += (performance.now() - start)/num_trials;
// 		}
// 		if (times[i][0] > max) max = times[i][0];
// 		if (times[i][1] > max) max = times[i][1];
// 	}
// 	let y11,y12,y21,y22;
// 	let x1,x2;
// 	for (let i = 1; i<times.length; i++) {
// 		// console.log(times[i][0])
// 		x1 = width*(i-1)/times.length
// 		x2 = width*i/times.length

// 		stroke(255,100,20);
// 		y11 = map(times[i-1][0], 0, max, height-50, 10);
// 		y12 = map(times[i][0], 0, max, height-50, 10);
// 		line(x1, y11, x2, y12);

// 		stroke(20,100,255);
// 		y21 = map(times[i-1][1], 0, max, height-50, 10);
// 		y22 = map(times[i][1], 0, max, height-50, 10);
// 		line(x1, y21, x2, y22);

// 		noStroke();
// 		fill(255);
// 		text(sizes[i][0]+'\n'+sizes[i][1],x2,height-40)
// 	}
// 	noLoop();
// }

// function generate_random_matrix (size) {
// 	let output = new Array(size[0]);
// 	for (let i = 0; i<size[0]; i++) {
// 		output[i] = new Array(size[1]);
// 		for (let j = 0; j<size[1]; j++) {
// 			output[i][j] = Math.random()*100 - 50;
// 		}
// 	}
// 	return output;
// }

// function generate_random_vector(size) {
// 	let output = new Array(size);
// 	for (let i = 0; i<size; i++) {
// 		output[i] = Math.random()*100 - 50;
// 	}
// 	return output;
// }