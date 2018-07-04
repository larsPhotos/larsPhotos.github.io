function QLearningAgent(maze, s1, e2, size, scale) {
	this.R = [];
	this.Q = [];
	this.Choices = [];
	this.max = 100;
	this.min = -2;
	this.initializeMatrices = function() {
		for (let m = 0; m<maze.length; m++) {
			this.R[m] = {
				up: this.min,
				down: this.min,
				left: this.min,
				right: this.min,
			}
			this.Q[m] = {
				up: 0,
				down: 0,
				left: 0,
				right: 0
			}
			this.Choices[m] = this.possibleDirections(m);

			if (m - size === e2 && !maze[m].walls[0]) 		this.R[m].up = this.max;// console.log(m+' + up = '+e2);}
			else if (m + size === e2 && !maze[m].walls[1]) 	this.R[m].down = this.max;// console.log(m+' + down = '+e2);}
			else if (m - 1 === e2 && !maze[m].walls[2]) 	this.R[m].left = this.max;// console.log(m+' + left = '+e2);}
			else if (m + 1 === e2 && !maze[m].walls[3]) 	this.R[m].right = this.max;// console.log(m+' + right = '+e2);}
		}
	}

	this.showRewards = function() {
		noStroke();
		// stroke(0)
		for (let r in this.R) {
			let x = (r%size)*scale;
			let y = floor(r/size)*scale;

			fill(170*((this.R[r]['up']-this.min)/(this.max-this.min)),255,255,0.15)
			rect(x+scale/4,y+scale/4,scale/2,-scale/4)

			fill(170*((this.R[r]['down']-this.min)/(this.max-this.min)),255,255,0.15)
			rect(x+scale/4,y+3*scale/4,scale/2,scale/4)

			fill(170*((this.R[r]['left']-this.min)/(this.max-this.min)),255,255,0.15)
			rect(x+scale/4,y+scale/4,-scale/4,scale/2)

			fill(170*((this.R[r]['right']-this.min)/(this.max-this.min)),255,255,0.15)
			rect(x+3*scale/4,y+scale/4,scale/4,scale/2)
		}
	}

	this.showQValues = function() {
		let fourth = scale/4;
		let half = scale/2;
		let quarter = 3*scale/4;
		noStroke();
		// stroke(0)
		for (let r in this.Q) {
			let x = (r%size)*scale;
			let y = floor(r/size)*scale;
			if (this.Q[r]['up'] > 0) {
				fill(42 + 170*((this.Q[r]['up']-this.min)/(this.max-this.min)),255,255,0.15)
				// rect(x+scale/4,y+scale/4,scale/2,-scale/4)
				beginShape();
				vertex(x+fourth,y+fourth)
				vertex(x+half,y)
				vertex(x+quarter,y+fourth)
				endShape();
			}
			
			if (this.Q[r]['down'] > 0) {
				fill(42 + 170*((this.Q[r]['down']-this.min)/(this.max-this.min)),255,255,0.15)
				// rect(x+scale/4,y+3*scale/4,scale/2,scale/4)
				beginShape();
				vertex(x+fourth,y+quarter)
				vertex(x+half,y+scale)
				vertex(x+quarter,y+quarter)
				endShape();
			}

			if (this.Q[r]['left'] > 0) {
				fill(42 + 170*((this.Q[r]['left']-this.min)/(this.max-this.min)),255,255,0.15)
				// rect(x+scale/4,y+scale/4,-scale/4,scale/2)
				beginShape();
				vertex(x+fourth,y+fourth)
				vertex(x,y+half)
				vertex(x+fourth,y+quarter)
				endShape();
			}

			if (this.Q[r]['right'] > 0) {
				fill(42 + 170*((this.Q[r]['right']-this.min)/(this.max-this.min)),255,255,0.15)
				// rect(x+3*scale/4,y+scale/4,scale/4,scale/2)
				beginShape();
				vertex(x+quarter,y+fourth)
				vertex(x+scale,y+half)
				vertex(x+quarter,y+quarter)
				endShape();
			}
		}
	}

	this.learn = function(M, alpha, gamma, episode) {
		let s = s1;
		let a;
		let goal_reached = false;
		// for (let episode = 0; episode < M; episode++) {
			// s = s1;
			// goal_reached = false;
			let counter = 0
			while (!goal_reached && counter < 50000) {
				counter++;
				if (s === e2) {
					goal_reached = true;
					break;
				}

				let x = (s%size)*scale+0.5*scale;
				let y = floor(s/size)*scale+0.5*scale;
				let dir = 0.9*scale/2;

				noStroke();
				fill(170*episode/M,80,255, 0.2)

				// ellipse((s%size)*scale+0.5*scale,floor(s/size)*scale+0.5*scale,5,5)
				
				// let poss = this.possibleDirections(s);
				a = this.weightedChoice(s, 0.3+0.5*(1 - episode/M)); //this.choice(s);//this.bestAction(s, poss);

				if (a !== undefined) {
					// text(a+"\n"+episode+"/"+M, (s%size)*scale+0.5*scale,floor(s/size)*scale+0.5*scale)
					if (a === 'up') rect(x,y, 2, -dir);
					else if (a === 'down') rect(x,y, 2, dir);
					else if (a === 'left') rect(x,y, -dir, 2);
					else if (a === 'right') rect(x,y, dir, 2);

					let max_future_rewards = this.maxRewards(s, a);

					this.Q[s][a] = (1-alpha)*this.Q[s][a] + alpha*(this.R[s][a] + gamma*max_future_rewards);
					// console.log('episode '+episode)
					// console.log('state '+s)
					// console.log('action '+a)
					// console.log(this.Q[s][a])
					s = this.getNewIndex(s,a);
				} else {
					console.log('no directions?')
					goal_reached = true;
				}
			}
		// }
	}

	this.choice = function(index) {
		// let choices = this.possibleDirections(index);
		// if (choices.length > 0) {
		// 	return choices[floor(Math.random()*choices.length)];
		// }
		if (this.Choices[index].length > 0) {
			return this.Choices[index][floor(Math.random()*this.Choices[index].length)];
		}
	}

	this.weightedChoice = function(index, prob) {
		let choices = this.Choices[index]//this.possibleDirections(index);

		if (choices.length > 0) {
			if (Math.random() < prob){
				// let a = choices[floor(Math.random()*choices.length)]; //
				return choices[floor(Math.random()*choices.length)];
				// if (a === prev_action && choices.length>1) {
				// 	while (a === prev_action) a = choices[floor(Math.random()*choices.length)];
				// }
				// return a;
			} else {
					let max = -100;
					let max_ind = -1;
					for (let i = 0; i<choices.length; i++) {
						let v = this.Q[index][choices[i]];
						if (v > max) {
							max = v;
							max_ind = i;
						}
					}
					
				return (max_ind>-1)?choices[max_ind]:undefined;
			}
		}
	}

	this.possibleDirections = function(index) {
		let choices = ['up','down','left','right'];
		let counter = 0;
		let i = 0;
		for (; i<4; i++) {
			if (maze[index].walls[i]) {
				choices.splice(i-counter,1);
				counter++;
			}
		}
		return choices;
	}

	this.getNewIndex = function(index, direction) {
		let new_index = -1;
		if (direction === 'up') {
			new_index = index - size;
		} else if (direction === 'down') {
			new_index = index + size;
		} else if (direction === 'left') {
			if (index % size === 0) {
				new_index = index;
				console.log("went left even though it shouldnt have")
			} else {
				new_index = index - 1;
			}
		} else if (direction === 'right') {
			if ((index+1)%size === 0){
				console.log("went right even though it shouldnt have")
				new_index = index;
			} else {
				new_index = index + 1;
			}
		}
		if (new_index < 0 || new_index > maze.length-1) new_index = index;
		return new_index;
	}

	this.maxRewards = function (index, direction) {
		let new_index = this.getNewIndex(index, direction);

		let max = 0;
		let chcs = this.Choices[new_index];//this.possibleDirections(new_index);
		let l = chcs.length;
		let c;
		let d = 0;
		if (l > 0) {
			for (; d < l; d++) {
				c = this.Q[new_index][chcs[d]];
				if (c > max) {
					max = c
				}
			}
		}

		return max;
	}

	this.bestAction = function(s) {
		let max = -1000;
		let max_choice = this.choice(s);//this.Choices[s][floor(Math.random()*choices.length)];
		for (let c = 0; c<this.Choices[s].length; c++) {
			let act = this.Choices[s][c];
			let ch = this.Q[s][act];
			if (ch > max) {
				max = ch;
				max_choice = act;
			}
		}

		return max_choice;
	}

	this.optimalPath = function() {
		path = [];
		path.push(s1);
		let s = s1;
		// let ch;
		let best;
		let counter = 0;
		while (s != e2 && counter < 10000) {
			// ch = this.possibleDirections(s);
			if (this.Choices[s].length === 0) {
				console.log('failed to find goal')
				break;
			}
			best = this.bestAction(s);
			s = this.getNewIndex(s, best);
			path.push(s);
			counter ++;
		}

		return path;
	}
}