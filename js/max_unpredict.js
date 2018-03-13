var sequence = [0];
var scl = 5;
var pad = 10;
setup = function() {
  var cv = createCanvas(scl*32+1, scl*32+1);
  cv.parent('max_unpredict_sketch');
  // sequence = generate_em([0], 32*32);
  // input = createInput();
  // input.position(20, 65);
  //
  // button = createButton('submit');
  // button.position(150, 65);
  // button.mousePressed(generate);

  textAlign(CENTER, CENTER);
  textSize(18);
  textFont("Helvetica");
};

function draw() {
  background(255);
  for (var i =0; i<sequence.length; i++) {
    var t = '';
    if (sequence[i]) {
      fill(255);
      t = '1';
    } else {
      fill(0);
      t = '0';
    };
    if (sequence[i]) fill(255);
    else fill(0);
    rect(scl*(i%32), scl*floor(i/32), scl, scl);
  };
};

function generate_em(initial, num){

  sequence = initial; // [0]; // [0,1,1,1,0,1,1];
  if (sequence === null){
    sequence = [0];
  }
  if (sequence.length === 1){
    sequence.push( 1 - sequence[0]);
  }

  var iteration = 0;
  var maxIter = num;

  var sum = 0;

  while (iteration<maxIter) {

    //console.log("sequence "+sequence)

    var subsequences = [];
    var n = sequence.length-1;

    var max = 0;
    var maxIndex = -1;

    // find all subsequences
    for (var j = 1; j<=n; j++){
      //console.log(j);
      if (sequence[n]===sequence[n-j]){
        var i = 1;
        var subsequence = {
          seq:[sequence[n]],
          ind:j
        }
        while (sequence[n-i]===sequence[n-(j+i)]){
          subsequence.seq.push(sequence[n-i]);
          i++;
        }
        subsequences.push(subsequence);
      };
    };

    // find the longest subsequence

    for (var k = 0; k<subsequences.length; k++){
      if (subsequences[k].seq.length > max){
        max = subsequences[k].seq.length;
        maxIndex = subsequences[k].ind;
        //console.log("max: "+max+", ind: "+maxIndex);
      };
    };

    // generate the next term in the sequence
    var nextTerm = 1 - sequence[(n-maxIndex)+1];
    if (isNaN(nextTerm)){
      nextTerm = 1 - sequence[n];
    };
    sequence.push(nextTerm)
    sum+=nextTerm;
    // console.log(sum/(n+1));
    iteration++;
  };

  // return sequence;
  return sequence;
}
function getString_em(input, num) {
  var sequence = generate_em(input, num);
  var output=""
  for (var k = 0; k<279;k++) {
    output+=sequence[k];
    if (k > 0 && k%93 === 0) {
      output+='\n';
    }
  };
  output+='...';
  return output;
}
