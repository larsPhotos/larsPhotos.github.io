var points, centroids, num, k;
var voronoi, diagram, edges;
function setup() {
	var cv = createCanvas(700,500)
	cv.parent('k_means')

	num = 300
	k = 5

	points = []
	for (var i = 0; i<num/k; i++) {
		var u = Math.random()
		var v = Math.random()
		points[i] = {
			// box-muller transform
			x: width*u,
			// (Math.random()>0.5)? 20+width*u/3: width -20- width*u/3,
			//width/2 + width*Math.cos(2*Math.PI*v) * Math.sqrt( -2*Math.log(u) )/3,
			y: height*v,
			// (Math.random()>0.5)? 20+height*v/3: height -20- height*v/3,
			//height/2 + height*Math.sin(2*Math.PI*v) * Math.sqrt( -2*Math.log(u) )/3,
			label: 0
		}
	}

	centroids = []
	for (var j = 0; j<k; j++) {
		centroids[j] = {
			x: Math.random()*width,
			y: Math.random()*height,
			label: j
		}
	}

	voronoi = new Voronoi()

	colorMode(HSB, 255)
	noFill()
}

function draw() {
	background(250,255)
	for (var i = 0; i<points.length; i++) {
		strokeWeight(5)
		stroke(170*points[i].label/k, 255, 255)
		point(points[i].x, points[i].y)
	}
	for (var j = 0; j<centroids.length; j++) {
		strokeWeight(2)
		stroke(170*j/k, 255, 255)
		ellipse(centroids[j].x, centroids[j].y, 10, 10)
	}
			var sites = []
		for (var j = 0; j<centroids.length; j++) {
			sites[j] = {
				x: centroids[j].x,
				y: centroids[j].y
			}
		}
		diagram = voronoi.compute(sites, {xl: 0, xr: width, yt: 0, yb: height})
		edges = diagram.edges

		stroke(0)
		for (var j = 0; j<edges.length; j++) {
			var x1 = edges[j].va.x
			var y1 = edges[j].va.y
			var x2 = edges[j].vb.x
			var y2 = edges[j].vb.y
			if (!(x1>width&&x2>width)&&!(x1<0&&x2<0)&&!(y1>height&&y2>height)&&!(y1<0&&y2<0)&&!(x1===x2) && !(y1==y2)) {
				line(x1, y1, x2, y2)
			}
		}
	if (frameCount < 300) {
		if (frameCount%15==0) update()
	} else {
		noLoop()
	}
}

function update() {
	for (var i = 0; i<points.length; i++) {
		var minDist = Infinity
		var minLabel = -1
		for (var j = 0; j<centroids.length; j++) {
			var d = distance(points[i], centroids[j])
			if (d < minDist) {
				minDist = d
				minLabel = j
			}
		}
		points[i].label = minLabel
	}
	var counts = []
	for (var j = 0; j<centroids.length; j++) {
		counts[j] = 0
		centroids[j].x = 0
		centroids[j].y = 0
		for (var i = 0; i<points.length; i++) {
			if (points[i].label == j) {
				counts[j]++
				centroids[j].x += points[i].x
				centroids[j].y += points[i].y
			}
		}
	}

	for (var j = 0; j<centroids.length; j++) {
		centroids[j].x/=counts[j]
		centroids[j].y/=counts[j]
	}
}

function distance(node1, node2) {
	var dx = node1.x - node2.x
	var dy = node1.y - node2.y
	return dx*dx + dy*dy
}