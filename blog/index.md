---
layout: default
title: Recent Blog Posts
---
<script src="/js/libraries/p5.js" type="text/javascript"></script>
<script src="/js/libraries/p5.dom.js" type="text/javascript"></script>
<script src="/js/boids.js"></script>
<h1>{{ page.title }}</h1>
<ul class="posts">
	{% for post in site.posts %}
	<li>
		<a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
		<span class="blog-details-desktop">{{ post.date | date: "%B %-d, %Y" }}</span>
		<span class="blog-details-mobile">{{ post.date | date: "%m/%d/%y" }}</span>
	</li>
	{% endfor %}
</ul>