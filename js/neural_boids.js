var population_size;
var mutation_rate;
var crossover;
var boids;
var food;
var threshold;
function setup() {
	var cv = createCanvas(600,300);
	cv.parent('boids');

	boids = [];

	for (let i = 0; i<10; i++) {
		boids[i] = new SmartBoid(1,2,50,height/2);
	}
	
	food = [];
	for (let j = 0; j<30; j++) {
		food.push({
			x: Math.random()*width,
			y: Math.random()*height,
			got_eaten: false
		});
	}

	threshold = 10;

	textAlign(CENTER,CENTER);
	noStroke();
}

function draw() {
	background(255);

	for (let i = boids.length-1; i>=0; i--) {
		let boid = boids[i];

		let min_d = 10000;
		let min_index = -1;

		let dx, dy, d;
		for (let j = 0; j<food.length; j++) {
			if (food.got_eaten) continue;
			dx = boid.x - food[j].x;
			dy = boid.y - food[j].y;
			d = Math.sqrt(dx*dx + dy*dy);
			if (d < min_d) {
				min_d = d;
				min_index = j;
			}
		}

		boid.show();

		boid.move([min_d], true);


		if (min_d < threshold) {

			boid.gotHealth(10);

			// food[min_index].x = random(width);
			// food[min_index].y = random(height);
			food[min_index].got_eaten = true;
		} else {
			if (frameCount % 60 === 0) {
				boid.lostHealth(1);
			}
		}
		if (!boid.is_alive) {
			boids.splice(i,1);
		}
	}

	fill(255,127,0);
	for (let j = 0; j<food.length; j++) {
		ellipse(food[j].x, food[j].y, 5, 5);
		if (food[j].got_eaten) {
			food[j].x = Math.random()*width;
			food[j].y = Math.random()*height;
			food[j].got_eaten = false;
		}
	}

	if (frameCount > 400) noLoop();
	// if (boid.x < 0 || boid.x > width || boid.y < 0 || boid.y > height) {
	// 	text('outside of window', width/2, height/2);
	// 	noLoop();
	// }
}