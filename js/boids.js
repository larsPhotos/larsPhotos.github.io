var boids,boidVel;
var n, xMin, yMin, xMax, yMax;
var minDist, seeDist, avoid_distance;
var dt,vLim;
//based on pseudocode from http://www.kfish.org/boids/pseudocode.html
function setup() {
  var cv = createCanvas(windowWidth, windowHeight);
  cv.position(0,0);
  cv.style("z-index:-1");
  // var elt = document.getElementsByClassName('container')[0];
  var elt = document.getElementsByTagName("BODY")[0];
  cv.parent(elt);

  boids = [];
  boidVel = [];
  n = 100;
  xMin = 20;
  yMin = 20;
  xMax = width-xMin;
  yMax = height-yMin;
  minDist = 10;
  seeDist = 30;
  avoid_distance = 70;
  dt = 0.1;
  vLim = 20;

  for (var i = 0; i<n; i++) {
    boids[i] = {x:random(width), y:random(height)};
    // createVector(random(width/4, 3*width/4), random(height/4, 3*height/4))
    boidVel[i] = {x:-10, y:10};
    // createVector(0,0);
  }
  background(255);
  strokeWeight(4);
  // colorMode(HSB);
}
function draw() {
  background(255);
  drawBoids();
  if (focused) update();
}

function drawBoids() {
  for (var i = 0; i<n; i++) {
    // stroke(170*(PI+atan2(boids[i].y,boids[i].x))/TWO_PI,255,255);
    // stroke(255,255*boidVel[i].x/vLim,255*boidVel[i].y/vLim);
    stroke(102,204,204);
    point(boids[i].x, boids[i].y);
  }
}
function update() {
  // var vs = [];
  for (var i = 0; i<n; i++) {
    // boidVel[i] = createVector(0,0);
    // var v = createVector(0,0);
    // var r1 = rule1(i);
    var r2 = rule2(i);
    var r3 = rule3(i);
    var m = attractMouse({x:mouseX,y:mouseY}, i);
    var rand = noise(boids[i].x/50,boids[i].y/50, frameCount/500  )*TWO_PI;
    boidVel[i].x +=
    // r1.x*0.01 +
    r2.x +
    r3.x*0.125 +
    m.x +
    cos(rand);

    boidVel[i].y +=
    // r1.y*0.01 +
    r2.y +
    r3.y*0.125 +
    m.y +
    sin(rand);

    limitVelocity(i);
    // boids[i].add(boidVel[i].mult(dt));
    boids[i].x+=(boidVel[i].x*dt);
    boids[i].y+=(boidVel[i].y*dt);
    bound(i);
  }
  // for (var i = 0; i<n; i++) {
  //   boidVel[i] = vs[i];
  //   limitVelocity(i);
  //   bound(i);
  // }
}
// move towards center of mass/ avergae position of the other boids
//vector
function rule1(i) {
  var pcj = {x:0,y:0};
  // createVector(0, 0);
  // var counter = 0;
  for (var j = 0; j<n; j++) {
    // if (j!=i && boids[i].dist(boids[j])<seeDist) {
    if (j!=i) {// && (boids[i].x-boids[j].x)*(boids[i].x-boids[j].x) + (boids[i].y-boids[j].y)*(boids[i].y-boids[j].y)<seeDist*seeDist) {
      // pcj.add(boids[j]);
      pcj.x+=boids[j].x;
      pcj.y+=boids[j].y;
      // counter++;
    }
  }
  // pcj.div(n-1);

  // if (counter!=0) {
  //   // pcj.div(counter);
  //   pcj.x/=counter;
  //   pcj.y/=counter;
  // }
  pcj.x/=(n-1);
  pcj.y/=(n-1);
  pcj.x-=boids[i].x;
  pcj.y-=boids[i].y;
  // pcj.sub(boids[i]);

  return pcj;
}
// don't get too close other boids
function rule2(i) {
  var c = {x:0,y:0};
  // createVector(0, 0);
  var counter = 0;
  for (var j = 0; j<n; j++) {
    // if (j!=i && boids[j].dist(boids[i])<2*minDist) {
    //     var c2 = createVector(0,0);
    //     c2.sub(boids[j]);
    //     c2.add(boids[i]);
    //     c2.mult(1/(exp(boids[j].dist(boids[i])-minDist)+1));
    //     c.add(c2);
    // }
    if (j!=i && (boids[i].x-boids[j].x)*(boids[i].x-boids[j].x) + (boids[i].y-boids[j].y)*(boids[i].y-boids[j].y)<minDist*minDist) {
      // c.sub(boids[j]);
      // c.add(boids[i]);
      c.x -= (boids[j].x - boids[i].x);
      c.y -= (boids[j].y - boids[i].y);
      counter++;
    }
  }
  if (counter!=0) {
    // c.div(counter);
    c.x/=counter;
    c.y/=counter;
  }
  // c.mult(eLoss);
  return c;
}
// try to match average velocity
//vector boid bj arg
function rule3(i) {
  // vector pvj
  var pvj = {x:0,y:0};
  // createVector(0, 0);
  // for each b in boid
  // if b!=bj then
  // pvj+=b.velocity
  var counter = 0;
  for (var j = 0; j<n; j++) {
    if (j!=i && (boids[i].x-boids[j].x)*(boids[i].x-boids[j].x) + (boids[i].y-boids[j].y)*(boids[i].y-boids[j].y)<seeDist*seeDist) {
      // pvj.add(boidVel[j]);
      pvj.x+=boidVel[j].x;
      pvj.y+=boidVel[j].y;
      counter++;
    }
  }

  if (counter!=0){
    // pvj.div(counter);
    pvj.x/=counter;
    pvj.y/=counter;
  }
  // pvj.sub(boidVel[i]);
  pvj.x-=boidVel[i].x;
  pvj.y-=boidVel[i].y;
  return pvj;
}

