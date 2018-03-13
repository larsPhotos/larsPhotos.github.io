var grid;
// var num_cell_width, cell_width;
var num, multiple;
var n;
var count;
function setup() {
  n = 50;
  var cv = createCanvas(2*n + 1, 2*n + 1);
  // var cv = createCanvas(4*n + 2, 4*n + 2);
  cv.parent('ulam')
  console.log((2*n + 1)+' by '+(2*n + 1));
  grid = [];
  num_cell_width = 1;
  // cell_width = width/num_cell_width;
  for (var i = 0; i<width*height; i++) grid[i] = i%2 === 1;
  // for (var i = 0; i<width*height; i++) grid[i] = true;
  num = 3;
  multiple = 2;
  // colorMode(HSB)
  strokeWeight(2);
}

function draw() {
  // background(255)
  background(255,0,0)
  count = 1;
  drawDots()
  // for (var i = 0; i<grid.length; i++) {
  //   // stroke(255*i/(grid.length-1), 255, 255)
  //   // var c = grid[i]? color(255): color(0);
  //   stroke(grid[i]? color(255): color(0));
  //   // set(i%width, floor(i/width), c);
  //   point(i%width, floor(i/width))
  // }
  // updatePixels();
  update();
}

function update() {
  if (num*multiple < grid.length) {
    grid[num*multiple-1] = false;
    multiple++;
  } else if (num > grid.length) {
    console.log('done');
    noLoop();
  }else {
    do {
      num++
      if (num > grid.length) break;
    } while(!grid[num-1])
    multiple = 2;
  }
}

function drawDots() {
  var x = n+1
  var y = n+1
  // stroke(0,255,255)
  // point(x, height-y);
  set(x, height-y, 255)
  var index = 1;
  while (index < grid.length) {
    var direction = count%2 === 0? -1: 1;
    for (var i = 0; i<2*count; i++) {
      if (index >= grid.length) break;
      if (i < count) x+=direction;
      else y+=direction;
      var c = grid[index]? color(255) : color(0);
      // stroke(c)
      // point(2*x-1, height-2*y+1)
      set (x, height-y, c)
      if (x < 0 || x > width || y < 0 || y > height) console.log(x+', '+y);
      // set (2*x-1, height - 2*y-1, c)
      // set (2*x-1, height - 2*y-2, c)
      // set (2*x-2, height - 2*y-1, c)
      // set (2*x, height - 2*y, c)
      // set (x, height-y, grid[index]? color(255*index/(grid.length-1), 255, 255) : color(0))
      // set (2*x+1, height-2*y-1, grid[index]? color(255*index/(grid.length-1), 255, 255) : color(0))
      index++;
    }// end for
    count++;
  }// end while
  updatePixels()
}
