var network, data, mini;
var counter;
var weight_colors;
var currently_training;
var num_neurons;
var train_button, new_weights_button, add_neuron_button, remove_neuron_button, gen_data_button;
var costs;
var function_choices;
// function preload() {
// 	// just because they come from library from 
// 	// somewhere far away in the internet
// 	weight_colors = d3.interpolateRdYlGn;
// }

function setup() {
	var cv = createCanvas(500, 500);
	cv.parent('backprop-example');

	currently_training = true;

	train_button = createButton('start/stop training');
	train_button.parent('train-button');
	train_button.mousePressed(startTraining);

	new_weights_button = createButton('new weights');
	new_weights_button.parent('new-weights-button');
	new_weights_button.mousePressed(resetNetwork);

	add_neuron_button = createButton('add a neuron');
	add_neuron_button.parent('add-neuron-button');
	add_neuron_button.mousePressed(addNeuron);
	
	remove_neuron_button = createButton('remove a neuron');
	remove_neuron_button.parent('remove-neuron-button');
	remove_neuron_button.mousePressed(removeNeuron);
	
	gen_data_button = createButton('regenerate data');
	gen_data_button.parent('gen-data-button');
	gen_data_button.mousePressed(genData);

	// function_choices = createSelect();
	// function_choices.parent('function-choice-button');
	// function_choices.option('exp(-pi*x^2)');
	// function_choices.option('cos(x^2)');
	// function_choices.changed(genData);

	num_neurons = 5;
	initLayers();

	counter = 0;
	costs = [];

	genData();

	textAlign(CENTER, CENTER)

	frameRate(200);
}


function draw() {
	// background(255,230,230);
	background(255,240,240);
	costs.push( network.train(data[counter], 0.05) );
	if (frameCount%10 === 0) counter++;

	network.show(width/2, 100, 300, 180, 8)//, weight_colors)
	
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

	noStroke();
	fill(0);
	for (let i = 0; i<data.length; i++) {
		for (let j = 0; j<data[i].length; j++) {
			ellipse(width*(data[i][j][0][0]+1)/2, height - height*(data[i][j][1][0])/2, 5, 5);
		}
	}

	fill(255,0,0);
	let x,y;
	let num_points = 30;
	for (let i = 0; i<=2*num_points; i++) {
		x = (i - num_points)/num_points;
		y = network.feedforward([x], true);
		ellipse(0.5*width*i/num_points, height - height*y[0]/2, 5, 5);
	}
	fill(255);
	text(network.min_weight.toFixed(2),width-25,175);
	text(network.max_weight.toFixed(2),width-25,85);

	text('fps: '+Math.round(frameRate()), 30, 10)
	// text('Cost/epoch',50, 50)
	// text('0.75',35, height/4)
	// text('0.5',35, height/2)
	// text('0.25',35, 3*height/4)

	for (let i = 0; i<10; i++) {
		// fill(weight_colors(i/9))
		fill(255*i/9)
		rect(width - 50, 170 - i*10, 10, 10);
	}

	if (counter === data.length) {
		counter = 0;
		shuffleData();
	}
}

function resetNetwork() {
	network.initializeWeights();
	counter = 0;
	costs = [];
	draw();
	// loop();
}

function initLayers() {
	network = new NeuralNet([
		{size:1},
		// {size:6, activation:'lrelu'},
		{size:num_neurons, activation:'sigmoid'},
		{size:1, activation:'linear'}
	], 'quadratic');
	network.initializeWeights();
}

function genData() {
	data = [];
	mini = [];
	// let selectedFunction;
	// switch(function_choices.value()) {
	// 	case 'exp(-pi*x^2)':
	// 		selectedFunction = expGauss;
	// 		break;
	// 	case 'cos(x^2)':
	// 		selectedFunction = cosSqrd;
	// 		break;
	// }
	let x,y;
	for (let i = 0; i<3; i++) {
		mini = [];
		for (let j = 0; j<20; j++) {
			x = Math.random()*2 - 1;
			y = expGauss(x);
			// selectedFunction(x);
			mini.push([ [x],[y] ]);
		}
		data.push(mini);
	}
}

function expGauss(x) {
	return Math.exp(-Math.PI*x*x);
}
function cosSqrd(x) {
	return 0.5*(Math.cos((Math.PI*x)**2)+1);
}

function addNeuron() {
	if (num_neurons < 25) {
		num_neurons++;
		initLayers();
		counter = 0;
		costs = [];
		draw();
	} else {
		console.log('u tryna kill yr browser?')
	}
}
function removeNeuron() {
	if (num_neurons > 1) {
		num_neurons--;
		initLayers();
		counter = 0;
		costs = [];
		draw();
	} else {
		console.log('...')
	}
}

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

