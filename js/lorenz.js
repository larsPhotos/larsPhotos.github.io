var x, y, z;
var dx, dy, dz;
var rho, sigma, beta;
var dt
var scale
var t
var index
var maxIndex
var values
var buffer
function setup() {
  buffer = 50
  // var cv = createCanvas(400,400+buffer)
  var cv = createCanvas(400,400)
  cv.parent('lorenz')
  rho = 28
  sigma = 10
  beta = 8/3

  dt = 0.01
  t = 0

  x = 1
  y = 1
  z = 0

  index = 0
  maxIndex = 1000

  values = []
  values[index] = [x, y, z]

  // background(0)
  strokeWeight(2)
  colorMode(HSB)
}

function draw() {
  scale = 5
  background(0)
  for (var i = 0; i<index; i++) {
    // stroke(i, 255, 255);
    stroke(i%360,255,255)
    point(
      // width/2 + scale*cos(t)*values[i].x + scale*sin(t)*values[i].z,
      // height/2 - buffer/2 - scale*values[i].y
      width/2 + scale*cos(t)*values[i][0] + scale*sin(t)*values[i][2],
      height/2 - buffer/2 - scale*values[i][1]
    )
    // point(width*i/index, height - buffer/2 - (values[i][0]+values[i][1]+values[i][2])/3)
    // stroke(0,255,255)
    // point(width*i/index, height - buffer/2 - values[i][0])
    // stroke(170,255,255)
    // point(width*i/index, height - buffer/2 - values[i][1])
    // stroke(255,255,255)
    // point(width*i/index, height - buffer/2 - values[i][2])
  }
  if (index < maxIndex) update()
  t+=dt
  if (t > TWO_PI) t-=TWO_PI
}
function update() {
  dx = sigma*y-sigma*x
  dy = x*rho - x*z - y
  dz = x*y - beta*z

  x += dx*dt
  y += dy*dt
  z += dz*dt

  // values[++index] = {x:x, y:y, z:z}
  values[++index] = [x, y, z]

  // console.log(x+', '+y+', '+z)
}

function mousePressed() {
  index = 0
  x = Math.random()*2 - 1
  y = Math.random()*2 - 1
  z = Math.random()*2 - 1
  values = []
  // values[index] = {x:x, y:y, z:z}
  values[index] = [x, y, z]
}
