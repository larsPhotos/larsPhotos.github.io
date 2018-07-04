var population_size;
var mutation_rate;
var boids;
var food;
var threshold;

// var max_fitness;

var epoch_length;

var generation_counter;

var num_generations;

var buffer;

var red,green;


var test_boid;
var test_layers;


var display_array;

var fitness_history;

var global_max_fitness,global_min_fitness;

var show_brains_button, show_brains_bool;
function setup() {
	var cv = createCanvas(600,600);
	cv.parent('boids');

	buffer = {
		'left':20,
		'right':20,
		'top':20,
		'bottom':20
	};

	boids = [];
	population_size = 150;

	for (let i = 0; i<population_size; i++) {
		boids.push(new SmartBoid(
			1,2,
			140,
			height/2
			// 2*buffer['left']+random(width-4*buffer['right']),
			// 2*buffer['top']+random(height-4*buffer['bottom'])
			)
		);
	}
	
	food = [];
	// 	{
	// 		x: width-100,
	// 		y: height/2
	// 		// got_eaten = false;
	// 	}
	// ];
	// 
	// 
	for (let j = 0; j<20; j++) {
		food.push({
			x: width - 80,// + random(-10,10),
			y: height/2 + (j/19)*(200) - 100,// + random(-height/4,height/4),
			got_eaten: false
		});
	}


	global_max_fitness = -1;
	global_min_fitness = 10000000;

	fitness_history = [{
		generation:0,
		// min:0,
		avg:0,
		max:0
	}];

	threshold = 6;

	// max_fitness = 0;

	textAlign(CENTER,CENTER);
	noStroke();


	mutation_rate = 0.02;
	// var child_01 = boids[0].crossover(boids[1],1);

	// console.log(boids[0]);
	// console.log(boids[1]);
	// console.log(child_01);


	// each generation is epoch_length many frames long
	epoch_length = 600;

	generation_counter = 0;
	num_generations = 0;

	red = color(255,0,0,64);
	green = color(0,255,0,64);


	// // 2 inputs, layer height of 3
	// // 2 x 3 matrix
	// // but actually a 3 x 3 matrix since we include a bias
	// let neuron1 = new Float32Array(3);
	// let neuron2 = new Float32Array(3);
	// let neuron3 = new Float32Array(3);

	// neuron1[0] = 0.8;
	// neuron1[1] = 0.2;
	// neuron1[2] = 0;

	// neuron2[0] = 0.4;
	// neuron2[1] = 0.9;
	// neuron2[2] = 0;

	// neuron3[0] = 0.3;
	// neuron3[1] = 0.5;
	// neuron3[2] = 0;

	// // 3 x 1 matrix
	// // but actually 4 x 1
	// let neuron_out = new Float32Array(4);

	// neuron_out[0] = 0.3;
	// neuron_out[1] = 0.5;
	// neuron_out[2] = 0.9;
	// neuron_out[3] = 0;


	// test_layers = [new Layer([neuron1,neuron2,neuron3]), new Layer([neuron_out])];
	// test_boid = new SmartBoid(2,1,width/2,height/2, test_layers);
	ellipseMode(RADIUS);
	frameRate(500);

	show_brains_bool = false;

	show_brains_button = createButton('show brains');
	show_brains_button.parent('show_brains')
	show_brains_button.mousePressed(show_brains);
}

// function draw() {
// 	let output = test_boid.feedforward([1,1]);
// 	test_boid.showLayers([1,1],output);
// 	test_boid.show();
// 	console.log(test_boid.neuron_layers);
// 	noLoop();
// }

