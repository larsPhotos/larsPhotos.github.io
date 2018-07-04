var reset_button, generate_button;
var color_scale;
function setup() {
	var cv = createCanvas(3*windowWidth/4, min(500, windowHeight))
	cv.parent('markov')

	reset_button = createButton('reset markov chain');
	reset_button.parent('reset_button');
	reset_button.mousePressed(resetEverything);

	generate_button = createButton('generate nonsense');
	generate_button.parent('reset_button');
	generate_button.mousePressed(generateSentence);

	sentence = ''
	display_sentence = ''
	graph = {}

	r = 100

	order = 1

	pad = 10

	max_line_width = 8

	// color_scale = colorbrewer['RdYlBu'][11];

	noFill()
	noLoop()
}

function draw() {
	background(255)
	noStroke()
	fill(0)
	cx = width/4
	cy = height/2
	textSize(20)
	textAlign(LEFT, TOP)
	text(display_sentence, 20, 20, width/3, height)

	textSize(10)
	textAlign(CENTER, CENTER)
	r = min(width/2, height)/3
	if (sentence[order]) {

		keys = Object.keys(graph)

		l = keys.length
		for (var i = 0; i<l; i++) {
			theta = PI*2*i/l
			text(keys[i] === ' '? '_': keys[i], cx+Math.cos(theta)*r, cy+Math.sin(theta)*r)
		}

		r *= 0.9

		for (var i = 0; i<l; i++) {
			parent_index = keys.indexOf(keys[i])
			theta1 = PI*2*parent_index/keys.length
			x1 = cx+cos(theta1)*r
			y1 = cy+sin(theta1)*r


			rect_width = min(height-pad, width/2-pad)/l

			fill(128)
			text(keys[i], width/2, pad + (parent_index+0.5)*rect_width)
			text(keys[i], pad + width/2+(parent_index+0.5)*rect_width, pad/2)

			children = Object.keys(graph[keys[i]])
			sum = 0
			for (var j = 0; j<children.length; j++) {sum += Number(graph[keys[i]][children[j]])}
			for (var j = 0; j<children.length; j++) {
				child_index = keys.indexOf(children[j])
				theta2 = PI*2*child_index/keys.length

				x2 = cx+cos(theta2)*r
				y2 = cy+sin(theta2)*r

				size = graph[keys[i]][children[j]]

				strokeWeight(max_line_width*size/sum)
				stroke(0, 63)

				line(x1,y1,x2,y2)

				t = atan2(y1-y2, x1-x2)
				line(x2,y2, x2+8*cos(t+PI/8), y2+8*sin(t+PI/8))
				line(x2,y2, x2+8*cos(t-PI/8), y2+8*sin(t-PI/8))

				noStroke()
				fill(0, 63 + (192)*size/sum)
				// fill(color_scale[int(11*(size-1)/sum)]);

				// matrix
				rect(pad + width/2 + parent_index*rect_width,
					pad + child_index*rect_width, rect_width, rect_width)
			}
		}
	}
}

function keyTyped() {
	if (key === '') {	
		if (!display_sentence[display_sentence.length-1].toLowerCase().match(/[a-z0-9 ]/)) {
			display_sentence = display_sentence.substring(0,display_sentence.length-1);
		} else {	
			var to_be_removed = display_sentence[display_sentence.length-1].toLowerCase();
			// var last_ind = display_sentence.lastIndexOf(to_be_removed)
			sentence = sentence.substring(0,sentence.length-1)
			display_sentence = display_sentence.substring(0,display_sentence.length-1);//last_ind)

			var parent = sentence[sentence.length-1]

			if (graph[parent]) {
				var count = graph[parent][to_be_removed];

				if (count > 1) {
					graph[parent][to_be_removed]--;
				} else {
					delete graph[parent][to_be_removed];
				}

				if (graph[to_be_removed] && Object.keys(graph[to_be_removed]).length === 0) {
					delete graph[to_be_removed];
				}
			}
		}
	} else {
		display_sentence += ''+key
		key = key.toLowerCase()
		if (key.match(/[a-z0-9 ]/)) {
			sentence += ''+key
			if (sentence.length === order+1) {
				k = ''
				v = ''
				for (var i = 0; i<order; i++) {
					k += sentence[i]
					v += sentence[i+1]
				}
				graph[k] = {}
				graph[k][v] = 1
				graph[v] = {}
			} else if (sentence.length > order+1) {
				l = sentence.length
				k = ''
				v = ''
				for (var i = l-order-1; i<l-1; i++) {
					k += sentence[i]
					v += sentence[i+1]
				}
				if (Object.keys(graph).includes(v)) {
					if (Object.keys(graph[k]).includes(v)) {
						graph[k][v]++
					} else {
						graph[k][v] = 1
					}
				} else {
					graph[k][v] = 1
					graph[v] = {}
				}
			}
		}
	}
	redraw()
	// this does the equivalent of event.preventDefault
	// essentially cause hitting space to go down the page 
	// is default behavior and this prevents that
	return false
}

function resetEverything() {
	sentence = ''
	display_sentence = ''
	graph = {}
	document.getElementById("message").innerText = '';
	redraw()
}

function generateSentence() {
	document.getElementById("message").innerText = '';
	var letters = Object.keys(graph);
	var sent = '';
	for (var i = 0; i<10; i++) {
		if (letters[0]) {
			var current_letter = letters[int(Math.random()*letters.length)];
			sent += current_letter;
			letters = []
			for (var k in graph[current_letter]) {
				for (var j = 0; j<graph[current_letter][k]; j++) {
					letters.push(k);
				}
			}
		}
	}
	document.getElementById("message").innerText = sent;
}

function windowResized() {
	resizeCanvas(3*windowWidth/4, min(500, windowHeight))
}