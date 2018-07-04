var network, data, mini;
var counter;
var weight_colors;
var currently_training;
var train_button, reset_button
// , add_neuron_button, remove_neuron_button, gen_data_button;
var costs;
var mnist_training;

var image;
function preload() {
	// just because they come from library from 
	// somewhere far away in the internet
	// ouput_colors = d3.interpolatePuBu;//interpolateRdYlBu;
	// weight_colors = d3.interpolateRdYlGn;
	// 784 x 3000
	// each row is 28 x 28
	mnist_training = loadImage('../../../../data/mnist_batch_0_small.png');
}

function setup() {
	var cv = createCanvas(200, 200);
	cv.parent('backprop-example');

	currently_training = true;

	train_button = createButton('start/stop training');
	train_button.parent('train-button');
	train_button.mousePressed(startTraining);

	reset_button = createButton('reset network');
	reset_button.parent('reset-button');
	reset_button.mousePressed(resetNetwork);

	// add_neuron_button = createButton('add a neuron');
	// add_neuron_button.parent('add-neuron-button');
	// add_neuron_button.mousePressed(addNeuron);
	
	// remove_neuron_button = createButton('remove a neuron');
	// remove_neuron_button.parent('remove-neuron-button');
	// remove_neuron_button.mousePressed(removeNeuron);
	
	// gen_data_button = createButton('regenerate data');
	// gen_data_button.parent('gen-data-button');
	// gen_data_button.mousePressed(genData);

	initLayers();

	counter = 0;
	costs = [];

	genData();

	image = new Uint8ClampedArray(784);

	// textAlign(CENTER, CENTER)
}


function draw() {
	background(120);
	costs.push(network.train(data[counter]));
	counter++;
	if (counter === 28) counter = 0;


	if (costs.length > 1) {
		stroke(255);
		let x1,y1,x2,y2;
		for (let i = 1; i<costs.length; i++) {
			x1 = width*(i-1)/(costs.length - 1);
			x2 = width*i/(costs.length - 1);
			y1 = height - height*costs[i-1]/2;
			y2 = height - height*costs[i]/2;
			line(x1,y1,x2,y2);
		}
	}

	if (frameCount % 50 === 0) {
		for (let y = 0; y<28; y++) {
			for (let x = 0; x<28; x++) {
				z = network.feedforward([x,y], true);
				image[y*28 + x] = Math.floor(max(0,z[0]));
			}
		}
	}

	// console.log(network.feedforward([14,14], true)[0]);
	let y_pos;
	// show image
	for (let i = 0; i<image.length; i++) {
		y_pos = height - 50 + Math.floor(i/28);

		stroke(image[i]);
		point(10+i%28, height - 50 + Math.floor(i/28));
		stroke(mnist_training.get(i,0)[0])
		point(40+i%28, height - 50 + Math.floor(i/28));
		
		// set(10 + i%28, y_pos, image[i]);
		// set(40+i%28, y_pos, mnist_training.get(i,0)[0]);
	}
	updatePixels()

	fill(255)
	noStroke();
	text(counter, 10, 10);
	text(frameRate(), 10, 30);

	if (frameCount > 500) noLoop();
}


function resetNetwork() {
	network.initializeWeights();
	// counter = 0;
	// costs = [];
	draw();
}

function initLayers() {
	network = new NeuralNet([
		{size:2}, 
		{size:10, activation:'sigmoid'},
		{size:10, activation:'relu'},
		// {size:10, activation:'relu'},
		// {size:10, activation:'relu'},
		{size:1, activation:'linear'}
	], 'quadratic');
	network.initializeWeights();
}

function genData() {
	data = [];
	let indices = []
	for (let i = 0; i<784; i++) {
		indices.push(i);
	}

	let j = -1;
	let temp;
	for (let i = 0; i<783; i++) {
		j = i + Math.floor(Math.random()*(784-i));
		temp = indices[i];
		indices[i] = indices[j];
		indices[j] = temp;
	}
	let ind,x,y;
	for (let i = 0; i<112; i++) {
		mini = [];
		for (let j = 0; j<7; j++) {
			ind = indices[i*7+j];
			x = ind%28;
			y = Math.floor(ind/28);
			mini.push([ [x,y], [mnist_training.get(ind,0)[0] ] ])
		}
		data.push(mini);
	}
	// let x,y,z;
	// for (let y = 0; y<28; y++) {
	// 	mini = [];
	// 	for (let x = 0; x<28; x++) {
	// 		// x = j%28;
	// 		// y = Math.floor(j/28);
	// 		// z = mnist_training.get(j,0);
	// 		// b & w image, so just grab red channel
	// 		mini.push([ [x,y], [mnist_training.get(y*28+x,0)[0]] ]);
	// 	}
	// 	data.push(mini);
	// }
}

// function addNeuron() {
// 	if (num_neurons < 25) {
// 		num_neurons++;
// 		initLayers();
// 		// counter = 0;
// 		// costs = [];
// 		draw();
// 	} else {
// 		console.log('boi u tryna kill yr browser?')
// 	}
// }
// function removeNeuron() {
// 	if (num_neurons > 1) {
// 		num_neurons--;
// 		initLayers();
// 		counter = 0;
// 		costs = [];
// 		draw();
// 	} else {
// 		console.log('...')
// 	}
// }

function startTraining() {
	if (currently_training) {
		currently_training = false;
		noLoop();
		draw();
	} else {
		currently_training = true;
		loop();
	}
}