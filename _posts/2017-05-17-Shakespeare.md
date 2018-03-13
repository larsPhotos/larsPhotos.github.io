---
layout: post
title: "Shakespeare's Sonnets"
date: 2017-03-17
---
<script src="../../../../js/libraries/p5.js" type="text/javascript"></script>
<script src="../../../../js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<script src="../../../../js/sonnets.js" type="text/javascript"></script>

<div id="similarity" style="display: flex;justify-content: center;"></div>
<div id="selectors" style="display: flex;justify-content: center;text-align:center;margin-top:10px;"></div>
<div id="tfidf" style="display: flex;justify-content: center;text-align:center;margin-top:10px;"></div>
<span style="display: flex;justify-content: center;text-align:center;font-size:14px;">The similarity of every Shakespearean sonnet with every other one.</span>

Suppose we are given the task of deciding how "similar" or "dissimilar" two poems are. For us humans, it is relatively easy to just read two poems and decide that yes, these two poems are similar, perhaps based on style or subject. But if we are given dozens of poems this becomes more difficult. On top of that, two people may disagree wildly even when you choose the same judging criteria. In the field of Natural Language Processing there are a few simple tools that can give us a more precise definition of how 'similar' two pieces of text are. I just took a course called "Intro to A.I." where my final project touched on this, and one day I had a 23 hour train ride ahead of me, so I decided to analyze all of Shakespeare's sonnets.

How do we decide which words are the most _important_ words in a piece of text? Well, it's not really possible to give an objective measure of importance to words. But what we _can_ do is to measure the importance of a word in a piece of text (called a document) _relative_ to a set of documents.

Let's say we are given, oh I don't know 154 poems and we want to measure the relative importance of the words in each poem. One way to do this is called _Text Frequency Inverse Document Frequency_ or tfidf for short. This has a long scary sounding name, but is quite straighforward. 

To make this simple, let's just look at the first 4 lines of 3 sonnets.

```
Sonnet 1:
From fairest creatures we desire increase,
That thereby beauty's rose might never die,
But as the riper should by time decease,
His tender heir might bear his memory:


Sonnet 18:
Shall I compare thee to a summer's day?
Thou art more lovely and more temperate:
Rough winds do shake the darling buds of May,
And summer's lease hath all too short a date:


Sonnet 127:
In the old age black was not counted fair,
Or if it were, it bore not beauty's name;
But now is black beauty's successive heir,
And beauty slander'd with a bastard shame:
```


### Computing TFIDF scores
* * *

Text-Frequency Inverse-Document-Frequency is a fancy sounding, but relatively simple way of comparing a set of documents, or pieces of text. 

First, find the _text frequency_ of a word. This is simply the number of times a word appears in a document divided by the number of words in the document. In other words, it is simply the probability of randomly chosing that word from that document. For simplicity, we ignore punctuation, capitalization, and so on.

Let's look at the text frequency of "Beauty" in Sonnet 1. The word "Beauty" appears only once in 35 words, so 
{% highlight python %}
text_frequency("Beauty", "Sonnet 1") = 1/35
{% endhighlight %}

Similarly, for Sonnet 127,
{% highlight python %}
text_frequency("Beauty", "Sonnet 127") = 3/42
{% endhighlight %}

However, "Beauty" does not appear in Sonnet 18 at all, so
{% highlight python %}
text_frequency("Beauty", "Sonnet 18") = 0/41
{% endhighlight %}

