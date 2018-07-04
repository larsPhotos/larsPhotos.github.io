---
layout: post
title: "Marching Squares"
date: 2018-06-23
---

{::nomarkdown}
<script src="https://cdn.rawgit.com/jessejenks/continued-fractions/master/cfraction.js"></script>
<!-- <script src="../../../../../../continued_fractions/cfraction.js"></script> -->
<div style="text-align:center;"><img style="max-width:100%;" src="../../../../data/marching_gifs/marching_squares_large.gif"></div>
<br>
<div style="text-align:center;"><img style="max-width:100%;" src="../../../../data/marching_gifs/marching_squares_small.gif"></div>
<!--([A001333](https://oeis.org/A001333)) 
([A000129](https://oeis.org/A000129))-->
{:/nomarkdown}

An animation based on Mathologers great video on [Deadly Marching Squares](https://www.youtube.com/watch?v=f1yDExNAEMg). This shows a nice visual way of describing the sequence of pairs $$m$$ and $$n$$ such that $$m^2 + m^2 = n^2 \pm 1$$. Starting with $$m=1$$ (or $$0$$) and $$n=1$$, we can build up the sequence with a recurrence relation. Can you figure it out from the animation?

<button class="accordion">Solution</button>
<div class="panel">
<p>
The solution to this problem gives us an interesting intertwined recurrence relation
\[
	\begin{align}
		m &\mapsto m + n\\
		n &\mapsto 2m + n
	\end{align}
\]

giving use two sequences, one for \(m\) and one for \(n\). 

\[
\begin{align}
n &= \{1,3,7,17,41,99,239,577,\ldots\}\\
m &= \{1,2,5,12,29,70,169,408,\ldots\}
\end{align}
\]

And we can check that indeed

\[
\begin{align}
1^2 + 1^2 &= 1^2 + 1\\
2^2 + 2^2 &= 3^2 - 1\\
5^2 + 5^2 &= 7^2 + 1\\
12^2 + 12^2 &= 17^2 - 1\\
&\vdots
\end{align}
\]

Interestingly, if you look at the sequence you get by diving terms in \(n\) by those in \(m\), you get consecutive approximations to the continued fraction for \(\sqrt{2}\)!

In other words

\[
\begin{align}
\frac{3}{2} &= 1 + \frac{1}{2}\\
\frac{7}{5} &= 1 + \cfrac{1}{2+\cfrac{1}{2}}\\
\frac{17}{12} &= 1 + \cfrac{1}{2+\cfrac{1}{2+\cfrac{1}{2}}}\\
&\vdots
\end{align}
\]

which are better and better approximations of \(\sqrt{2}\).

This comes from the fact that \(\sqrt{2}\) is an irrational number. This is why we get the alternating \(\pm 1\) after every term. You can watch Mathologers full video for a neat proof involving the marching squares which inspired these animations, as well as further details. Essentially, being off by \(1\) and no more reflects the fact that continued fractions give us the best possible approximations to irrational numbers.