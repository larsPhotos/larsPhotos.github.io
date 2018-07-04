function Layer(weights) {
	this.weights = weights;
	// weights = [Float32Array, ...] 
	// length is the number of inputs for the next layer
	// each Float32Array is a row of length input + 1

	// returns [sigma(output_1), sigma(output_2),...] of type Float32Array
	// vector = [...] input vector
	// this is the output of the layer
	this.getOutput = function (vector) {
		// console.log('vector');
		// console.log(vector)
		// console.log('done with vector')
		let output = new Float32Array(this.weights.length);
		for (let i in this.weights) {
			let sum = 0.0;
			// console.log('weight dimensions are correct');
			// console.log(weights[i].length === vector.length+1)
			for (let j in vector) {
				sum += this.weights[i][j]*vector[j];
				// console.log('weight '+i+', '+j);
				// console.log(weights[i][j]);
			}
			// bias
			sum += this.weights[i][vector.length];
			// console.log('bias');
			// console.log(this.weights[i][vector.length])
			// console.log('sum');
			// console.log(sum)
			output[i] = sigmoid(sum);
			// console.log('output for '+i);
			// console.log(output[i])
		}
		return output;
	}

	var sigmoid = function(input) {
		return 1.0/(1.0 + Math.exp(-input));
	}

	this.displayWeight = function(i) {
		return weights[i];
	}
};

