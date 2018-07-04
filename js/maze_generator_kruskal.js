function KruskalMaze(size, scale, start1, start2, end1, end2) {
	this.disjoint_set = new DisjointSets();
	this.wall_list = [];
	this.maze = [];
	this.setupMaze = function() {
		let i = 0;
		let j = 0;
		for (; i<size*size; i++) {
			// let ex = i%size;
			// let wai = floor(i/size);
			this.maze.push({
				x : i%size,//ex,
				y : floor(i/size),//wai,
				// up, down, left, right
				walls : [true,true,true,true]//[wai!==0,wai!==size-1,ex!==0,ex!==size-1]
			});
			this.disjoint_set.makeSet(i);
		}
		// 	i ->
		// j
		// |
		// v
		// * ->	* -> ... ->	*
		// |	|	 ... 	
		// v	v	 ... 	
		// * ->	* -> ... ->	*
		// |	|	 ... 	
		// v	v	 ... 	
		// * 	*	 ...  	*
		i = 0;
		j = 0;
		for (; i<size-1; i++) {
			j = 0;
			for (; j<size-1; j++) {
				this.wall_list.push([i + j*size, i + j*size + 1]);
				this.wall_list.push([i + j*size, i + j*size + size]);
			}
			// add downward facing edges on rightmost column
			this.wall_list.push([size-1 + i*size, size-1 + i*size + size]);
			// add right pointing edges on bottom row
			this.wall_list.push([i + size*size - size, i+1 + size*size - size]);
		}
	}

	this.kruskal = function() {
		if (start1 && start2 && end1 && end2) {
			let numFound = 0;
			let startInd = -1;
			let endInd = -1;

			for (let w = 0; w <this.wall_list.length; w++) {
				if (this.wall_list[w][0] === start1 && this.wall_list[w][1] === start2) {
					startInd = w;
					if (numFound === 1) break;
					else numFound++;
				}
				if (this.wall_list[w][0] === end1 && this.wall_list[w][1] === end2) {
					endInd = w;
					if (numFound === 1) break;
					else numFound++;
				}
			}

			this.kruskalOneIteration(startInd);
			if (startInd < endInd) this.kruskalOneIteration(endInd-1);
			else this.kruskalOneIteration(endInd);
		}
		
		while (this.wall_list.length > 0) {
			let index = floor(Math.random()*this.wall_list.length);//floor(3*this.wall_list.length/7);
			this.kruskalOneIteration(index);
		}

		return this.maze;
	}

	this.kruskalOneIteration = function(index) {
		let wall = this.wall_list[index];

		let xP = this.disjoint_set.find(wall[0]);
		let yP = this.disjoint_set.find(wall[1]);

		if (xP !== yP) {
			// remove wall in cells
			let dx = wall[1]-wall[0];
			if (dx === 1) {
				// m0 ->|<- m1
				// up down left = 2 right = 3
				this.maze[wall[0]].walls[3] = false;
				this.maze[wall[1]].walls[2] = false;
			}
			// only need to check two cases from this.maze wall construction
			else if (dx === size) {
				// m0
				// v
				// ^
				// m1
				// up = 0 down = 1 left right
				this.maze[wall[0]].walls[1] = false;
				this.maze[wall[1]].walls[0] = false;
			}
			this.disjoint_set.union(xP,yP)
		}
		// remove wall from walls list
		this.wall_list.splice(index,1);
	}


	this.showMazeGeneration = function(show_cell_graph, show_wall_graph) {
		if (this.wall_list.length > 0) {
			let index = floor(Math.random()*this.wall_list.length);
			this.showOneIteration(index);
		}

		let fourth = scale/4;
		let half = scale/2;
		let quarter = 3*scale/4;

		if (show_wall_graph) {
			let k = 0;
			let wall_length = this.wall_list.length;
			noStroke();
			fill(30,80,255,0.8);
			let w;
			for (; k < wall_length; k++) {
				w = this.wall_list[k];
				if (w[1]-w[0] === 1) rect(this.maze[w[1]].x*scale-fourth, this.maze[w[1]].y*scale+half, half, 2)
				else rect(this.maze[w[1]].x*scale+half, this.maze[w[1]].y*scale-fourth, 2, half)
			}
		}

		let i = 0;
		let l = this.maze.length;

		// let parent_counter = [];

		let j;
		let cell;
		let x;
		let y;
		let show_center;
		for (; i < l; i++) {
			stroke(0)
			cell = this.maze[i];
			x = cell.x*scale;
			y = cell.y*scale
			show_center = false;

			// up
			if (cell.walls[0]) line(x, y, x+scale-1, y);
			else if (show_cell_graph) {line(x+half,y+half,x+half,y+2); show_center = true};
			// down
			if (cell.walls[1]) line(x, y+scale-1, x+scale-1, y+scale-1);
			else if (show_cell_graph) {line(x+half,y+half,x+half,y+scale-2); show_center = true;}
			// left
			if (cell.walls[2]) line(x, y, x, y+scale-1);
			else if (show_cell_graph) {line(x+half,y+half,x+2,y+half); show_center = true;}
			// right
			if (cell.walls[3]) line(x+scale-1, y, x+scale-1, y+scale-1);
			else if (show_cell_graph) {line(x+half,y+half,x+scale-2,y+half); show_center = true;}

			if (show_center) {
				noStroke()
				fill(0)
				ellipse(x+half, y+half, 4, 4)
			}

			// noStroke();
			// j = this.disjoint_set.sets[i].parent;
			// // console.log('parent of '+i+' is '+j)
			// fill(170*j/l,80,255,0.8);
			// rect(x+fourth, y+fourth, half, half)
			// stroke(0)
			// noFill();
			// text(j,x+half,y+half)
			// if (!parent_counter[j]) {
			// 	parent_counter[j]=1;
			// } else {
			// 	parent_counter[j]++;
			// }
			// console.log('count for '+j+' is now')
			// console.log(parent_counter[j])

		}
		// i = 0;
		// let max = -1;
		// let max_index = -1;
		// for (; i<l; i++) {
		// 	if (parent_counter[i] > max) {
		// 		max = parent_counter[i];
		// 		max_index = i;
		// 	}
		// }
		// return parent_counter;//[max, max_index];
		// 
		return this.wall_list.length > 0;
	}

	this.showOneIteration = function(index) {
		let wall = this.wall_list[index];

		let xP = this.disjoint_set.find(wall[0]);
		let yP = this.disjoint_set.find(wall[1]);

		if (xP !== yP) {
			fill(160,80,255,0.5)
			// remove wall in cells
			let dx = wall[1]-wall[0];
			if (dx === 1) {
				// m0 ->|<- m1
				// up down left = 2 right = 3
				this.maze[wall[0]].walls[3] = false;
				this.maze[wall[1]].walls[2] = false;
			}
			// only need to check two cases from this.maze wall construction
			else if (dx === size) {
				// m0
				// v
				// ^
				// m1
				// up = 0 down = 1 left right
				this.maze[wall[0]].walls[1] = false;
				this.maze[wall[1]].walls[0] = false;
			}
			this.disjoint_set.union(xP,yP)
		} else {
			fill(80,80,255,0.5)
		}

		rect(this.maze[wall[0]].x*scale,this.maze[wall[0]].y*scale,scale,scale);
		rect(this.maze[wall[1]].x*scale,this.maze[wall[1]].y*scale,scale,scale);
		// remove wall from walls list
		this.wall_list.splice(index,1);	
	}
}




function DisjointSets() {
	this.sets = {};
	this.makeSet = function(x) {
		this.sets[x] = {
			val: x,
			parent: x,
			rank: 0
		}
	}

	this.find = function(x) {
		if (x !== this.sets[x].parent) {
			this.sets[x].parent = this.find(this.sets[x].parent);
		}
		return this.sets[x].parent;
	}

	this.union = function(xP, yP) {
		// let xP = this.find(x);
		// let yP = this.find(y);
		// if (xP === yP) return;
		xRoot = this.sets[xP];
		yRoot = this.sets[yP];

		if (xRoot.rank < yRoot.rank) {
			xRoot.parent = yRoot.val;
		} else if (xRoot.rank > yRoot.rank) {
			yRoot.parent = xRoot.val;
		} else {
			xRoot.parent = yRoot.val;
			yRoot.rank++;
		}
	}
}