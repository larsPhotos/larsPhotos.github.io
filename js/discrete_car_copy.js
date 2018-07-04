var max_N = 130;
var interval_N = 5;
var cars;
var N = 10;
var L = 300;
var ro = N/L;
var prob_slowdown = 0.1;
var car_gap = 1;
var v_max = 5;
var time = 0;
var t_0 = 0;
var num_iterations = 300;
var current_iteration = 0;
var avg_flow;
var stats;

function setup() {
	var cv = createCanvas(L,num_iterations)
	cv.parent('cars')

	reset_sim();

	textAlign(CENTER, CENTER);
	noFill();
	colorMode(HSB);
	background(255);
	stroke(0);
	strokeWeight(4);
	avg_flow = 0;

	stats = new Array(max_N/interval_N)
}

function draw() {
	time++;

	for (var i = 0; i<cars.length; i++) {
		if (cars[i]) {
			stroke(255*cars[i].id/N, 255, 255);
		}
		else {
			stroke(200);
		}
		point(i, time);
	}

	if (time < num_iterations+t_0) {
		update();
	} else {
		avg_flow/=num_iterations;

		stats[current_iteration] = {n: N, flow: avg_flow, percent: 0}
		current_iteration++;

		avg_flow = 0;
		time = 0;
		if (N < max_N) {
			N += interval_N;
			reset_sim();
		} else {

			stroke(255)
			for (var i = 0; i<width*height; i++) point(i%width, floor(i/width))

			for (var i = 0; i<stats.length; i++) {
				stroke(stats[i].percent*255, 255, 255);
				point(width*stats[i].n/L, height/2 - height*stats[i].flow/2);
				point(width*stats[i].n/L, height - height*stats[i].flow/(2*v_max*stats[i].n/L));
			}

			for (var r = 1; r<10; r++) {
				var x = r*width/10;
				stroke(0);
				noFill();
				line(x, height, x, height-10);
				noStroke();
				fill(0);
				text(r/10, x, height-15)
			}

			noLoop();
		}
	}
}

function update() {
	var temp_cars = new Array(cars.length);

	for (var i = 0; i<cars.length; i++) {
		if (cars[i]) {
			var next = undefined;
			for (var j = i+1; j<cars.length; j++) {
				if (cars[j]) {
					next = j-i;
					break;
				}
			}
			if (next === undefined) {
				next = cars.length - i;
				for (var j = 0; j<i; j++) {
					if (cars[j]) {
						next += j;
						break;
					}
				}
			}

			temp_cars[i] = {vel:cars[i].vel, id: cars[i].id}

			if (cars[i].vel + car_gap - 1 < v_max && next > cars[i].vel + car_gap) {
				temp_cars[i].vel++
			}

			if (next <= cars[i].vel) {

				temp_cars[i].vel = next - car_gap;

				if (temp_cars[i].vel < 0) temp_cars[i].vel = 0;
			}
			if (temp_cars[i].vel > 0 && Math.random() < prob_slowdown) {
				temp_cars[i].vel--;
			}
		}
	}

	for (var i = 0; i<cars.length; i++) cars[i] = undefined;
	for (var i = 0; i<cars.length; i++) {
		if (temp_cars[i]) {
			var new_pos = i + temp_cars[i].vel;
			if (time > t_0 && i <= L/2 && new_pos > L/2) {
				if (temp_cars[i].vel>0) avg_flow++;
			}
			var new_index = (new_pos < cars.length)? new_pos: new_pos-cars.length;
			cars[new_index] = {vel: temp_cars[i].vel, id: temp_cars[i].id}
		}
	}
}

function reset_sim() {
	cars = new Array(L);
	// number of self-driving cars
	// var num_selfDriving = Math.floor(N*percent_selfDriving);
	// var counter = num_selfDriving;

	for (var j = 0; j<N; j++) {
		var index = Math.floor(Math.random()*L);
		while (cars[index]) {
			index = Math.floor(Math.random()*L);
		}
		cars[index] = {vel: 0, id: j}
		// if (counter>0)counter--;
	}
}