function bound(i) {
  // var v = createVector(0, 0);
  // if (boids[i].x < xMin) v.x = 1;
  // if (boids[i].x > xMax) v.x = -1;
  // if (boids[i].y < yMin) v.y = 1;
  // if (boids[i].y > yMax) v.y = -1;
  // return v;
  if (boids[i].x < xMin) boids[i].x = xMax;
  if (boids[i].x > xMax) boids[i].x = xMin;
  if (boids[i].y < yMin) boids[i].y = yMax;
  if (boids[i].y > yMax) boids[i].y = yMin;
}

function limitVelocity(i) {
  // if (boidVel[i].magSq() > vLim*vLim) {
  if (boidVel[i].x*boidVel[i].x+boidVel[i].y*boidVel[i].y > vLim*vLim) {
    // boidVel[i].normalize();//.setMag(vLim);
    // boidVel[i].mult(vLim);
    var x = vLim*boidVel[i].x/sqrt(boidVel[i].x*boidVel[i].x+boidVel[i].y*boidVel[i].y);
    var y = vLim*boidVel[i].y/sqrt(boidVel[i].x*boidVel[i].x+boidVel[i].y*boidVel[i].y);
    boidVel[i].x = x;
    boidVel[i].y = y;
  }
}

function attractMouse(mouseVec, i) {
  var c = {x:0,y:0};
  // createVector(0,0);
  // if (boids[i].dist(mouseVec) < avoid_distance) {
  if ((boids[i].x-mouseVec.x)*(boids[i].x-mouseVec.x) + (boids[i].y-mouseVec.y)*(boids[i].y-mouseVec.y)<avoid_distance*avoid_distance) {
    // c.sub(mouseVec);
    // c.sub(mouseVec);
    c.x-=mouseVec.x;
    c.y-=mouseVec.y;


    // c.add(boids[i]);
    // c.add(boids[i]);
    c.x+=boids[i].x;
    c.y+=boids[i].y;
  }

  // c.normalize();

  return c;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
