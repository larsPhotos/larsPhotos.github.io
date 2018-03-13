---
layout: post
title: "Higher Order Newton Fractals"
date: 2017-02-15
---
<script src="/js/libraries/p5.js" type="text/javascript"></script>
<script src="/js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="/js/complex.js"></script>
<script src="/js/newton_fractal_2nd_order.js"></script>
<div id="equation"></div>
<!-- <div>$$p'(z)=4z^3 - 6z$$</div>
<div>$$p''(z)=12z^2 - 6$$</div> -->
<br>
<div id="newton-fractal" style="display: flex;justify-content: center;"></div>
<br>
<div style="display: flex;justify-content: center; text-align:center;">Warning: this may take a while to render</div>
<div id="method" style="display: flex;justify-content: center;"></div>
<br>
<button class="accordion">What's this?</button>
<div class="panel">
<p>
A root of a function \(f(x)\) is a number \(c\) such that \(f(c)=0\). Finding roots of functions is an important problem in many fields and Newton's method reduces the problem of finding roots of a function to finding roots of a simpler function. This is an extension of <a href="../../../2016/12/19/newton-fractal">this</a> post. Fundamentally, Newton's method uses something called Taylor's theorem, briefly discussed <a href="../../../2016/12/17/harmonic-motion">here</a>. However, Newton's original method uses a first-order approximation, but we can get faster convergence, that is we can find a root in less time with a second order approximation. But in some cases the increased rate of convergence is outweighed by the greater complexity involved in computation. So people have come up with similar techniques which lie in a good middle ground between fast convergence and fast computation.