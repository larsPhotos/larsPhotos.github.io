// Continued Fraction library for js by Jesse Jenks
// Based on the work of the mighty Bill Gosper
// http://www.tweedledum.com/rwg/cfup.htm
// And slides by Mark J. Dominus from
// http://perl.plover.com/yak/cftalk/
// And some work on my own extending the algorithm to general continued fractions

function Cfraction(a, b) {
  // TODO: Truncate the arrays to the shorter of the two
  // TODO: Throw error
  if (a.length > 0) this.a = a;

  this.isSimple = true;

  this.b = [];
  if (b === undefined) for (var i = 0; i<a.length; i++) this.b.push(1);
  else {
    this.b = b;
    // check if this is a simple continued fraction
    for (var j = 0; j<b.length; j++) {
      if (b[j]!=1) {
        this.isSimple = false;
        break;
      }
    }
  }
  // for computing convergents
  this.b.unshift(1);

  // toString method
  this.toString = function() {
    if (!this.a) return 'no representation'
    if (this.a.length===1) return 'a: '+this.a[0]+', b: '+this.b[1];
    var output_string = 'a:['+this.a[0]+'; ';
    for (var i = 1; i<this.a.length-1; i++) {
      output_string+=(this.a[i]+',');
    }
    output_string+= this.a[this.a.length-1]+']';
    if (!this.isSimple) {
      output_string += '\nb:['+this.b[1]+'; ';
      for (var i = 2; i<this.b.length-1; i++) {
        output_string+=(this.b[i]+',');
      }
      output_string+=(this.b[this.b.length-1]+']');
    }
    return output_string;
  };

  // toTex method
  this.toTex = function() {
    return recurse(this.a, this.b, 0);
  }
  // recursion is fun
  function recurse(a,b,i) {
    if (i===a.length-1) if (a.length===1) return ''+a[i]; else return ''+a[i]+'+'+b[i+1];
    else return ''+a[i]+'+\\cfrac{'+b[i+1]+'}{'+recurse(a,b,i+1)+'}';
  }

  this.decimal_string;
}; // end toTex

Cfraction.from_decimal = function(expansion) {
  // assert that expansion is a number?
  var num = expansion
  var a = []
  a.push(Math.floor(num))
  while (a.length < 10 && num-a[a.length-1] > 0) {
    var str = '1/('+num+' - floor['+a[a.length-1]+']) \n\t= 1/('+(num-a[a.length-1])+') \n\t\t= '
    num = 1/(num-a[a.length-1])
    str += num
    console.log(str)
    a.push(Math.floor(num))
  }
  return new Cfraction(a)
};

Cfraction.prototype.construct_numerators_and_denominators = function () {
  var p = [];
  var q = [];
  p[0] = 1;
  q[0] = 0;
  p[1] = this.a[0];
  q[1] = 1;
  if (this.a.length>1) {
    for (var i = 2; i<this.a.length+1; i++) {
      p[i] = this.a[i-1]*p[i-1] + this.b[i-1]*p[i-2];
      q[i] = this.a[i-1]*q[i-1] + this.b[i-1]*q[i-2];
    }
    p[p.length]=p[p.length-1]+this.b[this.b.length-1]*p[p.length-2];
    q[q.length]=q[q.length-1]+this.b[this.b.length-1]*q[q.length-2];
  }
  this.p = p;
  this.q = q;
};

// d is the number of decimal places you want the decimal expansion to go to.
Cfraction.prototype.decimal = function (d) {
  if (this.decimal_string === undefined || this.decimal_string.split('.')[1].length<d) {
    var out = '';
    if (this.p === undefined) this.construct_numerators_and_denominators();
    var p = this.p[this.p.length-1];
    var q = this.q[this.q.length-1];
    var k = 0;
    var s;
    if (q < 0) {
      q = -q;
      p = -p;
    }
    if (p<0) {
      s = -p;
      out+='-';
    }
    else s = p;
    if (q === 0) return out;
    // long division
    for (var i = 0; i<d; i++){
      if (i === 1) out+='.';
      k = Math.floor((s - s%q)/q);
      s = (s%q)*10;
      out+=k;
    }
    this.decimal_string = out;
    return out;
  } else {
    var split = this.decimal_string.split('.');
    return split[0].concat(split[1].slice(0,d+1));
  }
};

