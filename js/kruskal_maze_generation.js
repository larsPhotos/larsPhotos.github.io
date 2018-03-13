var maze_generator;
var size, scale;
var speed, pause, reset, cell_graph, wall_graph;
var playing, show_cells, show_walls;
var wait_one_frame;
function setup() {
	var cv = createCanvas(420,420);
	cv.parent('maze');
	size = 20
	scale = width/size;
	maze_generator = new KruskalMaze(size,scale);
	maze_generator.setupMaze();

	speed = createSlider(1,60,10,5);
	speed.parent('speed-control');

	pause = createButton('play/pause')
	pause.parent('pause-button')
	pause.mousePressed(playPause);

	reset = createButton('new maze')
	reset.parent('new-maze-button')
	reset.mousePressed(newMaze);

	cell_graph = createButton('show cell graph')
	cell_graph.parent('show-cell-graph-button')
	cell_graph.mousePressed(showCells);

	show_cells = false;

	wall_graph = createButton('show wall graph')
	wall_graph.parent('show-wall-graph-button')
	wall_graph.mousePressed(showWalls);

	show_walls = false;

	playing = true;

	colorMode(HSB)
	frameRate(5)
	wait_one_frame = false;
}

function draw() {
	frameRate(speed.value())
	strokeWeight(1)
	background(255);
	// maze_generator.showMazeGeneration(show_cells, show_walls)
	if (!maze_generator.showMazeGeneration(show_cells, show_walls)) {
		if (wait_one_frame) playPause();
		else wait_one_frame = true;
	}
}

function playPause() {
	if (playing) {
		noLoop();
		playing = false;
	} else {
		loop();
		playing = true;
	}
}

function newMaze() {
	size = 20
	scale = width/size;
	maze_generator = new KruskalMaze(size,scale);
	maze_generator.setupMaze();
	redraw();
}

function showCells() {
	show_cells = !show_cells;
}

function showWalls () {
	show_walls = !show_walls;
}