// good ol fisher-yates
function shuffleData() {
	let j = -1;
	let n = data.length;
	let temp;
	for (let i = 0; i<n-1; i++) {
		j = i + Math.floor(Math.random()*(n-i));
		temp = data[i];
		data[i] = data[j];
		data[j] = temp;
	}
}


// var network, data, test;
// var counter;
// var costs, test_accuracy;
// var num_batches, batch_size;
// var train_button, new_weights_button;
// var currently_training;
// var done_training;
// var ouput_colors, weight_colors;

// function preload() {
// 	// just because they come from library from 
// 	// somewhere far away in the internet
// 	ouput_colors = d3.interpolatePuBu;//interpolateRdYlBu;
// 	weight_colors = d3.interpolateRdYlGn;
// }


// function setup() {
// 	var cv = createCanvas(500, 500);
// 	cv.parent('backprop-example');

// 	network = new NeuralNet([
// 		{size:2}, // input layer has no activation function. I guess f(x) = x... 
// 		{size:2, activation:'sigmoid'},
// 		{size:1, activation:'sigmoid'}
// 	]);

// 	currently_training = false;
// 	network.initializeWeights();
// 	counter = 0;
// 	costs = [];

// 	train_button = createButton('start/stop training');
// 	train_button.parent('train-button');
// 	train_button.mousePressed(startTraining);

// 	new_weights_button = createButton('reset network');
// 	new_weights_button.parent('reset-button');
// 	new_weights_button.mousePressed(resetNetwork);

// 	data = [];

// 	num_batches = 800;
// 	batch_size = 500;
// 	let x,y;
// 	for (let j = 0; j<num_batches; j++) {
// 		let mini = [];
// 		for (let i = 0; i<batch_size; i++) {
// 			x = int(Math.random()+0.5);
// 			y = int(Math.random()+0.5);

// 			mini.push( [ [x,y], [(x === y)?0:1] ] );
// 		}
// 		data.push(mini);
// 	}

// 	frameRate(200);
// 	noLoop();
// 	draw();

// 	textAlign(LEFT, CENTER);
// }

// //shlasb
// function draw() {
// 	background(120);

// 	if (currently_training && counter < data.length) {
// 		// returns the loss for current batch
// 		costs.push( network.train(data[counter]) );
// 		counter++;
// 	}

// 	// center_x, center_y, width, height
// 	network.show(width/2, 100, 200, 50, weight_colors);


// 	stroke(255);
// 	if (costs.length > 1) {
// 		for (let i = 1; i<costs.length; i++) {
// 			line(width*(i-1)/num_batches, height - height*costs[i-1], width*i/num_batches, height - height*costs[i])
// 		}
// 	}

// 	// actual output of network
// 	stroke(0);
// 	let output;
// 	for (let i = 0; i<=5; i++) {
// 		for (let j = 0; j<=5; j++) {
// 			output = network.feedforward([i/5,j/5], true);
// 			// fill(255*output[0])
// 			fill(ouput_colors(output[0]))

// 			rect(width/2-30+i*10, height-100-j*10, 10, 10)
// 		}
// 	}

// 	// examples given
// 	fill(ouput_colors(0))
// 	rect(width/2-30, 230, 30, 30)
// 	rect(width/2, 260, 30, 30)
// 	fill(ouput_colors(1))
// 	rect(width/2, 230, 30, 30)
// 	rect(width/2-30, 260, 30, 30)
	
// 	noStroke();
// 	fill(255)
// 	text('the examples the network is given', 20, height - 300)
// 	text('the continuous function it learned', 20, height - 150)
// 	text('the network', 20, 60)
// 	text('how wrong the network is', width/2, height-20);

// 	text('min',width-30,175);
// 	text('max',width-30,85);

// 	text('fps: '+Math.round(frameRate()), 10, 10)

// 	for (let i = 0; i<10; i++) {
// 		fill(weight_colors(i/9))
// 		rect(width - 50, 170 - i*10, 10, 10);
// 	}

// 	if (counter === data.length) {
// 		// currently_training = false;
// 		// noLoop();
// 		counter = 0;
// 		costs = [];
// 	}
// }

// function resetNetwork() {
// 	network.initializeWeights();
// 	counter = 0;
// 	costs = [];
// 	draw();
// 	// loop();
// }

// function startTraining() {
// 	if (currently_training) {
// 		currently_training = false;
// 		noLoop();
// 		draw();
// 	} else {
// 		currently_training = true;
// 		loop();
// 	}
// 	// currently_training = !currently_training;
// 	if (counter === data.length) {
// 		counter = 0;
// 		costs = [];
// 	}
// 	// loop();
// }