// computes max error
// need to double check theorems on this
Cfraction.prototype.error = function (d) {
  if (!this.isSimple) return 'unknown';
  else {
    var out = '';
    if (this.p === undefined) this.construct_numerators_and_denominators();
    var k = 0;
    var s = 1;
    var q = this.q[this.q.length-1];
    // something went wrong
    if (isNaN(q)) return out+'integer';
    q = q*q;
    if (q === 0) return out;
    // long division
    for (var i = 0; i<d; i++){
      if (i === 1) out+='.';
      k = Math.floor((s - s%q)/q);
      s = (s%q)*10;
      out+=k;
      if (k!=0) break;
    }
    return out;
  }
};

// error in scientific notation
Cfraction.prototype.error_sci = function (d) {
  if (!this.isSimple) return 'unknown';
  else {
    var out = '';
    if (this.p === undefined) this.construct_numerators_and_denominators();
    var k = 0;
    var s = 1;
    // Hurwitz
    var q = this.q[this.q.length-1]*this.q[this.q.length-1];
    if (isNaN(q)) return out+'integer';
    var zero_count = 0;
    // var non_zero_count = 0;
    if (q === 0) return out;
    // long division
    for (var i = 0; i<d; i++){
      // if (i === 1) out+='.';
      k = Math.floor((s - s%q)/q);
      s = (s%q)*10;
      // out+=k;
      if (k === 0) zero_count++;
      else {
        out+=k;
        out+='E-'+zero_count;
        break;
      }
      // non_zero_count++;
      // if (non_zero_count > 5) break;
    }
    return out;
  }
};

// k: how many terms to compute
Cfraction.E = function(k) {
  if (k === 1) return new Cfraction([2]);
  var a = [2,1];
  var i;
  for (i = 1; i<Math.floor((k+1)/3); i++) {
    a.push(2*i);
    a.push(1);
    a.push(1);
  }
  var diff = k+1-(3*i);
  if (diff === 2) {
    a.push(2*i);
    a.push(1);
  } else if (diff === 1) a.push(2*i);
  return new Cfraction(a);
}

// k: how many terms to compute
// n: root
Cfraction.E_nth_root = function(k,n) {
  if (k === 1) return new Cfraction([1]);
  var a = [1];
  var i;
  for (i = 1; i<Math.floor((k+1)/3); i++) {
    a.push(2*i*n - n - 1);
    a.push(1);
    a.push(1);
  }
  var diff = k+1-(3*i);
  if (diff === 2) {
    a.push(2*i*n - n - 1);
    a.push(1);
  } else if (diff === 1) a.push(2*i*n - n - 1);
  return new Cfraction(a);
}

// e^{x/y}
Cfraction.E_power = function(k,x,y) {
  if (k === 1) return new Cfraction([1]);
  var a = [1];
  var b = [2*x];
  var i;
  for (i = 0; i<k; i++) {
    if (i === 0) a.push(2*y-x);
    else a.push(4*i*y+2*y);
    b.push(x*x);
  }
  return new Cfraction(a,b);
}

// e^{x}
Cfraction.E_to_the_x = function(k,x) {
  if (k === 1) return new Cfraction([1]);
  var a = [1];
  var b = [x];
  var i;
  for (i = 1; i<=k; i++) {
    if (i === 1) a.push(1);
    else a.push(i+x);
    b.push(-i*x);
  }
  return new Cfraction(a,b);
}

// e^2
// could be computed with e^x method but this converges faster
Cfraction.E_sqrd = function(k) {
  if (k === 1) return new Cfraction([7]);
  var a = [7];
  var b = [2];
  var i;
  for (i = 2; i<k+2; i++) {
    a.push(2*i+1);
    b.push(1);
  }
  return new Cfraction(a,b);
}

// TODO: implement e^{2/(2n+1)}

