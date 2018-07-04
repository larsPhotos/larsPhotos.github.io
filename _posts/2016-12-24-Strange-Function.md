---
layout: post
title: "Time-Travelling Function"
date: 2016-12-24
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="../../../../js/time_travel.js"></script>
Suppose someone hands you a square sheet of paper with a diagonal drawn from the bottom left to the top right. Here's the challenge: by only cutting and rearranging the pieces of the paper *without rotating any of the pieces*, can you completely reverse the diagonal? That is, can you turn the original diagonal into the diagonal from top left to bottom right?

<button class="accordion">A Solution</button>
<div class="panel">
<p>
<div id = "time-travel" style="display: flex;justify-content: center;"></div>
</p>
</div>

<button class="accordion">What's this?</button>
<div class="panel">
<p>
Why did I call this the Time-Travelling function? In 2015 I took a philosophy course called "Space and Time", and one question that came up was whether time is continuous. After all, all scientific measurements are in terms of rational numbers, so is there really any reason to believe that time is a continuum? And yet, in any physics equation, the variable \(t\) representing time is always treated as a real number. I was trying to argue against continuous time when I came up with this sequence of functions.
<br>Imagine running along a 100 meter track. When you run past the 75 meter mark, you believe you ran the first 50 meters already. But why do you believe this? It isn't necessarily because you actually ran the first 50 meters but because at the moment you cross the 75 meter mark, your brain is in a state where you recall having done so. In other words, at any given moment, the only connection between the current state of your brain and memory and any past event is the assumption that a causal relationship exists between that past event and your current state. Maybe you think this is silly, but it is important to recognize that this is indeed an assumption, and if we reject this assumption, we get some strange behavior. 
<br>
What if the percieved order of the sequence of events was slightly different than the "actual" order of events? For example, you run from the 50 yard mark to the 100 yard mark believing you have already run the first 50 yards. But in reality, You run the last half of the race <em>before</em> you run the first half. And yet, because the state of your brain, recall having run the first half before you actually do.
But then the same argument applies recursively to the first half of the first half of the race, and the first half of the first half of the first half, and so one. Now what if we plot a graph of our perception of time versus "real" time<sup>1</sup>, or the perceived sequence of events, and the "actual" sequence? We get the graph we see above.
<br><br>
This is similar to Zeno's paradoxes in some ways.
<br>
Some technical details.<br>
Let \(u_n:[0,1)\rightarrow[0,1)\) be defined as $$u_n(x) = x + 1 - (\frac{2k+1}{2^n})$$ if \(\frac{k}{2^n} \leq x < \frac{k+1}{2^n}\). In other words \(k=\lfloor2^n x\rfloor\)Then \(u_0(x) = x\), and for \(n>0\), \(u_n(x)\) is discontinuous at \(2^n\) points, but \(lim_{n\to\infty}u_n(x)=1-x\), a continuous function. Any rational of the form \(\frac{m}{2^n}\) will eventually have a discontinuity, and once there is a discontinuity at that point, the discontinuity remains for every subsequent function. This is very strange. The number of discontinuities doubles

<br>
Letting \(u(x)=1-x\), for any \(\epsilon>0\), if \(n>-\log_2(\epsilon)\) (in other words \(\frac{1}{2^n}<\epsilon\)), then $$\lvert u(x) - u_n(x)\rvert < \epsilon$$ for any \(x\in[0,1)\). This shows that this sequence of functions converges uniformly to \(u(x)\).

<h3> Generalizations </h3>
We don't need to chop up the line exactly in half. In fact, we can chop it at any point for each "sub-square", but that makes for a much more complicated equation. I can't quite prove it, but I think you can "shift" each subsquare in such a way that it <br><br>
<sup>1</sup> Not the Bill Maher show.
<!-- </div> -->
