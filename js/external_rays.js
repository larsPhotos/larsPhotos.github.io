var R, D, S
var points = []
var log2
var center_x,center_y
var scale
var dt
var m
function setup() {
	var cv = createCanvas(500,500)
	cv.parent('mandelbrot')

	// R = 5
	// D = 5
	// S = 5
	
	center_x = 0//-0.7//-0.875
	center_y = 0
	scale = 2

	log2 = Math.log(2.0)

	dt = 0.03125//0.0625

	colorMode(HSB, 255)

	background(0)
	stroke(255)

	m = 101//89

	for (var i = 0; i<m; i++) {
		points[i] = {
			// x: 2*Math.cos(TWO_PI*i/m),
			// y: -2*Math.sin(TWO_PI*i/m)
			x: 2*Math.cos(PI*Math.sin(TWO_PI*i/m)),
			y: -2*Math.sin(PI*Math.sin(TWO_PI*i/m))
		}
	}
}

function draw() {

	// background(127)

	// for (var l = 0; l<theta.length; l++) {
	// 	var c_init = {
	// 		x: R*Math.cos(TWO_PI*theta[l]),
	// 		y: R*Math.sin(TWO_PI*theta[l])
	// 	}

	// 	var c_iter = c_init

	// 	var r,t
	// 	var p_k
	// 	var cos_k, sin_k
	// 	var approx
	// 	for (var k = 1; k <= D; k++) {
	// 		p_k = Math.pow(2, k)
	// 		cos_k = Math.cos(TWO_PI * p_k)
	// 		sin_k = Math.sin(TWO_PI * p_k)
	// 		for (var j = 1; j <= S; j++) {
	// 			// r = Math.pow(R, Math.pow(2, -k + 1 - j/S))
	// 			r = Math.pow(R, Math.pow(2, k*(1-S)+S-j))
	// 			// console.log('r '+r)
	// 			t = {
	// 				x: r * cos_k,
	// 				y: r * sin_k
	// 			}
	// 			approx = newton(t, c_iter, 8)

	// 			console.log(l+' '+k+' '+j+' '+approx.x+' '+approx.y)

	// 			c_iter = approx
	// 			fill(255)
	// 			point(width/2 + approx.x*10, height/2 - approx.y*10)
	// 		}
	// 	}
	// }

	// fill(255)
	// ellipse(width/2 + )
	
// var m = 200

// var x,y,cx,cy
// var g
// var c
// 	for (var i = 0; i<width*height; i++) {
// 		x = i%width
// 		y = floor(i/width)
// 		cx = scale*(2*x/width - 1) + center_x
// 		cy = scale*(2*y/height - 1) - center_y
// 		g = getGradient({x:cx,y:cy})
// 			if (!(isNaN(g.x) || isNaN(g.y))) {
// 				c = 
// 				// color(255*atan2(g.y, g.x)/TWO_PI)//, 255, 255)
// 				color(255*sqrt(modulus_squared(g))*2)//, 255, 255)
// 				set(x,y,c)
// 			} else {
// 				set(x,y,0)
// 			}
// 	}
// 	updatePixels()
	

	// for (var i = 0; i<m; i++) {
	// 	x = 2*i/m - 1
	// 	cx = scale*(2*x - 1) + center_x
	// 	for (var j = 0; j<m; j++) {
	// 		y = 2*j/m - 1
	// 		cy = scale*(2*y - 1) - center_y
	// 		g = getGradient({x:cx,y:cy})
	// 		if (!(isNaN(g.x) || isNaN(g.y))) {
	// 			stroke(255*sqrt(modulus_squared(g)), 255, 255)
	// 			line(x*width, y*height, x*width+10*g.x, y*height+10*g.y)
	// 		}
	// 	}
	// }

	
	// strokeWeight(2)
	// stroke(255)


	var iters = 1000

	var p;
	for (let j = 0; j<points.length; j++) {
		p = points[j]
		for (let i = 0; i<iters; i++) {
			stroke(170*i/iters,255,255);
			x = width*((p.x - center_x)/scale + 1)/2
			y = height*((p.y + center_y)/scale + 1)/2
			g = getGradient(p)
			cx = width*((p.x-g.x*dt - center_x)/scale + 1)/2
			cy = height*((p.y-g.y*dt + center_y)/scale + 1)/2

			line(x,y,cx,cy)

			p.x -= g.x*dt
			p.y -= g.y*dt
		}
	}


	// updatePixels();
	noLoop()
}

function getGradient(c) {
	let z = {
		x: 0,
		y: 0
	}

	let dz = {
		x: 0,
		y: 0
	}

	let temp = 0

	let n = 0

	while (modulus_squared(z) < 10000 && n <100) {
		temp = 2.0*(z.x*dz.x - z.y*dz.y) + 1;
		dz.y = 2.0*(z.x*dz.y + z.y*dz.x);
		dz.x = temp;

		temp = z.x*z.x - z.y*z.y + c.x;
		z.y = 2.0*z.x*z.y + c.y;
		z.x = temp;

		n++;
	}

	let length = Math.sqrt(modulus_squared(z))

	let m = n + 1 - Math.log(Math.log(length))/log2;

	let f = Math.pow(2.0, -m);

	let dx = 0.5*(z.x*dz.x + z.y*dz.y);

	let dy = 0.5*(z.y*dz.x - z.x*dz.y)


	let den = length*length*Math.log(length)
	return {
		x: f*dx/den,
		y: f*dy/den
	} 
}


function newton(t, c_init, n) {
	// console.log('c '+c_init.x+' '+c_init.y)
	let c = {
		x: c_init.x,
		y: c_init.y
	}
	let z = {
		x: c.x,
		y: c.y
	}
	let dz = {
		x: 1,
		y: 0
	}

	let z_new, dz_new

	for (let i = 0; i<n; i++) {
		c = subtract(c, divide(subtract(z, t), dz))
		// console.log(i+' '+c.x+' '+c.y)
		z_new = add_c(square(z), c)
		dz_new = add_r(multiply_r(multiply_c(dz, z), 2), 1)

		z = z_new
		dz = dz_new
	}

	return c
}

function add_c(z, w) {
	return {
		x: z.x + w.x,
		y: z.y + w.y
	}
}

function add_r(z, r) {
	return {
		x: z.x + r,
		y: z.y
	}
}

function subtract(z, w) {
	return {
		x: z.x - w.x,
		y: z.y - w.y
	}
}

function square (z) {
	return {
		x: z.x*z.x - z.y*z.y,
		y: 2*z.x*z.y
	}
}

function multiply_c(z, w) {
	return {
		x: z.x*w.x - z.y*w.y,
		y: z.x*w.y + z.y*w.x
	}
}

function multiply_r(z, r) {
	return {
		x: z.x*r,
		y: z.y*r
	}
}

function divide(z, w) {
	var m = modulus_squared(w)
	return {
		x: (z.x*w.x + z.y*w.y)/m,
		y: (z.y*w.x - z.x*w.y)/m
	}
}

function modulus_squared(z) {
	return z.x*z.x+z.y*z.y
}

function cubehelix(lambda, s, r) {
	if (lambda >= 1) return color(255);

	let amp = lambda*(1-lambda)/2;
	let phi = 2*PI*(s/3 + r*lambda);

	let red = lambda + amp*(-0.14861*cos(phi) + 1.78277*sin(phi));
	let green = lambda + amp*(-0.29227*cos(phi) -0.90649*sin(phi));
	let blue = lambda + amp*(1.97294*cos(phi));
	return color(red*255, green*255, blue*255);
}