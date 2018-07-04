var voting_data_table, weight_colors;
var num_rows;
var training, testing;
var network;

var train_index;
var current_session, max_sessions;

var costs;
// var inaccuracy;
var accuracy;
function preload() {
	weight_colors = d3.interpolateRdYlBu;
	voting_data_table = loadTable("../../../../data/voting-data.tsv", "tsv", "header");
}
function setup() {
	var cv = createCanvas(500,500);
	cv.parent('voting');

	num_rows = voting_data_table.getRowCount();
	// console.log(voting_data_table.getString(0,2));

	let batch_size = 30;
	training = [];
	testing = [];
	let mini = new Array(batch_size);
	// batch size: 10;
	let current_batch = 0;
	let current_index = 0;

	let voting_pattern, party;
	let vote_string, party_string;

	let first_iter = true;

	for (let i = 0; i<num_rows; i++) {

		// [ 
		// 		[
		// 			 + - . 
		// 			[1,0,-1,0,0,1],
		// 			 D R
		// 			[0,1]
		// 		],
		// 	...,
		// 		[
		// 			[1,0,0,0,0,-1],
		// 			[1,0]
		// 		]
		// 	]

		vote_string = voting_data_table.getString(i,2);
		party_string = voting_data_table.getString(i,1);

		voting_pattern = [];

		for (let j = 0; j<10; j++) {
			if (vote_string[j] === '+') {
				voting_pattern.push(1);
			} else if (vote_string[j] === '-') {
				voting_pattern.push(0);
			} else {
				voting_pattern.push(-1);
			}
		}

		party = (party_string === 'D')?[1,0]:[0,1];

		if (Math.random()<0.8) {

			if (!first_iter && current_index % batch_size === 0) {
				training.push(mini);
				mini = new Array(batch_size);
				current_batch++;
				current_index = 0;
			}

			mini[current_index] = [voting_pattern, party];

			current_index++;
			first_iter = false;

		} else {
			testing.push([voting_pattern, party]);
		}
	}

	network = new NeuralNet([
		{size:10},
		// {size:5, activation:'tanh'},
		// {size:10, activation:'relu'},
		{size:5, activation:'sigmoid'},
		{size:2, activation:'softmax'}
	], 'logLikelihood');

	network.initializeWeights();

	train_index = 0;

	current_session = 0;
	max_sessions = 5;

	costs = [];
	// inaccuracy = [];
	accuracy = [];

	textAlign(CENTER,CENTER);
}

function draw() {
	background(120);
	costs.push(network.train(training[train_index], 0.01));
	// inaccuracy.push(calculateInaccuracy());
	accuracy.push(calculateAccuracy());
	if (train_index < training.length -1) {
		train_index++;
	} else {
		if (current_session < max_sessions) {
			current_session++;
			train_index = 0;
			shuffleData();
		} else {
			noLoop();
		}
	}
	// console.log(calculateAccuracy());
	network.show(width/2, 120, 350, 200, 10, weight_colors);
	if (costs.length > 1) {
		let x1,y1,x2,y2;
		let y3,y4;
		let dx = width/(costs.length-1);
		for (let i = 0; i<costs.length; i++) {
			x1 = i*dx - dx;
			x2 = i*dx;

			y1 = height - height*costs[i-1];
			y2 = height - height*costs[i];

			// y3 = height - height*inaccuracy[i-1];
			// y4 = height - height*inaccuracy[i];
			y3 = height - height*accuracy[i-1];
			y4 = height - height*accuracy[i];
			stroke(255);
			line(x1,y1,x2,y2);
			stroke(255,100,100);
			line(x1,y3,x2,y4);
		}
	}
	noStroke();
	fill(255)
	text(frameRate().toFixed(2),30,10)
}

// good ol fisher-yates
function shuffleData() {
	let j = -1;
	let n = training.length;
	let temp;
	for (let i = 0; i<n-1; i++) {
		j = i + Math.floor(Math.random()*(n-i));
		temp = training[i];
		training[i] = training[j];
		training[j] = temp;
	}
}

function calculateAccuracy() {
	let num_correct = 0;
	let test_length = testing.length;
	let output;// = network.feedforward(testing[0][0], true);
	// console.log(output);
	// console.log(testing[0][1]);
	let output_ind = -1;
	let testing_ind = -1;
	for (let i = 0; i<test_length; i++) {
		output = network.feedforward(testing[i][0], true);
		output_ind = max_activation(output);
		testing_ind = max_activation(testing[i][1]);
		// console.log(testing[i][1][testing_ind] - output[output_ind])
		if (testing_ind === output_ind) {
			num_correct++;
		}
	}
	return num_correct/test_length;
}

function calculateInaccuracy() {
	let num_incorrect = 0;
	let test_length = testing.length;
	let output;// = network.feedforward(testing[0][0], true);
	// console.log(output);
	// console.log(testing[0][1]);
	for (let i = 0; i<test_length; i++) {
		output = network.feedforward(testing[i][0], true);
		if (max_activation(testing[i][1]) === max_activation(output)) num_incorrect++;
	}
	return num_incorrect/test_length;
}

function max_activation(vector) {
	let max = -1;
	let i = -1;
	for (let j = 0; j<vector.length; j++) {
		if (vector[j] > max) {
			max = vector[j];
			i = j;
		}
	}
	if (vector[i]<vector[1-i]) {
		console.log('u fuked up')
	}
	return i;
}