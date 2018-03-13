---
layout: post
title: "Continued Fractions"
date: 2016-12-23
---
<script src="https://cdn.rawgit.com/jessejenks/continued-fractions/master/cfraction.js"></script>
### A quick guide to my continued fraction library so far.
This will be updated and reformatted as I work out bugs and add features.
<div id = "euler"></div>
In general the continued fraction
<div id = "general"></div>

can be constructed like so:
~~~ javascript
var myNumber = new Cfraction([a_0,a_1,a_2,a_3,a_4],[b_0,b_1,b_2,b_3,b_4]);
~~~
To create a simple continued fraction, like $$e$$, just do
~~~ javascript
var euler = new Cfraction([2,1,2,1,1,4,1,1,8]);
~~~
On the other hand, you could use the built in E method to generate the first 9 terms for $$e$$
~~~ javascript
var euler = Cfraction.E(9);
~~~
If you want to return the $$\LaTeX$$ code for your continued fraction, just use
~~~ javascript
euler.toTex();
~~~
which will return the string
<div id = "tex_verbatim"></div>
Note that `\cfrac{}{}` is included in the `amsmath` package if you are trying to write directly to a tex file.
Now if you want the decimal expansion (as a string), to say 1000 decimal places, just write
~~~ javascript
euler.decimal(1000);
~~~
If you want to find bounds on the error, just write
~~~ javascript
euler.error(20);
~~~
This will return the first 20 decimal places or whenever the first nonzero digit appears. Note that this method applies only to simple continued fractions.
You can also get the error in scientific notation by calling
~~~ javascript
euler.error_sci(20);
~~~
Bringing this all together:
<div id = "e_function"></div>
Now if you want $$e^{1/n}$$, just use
~~~ javascript
var euler_nth_root = Cfraction.E_nth_root(9,n);
~~~
For example, the square root of $$e$$ using `Cfraction.E_nth_root(9,2)`:
<div id = "e_root_function"></div>
If you need a weird power $$e^{x/y}$$, use
~~~ javascript
var euler_power = Cfraction.E_power(9,x,y);
~~~
For example $$e^{5/2}$$
<div id = "e_power"></div>
`Cfraction.PI()` will return the fixed value
<div id = "pi"></div>
We also have the log function, so `Cfraction.LOG(9,2,1)` gives us $$\log(\frac{2}{1})$$ or
<div id = "log2"></div>
We can computer $$\sqrt{7}$$ easily with `Cfraction.SQRT(9,7)`,
<div id = "sqrt"></div>
## Gosper's algorithm
---
Thanks to Bill Gosper, we can now actually use continued fractions for essentially infinite precision computation!
To use his own example, suppose we want to find the continued fraction expansion of $$\tanh(\frac{1}{2})=\frac{e-1}{e+1}$$ given that we already have the expansion for $$e$$. In general, the expansion of $$\frac{ax+b}{cx+d}$$ can be found by calling
`x.general_2d(a,b,c,d);`
So calling
`euler.general_2d(1,-1,1,1)` gives
<div id = "gosper"></div>
This allows us to compute things like $$\pi+\frac{5}{7}$$, and with a slight modification of his original algorithm we can use this algorithm with generalized continued fractions!
<div id = "gosper_general"></div>
As you can see expansions for $$\pi$$ with patterns tend to converge quite slowly, which is why I have a fixed value.
<div id = "gamma"></div>

<script>
  var e = Cfraction.E(9);
  // new Cfraction([0,1,3,5],[4,1,4,9]);
  // new Cfraction([3,7,  15,1,292]);
  var textNum = new Cfraction(['a_0','a_1','a_2','a_3','a_4'],['b_0','b_1','b_2','b_3','b_4']);

  document.getElementById('euler').innerText = '$$' + e.toString() + '=' + e.toTex() + ' \\approx ' + e.decimal(15) + '$$';

  document.getElementById('general').innerText = '\\('+textNum.toString()+'\\) or \n$$'+textNum.toTex()+'$$';

  document.getElementById('tex_verbatim').innerText = e.toTex();

  document.getElementById('e_function').innerText = '\\('+e.toString() + ' = ' + e.toTex()+' \\rightarrow \\lvert'+e.decimal(10)+ ' - e\\rvert <' + e.error(20) + ' = \\)'+e.error_sci(20);

  var e_sqrt = Cfraction.E_nth_root(9,2);
  document.getElementById('e_root_function').innerText = '\\('+e_sqrt.toString() + ' = ' + e_sqrt.toTex()+' \\rightarrow\\lvert '+e_sqrt.decimal(10)+ ' - \\sqrt{e} \\rvert < ' + e_sqrt.error(20) + '\\)';

  var e_power = Cfraction.E_power(5,5,2);
  document.getElementById('e_power').innerText = '\\('+e_power.toString() + ' = ' + e_power.toTex()+' = '+e_power.decimal(10)+ '\\)';

  var pi = Cfraction.PI;
  document.getElementById('pi').innerText = '\\('+pi.toString() +'\\)\n which has error < '+pi.error_sci(30);

  var log2 = Cfraction.LOG(9,2,1);
  document.getElementById('log2').innerText = '\\('+log2.toString() +'\\)\n which gives \\( '+log2.toTex()+'\\approx'+log2.decimal(20)+'\\)';

  var root = Cfraction.SQRT(9,7);
  document.getElementById('sqrt').innerText = '\\('+root.toString()+'\\approx'+root.decimal(20)+'\\)';

  var gosp = e.general_2d(1,-1,1,1);
  document.getElementById('gosper').innerText = '\\(\\frac{e-1}{e+1}='+gosp.toString() +'='+gosp.toTex()+'\\approx'+gosp.decimal(20)+'\\)';

  var pi_gen = new Cfraction([0,1,3,5,7,9,11],[4,1,4,9,16,25,36]);
  var gosp_gen = pi_gen.add_rational(5,7);
  document.getElementById('gosper_general').innerText = '\\('+pi_gen.decimal(20)+' \\approx \\\\'+pi_gen.toTex()+' + \\frac{5}{7} = '+gosp_gen.toTex()+' \\approx '+gosp_gen.decimal(20)+'\\)';

  var gamma = Cfraction.GAMMA;
  document.getElementById('gamma').innerText = '\\(\\gamma \\approx '+gamma.decimal(50)+'\\)';

  var x1 = new Cfraction([1,3,5,7,9,11,13]);
  var y1 = new Cfraction([2,2,4,2,4,2,4]);
  console.log(x1.general_4d(2,1,0,0,1,0,1,0,y1).toString());;
</script>
<!-- {::nomarkdown} -->
<!-- <iframe src="https://docs.google.com/presentation/d/1-TmhFQGjL59omLF0K89yh0RkPcxI2JkNjmjev9p5hoU/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe> -->
<!-- {:/nomarkdown} -->
