var max_samples, current;
var points;
var buffer;
var aesthetic;

// var adam_images = ["coast.jpg", "obelisk.jpg", "falls.jpg", "kitty.jpg", "turing.jpg"];
// ---
// layout: post
// title: "Pointillism"
// date: 2017-08-28
// ---

function preload () {
	// let choice = adam_images[Math.floor(Math.random()*adam_images.length)];
	// aesthetic = 
	// loadImage("https://mymodernmet.com/wp/wp-content/uploads/2018/01/pointillism-4.jpg");
	// loadImage("http://mathcs.pugetsound.edu/~aasmith/coast.jpg");
	aesthetic = loadImage("/data/steve_martin.jpg")
	
	// loadImage("https://mymodernmet.com/wp/wp-content/uploads/2018/01/pointillism-4.jpg", function(img) {
	// 	aesthetic = img;
	// });
}

function setup() {





	console.log('setup')
	var cnv = createCanvas(aesthetic.width,aesthetic.height);
	cnv.parent("mitchell");

	max_samples = 8;
	points = [];
	points[0] = {
		x: width/2,
		y: height/2,
		r: 0,
		ind:0
	}
	current = 1;

	buffer = 5;
	noStroke();
	for (let k = 1; k<900; k++) {
		points[k] = mitchells_best();
	}
	ellipseMode(RADIUS);
}

function draw() {
	background(255);
	// stroke(0)
	// if (current < 600) {
	// 	points[current] = mitchells_best();
	// 	current++;
	// } else {
	// 	noLoop();
	// }

	var r, c;
	for (var k = 1; k<points.length; k++) {
		c = aesthetic.get(points[k].x,points[k].y);
		fill(c)
		r = 2 + 2*(c[0]+c[1]+c[2])/765; 
		// points[k].r
		// points[points[k].ind].r - points[k].r;//Math.sqrt(points[k].r);//random(30)+10
		// if (r < 0) {
		// 	r = 1
		// }
		ellipse(points[k].x, points[k].y, r, r);
		// line(points[k].x, points[k].y, points[points[k].ind].x, points[points[k].ind].y)
		// console.log(points[k].ind === k)
	}
	noLoop();
}

function mitchells_best() {
  let best_x = -1;
  let best_y = -1;
  let best_dist = -1;
  let tx,ty,dist;
  let tindex
  let dx,dy,d;
  let index;
  for (let j = 0; j<max_samples; j++) {
    tx = buffer + Math.random()*(width - 2*buffer);
    ty = buffer + Math.random()*(height - 2*buffer);
    dist = Infinity;

    for (let k = 0; k<points.length; k++) {
      dx = tx - points[k].x;
      dy = ty - points[k].y;
      d = dx*dx + dy*dy;
      if (d < dist) {
        dist = d;
        tindex = k
      }
    }

    if (dist > best_dist) {
      best_x = tx;
      best_y = ty;
      best_dist = dist;
      index = tindex;
    }
  }// end j
  // return {x: best_x, y:best_y, r: Math.sqrt(best_dist) - points[index].r, ind: index};
  return {x: best_x, y:best_y, ind: index};
}