var sonnet_selector;
var threshold_selector;
var tfidf_selector;
var tfidf_scores;
var similarities;

var current_scores;
var current_threshold;

var max_rows;

var brewer;

function preload() {
	similarities = []
	// load sonnets, tfidf, and cosine similarities
	similarities[0] = loadJSON("../../../../data/sonnet_data/sonnet_similarities_10.json");
	similarities[1] = loadJSON("../../../../data/sonnet_data/sonnet_similarities_20.json");
	similarities[2] = loadJSON("../../../../data/sonnet_data/sonnet_similarities_30.json");
	similarities[3] = loadJSON("../../../../data/sonnet_data/sonnet_similarities_40.json");

	

	tfidf_scores = [];
	tfidf_scores[0] = loadStrings("../../../../data/sonnet_data/sonnet_1_tfidf.txt");
	tfidf_scores[1] = loadStrings("../../../../data/sonnet_data/sonnet_18_tfidf.txt");
	tfidf_scores[2] = loadStrings("../../../../data/sonnet_data/sonnet_127_tfidf.txt");
	
}
function setup() {
	var cv = createCanvas(154,154);
	cv.parent('similarity');

	current_threshold = 0;
	current_scores = tfidf_scores[0];

		// sonnet_selector = createSelect()
		// sonnet_selector.option('Sonnet 1');
		// sonnet_selector.changed(sonnet_changed);

	threshold_selector = createSelect();
	threshold_selector.option('10');
	threshold_selector.option('20');
	threshold_selector.option('30');
	threshold_selector.option('40');
	threshold_selector.changed(threshold_changed);

	tfidf_selector = createSelect();
	tfidf_selector.option('none');
	tfidf_selector.option('Sonnet 1');
	tfidf_selector.option('Sonnet 18');
	tfidf_selector.option('Sonnet 127');
	tfidf_selector.changed(tfidf_changed);

	// sonnet_selector.parent('selectors')
	threshold_selector.parent('selectors')
	tfidf_selector.parent('selectors')

	// brewer = ;
	// noStroke();
}

function draw() {
	let c;
	for (var i = 1; i<similarities[current_threshold].length; i++) {
		set(i,i,color(0));
		for (var j in similarities[current_threshold][i]) {
			c = color(d3.interpolateRdPu(1-similarities[current_threshold][i][j]));
			// c = color(255-255*similarities[current_threshold][i][j])
			set(i,j,c);
			set(j,i,c);
		}
	}
	updatePixels();
	noLoop();
}

function sonnet_changed() {
	let current_sonnet = sonnet_selector.value().split(' ')[1];
	// console.log(current_sonnet)
	current_scores = tfidf_scores[parseInt(current_sonnet[current_sonnet.length-1]-1)];
	redraw();
}

function threshold_changed() {
	let threshold = threshold_selector.value();
	// console.log(threshold)
	if (threshold === '10') {
		current_threshold = 0;
	} else if (threshold === '20') {
		current_threshold = 1;
	} else if (threshold === '30') {
		current_threshold = 2;
	} else if (threshold === '40') {
		current_threshold = 3;
	}
	redraw();
}

function tfidf_changed() {
	const par = document.getElementById('tfidf');
	while (par.firstChild) {
		par.firstChild.remove();
	}
	let current_sonnet = tfidf_selector.value().split(' ')[1];
	let current;
	if (current_sonnet) {
		if (current_sonnet === "1") {
			current = tfidf_scores[0]
		} else if (current_sonnet === "18") {
			current = tfidf_scores[1]
		} else if (current_sonnet === "127") {
			current = tfidf_scores[2]
		}
		let split, span;//, value;
		// let max = parseFloat(current[0].split(', ')[1]);
		// let min = parseFloat(current[9].split(', ')[1]);
		colorMode(HSB,255);
		for (var i = 0; i<10; i++) {
			split = current[i].split(', ');
			span = createSpan(split[0]);
			value = parseFloat(split[1]);
			// console.log((value-min)/(max-min)*140.0);
			span.style('font-size','18px');
			span.style('padding-right','5px');
			span.style('color',color(40.0*((i+1)/10)+100.0,100,255));
			span.parent(tfidf);
		}
		colorMode(RGB);
	}
}






// var table;

// function preload() {
// 	table = loadTable("../../../../data/sonnet_data/sonnet_similarities_50.csv", "csv", "header");
// }

// function setup() {
// 	noCanvas();

// 	var json = {};
// 	let curr_row, from, to, val;
// 	for (var i = 0; i<table.getRowCount(); i++) {
// 		curr_row = table.getRow(i);
// 		from = parseInt(curr_row.arr[0]);
// 		to = parseInt(curr_row.arr[1]);
// 		val = parseFloat(curr_row.arr[2]);
// 		if (!json.hasOwnProperty(from)) {
// 			json[from] = {};
// 		}
			
// 		json[from][to] = val;
// 	}

// 	saveJSON(json, 'sonnet_similarities_50.json');
// }