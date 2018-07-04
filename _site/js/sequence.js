function generate_em(initial){

  var sequence = initial; // [0]; // [0,1,1,1,0,1,1];
  if (sequence === null){
    sequence = [0];
  }
  if (sequence.length === 1){
    sequence.push( 1 - sequence[0]);
  }

  var iteration = 0;
  var maxIter = 150;

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
  var output=""
  for (var k = 0; k<sequence.length;k++) {
    output+=sequence[k];
  };
  return output;
}
function generate_thm(){
  var sequence = []
  sequence[0] = 0;
  var output=""
  for (var i = 0; i<=100; i++){
    sequence[2*i] = sequence[i];
    sequence[2*i + 1] = 1-sequence[i];
    // if (i % 4 === 0) output+="\n";
    output+=sequence[i];
  }
  return output;
}
