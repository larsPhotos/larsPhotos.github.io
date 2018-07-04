function Complex(real, imag) {
  this.real = real;
  this.imag = imag;
  this.toString = function() {
    if (this.imag>=0) return this.real+' + '+this.imag+'i';
    else return this.real+''+this.imag+'i';
  }
};
/*
* var w = new Complex(2,5); // 2+5i
* var z = new Complex(1,1); // 1+2i
* var w_x_z = w.multiply(z); // (2*1 - 5*2) + (2*2 + 5*1)i
*/
Complex.prototype.multiply = function(z) {
  return new Complex(this.real*z.real - this.imag*z.imag, this.real*z.imag + this.imag*z.real);
};
Complex.prototype.scalarMult = function(r) {
  return new Complex(this.real*r, this.imag*r);
};
Complex.prototype.power = function(n) {
  var zNew = new Complex(this.real, this.imag);
  for (var i = 0; i<n-1; i++) {
    zNew = zNew.multiply(this);
  }
  return zNew;
};
Complex.prototype.add = function(z) {
  return new Complex(this.real+z.real, this.imag+z.imag);
};
Complex.prototype.addReal = function(r){
 return new Complex(this.real+ r, this.imag);
};
Complex.prototype.subtract = function(z) {
  return new Complex(this.real-z.real, this.imag-z.imag);
};
/*
* w/z = (a+bi)/(c+di) = (a+bi)(c+di)/(c+di)^2 = (ac - bd)/(c^2 - d^2) + (ad + bc)/(c^2 - d^2) i
*/
Complex.prototype.divide = function(z) {
  return new Complex( (this.real*z.real + this.imag*z.imag)/ (z.real*z.real + z.imag*z.imag), ( z.real*this.imag - this.real*z.imag )/(z.real*z.real + z.imag*z.imag));
};
Complex.prototype.arg = function () {
  return Math.atan2(this.imag, this.real);
};
Complex.prototype.raise_to = function (c) {
  // if (c == 0) return 1
  // var isNegative = (c<0)
  // if (isNegative) c = -c
  // var theta = this.imag*Math.log(c);
  // var coeff = Math.pow(c,this.real);

  // return (isNegative)? new Complex(1,0).divide(new Complex(coeff*Math.cos(theta),coeff*Math.sin(theta))): new Complex(coeff*Math.cos(theta),coeff*Math.sin(theta));
  // 
  // z^c = (x+iy)^c = |z|^c e^i arg(z) c
  var mag = this.magnitude()
  var coeff = Math.pow(mag, c)
  var arg = this.arg()
  var theta = arg*c
  return new Complex(coeff*Math.cos(theta), coeff*Math.sin(theta));
};
Complex.prototype.e_to_the = function() {
  return new Complex(exp(this.real)*cos(this.imag),exp(this.real)*sin(this.imag));
};
// Complex.prototype.e_to_the_taylor = function() {
//   var re = this.real
//   var im = this.imag;
//   var e_real = 1 + re*(1 + re*(1/2 + re*(1/6 + re*(1/24 + re*(1/120 + re*(1/720 + re*(1/5040 + re/40320)))))));
//   var cos = 1 + im*im*(-1/2 + im*im*(1/24 + im*im*(-1/720+im*im/40320))); //3628800
//   var sin = im*(1 + im*im*(-1/6 + im*im*(1/120 - im*im/5040)));
//   return new Complex(e_real*cos,e_real*sin);
// }
Complex.prototype.sin_taylor = function(k) {
  if (k === 1) return this;
  var out = this.subtract(this.power(3).scalarMult(1/6));

  return this.subtract(this.power(3).scalarMult(1/6)).add(this.power(5).scalarMult(1/120)).subtract(this.power(7).scalarMult(1/5040)).add(this.power(9).scalarMult(1/362880));
};
Complex.prototype.cos_taylor = function() {
  // z.power(2).multiply().addReal(1);
  return this.power(2).scalarMult(-1/2).add(this.power(4).scalarMult(1/24)).subtract(this.power(6).scalarMult(1/720)).add(this.power(8).scalarMult(1/40320)).addReal(1);
};

Complex.prototype.gamma = function() {
  if (this.imag === 0) {
    if (this.real === 1) return this;
    else return new Complex(this.real - 1, 0).gamma().multiply(this);
  } else {

  }
};
Complex.prototype.zeta_n = function () {

};
/*
* based on work from http://people.math.sfu.ca/~pmenz/thesis.pdf
* http://numbers.computation.free.fr/Constants/Miscellaneous/zetaevaluations.pdf
*/
Complex.prototype.zeta = function(epsilon) {
  var p, q;
  if (this.real === 0 && this.imag === 0) return new Complex(-1/2, 0);
  if (this.real === 1 && this.imag === 0) return new Complex(Infinity, 0);
  if (this.real < 0) {
    var news = this.scalarMult(-1).addReal(1);
    return news.scalarMult(-1).raise_to(2*Math.PI)
    .multiply(this.scalarMult(Math.PI/2).sin_taylor())
    .multiply(news.gamma())
    .multiply(news.zeta(epsilon))
    .scalarMult(2);
  }
  // else {
  //   var alpha;
  //   if (this.imag === 0) {
  //
  //   } else {
  //
  //   }
  // }
};
Complex.prototype.distance_sqr = function(z){
  return (this.real-z.real)*(this.real-z.real)+(this.imag-z.imag)*(this.imag-z.imag);
};
Complex.prototype.magnitude = function() {
  return sqrt(this.real*this.real + this.imag*this.imag);
};
Complex.prototype.mag_sqr = function() {
  return this.real*this.real + this.imag*this.imag;
};
Complex.prototype.manhattan = function(z) {
  return Math.abs(this.real - z.real) + Math.abs(this.imag - z.imag)
};
