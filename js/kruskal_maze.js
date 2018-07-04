var maze, maze_generator, size, scale;
var s1, start2, e1, e2;
var agent;
var pth;
function setup() {
	var cv = createCanvas(600,600);
	cv.parent('maze');


	size = 10;
	scale = width/size;
	s1 = 3*size;
	s2 = s1+1;
	e1 = size-2 + 7*size; //6+size*size-2*size;
	e2 = e1 + 1; //e1 + size;
	maze_generator = new KruskalMaze(size,scale,s1,s2,e1,e2);
	maze_generator.setupMaze();
	maze = maze_generator.kruskal();

	agent = new QLearningAgent(maze, s1, e2, size, scale);
	agent.initializeMatrices();

	colorMode(HSB);
	textAlign(CENTER,CENTER);
	// frameRate(20);

	// console.log(maze[s1+1].walls)
	// console.log(agent.possibleDirections(s1+1))
}

function draw() {
	scale = width/size;
	background(64);

	// agent.showRewards()
	agent.showQValues()

	noStroke();
	fill(160,80,255,0.7);
	let startCell = maze[s1];
	let endCell = maze[e2];
	ellipse((startCell.x+0.5)*scale,(startCell.y+0.5)*scale,scale*0.5,scale*0.5)
	ellipse((endCell.x+0.5)*scale,(endCell.y+0.5)*scale,scale*0.5,scale*0.5)


	noFill();
	stroke(255);
	for (let i = 0; i<maze.length; i++) {
		// stroke(255)
		let cell = maze[i];
		let x = cell.x*scale;
		let y = cell.y*scale

		// up
		if (cell.walls[0]) line(x, y, x+scale, y);
		// else line(x+scale/2,y+scale/2,x+scale/2,y+scale/4)
		// down
		if (cell.walls[1]) line(x, y+scale, x+scale, y+scale);
		// else line(x+scale/2,y+scale/2,x+scale/2,y+3*scale/4)
		// left
		if (cell.walls[2]) line(x, y, x, y+scale);
		// else line(x+scale/2,y+scale/2,x+scale/4,y+scale/2)
		// right
		if (cell.walls[3]) line(x+scale, y, x+scale, y+scale);
		// else line(x+scale/2,y+scale/2,x+3*scale/4,y+scale/2)

	}

	let M = 250;
	if (frameCount > 30) {
		if (frameCount < M+30) {
			agent.learn(M, 0.95, 0.95, frameCount);
		} else {
			pth = agent.optimalPath();

			strokeWeight(2)
			for (let i = 0; i<pth.length-1; i++) {
				let x1 = ((pth[i]%size)+0.5)*scale;
				let y1 = (floor(pth[i]/size)+0.5)*scale;
				let x2 = ((pth[i+1]%size)+0.5)*scale;
				let y2 = (floor(pth[i+1]/size)+0.5)*scale;
				stroke(170*i/(pth.length-1),80,255,0.9);
				line(x1,y1,x2,y2)
			}
			noLoop();
		}
	}

	// console.log(agent.R[s1])
	// console.log(agent.Q[s1])
	
	// noLoop();
}