// ln(z/y);
Cfraction.LOG = function(k,z,y) {
  if (k === 1) return new Cfraction([2*z-2*y]);
  var x = z-y;
  var a = [0];
  var b = [2*x];
  a.push(2*y+x);
  b.push(-x*x);
  for (var i= 2; i<=k; i++) {
    a.push((2*i-1)*(2*y+x));
    b.push(-i*i*x*x);
  }
  return new Cfraction(a,b);
}

// pi like 3.14 that pi
var pi_array = [
  3,7,15,1,292,1,1,1,2,1,3,1,14,2,1,1,2,2,2,2,1,84,2,1,
  1,15,3,13,1,4,2,6,6,99,1,2,2,6,3,5,1,1,6,8,1,7,1,2,3,
  7,1,2,1,1,12,1,1,1,3,1,1,8,1,1,2,1,6,1,1,5,2,2,3,1,2,
  4,4,16,1,161,45,1,22,1,2,2,1,4,1,2,24,1,2,1,3,1,2,1
]
// Cfraction.PI = new Cfraction([
//   3,7,15,1,292,1,1,1,2,1,3,1,14,2,1,1,2,2,2,2,1,84,2,1,
//   1,15,3,13,1,4,2,6,6,99,1,2,2,6,3,5,1,1,6,8,1,7,1,2,3,
//   7,1,2,1,1,12,1,1,1,3,1,1,8,1,1,2,1,6,1,1,5,2,2,3,1,2,
//   4,4,16,1,161,45,1,22,1,2,2,1,4,1,2,24,1,2,1,3,1,2,1
// ]);

Cfraction.PI = function(n) {
  if (n>pi_array.length) {
    return new Cfraction(pi_array)
  } else {
    return new Cfraction(pi_array.slice(0,n))
  }
}
// euler mascheroni gamma constant
gamma_array = [
  0,1,1,2,1,2,1,4,3,13,5,1,1,8,1,2,4,1,1,40,1,11,3,7,1,
  7,1,1,5,1,49,4,1,65,1,4,7,11,1,399,2,1,3,2,1,2,1,5,3,
  2,1,10,1,1,1,1,2,1,1,3,1,4,1,1,2,5,1,3,6,2,1,2,1,1,1,
  2,1,3,16,8,1,1,2,16,6,1,2,2,1,7,2,1,1,1,3,1,2,1,2,13,5
]

Cfraction.GAMMA = function(n) {
  if (n>gamma_array.length) {
    return new Cfraction(gamma_array)
  } else {
    return new Cfraction(gamma_array.slice(0,n))
  }
}

Cfraction.ARCTAN = function(k,x,y) {
  if (k === 1) return new Cfraction([0]);
  var a = [0];
  var b = [x*y];
  for (var i = 1; i<=k; i++) {
    if (i===1) a.push(y*y);
    else a.push(2*i*y*y + y*y - 2*i*x*x + x*x);
    b.push((2*i*x*y - x*y)*(2*i*x*y - x*y));
  }
  return new Cfraction(a,b);
};


// TODO: Figure what strategy gets the fastest convergents
Cfraction.SQRT = function(k,x) {
  var c = 1;
  while (c*c < x) c++;
  if (c > 1) c--;
  var d = x - c*c;
  if (d === 0) return new Cfraction([c]);
  var a = [c];
  var b = [d];
  for (var i = 1; i<k; i++) {
    a.push(2*c);
    b.push(d);
  }
  return new Cfraction(a,b);
};

// not very accurate due to rounding issues like 1/0.33333... != 3
Cfraction.expand = function(k,n) {
  var a1 = Math.floor(n);
  if (n === a1) return new Cfraction([a1]);
  var a = [a1];
  var np = 1/(n - a1);
  // while (np<Infinity) {
  for (var i = 0; i<k; i++) {
    a1 = Math.floor(np);
    a.push(a1);
    np = 1/(np - a1);
  }
  return new Cfraction(a);
};

// possible unnecessary
// function flr(x) {
//   if (x>=0) return Math.floor(x);
//   else return -Math.ceil(-x);

// }