This, however, does not give a good measure of importance. This is simply because very common words, like "the" will appear very often in almost any piece of English text (for a real life example, check out [this post](http://www.verychill.biz/blog/2017/08/14/slack-cloud). So we want some way to account for this. One solution is to find a [giant list of English words sorted by frequency](http://www.wordfrequency.info/free.asp), and simply reduce the text frequency by how high up on the list the word is. However, this is complicated and leads to other issues. So instead, we can use something called _Inverse Document Frequency_.

The basic idea behind Inverse Document Frequency is that, if a word is very common, then it should appear in most, if not all of the documents (sonnets) we are looking at. So if we reduce our text-frequency scores for each word based on how many of the docuemnts that word appears in, we can automatically account for common words.

As we saw earlier, the word "Beauty" appears in two of our three documents (sonnets). So we define the document frequency of "Beauty" to be 2/3. 
{% highlight python %}
document_frequency("Beauty") = 2/3
{% endhighlight %}


One way to scale our tf score is by simply taking inverse of the text frequency, hence Inverse Document Frequency.

{% highlight python %}
tfidf("Beauty","Sonnet 127") = text_frequency("Beauty", "Sonnet 127")/document_frequency("Beauty")
{% endhighlight %}

This is essentially what we will do, but it turns out that common words in a language tend to appear exponentially more often. So instead, we scale by the logarithm of the inverse of our document frequency.

In other words
{% highlight python %}
inverse_document_frequency("Beauty")  = log(1/document_frequency("Beauty"))
                                      = -log(document_frequency("Beauty"))
{% endhighlight %}

So words like "the", which appear in every sonnet will have an IDF score of 0, while less common words will have a higher score.

Now to find the TFIDF score of a word in a document, we just multiply them together

{% highlight python %}
tfidf("Beauty", "Sonnet 127") = text_frequency("Beauty", "Sonnet 127") * inverse_document_frequency("Beauty")
{% endhighlight %}

Note that the IDF score is _relative_ to the set of documents we are looking at.

And that's it. That is all that tfidf scores are. I find this quite fascinating, since tfidf scores are extremely successful at deciding which words are significant to a particular document in a set of documents, and all you have to do is see of often a word appears in a document, and then multiply by the log of one over how many of the documents it appears in.

### Cosine Similarity
* * *

Okay, so now how do we use this information to define the "similarity" of two sonnets? We can now use something called Cosine Similarity to compare documents. 

In fact, we didn't technically need to bother with TFIDF scores to compute cosine similarity, but later it will help. Here is the basic idea:

Let's consider the collection of all of the words in all of the documents we are looking at. Now we put these words in some arbitrary order, say 
{% highlight python %}
["Beauty", "the", "summer", ...(all the other words)]
{% endhighlight %}

and so on. Now, we can define a word count "vector" by simply putting the number of times each word appears in a document in the corresponding position. So for example, for Sonnet 1, we have
{% highlight python %}
[1, 1, 0, ...]
{% endhighlight %}

reflecting the fact that "Beauty" and "the" appear once in sonnet 1, while "summer" does not appear at all. Similarly for Sonnets 18 and 127 we have

{% highlight python %}
[0, 1, 2, ...]
{% endhighlight %}

and
{% highlight python %}
[3, 1, 0, ...]
{% endhighlight %}

respectively.

If we have say \\(V\\) words total, these define vectors in \\(\mathbb{N}^{\lvert V\rvert}\\) space. Now using a little linear algebra, we can figure out the cosine of the angle between these vectors with the formula

$$\frac{\vec{u}\cdot\vec{v}}{\lVert\vec{u}\rVert\lVert\vec{v}\rVert} = \cos(\theta)$$

where \\(\vec{u}\\) and \\(\vec{v}\\) are two vectors.

In terms of code, this means we use numpy and it solves all of our problems.

{% highlight python %}
def cosineSimilarity(a, b):
  return np.dot(a,b)/(np.linalg.norm(a)*np.linalg.norm(b))
{% endhighlight %}

Or if you want some more details,
{% highlight python %}
def cosineSimilarity(a, b):
  dot_product = 0
  norm_a = 0
  norm_b = 0
  for index, component in enumerate(a):
    dot_product += a[index]*b[index]
    norm_a += a[index]*a[index]
    norm_b += b[index]*b[index]
  norm_a = math.sqrt(norm_a)
  norm_b = math.sqrt(norm_b)
  return dot_product / (norm_a * norm_b)
{% endhighlight %}

Wow, a whole 8 lines of code you don't have to write!

Anyway, now we have a nice measure of similarity. It satisfies some of the properties that our intuition about the meaning of "similarity". For example, if 

{% highlight python %}
def cosineSimilarity(word_counts_1, word_counts_2) = 0.75
{% endhighlight %}

then
{% highlight python %}
def cosineSimilarity(word_counts_2, word_counts_1) = 0.75
{% endhighlight %}

And of course, a document is perfectly similar to itself.
{% highlight python %}
def cosineSimilarity(word_counts, word_counts) = 1
{% endhighlight %}

if document 1 and document 2 are similar, and document 2 and document 3 are similar, it doesn't guarantee a whole lot about the similarity of document 1 and document 3. (Although, if we take inverse cosines, we _do_ have a metric. Specifically, the spherical or great circle metric on a unit sphere).

Now, here is how we tie it all together. 

If we computes cosine similarities for all pairs of documents, we often have a lot of noise. This noise comes from the fact that most documents will have a minimum similarity since, well they have a lot of similar words in them!

So what if we only compute cosine similarities on the words that actually make a document unique? We can use our TFIDF scores!

But how do we decide what the threshold is for comparison? That is, do we compare sonnets based on the top 10 words in each sonnet? Top 20? Play around with the simulation above!