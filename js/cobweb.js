var r,xVal,max,w,increaseMax,totalMax,c
function setup() {
  r = 4;
  xVal = 0;//1-1/r;//(1+sqrt((4-3*r)/r))/2; //1-1/r;//
  max = 1;
  w = 450;//350;
  increaseMax = true;
  totalMax = 300;
  c = -0.8
  //size(3*(int)w, (int)w);
  var cv = createCanvas(2*w, w);
  // createCanvas(1050,350);
  cv.parent('cobweb')
  stroke(255);
  colorMode(HSB);
  textAlign(CENTER)
  background(0)
}
function draw() {
  background(255)
  fill(0)
  noStroke()
  text("c = "+c.toFixed(4),w/2,100)
  stroke(0);
  noFill()
  for (var i = -2*w; i<w; i++) {
    point((2*w+i)/3, height/2-i/3);
    // point(i, height*(1 - r*(i/w)*(1-(i/w))));
    point((2*w+i)/3, height/2 - height*(i*i/(w*w) + c)/3)
  }
  // if (mouseX<w && mouseX > 0) xVal = mouseX/w;
  // text("x="+xVal, 10, 24);
  stroke(0, 255, 255);
  // line(xVal*w, height, xVal*w, height-height*(r*xVal*(1-xVal)));
  line((2*w+xVal*w)/3, height/2, (2*w+xVal*w)/3, height/2 - height*(xVal*xVal + c)/3)
  if (increaseMax) {
    recurse(xVal, 0);
    if (max < totalMax) {
      max++;
    }
    //delay(80);
  } else max = 0;
  // xVal+=0.01;
  //delay(50);
  //noLoop();
}
function recurse(x, current) {
  if (current < max) {
    var xNew = x*x + c// (r*x*(1-x));
    stroke(current*255/max, 255, 255);
    // stroke(cubehelix(current/max, 1, -1.5, 1))

    line((2*w+x*w)/3, height/2-xNew*height/3, (2*w+xNew*w)/3, height/2-xNew*height/3);

    // line(xNew*w, height-xNew*height, xNew*w, height-height*(r*xNew*(1-xNew)));
    line((2*w+xNew*w)/3, height/2-xNew*height/3, (2*w+xNew*w)/3, height/2-height*(xNew*xNew + c)/3);
    // line(w+current*2*width/(3*max), height-x*height, w+(current+1)*2*width/(3*max), height-xNew*height);
    // line(w+current*2*width/(3*max), height-x*height, w+(current+1)*2*width/(3*max), height-xNew*height);
    line(w+current*width/(max), height/2-x*height/3, w+(current+1)*width/(max), height/2-xNew*height/3);
    recurse(xNew, current+1);
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    c+=0.005;
  } else if (keyCode === LEFT_ARROW) {
    c-=0.005;
  }
}

function keyTyped() {
  if (key === 'r') {
    max = 0
  }
}
// function cubehelix(lambda, s, r, hue) {
// if (lambda >= 1) return color(255);

// var amp = hue*lambda*(1-lambda)/2;
// var phi = 2*PI*(s/3 + r*lambda);

// var red = lambda + amp*(-0.14861*cos(phi) + 1.78277*sin(phi));
// var green = lambda + amp*(-0.29227*cos(phi) -0.90649*sin(phi));
// var blue = lambda + amp*(1.97294*cos(phi));
// return color(red*255, green*255, blue*255);
// }