// ax + b/ cx + d
Cfraction.prototype.general_2d = function(a,b,c,d) {
// function(ap,bp,cp,dp) {
  // var a = ap;
  // var b = bp;
  // var c = cp;
  // var d = dp;
  // var matrix = [
  //   a, b,
  //   c, d
  // ];
  var index = 0;
  var output = [];
  // console.log('init\t'+a+', '+b+',\n\t'+c+', '+d);
  while(index <= this.a.length) {
    if (Math.floor(a/c) === Math.floor(b/d)) {
    // if (Math.abs(a*d - b*c) < c*d) { // equivalent to floor(a/c) === floor(b/d)
      // console.log(Math.abs(a*d - b*c)+' < '+c*d);
      if (index === this.a.length) {
        b = a;
        d = c;
      }
      if (c === 0) continue;
      var r = Math.floor(a/c)
      // flr(a/c);
      // console.log(r + ', ' + Math.floor(a/c));
      var temp1 = c;
      var temp2 = d;
      d = b - d*r;
      c = a - c*r;
      b = temp2;
      a = temp1;
      // matrix = [
      //   a, b,
      //   c, d
      // ];
      // the 'continue' from early should have taken care of this...
      // TODO: tests...
      if (r!=Infinity) output.push(r);
      // console.log('out\t'+a+', '+b+',\n\t'+c+', '+d);
      // console.log(output);
    } else {
      var temp1 = this.isSimple? a: a*this.b[index+1];
      var temp2 = this.isSimple? c: c*this.b[index+1];
      a = a*this.a[index] + b;
      b = temp1;
      c = c*this.a[index] + d;
      d = temp2;
      if (isNaN(a)||isNaN(c)) index = this.a.length;
      // matrix = [
      //   a, b,
      //   c, d
      // ];
      // console.log('in\t'+a+', '+b+',\n\t'+c+', '+d);
      index++;
    }
  }
  // console.log(output);
  return new Cfraction(output);
};
// TODO: For the following four:
// check x is nonzero (and y for divide)
// this + x/y
Cfraction.prototype.add_rational = function(x,y) {
  return this.general_2d(y,x,0,y);
};
// this - x/y
Cfraction.prototype.sub_rational = function(x,y) {
  return this.general_2d(y,-x,0,y);
};
// this*x/y
Cfraction.prototype.mult_rational = function(x,y) {
  return this.general_2d(x,0,0,y);
};
// this*y/x
Cfraction.prototype.div_rational = function(x,y) {
  return this.general_2d(y,0,0,x);
};

// axy + by + cx + d
// exy + fy + gx + h

// a b c d
// e f g h
// -> x
// a*x.a_0+c b*x.a_0+d a b
// e*x.a_0+g f*x.a_0+h e f

// a b c d
// e f g h
// -> y
// a*y.a_0+b c*y.a_0+d a c
// e*y.a_0+f g*y.a_0+h e g

// a b c d
// e f g h
// -> q out
// a*y.a_0+b c*y.a_0+d a c
// e*y.a_0+f g*y.a_0+h e g

Cfraction.prototype.add = function (that) {
  // 0 1 1 0
  // 0 0 0 1
  return this.general_4d(0,1,1,0,0,0,0,1,that);
};
Cfraction.prototype.sub = function (that) {
  // 0 1 -1 0
  // 0 0  0 1
  return this.general_4d(0,1,-1,0,0,0,0,1,that);
};
Cfraction.prototype.multiply = function (that) {
  // 1 0 0 0
  // 0 0 0 1
  return this.general_4d(1,0,0,0,0,0,0,1,that);
};
Cfraction.prototype.divide = function (that) {
  // 0 1 0 0
  // 0 0 1 0
  return this.general_4d(0,1,0,0,0,0,1,0,that);
};

