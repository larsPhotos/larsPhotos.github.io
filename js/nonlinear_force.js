var radius = 195;
var g = 9.8;
var c = -g/radius;
var theta_0 = 1.4;
var theta0 = theta_0;
var theta1 = theta_0;
var theta2 = theta_0;
var omega0 = 0;
var omega1 = 0;
var omega2 = 0;
var t = 0;
var dt = 0.01;
function setup() {
  var cv = createCanvas(400,400);
  cv.parent('non_linear_restoring');
}
function draw() {
  background(255);
  strokeWeight(1);
  // drawPendulum(theta_0*cos(sqrt(g/radius)*t), -sqrt(g/radius)*theta_0*sin(sqrt(g/radius)*t), width/2, 0, color(179,62,102));
  drawPendulum(theta0, omega0, width/2, 0, color(179,62,102));
  drawPendulum(theta1, omega1, width/2, 0, color(73,198,180));
  drawPendulum(theta2, omega2, width/2, 0, color(48,136,174));
  strokeWeight(2);
  stroke(0);
  point(width/2,3*height/4);
  line(5,height/2,width-5,height/2);
  strokeWeight(0.2);
  line(5,height-5,width-5,height-5);
  // line(width/2,height-2,width/2,height-8);
  line(width/2,height-2,width/2,height/2);
  line(5,height-5,5,height/2);
  // line(2,3*height/4,8,3*height/4);
  line(2,3*height/4,width,3*height/4);
  t+=dt;
  update();
}
function update() {
  omega0 += c*theta0*dt;
  theta0 += omega0*dt;

  omega1 += c*theta1*(1 - theta1*theta1/6)*dt;
  theta1 += omega1*dt;

  omega2 += c*theta2*(1 - theta2*theta2/6 + theta2*theta2*theta2*theta2/120)*dt;
  theta2 += omega2*dt;
  // if (theta2 > TWO_PI) theta2-=TWO_PI;
  // else if (theta2 < 0) theta2+=TWO_PI;
}
function drawPendulum(angle, dangle, x, y, color) {
  stroke(color);
  strokeWeight(1);
  line(x, y, x + radius*sin(angle), y+radius*cos(angle));
  strokeWeight(4);
  point(width/2+angle*width/TWO_PI, 3*height/4-2*dangle*height/TWO_PI);
  noStroke();
  fill(color);
  ellipse(x + radius*sin(angle), y+radius*cos(angle), 10, 10);
}