function SmartBoid(input_size, output_size, _x, _y, _layers) {
	this.x = _x;
	this.y = _y;

	this.input_size = input_size;
	this.output_size = output_size;

	this.health = 50;

	this.age = 0;
	this.is_alive = true;


	// fixed topology
	let num_layers = 5;//min_num_layers + floor(Math.random()*(max_num_layers - min_num_layers + 1));
	this.layer_sizes = new Uint8Array(num_layers);


	this.layer_sizes[0] = input_size;
	this.layer_sizes[1] = 3;
	this.layer_sizes[2] = 4;
	this.layer_sizes[3] = 3;
	this.layer_sizes[num_layers-1] = output_size;


	this.min_weight_value = -10;
	this.max_weight_value = 10;

	if (_layers === undefined) {
		//create random boids
		this.neuron_layers = [];



		// let min_num_layers = 4;
		// let max_num_layers = 4;
		// let min_layer_size = 6;
		// let max_layer_size = 6;



		// for (let i = 1; i<num_layers-1; i++) {
		// 	this.layer_sizes[i] = min_layer_size + floor(Math.random()*(max_layer_size - min_layer_size + 1));
		// }

		
		// each weight matrix (aka neuron)
		// is an output_size x input_size+1 matrix
		// aka layer_size[i] x layer_size[i-1]+1
		// [array_of_length_layer_size_{i-1}+1, ..., array_of_length_layer_size_{i-1}+1].length = layer_size_{i}

		let layer_i;
		for (let i = 1; i<num_layers; i++) {
			layer_i = [];
			// each Layer object consists of an array of Float32Arrays;
			for (let j = 0; j<this.layer_sizes[i]; j++) {
				// these are the Float32Arrays;
				let neuron_w = new Float32Array(this.layer_sizes[i-1] + 1);
				for (let k = 0; k < neuron_w.length; k++) {
					// fill with random values
					neuron_w[k] = this.min_weight_value + Math.random()*(this.max_weight_value - this.min_weight_value);
				}
				// add to layer
				layer_i.push(neuron_w);
			}
			// finished filling array with correct number of Float32Arrays;
			// create a Layer object
			this.neuron_layers.push(new Layer(layer_i));
		}
	} else {
		this.neuron_layers = _layers;
	}


	// move based on input
	this.feedforward = function(input) {
		let current_input = input;
		// console.log('input')
		// console.log(input)
		for (let i = 0; i<this.neuron_layers.length; i++) {
			current_input = this.neuron_layers[i].getOutput(current_input);
			// console.log(current_input);
			// console.log(i);
			// console.log(current_input);
		}
		return current_input;
	};

	this.move = function(input, show_layers, show_health) {
		let decision = this.feedforward(input);
		// for now, assume output is just 2 values, how much to move in x direction, how much to move in y;
		decision[0] = 2*decision[0]-1;
		decision[1] = 2*decision[1]-1;
		this.x += decision[0];
		this.y += decision[1];

		if (show_layers) {
			this.showLayers(input, decision);
		}
		// this.show(input, decision);

		// if (this.x < buffer['left']){
		// 	this.x = width-buffer['right'];
		// } else if (this.x > width - buffer['right']) {
		// 	this.x = buffer['left'];
		// }

		// if (this.y < buffer['top']){
		// 	this.y = height - buffer['bottom'];
		// } else if (this.y > height - buffer['bottom']) {
		// 	this.y = buffer['top'];
		// }

		if (this.x < buffer['left'] || this.x > width-buffer['right'] || this.y < buffer['top'] || this.y > height-buffer['bottom']) {
			this.is_alive = false;
			// this.health = 0;
		} else {
			this.age++;
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

		ellipse(this.x, this.y, 5, 5)
	};

	this.crossover = function(other) {
		let child_layers = [];
		// they have the same topology;

		for (let layer_index in this.neuron_layers) {
			let ch_layer = [];
			let crossover_point, neuron_size;

			for (let neuron_index in this.neuron_layers[layer_index].weights) {
				neuron_size = this.neuron_layers[layer_index].weights[neuron_index].length;

				let new_neuron = new Float32Array(neuron_size);
				crossover_point = floor(Math.random()*(neuron_size));
				// pick a random spot
				// and mix their weights on each neuron
				for (let i = 0; i<neuron_size; i++) {
					if (i < crossover_point) {
						new_neuron[i] = this.neuron_layers[layer_index].weights[neuron_index][i];
					} else {
						new_neuron[i] = other.neuron_layers[layer_index].weights[neuron_index][i];
					}
				}
				ch_layer.push(new_neuron);
			}

			child_layers.push(new Layer(ch_layer));
		}

		let new_x = 100;//this.x+random(-10,10);
		// if (new_x < 50 || new_x > width-50) {
		// 	new_x = 50 + random(width - 100);
		// }
		let new_y = height/2;//this.y+random(-10,10);
		// if (new_y < 50 || new_y > height-50) {
		// 	new_y = 50 + random(height - 100);
		// }
		return new SmartBoid(this.input_size, this.output_size, new_x, new_y, child_layers)
	};


	this.mutate = function(mutation_rate) {
		for (let layer_index in this.neuron_layers) {
			for (let neuron_index in this.neuron_layers[layer_index].weights) {

				if (Math.random() < mutation_rate) {
					// up to +/- 1 weight mutation.
					// eventually make this smarter so mutation rate is influenced by max fitness;
					this.neuron_layers[layer_index].weights[neuron_index] += (Math.random())*2 - 1;
				}
			}
		}	
	};

	this.showLayers = function(input, output) {

		let marge = 40;
		let rad = 20;
		for (let i = 0; i<this.layer_sizes.length; i++) {
			let x_pos = this.x + i*marge;

			noStroke();
			fill(0,64);
			if (i === 0) {
				for (let k = 0; k<input.length; k++) {
					text(input[k].toFixed(2), x_pos - 30, this.y - marge - k*rad);
				}
			} else if (i === this.layer_sizes.length - 1) {
				for (let k = 0; k<output.length; k++) {
					text(output[k].toFixed(2), x_pos + 20, this.y - marge - k*rad);
				}
			}

			for (let j = 0; j<this.layer_sizes[i]; j++) {

				noStroke();
				fill(40, 64);

				let y_pos = this.y - (marge + j*rad);

				ellipse(x_pos, y_pos, 5, 5);

				// if (i > 0) {
				// 	text(this.neuron_layers[i-1].weights[j].toFixed(3) ,this.x + 20 + i*20, this.y - 100 - (10 + j*10))
				// }
				// if (i > 0) {
				// 	for (let k = 0; k<this.neuron_layers[i-1].weights[j].length; k++) {
				// 		text('i:'+i+',j:'+j+',k:'+k+'\t'+this.neuron_layers[i-1].weights[j][k].toFixed(1), x_pos +k*50 + 100, y_pos - 100)
				// 	}
				// }

				if (i < this.layer_sizes.length-1) {			
					// stroke(0,32);	
					let val;	
					for (let k = 0; k<this.layer_sizes[i+1]; k++) {
						val = this.neuron_layers[i].weights[k][j];

						// text(val, x_pos, y_pos - marge - (this.layer_sizes[i+1]-k)*rad);
						stroke(lerpColor(red,green,(val- this.min_weight_value)/(this.max_weight_value-this.min_weight_value)));
						// if (val < 0) {
						// 	stroke(255,0,0,32);
						// } else if (val === 0) {
						// 	stroke(0,32);
						// } else {
						// 	stroke(0,255,0,32);
						// }
						// strokeWeight(map(Math.abs(val),0,5,1,3));
						strokeWeight(2);
						line(x_pos, y_pos, x_pos + marge, this.y - (marge + k*rad));
					}
				}
			}
		}
	}
	 // else {}
};