Cfraction.prototype.general_4d = function(a,b,c,d,e,f,g,h,that) {
  var testing_string = ''
  var output = [];
  var this_index = 0;
  var that_index = 0;

  while (this_index < this.a.length && that_index < that.a.length) {
    if (!(e===0 || f===0 || g===0 || h===0) && Math.floor(a/e)===Math.floor(b/f) && Math.floor(b/f)===Math.floor(c/g)&& Math.floor(c/g)===Math.floor(d/h)) {
      console.log('output');
      console.log(
        '\n'+
        b+'   '+d+'\n'+
        ' '+f+'   '+h+'\n'+
        a+'   '+c+'\n'+
        ' '+e+'   '+g
      );
      var q = Math.floor(a/e);
      output.push(q);
      console.log(output);
      var init_e = e;
      var init_f = f;
      var init_g = g;
      var init_h = h;

      e = a - q*e;
      f = b - q*f;
      g = c - q*g;
      h = d - q*h;

      a = init_e;
      b = init_f;
      c = init_g;
      d = init_h;

      console.log(
        '\n'+
        b+'   '+d+'\n'+
        ' '+f+'   '+h+'\n'+
        a+'   '+c+'\n'+
        ' '+e+'   '+g
      );
      // e===0 || f===0 || g===0 || h===0 || 
    } 
    // else if (Math.abs(c/g-d/h)>Math.abs(b/f-d/h)) {
    // else if (Math.abs(b/f-a/e)<=Math.abs(c/g-a/e)) {
    else if (Math.abs(b*e-a*f)/f<=Math.abs(c*e-a*g)/g) {
      // console.log('this');
      console.log('input from x');
      console.log(
        'a/e = '+Math.floor(a/e)+'\n'+
        'b/f = '+Math.floor(b/f)+'\n'+
        'c/g = '+Math.floor(c/g)+'\n'+
        'd/h = '+Math.floor(d/h)
      );
      console.log(
        '\n'+
        b+'   '+d+'\n'+
        ' '+f+'   '+h+'\n'+
        a+'   '+c+'\n'+
        ' '+e+'   '+g
      );
      // input from this
      var this_a = this.a[this_index];
      var init_a = a
      var init_b = b
      a = a*this_a+c
      b = b*this_a+d
      c = init_a
      d = init_b
      var init_e = e
      var init_f = f
      e = e*this_a+g
      f = f*this_a+h
      g = init_e
      h = init_f
      this_index++;
      console.log(
        '\n'+
        b+'   '+d+'\n'+
        ' '+f+'   '+h+'\n'+
        a+'   '+c+'\n'+
        ' '+e+'   '+g
      );
    } else {
      // console.log('that');
      console.log('input from y');
      console.log(
        'a/e = '+Math.floor(a/e)+'\n'+
        'b/f = '+Math.floor(b/f)+'\n'+
        'c/g = '+Math.floor(c/g)+'\n'+
        'd/h = '+Math.floor(d/h)
      );
      console.log(
        '\n'+
        b+'   '+d+'\n'+
        ' '+f+'   '+h+'\n'+
        a+'   '+c+'\n'+
        ' '+e+'   '+g
      );
      // input from that
      var that_a = that.a[that_index];
      var init_a = a
      var init_c = c
      a = a*that_a+b
      c = c*that_a+d
      b = init_a
      d = init_c
      var init_e = e
      var init_g = g
      e = e*that_a+f
      g = g*that_a+h
      f = init_e
      h = init_g
      that_index++;
      console.log(
        '\n'+
        b+'   '+d+'\n'+
        ' '+f+'   '+h+'\n'+
        a+'   '+c+'\n'+
        ' '+e+'   '+g
      );
    }
  } // end while
  console.log('this is the output')
  console.log(output)
  return new Cfraction(output);
};


// matrix transformations on
// (axy + bx + cy + d)/(exy + fx + gy + h)
// [  a,  b,  c,  d,
//    e,  f,  g,  h
// ]
// "input from x = [x_0; x_1, x_2, ..., x_k, ...]"
// [  a*x_k+c,  b*x_k+d,  a,  b,
//    e*x_k+g,  f*x_k+h,  e,  f
// ]
// "input from y = [y_0; y_1, y_2, ..., y_k, ...]"
// [  a*y_k+b,  a,  c*x_k+d,  c,
//    e*y_k+f,  e,  g*x_k+h,  g
// ]
