var count, max;
var t;
function setup() {
  var cv = createCanvas(512,512);
  cv.parent('time-travel');
  // background(255);
  count = 0;
  max = 7;
  t = 0;
  // colorMode(HSB);
}
function draw() {
  background(255);
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  // Take the user to a different screen here.
    if (t < 1) t+=0.01;
    else t = 0;
  } else {
    if (mouseX >= 0 && mouseX <= width && mouseY > 0 && mouseY < height) {
      count = floor(max * mouseX/width);
      if (focused) t = mouseX*max/width - count;


    }
  }
  fill(221);
  noStroke();
  rect(0,0,(count+1)*width/max,20);
  noFill();
  // stroke(255*count/max, 255, 255);
  drawLines(count);
  stroke(0);
  strokeWeight(2);
  line(0,0,0,height);
  line(0,0,width,0);
  line(0,height,width,height);
  line(width,0,width,height)

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

function drawLines(n) {
  // for (var i = 0; i<=n; i++) {
  //   var p = Math.pow(2,i);
  //   stroke(cubehelix(i/max, 0, -1.5, 2));
    var p = Math.pow(2,n);
    stroke(cubehelix(n/(max+1), 0, -1.5, 2));
    for (var j = 0; j<p; j++) {
      var x1 = j*width/p;
      var y1 = (p-j-1)*height/p;
      var x2 = x1 + width/p;
      var y2 = (p-j)*height/p;
      line((1-t)*x1 + t*(x1+x2)/2, height-y1, (1-t)*(x1+x2)/2 + t*x2, height-(y1+y2)/2);
      line((1-t)*(x1+x2)/2 + t*x1, height-(y1+y2)/2, (1-t)*x2 + t*(x1+x2)/2, height-y2);
    }
  // }
}
