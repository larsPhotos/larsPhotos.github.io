---
layout: post
title: "Continuous Newton Method"
date: 2016-12-27
---
<script src="/js/libraries/p5.js" type="text/javascript"></script>
<script src="/js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="/js/complex.js"></script>
<script src="/js/continuous_newton.js"></script>
<div>$$\dot{s}(t) = -\frac{p(s(t))}{p'(s(t))}$$</div>
<div>$$p(z) = z^4 - 3z^2 + 3$$</div>
<div id="newton" style="display: flex;justify-content: center;"></div>
<button class="accordion">What's this?</button>
<div class="panel">
<p>
What if we treat <a href="/blog/2016/12/19/newton-fractal">Newton's method</a> as a differential equation? This is called the "continuous" newton method.
</p>
</div>
