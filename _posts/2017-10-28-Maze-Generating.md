---
layout: post
title: "Maze Generation"
date: 2017-10-28
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="../../../../js/maze_generator_kruskal.js"></script>
<script src="../../../../js/kruskal_maze_generation.js"></script>
<div id="maze" style="display: flex;justify-content: center;"></div>
<div id="speed-control" style="display: flex;justify-content: center;margin-top: 10px;">Speed</div>
<div style="display: flex;justify-content: center;">
	<div id="pause-button"></div>
	<div id="new-maze-button"></div>
</div>
<div style="display: flex;justify-content: center;">
	<div id="show-cell-graph-button"></div>
	<div id="show-wall-graph-button"></div>
</div>

<button class="accordion">What's this?</button>
<div class="panel">
<p>
	This shows a maze being generated with Kruskal's algorithm. Essentially, it works like this: initially, every cell in the maze is walled off from its neighbors, and every cell is in its own "group" or set. At each step, we randomly pick a wall, and if the cells connected by that wall are in different groups, we remove that wall and join them into the same group. Kruskal's algorithm is a graph algorithm which generates minimum spanning trees, so we end up with a tree at the end of this process. In other words, we end up with a maze! The reason for using Kruskal's algorithm over say Prim's is that, when we use a special data structure called the "Disjoint-set" data structure, we can keep track of our cell groupings very efficiently. Notice that, we visit each wall exactly once, and decide if the wall is kept or removed. Each decision takes (effectively) a constant amount of time. So our algorithm runs linearly with the number of walls!