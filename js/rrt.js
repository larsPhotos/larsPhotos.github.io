var V,E;
var R;
var q_init;
var current_num, max_num;
var max_dist;
var dq = 5;
var max_samples; // for mitchell's best
var path_check, edge_check, vert_check, rando_check, sample_check;
// var q_slider;
function setup() {
  var cv = createCanvas(600,300);
  cv.parent('rrt');

  document.getElementById('path_check').innerText = 'Find Paths';
  path_check = createCheckbox('', false);
  path_check.parent('path_check');

  document.getElementById('edge_check').innerText = 'Show Edges';
  edge_check = createCheckbox('', true);
  edge_check.parent('edge_check');

  document.getElementById('vert_check').innerText = 'Show Vertices';
  vert_check = createCheckbox('', false);
  vert_check.parent('vert_check');

  document.getElementById('sample_check').innerText = 'Show Sample Points';
  sample_check = createCheckbox('', false);
  sample_check.parent('sample_check');

  // document.getElementById('rando_check').innerText = 'Toggle random/Mitchell\'s best';
  // rando_check = createCheckbox('', false);
  // rando_check.parent('rando_check');

  // document.getElementById('q_slider').innerText = 'edge lengths';
  // vert_check = createCheckbox('', false);
  // vert_check.parent('vert_check');

  max_samples = 10;

  var q_init = {
    x: width-30,
    y: height/2,
    index: 0
  };

  R = [{
    x: Math.random()*width,
    y: Math.random()*height
  }];

  V = [q_init];
  E = [
    {
      dist: 0,
      adj_vert: undefined
    }
  ];

  max_num = 400;
  current_num = 1;

  max_dist = 0;

  colorMode(HSB);
  noFill();
  background(255);
};

function draw() {
  background(255);

  for (var i = 1; i<V.length; i++) {

    if (sample_check.checked()) {
      var c = 127 - 31*R[i].count/max_num - 31*R[i].dist/max_dist;
      stroke(c);
      strokeWeight(0.5);
      line(R[i].x1, R[i].y1, R[i].x2, R[i].y2);
      stroke(c - 15);
      strokeWeight(5);
      point(R[i].x1, R[i].y1);
    }

    stroke(255*E[i].dist/max_dist,255,255);
    // stroke(cubehelix((E[i].dist+5)/(max_dist+10), 0, -1, 2));

    // vertices
    if (vert_check.checked()) {
      strokeWeight(5);
      point(V[i].x, V[i].y);
    }

    //edges
    if (edge_check.checked()) {
      strokeWeight(4 - 3*E[i].dist/max_dist);
      line(V[i].x, V[i].y, E[i].adj_vert.x, E[i].adj_vert.y);
    }
  }

  // origin
  strokeWeight(2);
  stroke(0,255,255);
  ellipse(V[0].x, V[0].y, 10, 10);

  if (current_num<max_num) {
    build_rrt();
  } // else console.log('done: '+V.length);
  if (path_check.checked() && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    var current = nearest_vertex({x:mouseX, y:mouseY})[0];
    noStroke();
    fill(0)
    text('path length: '+E[current.index].dist,mouseX+10,mouseY-10);
    stroke(0);
    strokeWeight(4);
    // while we haven't hit the origin
    while(E[current.index].adj_vert) {
      line(current.x, current.y, E[current.index].adj_vert.x, E[current.index].adj_vert.y);
      current = E[current.index].adj_vert;
    }
  }
};

function build_rrt() {
  var q_rand = mitchells_best();
  // (rando_check.checked())? mitchells_best():{
  //   x: random(width),
  //   y: random(height)
  // };

  var q_near = nearest_vertex(q_rand)[0];

  var new_dist = E[q_near.index].dist+1;
  if (new_dist > max_dist) max_dist = new_dist;

  R.push({
    x1: q_rand.x,
    y1: q_rand.y,

    x2: q_near.x,
    y2: q_near.y,

    dist: new_dist,
    count: current_num
  });

  var q_new = new_conf(q_near, q_rand);

  // make sure it didn't get too close to another vertex
  // if (nearest_vertex(q_new)[1] >= dq) {
  V.push(q_new);
  E.push({
    dist: new_dist,
    adj_vert: q_near
  });
  current_num++;
  // }
};

// TODO: Someday I'll implement a quadtree or voronoi thing
// and this won't be so darn slow
function nearest_vertex(q) {
  var d = Infinity;
  var p;
  for (var i = 0; i<V.length; i++) {
    var temp_d = distance(V[i],q);
    if (temp_d<d) {
      p = V[i];
      d = temp_d;
    }
  }
  return [p, d];
};

function new_conf(q_n, q_r) {
  var theta = atan2(q_r.y-q_n.y, q_r.x-q_n.x);
  return {
    x: q_n.x + cos(theta)*dq,
    y: q_n.y + sin(theta)*dq,
    index: V.length
  }
};

function distance(p,q) {
  var delta_x = p.x-q.x;
  var delta_y = p.y-q.y;
  return delta_x*delta_x + delta_y*delta_y;
};

function mitchells_best() {
  var best_x = -1;
  var best_y = -1;
  var best_dist = -1;
  for (var j = 0; j<max_samples; j++) {
    var tx = Math.random()*width;
    var ty = Math.random()*height;
    var dist = Infinity;

    for (var k = 0; k<current_num; k++) {
      var dx = tx - R[k].x1;
      var dy = ty - R[k].y1;
      var d = dx*dx + dy*dy;
      if (d < dist) {
        dist = d;
      }
    }

    if (dist > best_dist) {
      best_x = tx;
      best_y = ty;
      best_dist = dist;
    }
  }// end j
  return {x: best_x, y:best_y};
}

function cubehelix(lambda, s, r, hue) {
  if (lambda >= 1) return color(255);

  var amp = hue*lambda*(1-lambda)/2;
  var phi = 2*PI*(s/3 + r*lambda);

  var red = lambda + amp*(-0.14861*cos(phi) + 1.78277*sin(phi));
  var green = lambda + amp*(-0.29227*cos(phi) -0.90649*sin(phi));
  var blue = lambda + amp*(1.97294*cos(phi));
  return color(red*255, green*255, blue*255);
}

function mousePressed() {
  if (mouseX > -20 && mouseX < width+20 && mouseY > -20 && mouseY < height+20) {
    R = [{
      x: Math.random()*width,
      y: Math.random()*height
    }];
    V = [{
      x: mouseX,
      y: mouseY,
      index: 0
    }];

    E = [
      {
        dist: 0,
        adj_vert: undefined
      }
    ];
    current_num = 1;
    max_dist = 0;
  }
}

function keyTyped() {
  if (key === 'g') {
    R = [{
      x: Math.random()*width,
      y: Math.random()*height
    }];
    V = [{
      x: random(width),
      y: random(height),
      index: 0
    }];
    E = [
      {
        dist: 0,
        adj_vert: undefined
      }
    ];
    current_num = 1;
    max_dist = 0;

    while(current_num<max_num) build_rrt();
  }
}
