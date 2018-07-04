---
layout: post
title: "NeuralNet.js"
date: 2018-04-10
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="../../../../js/nn_explanation_xor.js"></script>
<script src="../../../../js/neural_net.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<div id="backprop-example" style="display: flex;justify-content: center;"></div>
<div id="options" style="display: flex;justify-content: center;margin-top: 10px;">
	<div id="train-button"></div>
	<div id="reset-button"></div>
	<div id="add-neuron-button"></div>
	<div id="remove-neuron-button"></div>
</div>

Click 'start training' to see the neural net in action!
<br>
<button class="accordion">What's this?</button>
<div class="panel">
<p>
In a bout of procrastination induced mania last November, I ended up writing a relatively simple neural net in javascript. The example above shows how neural nets can solve the famous XOR problem. The spiky graph you see moving across the screen gives you an idea of how well the network is doing over time. The lower it gets, the better!
</p>
</div>