function draw() {
	background(255);

	for (let i = boids.length-1; i>=0; i--) {
		let boid = boids[i];

		let min_d = 10000;
		// let min_index = -1;

		let dx, dy, d;
		for (let j = 0; j<food.length; j++) {
			// if (food.got_eaten) continue;
			dx = boid.x - food[j].x;
			dy = boid.y - food[j].y;
			d = Math.sqrt(dx*dx + dy*dy);
			d /= width;
			if (d < min_d) {
				min_d = d;
				// min_index = j;
			}
		}


		boid.show();
		// fill(0);
		// noStroke();
		// text(i,boid.x,boid.y-10)
		// text(boid.health ,boid.x, boid.y + 12)
		// text(boid.age ,boid.x, boid.y + 24)

		if (boid.is_alive) {
			
			boid.move([2*boid.x/width-1], show_brains_bool); //false)//, true);

			if (min_d < threshold) {

				boid.gotHealth(1000);
				// if (boid.health > max_fitness) {
				// 	max_fitness = boid.health;
				// 	stroke(20,128,255)
				// 	noFill();
				// 	ellipse(boid.x, boid.y, 15,15)
				// }

				// food[min_index].x = random(width);
				// food[min_index].y = random(height);
				// food[min_index].got_eaten = true;
			} 
			else {
				if (boid.age % 40 === 0) {
					boid.lostHealth(1);
				}
			}
		}
	}

	fill(255,127,0);
	for (let j = 0; j<food.length; j++) {
		ellipse(food[j].x, food[j].y, threshold, threshold);
		// if (food[j].got_eaten) {
		// 	food[j].x = width - 80,//width - 2*buffer['right'] + random(-10,10),
		// 	food[j].y = height/4 + j*height/199,//height/2 + random(-height/4,height/4),
		// 	food[j].got_eaten = false
		// }
	}

	fill(0);
	text('generation\t'+num_generations+'\ncount\t'+generation_counter,50,10);

	if (generation_counter > 0) {
		for (let d in display_array) {
			text(display_array[d].ind+'\t'+display_array[d].val.toFixed(3),width - 150, 50 + 10*d);
		}

		noFill();
		stroke(0);
		let l = fitness_history.length;
		for (let g in fitness_history) {
			if (g >= 1) {
				let x1 = floor(width*(g-1)/l);
				let x2 = floor(width*(g)/l);
				let hght = height/2;
				// line(width*x1, (height/2)*fitness_history[g-1].min,
				// 	width*x2, (height/2)*fitness_history[g].min);
				line(x1, height - hght*fitness_history[g-1].max/global_max_fitness,
					x2, height - hght*fitness_history[g].max/global_max_fitness);
				line(x1, height - hght*fitness_history[g-1].avg/global_max_fitness,
					x2, height - hght*fitness_history[g].avg/global_max_fitness);
			}
		}
		noStroke();
	}


	if (generation_counter < epoch_length) {
		generation_counter++;
	} else {
		boids = naturalSelection();
		generation_counter = 0;
		num_generations++;
		// max_fitness = 0;

	}
};

function naturalSelection() {
	let mating_pool = new Float32Array(boids.length);
	let sum = 0.0;

	let max_fitness = 0.0;
	// let min_fitness = 100000;

	let h;
	for (let index in boids) {
		let h = 20*boids[index].health + 0.100000*boids[index].age;
		mating_pool[index] = h;

		if (h > max_fitness) {
			max_fitness = h;
		}
		// if (h < min_fitness) {
		// 	min_fitness = h;
		// }
		sum += h;
	}

	fitness_history.push({
		generation: generation_counter,
		// min: min_fitness,
		avg: sum/boids.length,
		max: max_fitness
	});

	if (max_fitness > global_max_fitness) {
		global_max_fitness = max_fitness;
	}

	// if (min_fitness < global_min_fitness) {
	// 	global_min_fitness = min_fitness;
	// }

	// display
	display_array = [];

	for (let index in boids) {
		mating_pool[index]/= sum;
		if (mating_pool[index]>0.02) display_array.push({ind:index,val:mating_pool[index]});
	}
	display_array.sort(function(a,b){return b.val - a.val});


	let new_boids = [];
	// create new generation
	for (let i = 0; i<3*boids.length/4; i++) {
		let parent1_index = weightedChoice(mating_pool);
		let parent2_index = weightedChoice(mating_pool);
		// can mate with themselves
		// while (parent2_index === parent1_index) {
		// 	parent2_index = weightedChoice(mating_pool);
		// }

		let child = boids[parent1_index].crossover(boids[parent2_index]);
		child.mutate(mutation_rate);
		new_boids.push(child);
	}
	while (new_boids.length < population_size) {
		new_boids.push(new SmartBoid(1,2,100,height/2));
	}
	// console.log('generation size');
	// console.log(new_boids.length)
	return new_boids;
};

function weightedChoice(probabilities) {
	let index = 0;
	let r = Math.random();

	while (r > 0) {
		r -= probabilities[index];
		index++;
	}
	return index-1;
}

function show_brains() {
	show_brains_bool = !show_brains_bool;
}