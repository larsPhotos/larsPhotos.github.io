var max, mult, rScale, iScale;// = 0.125;
var rMin, rMax, iMin, iMax;
//int multCol = 15;
var tol, cr, ci;//0.03;

var shift;

function setup() {
  var cv = createCanvas(420, 630);
  cv.parent('newton-fractal');
  //size(200,200);
  //colorMode(HSB);
  max = 24;
  mult = 1;//1.4;
  rScale = 2;
  iScale = rScale*height/width;

  cr = 0;
  ci = 0;

  rMin = cr - rScale/2
  rMax = cr + rScale/2

  iMin = ci - iScale/2
  iMax = ci + iScale/2

  tol = 0.1;// 0.00002;
  // t = 0;//-0.72;
  cr = 0;
  ci = 0;

  shift = 2;

  maxValue = 0

  background(0);
}
function draw() {
  for (var i = 0; i<width*height; i++) {
    if (i%width >= width/2 - 1) {
      var x = cr + rMin + (rMax-rMin)*((i+shift)%width)/width
      var y = ci + iMax + (iMin-iMax)*floor((i+shift)/width)/height
    } else {
      var x = cr + rMin + (rMax-rMin)*(i%width)/width
      var y = ci + iMax + (iMin-iMax)*floor(i/width)/height
    }
    // var x = cr + rMin + (rMax-rMin)*(i%width)/width
    // var y = ci + iMax + (iMin-iMax)*floor(i/width)/height
    set(i%width, floor(i/width), cubehelix(newton(x, y)/max,0.5,-1.5,2));
  }
  console.log(maxValue)
  updatePixels();
  noLoop();
}
function newton(real, imag) {
  var z = new Complex(real, imag);
  for (var j = 0; j<max; j++) {

    var top = z.power(4).subtract(z.multiply(z).scalarMult(3)).addReal(2);
    var bottom = z.power(3).scalarMult(4).subtract(z.scalarMult(6));
    var newZ = z.subtract(top.divide(bottom));

    if (newZ.distance_sqr(z) < tol*tol) return mult*j;
    z = newZ;
  }
  return max;
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
