---
layout: post
title: "voro"
date: 2017-08-22
---
<script src="../../../../js/d3.v4.min.js"></script>
<canvas width="960" height="500"></canvas>
<button class="accordion">What's this?</button>
<div class="panel">
<p>
Builds a minimum spanning tree through the delaunay triangulation of a set of wobbly points, as well as the associated voronoi diagram. Really just an excuse to implement Prim's algorithm in javascript. Someday I will implement Kruskal's algorithm. The wobbliness also demonstrates the connection between random walks and diffusion. Finally, and most importantly, it just looks cool.
</p>
</div>
<script>
	var canvas = d3.select("canvas").node()//.on("touchmove mousemove", moved).node(),
		context = canvas.getContext("2d"),
		width = canvas.width,
		height = canvas.height;

	var color_scale = d3.scaleOrdinal(d3.schemeCategory10);
	var num_points = 200;
	var u1,u2,theta,r;
	var sites = d3.range(num_points)
		.map(function(d) {
			u1 = Math.random();
			u2 = Math.random();
			theta = Math.PI*2*u2;
			r = Math.sqrt(-Math.log(u1*u1))
			return [width/2 + r*Math.cos(theta) * 10, height/2 - r*Math.sin(theta) * 50];
		});
	redraw();

	d3.timer(function(t0) {
		sites.forEach(function(s) {
			s[0]+= 2*Math.random()-1;
			s[1]+= 2*Math.random()-1;
		})
		redraw(t0);
		return t0 > 10;
	});

	function moved() {
		context.clearRect(0, 0, width, height);
	}

	function redraw(t) {
		context.lineWidth = 2;

		var voronoi = d3.voronoi()
			.extent([[-1, -1], [width + 5, height + 5]]);

		var diagram = voronoi(sites),
			links = diagram.links(),
			polygons = diagram.polygons();

		context.clearRect(0, 0, width, height);

		context.beginPath();
		for (var i = 0; i<polygons.length; i++) {
			drawCell(polygons[i]);
		}
		context.strokeStyle = color_scale(3);
		context.stroke();

		// context.beginPath();
		// for (var i = 0, n = links.length; i < n; ++i) drawLink(links[i]);
		// context.strokeStyle = "rgba(0,0,0,0.01)";
		// context.stroke();

		var adj_list = buildAdjList(links);
		var verts = Object.keys(adj_list);
		var min_spanning_tree = prims(adj_list, verts);

		context.beginPath();
		var x0 = parseFloat(verts[0].split(",")[0]);
		var y0 = parseFloat(verts[0].split(",")[1]);
		context.moveTo(x0, y0);
		context.arc(x0, y0, 2.5, 0, Math.PI*2, false);

		var from, to;
		for (var i = 1; i<min_spanning_tree.length; i++) {
			from = verts[min_spanning_tree[i]].split(",");
			to = verts[i].split(",");
			context.moveTo(parseFloat(from[0]), parseFloat(from[1]));
			context.lineTo(parseFloat(to[0]), parseFloat(to[1]));
		}
		context.strokeStyle = "rgba(220,150,150,0.5)";
		context.lineWidth = 3;
		context.stroke();

		function drawCell(cell) {
			if (!cell) return false;
			context.moveTo(cell[0][0], cell[0][1]);
			for (var i = 1; i<cell.length; i++) {
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


	function prims(adj_list, verts) {
		var parent = [],
			key = [],
			mstSet = [];
		for (var i = 0; i<verts.length; i++) {
			key[i] = Infinity;
			mstSet[i] = false;
		}

		key[0] = 0;
		parent[0] = -1;

		for (var c = 0; c<verts.length-1; c++) {
			var u;
			var min = Infinity;
			for (var i = 0; i<mstSet.length; i++) {
				if (mstSet[i] === false  && key[i] < min) {
					u = i;
					min = key[i]
				}
			}

			mstSet[u] = true;

			for (var v = 0; v<adj_list[verts[u]].length; v++) {
				var id = findId(adj_list[verts[u]][v], verts)
				var d = dist(u, id, verts);
				if (mstSet[id] === false && d < key[id]) {
					parent[id] = u;
					key[id] = d;
				}
			}
		}

		return parent;
	}


	function dist(i, j, verts) {
		var from = verts[i].split(",");
		var to = verts[j].split(",");
		var dx = from[0] - to[0]
		var dy = from[1] - to[1]
		return dx*dx + dy*dy;
	}
	function findId(pair, verts) {
		for (var i = 0; i<verts.length; i++) {
			if (verts[i] === pair) {
				return i;
			}
		}
	}

	function buildAdjList(l) {
		var adj_list = {};
		var pair, target
		for (var i = 0; i<l.length; i++) {
			pair = ""+l[i].source[0]+","+l[i].source[1];
			target = ""+l[i].target[0]+","+l[i].target[1];
			if (!adj_list.hasOwnProperty(pair)) {
				adj_list[pair] = [];
			}
			if (!adj_list[pair].includes(target)) adj_list[pair].push(target);

			if (!adj_list.hasOwnProperty(target)) {
				adj_list[target] = [];
			}
			if (!adj_list[target].includes(pair)) adj_list[target].push(pair);
		}
		return adj_list;
	}
</script>