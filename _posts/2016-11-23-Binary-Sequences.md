---
layout: post
title: "Binary Sequences"
date: 2016-11-22
---

<link rel="stylesheet" type="text/css" href="../../../../css/unpredictable.css">
<script src="../../../../js/max_unpredict.js"></script>
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<!-- Sage Stuff  -->
<script src="https://sagecell.sagemath.org/static/jquery.min.js"></script>
<script src="https://sagecell.sagemath.org/embedded_sagecell.js"></script>
<!-- Create a sage cell -->
<script>
$(function() {
  sagecell.makeSagecell({
    inputLocation: '#debruijn',
    evalButtonText: 'See De Bruijn Graph'});
  });
</script>

## Maximally Unpredictable Sequences
---
Recently, my [abstract algebra teacher](buzzard.pugetsound.edu) mentioned a very interesting class of binary sequences called "maximally unpredictable" sequences, so I decided to make a simple generator. Hit `Generate Sequence` if you want to see the original sequence([A038219](https://oeis.org/A038219)) described in Ehrenfeucht and Mycielski's paper(1), or type in any binary sequence and this will generate the "most unpredictable" sequence based off of your input.

<input type="text" id="inputSequence" Placeholder="0,1,0">
<br>
<input type="submit" onClick="doStuff()" value="Generate Sequence">
<code id="showSequence1"></code>
<script>
function doStuff() {
  var input = document.getElementById("inputSequence").value.split(",").map(function(num){
      if (num === "0" || num === "1"){
        return parseInt(num);
      } else if (num === " 0" || num === " 1"){
        return parseInt(num.slice(1))
      }
    });
    if (input[0]===undefined){ input = [0];}
  document.getElementById("showSequence1").innerText = getString_em(input, 32*32);
}
</script>
<div id="max_unpredict_sketch"></div>
A 32 by 32 grid, ordered left to right, top to bottom to visualize the pseudorandomness of the sequence.

Over winter break I plan to make a more interactive version.
## The Thue-Morse Sequence
---
I first got interested in binary sequences in the summer of 2014 when I came across the Thue-Morse sequence ([A010060](https://oeis.org/A010060)). This sequence is defined recursively:

{::nomarkdown}
\[
  \begin{align*}
    T_0 &= 0\\
    T_{2n} &= T_{n}\\
    T_{2n+1} &= 1 - T_{n}
  \end{align*}
\]
{:/nomarkdown}

The recursive definition makes it very appealing to computer scientists. For example, you can indefinitely generate terms with just a few lines of code:

~~~ javascript
var T = [];
T[0] = 0;
let n = 0;
while (n < infinity) {
  T[2*n] = T[n];
  T[2*n + 1] = 1 - T[n];
  n++;
};
~~~

Here's what that sequence looks like.

~~~ javascript
01101001100101101001011001101001100101100110100101101001100101101001011001101001011010011001011001101...
~~~

That summer I spent an inordinate amount of time working out this closed form solution

{::nomarkdown}
\[T_n=1+\left(\sum_{k=0}^{\lfloor\log_2(n)\rfloor-1}\left\lfloor\frac{n}{2^k}\right\rfloor\mod 2\right)\mod 2\]
{:/nomarkdown}

There are other closed form solutions involving sines and binomial coefficients, but I have not seen this particular solution anywhere.

One of the interesting properties this sequence has is that the n-th term counts the number of 1s (mod 2) in the path from the root to the n-th node in the following tree. I later found out that this was some "well-known" result, but I guess it depends who you ask.

This sequence has some very interesting 'fractal' properties as well. For example, if you break up the sequence into 'chunks' of length $$2^n$$, and stack these chunks on top of each other, we get some cool patterns. For example if $$n=2$$, we take the first 4 terms of the sequence as a row, then the next row has the 5th through 8th term, and so on. Here are those patterns for $$n$$ = 1, 2, 3, and 4.

{::nomarkdown}
<iframe src="../../../../js/thue.html", width="671px", height="161px"></iframe>
{:/nomarkdown}

But the coolest property has got to be this: if you interpret the sequence as a set of instructions where 0 means move forward, and 1 means rotate π/3, a familiar pattern begins to emerge...

{::nomarkdown}
<iframe src="../../../../js/thue-turtle.html", width="512px", height="512px"></iframe>
{:/nomarkdown}

Details on why this happens can be found [here](http://personal.kenyon.edu/holdenerj/StudentResearch/WhenThueMorsemeetsKochJan222005.pdf).

## De Bruijn Sequences
---
The final binary sequence I want to talk about here is another class of binary sequences called De Bruijn sequences. These are not necessarily binary sequences, but the easiest to visually see in binary. De Bruijn sequences are, in a sense the most efficient way of encoding permutations. These sequences are named after Nicolaas Govert de Bruijn, a Dutch mathematician who probably deserves his own post. But for now, here is an embedded Sagemath cell.

A (2,3) De Bruijn sequence looks like this: <code>00010111</code>. This string contains every possible 8-bit sequence which you can see by looking at consecutive strings of length 3.
<!-- <code> 000 1011100</code><br>
<code>0 001 011100</code><br>
<code>00 010 11100</code><br>
<code>000 101 1100</code><br>
<code>0001 011 100</code><br>
<code>00010 111 00</code><br>
<code>000101 110 0</code><br>
<code>0001011 100 </code><br> -->
But how do we find these sequences? It turns out these sequences correspond exactly to what are called *Hamiltonian cycles*, or a path through a certain type of graph which touches every vertex exactly once, and returns to the starting vertex. To see what I mean, check out the sage cell below.
<!-- De Bruijn Graph demo -->
<div id="debruijn" style="width: 100%;"><script type="text/code">
# Sagemath
# Edit me!
B = digraphs.DeBruijn(2, 3)
# see what happens with DeBruijn(2, x) for large values of x!
E = B.edges()
V = B.vertices()
myList = [0,1,2,5,3,7,6,4,0]
sequence = ''
space = ''
list = ''
for index in myList:
    sequence += str(V[index][0])
    list += space+str(V[index])+'\n'
    space+=' '
print sequence+'0'
print list
R = rainbow(B.num_verts()) # 2^3
# someday hamiltonian paths will be found automatically
colors = {
    # color edges by order in sequence
    R[0]:[(V[0],V[1])], # [E[1]],
    R[1]:[(V[1],V[2])], # [E[2]],
    R[2]:[(V[2],V[5])], # [E[5]],
    R[3]:[(V[5],V[3])], # [E[11]],
    R[4]:[(V[3],V[7])], # [E[7]],
    R[5]:[(V[7],V[6])], # [E[14]],
    R[6]:[(V[6],V[4])], # [E[12]],
    R[7]:[(V[4],V[0])], # [E[8]],
    # grey edges
    (0.8,0.85,0.9):[E[0],E[3],E[4],E[6],E[9],E[10],E[13],E[15]]
}
B.show(layout='circular', vertex_size=800, edge_colors=colors)
</script></div>

#### (1) *Ehrenfeucht, A., & Mycielski, J. (1992). A Pseudorandom Sequence--How Random Is It? The American Mathematical Monthly, 99(4), 373-375. doi:10.2307/2324917*
