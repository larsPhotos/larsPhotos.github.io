function Layer(weights) {
	this.weights = weights;
	// weights = [Float32Array, ...] 
	// length is the number of inputs for the next layer
	// each Float32Array is a row of length input + 1

	// returns [sigma(output_1), sigma(output_2),...] of type Float32Array
	// vector = [...] input vector
	// this is the output of the layer
	this.getOutput = function (vector) {
		let output = new Float32Array(this.weights.length);
		for (let i in this.weights) {
			let sum = 0.0;
			for (let j in vector) {
				sum += this.weights[i][j]*vector[j];
			}
			// bias
			sum += this.weights[i][vector.length];
			output[i] = sigmoid(sum);
		}
		return output;
	}

	var sigmoid = function(input) {
		return 2.0/(1.0 + Math.exp(input)) - 1.0;
	}

	this.displayWeight = function(i) {
		return weights[i];
	}
};

// for now, just create random network
function SmartBoid(input_size, output_size, _x, _y, all_weights) {
	if (all_weights === undefined) {
		//create random boids
		this.boid_layers = [];
		this.x = _x;
		this.y = _y;

		this.health = 100;
		this.is_alive = true;


		let min_num_layers = 3;
		let max_num_layers = 6;
		let min_layer_size = 4;
		let max_layer_size = 10;



		let num_layers = min_num_layers + floor(Math.random()*(max_num_layers - min_num_layers + 1));
		this.layer_sizes = new Uint8Array(num_layers);


		this.layer_sizes[0] = input_size;
		this.layer_sizes[num_layers-1] = output_size;


		for (let i = 1; i<num_layers-1; i++) {
			this.layer_sizes[i] = min_layer_size + floor(Math.random()*(max_layer_size - min_layer_size + 1));
		}

		
		// each weight matrix (aka neuron)
		// is an output_size x input_size+1 matrix
		// aka layer_size[i] x layer_size[i-1]+1
		// [array_of_length_layer_size_{i-1}+1, ..., array_of_length_layer_size_{i-1}+1].length = layer_size_{i}
		let min_weight_value = -5;
		let max_weight_value = 5;
		let layer_i;
		for (let i = 1; i<num_layers; i++) {
			layer_i = [];
			// each Layer object consists of an array of Float32Arrays;
			for (let j = 0; j<this.layer_sizes[i]; j++) {
				// these are the Float32Arrays;
				let neuron_w = new Float32Array(this.layer_sizes[i-1] + 1);
				for (let k = 0; k < neuron_w.length; k++) {
					// fill with random values
					neuron_w[k] = min_weight_value + Math.random()*(max_weight_value - min_weight_value);
				}
				// add to layer
				layer_i.push(neuron_w);
			}
			// finished filling array with correct number of Float32Arrays;
			// create a Layer object
			this.boid_layers.push(new Layer(layer_i));
		}
	}


	// move based on input
	this.feedforward = function(input) {
		let current_input = input;
		// console.log('input')
		// console.log(input)
		for (let i = 0; i<this.boid_layers.length; i++) {
			current_input = this.boid_layers[i].getOutput(current_input);
			// console.log(i);
			// console.log(current_input);
		}
		return current_input;
	};

	this.move = function(input, show_layers) {
		let decision = this.feedforward(input);
		// for now, assume output is just 2 values, how much to move in x direction, how much to move in y;
		this.x += decision[0];
		this.y += decision[1];

		if (show_layers) {
			this.showLayers(input, decision);
		}
		// this.show(input, decision);

		if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
			this.is_alive = false;
		}
	};

	this.gotHealth = function(health_improvement) {
		this.health += health_improvement;
	};

	this.lostHealth = function(health_decrease) {
		this.health -= health_decrease;

		this.is_alive = this.health>0;
	};

	this.show = function(){//input, output) {
		if (this.is_alive) {
			fill(51);
		} else {
			fill(255,0,0);
		}

		ellipse(this.x, this.y, 10, 10)
	}

	this.showLayers = function(input, output) {
		for (let i = 0; i<this.layer_sizes.length; i++) {
			let x_pos = this.x + i*20;

			noStroke();
			fill(0,64);
			if (i === 0) {
				for (let k = 0; k<input.length; k++) {
					text(input[k].toFixed(2), x_pos - 30, this.y - 20 - k*10);
				}
			} else if (i === this.layer_sizes.length - 1) {
				for (let k = 0; k<output.length; k++) {
					text(output[k].toFixed(2), x_pos + 20, this.y - 20 - k*10);
				}
			}

			for (let j = 0; j<this.layer_sizes[i]; j++) {

				noStroke();
				fill(40, 64);

				let y_pos = this.y - (20 + j*10);

				ellipse(x_pos, y_pos, 10, 10);

				// if (i > 0) {
				// 	text(this.boid_layers[i-1].weights[j].toFixed(3) ,this.x + 20 + i*20, this.y - 100 - (10 + j*10))
				// }
				// if (i > 0) {
				// 	for (let k = 0; k<this.boid_layers[i-1].weights[j].length; k++) {
				// 		text('i:'+i+',j:'+j+',k:'+k+'\t'+this.boid_layers[i-1].weights[j][k].toFixed(1), x_pos +k*50 + 100, y_pos - 100)
				// 	}
				// }

				if (i < this.layer_sizes.length-1) {
					stroke(0,32);
					
					for (let k = 0; k<this.layer_sizes[i+1]; k++) {
						line(x_pos, y_pos, x_pos + 20, this.y - (20 + k*10));
					}
				}
			}
		}
	}
	 // else {}
};