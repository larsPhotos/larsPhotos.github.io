---
layout: post
title: "Lloyd Relaxation"
date: 2018-01-18
---
<script src="../../../../js/d3.v4.min.js"></script>
<div style = "display: flex;justify-content: center;text-align: center;margin-below:50px;">
	<canvas width="400" height="400"></canvas>
</div>
<script>
	var canvas = d3.select("canvas").node()
		context = canvas.getContext("2d"),
		width = canvas.width,
		height = canvas.height;

	var centroids = [];

	var target = [];

	var buffer_zone = 20;

	var num_points = 200;

	let num_sample_points = 50;
	let theta = 0;


	var dt = 0.125;


	target.push([
			width/2 - 80,
			height/3
		]);
	target.push([
			width/2 + 80,
			height/3
		]);

	// create target shape
	for (let i = 0; i<num_sample_points; i++) {
		theta = Math.PI*(i+10)/(num_sample_points-1 + 20);
		// 2*Math.PI*i/(num_sample_points-1);
		target.push([
				// infinity
				// width/2 + 350*Math.cos(theta),
				// height/2 - 150*Math.sin(2*theta)
				
				// smiley face
				width/2 + 120*Math.cos(theta),
				height/2 + 100*Math.sin(theta)
			])
	}

	// let u1,u2,theta,r;
	var sites = d3.range(num_points)
		.map(function(d) {

			return [15 + Math.random()*(width-30), 20 + Math.random()*(height-40)]
			
			// // gaussian
			// u1 = Math.random();
			// u2 = Math.random();
			// theta = Math.PI*2*u2;
			// r = Math.sqrt(-Math.log(u1*u1))
			// return [80 + r*Math.cos(theta) * 20, height - 100 - r*Math.sin(theta) * 40];
		});
	redraw(0);

	d3.timer(function(t0) {
		let f1_x, f1_y, f2_x, f2_y;
		let clsst;
		closest_points = [];
		for (let j = 0, l = sites.length; j<l; j++) {
			// normal lloyd relaxation
			f1_x = (centroids[j][0] - sites[j][0]);
			f1_y = (centroids[j][1] - sites[j][1]);


			// density.
			clsst = closestPair(sites[j]);
			
			if (clsst) {
				f2_x = 0.125*(clsst[0] - sites[j][0]);
				f2_y = 0.125*(clsst[1] - sites[j][1]);
			} else {
				f2_x = 0;
				f2_y = 0;
			}
			sites[j][0] += (f1_x + f2_x)*dt;
			sites[j][1] += (f1_y + f2_y)*dt;
		}

		redraw(t0);
		return t0 > 10;
	});


	// find the closest point in the target shape
	function closestPair(arr) {
		let min_dist = Infinity;
		let min_pair;
		let dist = -1;

		for (let index in target) {
			dist = distance(target[index], arr);
			if (dist < min_dist) {
				min_dist = dist;
				min_pair = target[index];
			}
		}
		if (min_dist < buffer_zone*buffer_zone) return null;
		else return min_pair;
	}

	function distance(p1, p2) {
		let dx = p1[0] - p2[0];
		let dy = p1[1] - p2[1];
		return dx*dx + dy*dy;
	}


	// compute voronoi diagram
	// draw circles
	function redraw(t) {
		context.lineWidth = 2;

		var voronoi = d3.voronoi()
			.extent([[-5, -5], [width + 5, height + 5]]);

		var diagram = voronoi(sites),
			// links = diagram.links(), // for delaunay
			polygons = diagram.polygons();

		context.clearRect(0, 0, width, height);


		// draw target shape
		// context.beginPath();
		// context.lineTo(target[0][0], target[0][1]);
		// for (let i = 0; i<target.length; i++) {
		// 	context.lineTo(target[i][0], target[i][1]);
		// }
		// context.strokeStyle = 'rgba(255,180,180)';
		// context.stroke();
		// context.closePath();
	
		
		let cntrd;
		centroids = [];
		// let cell_area;

		// let scale_factor = Math.sqrt(2*Math.sqrt(3)/Math.PI);
		// let radius;
		for (var i = 0; i<polygons.length; i++) {
			// draw voronoi cell
			
			// context.beginPath();
			drawCell(polygons[i]);
			context.strokeStyle = "rgba(150,220,220)";
			context.lineWidth = 5;
			context.stroke();
			// context.closePath();

			cntrd = d3.polygonCentroid(polygons[i]);
			centroids.push(cntrd);

			// cell_area = d3.polygonArea(polygons[i]);

			// radius = 0.35*scale_factor*Math.sqrt(cell_area);

			// context.beginPath();
			// context.arc(cntrd[0],cntrd[1],radius,0,2*Math.PI);
			// context.fillStyle = "rgba(150,255,150,0.6)";//color_scale[2];
			// // seizure
			// // color_scale[Math.floor(Math.random()*10)];//"red";
			// // "rgba("+
			// // 	(85+Math.random()*170)
			// // 	+', '+
			// // 	(85+Math.random()*170)
			// // 	+', '+
			// // 	(85+Math.random()*170)+')';
			// context.fill();
			// // d3.polygonArea(polygons[i])
			// // context.arc(sites[i][0],sites[i][1],radius,0,2*Math.PI);// d3.polygonArea(polygons[i])
			// // context.strokeStyle = "rgba(150,220,220)";
			// // context.stroke();
			// context.closePath();


			// context.beginPath();
			// context.arc(cntrd[0], cntrd[1], 2, 0, 2*Math.PI);
			// context.fillStyle = "red";
			// context.fill();
			// context.closePath();

			// context.beginPath();
			// context.arc(sites[i][0], sites[i][1], 2, 0, 2*Math.PI);
			// context.fillStyle = "blue";
			// context.fill();
			// context.closePath();
		}

		function drawCell(cell) {
			if (!cell) return false;
			let l = cell.length;

			for (let i = 0; i<l; i++) if (cell[i][0] < 2 || cell[i][1] < 2 || cell[i][0] > width-2 || cell[i][1] > height-2) return false;
			context.beginPath();
			context.moveTo(cell[0][0], cell[0][1]);
			for (let i = 1; i<l; i++) {
				context.lineTo(cell[i][0], cell[i][1]);
			}
			context.closePath();
			return true;
		}

		function drawLink(link) {
			context.moveTo(link.source[0], link.source[1]);
			context.lineTo(link.target[0], link.target[1]);
		}
	}
</script>