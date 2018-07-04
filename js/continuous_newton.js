var s, s_p;
// number of points
var num;
var n;
var dt;
var values;
var threshold;

var r_lower_bound, r_upper_bound, i_lower_bound, i_upper_bound;
var w, h, buffer;

function setup() {
  w = 400;
  h = 400;
  buffer = 16;
  var cv = createCanvas(w+buffer,h+buffer);
  cv.parent('newton');
  n = 8;
  num = n*n;
  r_lower_bound = -2;// -PI;
  r_upper_bound = 2;// PI;
  i_lower_bound = -2;// -PI;
  i_upper_bound = 2;// PI;
  s = [];
  s_p = [];
  values = [];
  for (var i = 0; i<num; i++) {
    s[i] = new Complex(r_lower_bound + (i%n)*(r_upper_bound - r_lower_bound)/n + (r_upper_bound - r_lower_bound)/(2*n), i_lower_bound + floor(i/n)*(i_upper_bound - i_lower_bound)/n + (i_upper_bound - i_lower_bound)/(2*n));
    // new Complex(random(r_lower_bound/2,r_upper_bound/2), random(i_lower_bound/2,i_upper_bound/2));
    values[i] = [];
    values[i][0] = s[i];
  }
  dt = 0.02;
  threshold = 0.002;
  // noFill();
  // strokeWeight(2);
}

function draw() {
  background(255);
  for (var i = 0; i<values.length; i++) {
    stroke(0);
    for (var j = 0; j<values[i].length-1; j++) {
      line(w*(values[i][j].real - r_lower_bound)/(r_upper_bound - r_lower_bound), h - h*(values[i][j].imag - i_lower_bound)/(i_upper_bound - i_lower_bound),
      w*(values[i][j+1].real - r_lower_bound)/(r_upper_bound - r_lower_bound), h - h*(values[i][j+1].imag - i_lower_bound)/(i_upper_bound - i_lower_bound));
      // point(w*(values[i][j].real + 2)/4, h - h*(values[i][j].imag + 2)/4);
    }
    // draw arrowhead
    if (values[i].length >= 2){
      stroke(155,0,0);
      var x = w*(values[i][values[i].length-1].real - r_lower_bound)/(r_upper_bound - r_lower_bound);
      var y = h - h*(values[i][values[i].length-1].imag - i_lower_bound)/(i_upper_bound - i_lower_bound);
      var dx = values[i][values[i].length-1].real - values[i][values[i].length-2].real;
      var dy = values[i][values[i].length-2].imag - values[i][values[i].length-1].imag;

      var theta = Math.atan2(dy, dx)
      // Why doesn't processing atan2 work???
      // JK IT WAS F*CIKING JAVSCRIPT VARAIBLE NONSESNE AS USUSLAS: SRS HLI :ALOTWGpeilu
      // if (dx > 0) theta = atan(dy/dx);
      // else if (dx < 0) {
      //   if (dy >= 0) theta = atan(dy/dx) + PI;
      //   else theta = atan(dy/dx) - PI;
      // } else if (dx === 0) {
      //   if (dy > 0) theta = PI/2;
      //   else if (dy < 0) theta = -PI/2;
      //   else theta = 0;
      // }
      line(x,y,x+5*cos(theta - 3*PI/4),y+5*sin(theta - 3*PI/4));
      line(x,y,x+5*cos(theta + 3*PI/4),y+5*sin(theta + 3*PI/4));
    }
  }
  stroke(0);
  line(0,h - h*( - i_lower_bound)/(i_upper_bound - i_lower_bound),w,h - h*( - i_lower_bound)/(i_upper_bound - i_lower_bound));
  line(w*(- r_lower_bound)/(r_upper_bound - r_lower_bound), 0, w*(- r_lower_bound)/(r_upper_bound - r_lower_bound), h);
  print_message();
  update();
}

function update() {
  var num_below_thresh = 0;
  for (var i = 0; i<s.length; i++) {
    s_p[i] = zeta(s[i]).divide(zeta_p(s[i])).scalarMult(-1);
    s[i] = s[i].add(s_p[i].scalarMult(dt));
    values[i].push(s[i]);
    if (s_p[i].mag_sqr() < threshold*threshold/(dt*dt)) {
      // noLoop();
      num_below_thresh++;
      // console.log('s['+i+'] got below the threshold');
    }
  }
  if (num_below_thresh === s.length) {
    noLoop();
    console.log('They all got really close');
  }
}
function zeta(z) {
  return z.power(4).subtract(z.power(2).scalarMult(3)).addReal(3);
  // z.power(6).scalarMult(6).add(z.power(5).scalarMult(5)).add(z.power(4).scalarMult(4)).addReal(1);
  // z.cos_taylor();
  // z.sin_taylor();
}
function zeta_p(z) {
  return z.power(3).scalarMult(4).subtract(z.scalarMult(6));
  // z.power(5).scalarMult(36).add(z.power(4).scalarMult(25)).add(z.power(3).scalarMult(16));
  // z.sin_taylor().scalarMult(-1);
  // z.cos_taylor();
}
function print_message() {
  noStroke();
  fill(0);
  // text(+', '+r_upper_bound+' ] x [ '+i_lower_bound+'i, '+i_upper_bound+'i ]',10,h);
  var rl = '['+r_lower_bound;
  var ru = r_upper_bound+'';
  var il = '['+i_lower_bound;
  var iu = i_upper_bound+'';
  text(rl.slice(0,6)+', '+ru.slice(0,5)+'] x '+il.slice(0,6)+'i, '+iu.slice(0,5)+'i]', 10,h);
}
