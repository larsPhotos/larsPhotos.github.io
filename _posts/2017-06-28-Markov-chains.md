---
layout: post
title: "Markov Chains"
date: 2017-06-28
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="../../../../js/markov.js"></script>

<div id="markov" style="display: flex;justify-content: center;"></div>
<div id="reset_button" style="display: flex;justify-content: center;text-align:center;"></div>
<div style="display: flex;justify-content: center;text-align:center">Type to generate markov chain stats<br>Ignores capitalization and punctuation</div>
<div id="message"></div>
<button class="accordion">What's this?</button>
<div class="panel">
<p>
Markov chains are an interesting combination of graph theory and probability. If we look at every pair of letters which appears in a sentence, we can count the number of occurences of each pair and work out some statistics. Here we have a circular graph with edges representing the "tranisition probability". If the letter "e" follows "h" 80% of the time (in a given sentence) while "i" follows "h" only 5% of the time, the next time we see an "h", we are going to bet on the next letter being an "e" over an "i". This graph shows you a real time update of these types of statistics. The grid on the side shows the same information encoded as a matrix. The darker the square, the more often that pair appeared. The matrix represents statistics on letters on the left followed by letters on top.
</p>
</div>