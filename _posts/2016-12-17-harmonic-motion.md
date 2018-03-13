---
layout: post
title: "Simple Harmonic Motion"
date: 2016-12-17
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="../../../../js/nonlinear_force.js"></script>
<div style="color:#B33E66;">$$\frac{d^2\theta}{dt^2}=-\frac{g}{l}\theta$$</div>
<div style="color:#49C6B4;">$$\frac{d^2\theta}{dt^2}=-\frac{g}{l}\left(\theta-\frac{\theta^3}{3!}\right)$$</div>
<div style="color:#3088AE;">$$\frac{d^2\theta}{dt^2}=-\frac{g}{l}\left(\theta-\frac{\theta^3}{3!}+\frac{\theta^5}{5!}\right)$$</div>
<div id="angle"></div>
<br>
<main style="display:flex;justify-content:center;">
<div style="padding-top:250px;">$$\frac{d\theta}{dt}$$</div>
<div id="non_linear_restoring" style="display: flex;justify-content: center;text-align: center;"></div>
</main>
<div>$$\theta$$</div>
<br>
<button class="accordion">What's this?</button>
<div class="panel">
<p>
Physicists love using the "small angle approximation". Often when dealing with things that are being rotated by some angle \(\theta\), describing the motion accurately will often involve taking the sine of that angle \(\sin(\theta)\). However this often makes the math much more complicated, so physicists will use the fact that for small values of \(\theta\) (like really small angles) \(\sin(\theta)\approx\theta\). This comes from what is known as the Taylor series for the sine function:
$$\sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots$$
so if \(x\) or \(\theta\) is tiny, all of the stuff after the first term is pretty tiny, so you can write
$$\sin(x) = x \pm \text{some stuff.}$$
But how much difference does that stuff make?
<br>
This simulation suggests that it can actually make quite a big difference.
</p>
</div>
