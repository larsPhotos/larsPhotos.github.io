var network, data, test;
var counter;
var costs, test_accuracy;
var num_batches, batch_size;
var train_button, reset_button;
var currently_training;
var done_training;
var ouput_colors, weight_colors;
var display_increment;
function preload() {
	// just because they come from library from 
	// somewhere far away in the internet
	ouput_colors = d3.interpolatePuBu;//interpolateRdYlBu;
	weight_colors = d3.interpolateRdYlGn;
}


function setup() {
	var cv = createCanvas(500, 500);
	cv.parent('backprop-example');

	network = new NeuralNet([
		{size:2},
		// {size:2, activation:'sigmoid'},
		{size:5, activation:'sigmoid'},
		{size:1, activation:'sigmoid'}
	], 'crossEntropy');

	currently_training = false;
	network.initializeWeights();

	counter = 0;
	costs = [];
	display_increment = 1;

	train_button = createButton('start/stop training');
	train_button.parent('train-button');
	train_button.mousePressed(startTraining);

	reset_button = createButton('new network');
	reset_button.parent('reset-button');
	reset_button.mousePressed(resetNetwork);

	data = [];

	num_batches = 20;
	batch_size = 500;
	let x,y;
	for (let j = 0; j<num_batches; j++) {
		let mini = [];
		for (let i = 0; i<batch_size; i++) {
			x = int(Math.random()+0.5);
			y = int(Math.random()+0.5);

			mini.push( [ [x,y], [(x === y)?0:1] ] );
		}
		data.push(mini);
	}

	frameRate(200);
	noLoop();
	draw();

	textAlign(CENTER, CENTER);
}

//shlasb
function draw() {
	background(120);

	if (currently_training && counter < data.length) {
		// returns the loss for current batch
		costs.push( network.train(data[counter], 0.05) );
		counter++;
	}

	// center_x, center_y, width, height
	network.show(width/2, 125, 200, 100, 10, weight_colors);


	stroke(255);
	if (costs.length > 1) {
		if (costs.length%100 === 0) {
			display_increment++;
		}
		let x1,y1,x2,y2;
		for (let i = display_increment; i<costs.length; i+=display_increment) {
			x1 = width*(i-display_increment)/(costs.length-display_increment);
			y1 = height - height*costs[i-display_increment];
			x2 = width*i/(costs.length-display_increment);
			y2 = height - height*costs[i];
			if (y1<0) y1 = 0;
			if (y2<0) y2 = 0;
			// line(width*(i-1)/num_batches, height - height*costs[i-1], width*i/num_batches, height - height*costs[i])
			line(x1, y1, x2, y2);
		}
	}
	line(0,height*0.9,width,height*0.9)

	line(10,20,10,height)
	line(5,height/4,15,height/4)
	line(5,height/2,15,height/2)
	line(5,3*height/4,15,3*height/4)


	// actual output of network
	stroke(0);
	let output;
	for (let i = 0; i<=5; i++) {
		for (let j = 0; j<=5; j++) {
			output = network.feedforward([i/5,j/5], true);
			fill(ouput_colors(output[0]))

			rect(width/2-30+i*10, height-100-j*10, 10, 10)
		}
	}

	// examples given
	fill(ouput_colors(1))
	rect(width/2-30, 230, 30, 30)
	rect(width/2, 260, 30, 30)
	fill(ouput_colors(0))
	rect(width/2, 230, 30, 30)
	rect(width/2-30, 260, 30, 30)
	
	noStroke();
	fill(255)
	text('the examples the network is given', width/2, height - 280)
	text('the continuous function it learned', width/2, height - 160)
	text('the network', width/2, 50)
	text('loss per epoch\naka how wrong the network is', width/2, height-30);

	text(network.min_weight.toFixed(2),width-25,175);
	text(network.max_weight.toFixed(2),width-25,85);

	text('fps: '+Math.round(frameRate()), 20, 10)
	text('Cost/epoch',50, 50)
	text('0.75',35, height/4)
	text('0.5',35, height/2)
	text('0.25',35, 3*height/4)

	for (let i = 0; i<10; i++) {
		fill(weight_colors(i/9))
		rect(width - 50, 170 - i*10, 10, 10);
	}

	if (counter === data.length) {
		counter = 0;
		shuffleData();
	} else if (costs[costs.length-1] < 0.1) {
		currently_training = false;
		noLoop();
	}
}

function resetNetwork() {
	network.initializeWeights();
	counter = 0;
	costs = [];
	display_increment = 1;
	if (!currently_training) draw();
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

	if (counter === data.length) {
		counter = 0;
		// costs = [];
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