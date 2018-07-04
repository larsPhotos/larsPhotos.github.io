---
layout: default
title: Resume
---
<link href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:100|Montserrat:500|Nunito:200,600" rel="stylesheet">
<style type="text/css">
#name {
	font-size: 72px;
	font-family: 'Barlow Semi Condensed', sans-serif;
	display: flex;
	justify-content:center;
	text-align:center;
}
.normal-text {
	font-size: 20px;
	font-weight: 200;
	font-family: 'Nunito', sans-serif;
	color:#666;
	/*display: inline;*/
}
.normal-text.small {
	font-size: 16px;
	/*text-align: right;*/
	float: right;
}
.bold-text {
	font-size: 20px;
	font-weight: 600;
	font-family: 'Nunito', sans-serif;
	color: #000;
}
.bold-text.indent {
	display: inline-block;
	width: 25%;
}
.section-header {
	font-size: 22px;
	font-family: 'Montserrat', sans-serif;
	color: #5ba1b2;
}
.empty-indent {
	display: inline-block;
	width: 2%;
}
.ul-styling {
	margin-top: 0px;
}


#name > br{
	display: none;
}

#info-bar {
	display: block;
	list-style-type: none;
	text-align:center;
	padding: 0;
}
#info-bar li {
	display: inline;
	text-align: center;
	margin: 0;
	padding: 0;
}
#phone {
	float: left;
}
#address {
	float: right;
}
#spacer {
	display: block;
}

@media only screen and (max-width: 850px) {
	#info-bar li {
		display: block;
		margin: 2% 0;
	}
	#phone {
		float: none;
	}
	#address {
		float: none;
	}
	#spacer {
		display: none;
	}

/*	.bold-text, .normal-text {
		font-size: 16px;
	}
	.bold-text.indent {
		width: 15%;
	}*/
}
@media only screen and (max-width: 640px) {
	#name > br{
		display: block;
	}
}
</style>

<div id="name">Jesse <br>Endo <br>Jenks</div>
---
<ul id="info-bar" class="normal-text">
<li id="phone">(510) 508-9512</li>
<li id="email">
	<a href="mailto:jesseendojenks@gmail.com?Subject=Hello%20There" target="_top">
		JesseEndoJenks@gmail.com
	</a>
</li>
<li id="address">4386 Wheelock Student Center<br>Tacoma, WA 98416</li>
</ul>
<br id="spacer">
<div class="section-header">Education</div>
<div class="normal-text">
	<span class="bold-text">University of Puget Sound</span>
		<span class="normal-text small">Tacoma, WA</span><br>
	<span class="bold-text">B.S. in Mathematics and Computer Science</span> - double major
		<span class="normal-text small">May 2018</span><br>
	<span class="bold-text indent">Honors</span><i>magna cum laude</i><br>
	<span class="bold-text indent">Relevant Courses</span><span class="bold-text">University of Puget Sound / Study Abroad in Budapest, Hungary</span><br>
	<ul class="ul-styling" style="list-style-type:none;">
		<li>Algorithms, Artificial Intelligence, Optimization, Software Engineering, Theory of Computing</li>
		<li>Abstract Algebra, Linear Algebra, Real Analysis, Set Theory, Topology, Mathematical Logic</li>
	</ul>
</div>

<br>
<div class="section-header">Skills</div>
<div class="normal-text">
	<span class="bold-text indent">Languages and Libraries</span>Java, Python, Javascript, Processing, P5js, D3js, \(\LaTeX\), Flask, Numpy, Seaborn, Prolog, Lua<br>
	<span class="bold-text indent">Digital Media</span>Adobe After Effects, Photoshop, Lightroom<br>
	<span class="bold-text indent">Foreign Language</span>Fluent in Japanese<br>
</div>

<br>
<div class="section-header">Projects</div>

<div class="normal-text">
	<span class="bold-text"><a href="/">This very site!</a></span><span class="normal-text small">Fall 2016 - present</span>
	<ul class="ul-styling">
		<li>Personal website showcasing various interactive Javascript projects</li>
		<li><a href="/blog">Blog</a> section has over 20 interactive pages on topics ranging from fractals, cellular automata, markov chains, neural nets, and many other topics</li>
	</ul>
</div>

<div class="normal-text">
	<span class="bold-text">Neural Net javascript library</span><span class="normal-text small">Fall 2017</span>
	<ul class="ul-styling">
		<li>Wrote a neural net library from scratch in javascript to visualize on <a href="../blog/2018/04/10/NeuralNetjs">blog site</a></li>
		<li>Includes different activation and cost functions, as well as backpropagation</li>
	</ul>
</div>

<div class="normal-text">
	<span class="bold-text">COMAP Mathematical Contest in Modeling Finalist</span><span class="normal-text small">Spring 2017</span>
	<ul class="ul-styling">
		<li>Finished in top 11 out of 1,527 teams from around the world with 2 other teammates</li>
		<li>Created cellular automaton based model to study influence self-driving cars may have on traffic flow</li>
	</ul>
</div>

<div class="normal-text">
	<span class="bold-text">Raspberry Pi Slackbot</span><span class="normal-text small">Spring 2017</span>
	<ul class="ul-styling">
		<li>Created a chatbot trained on text messages, YouTube comments, and Shakespeare</li>
		<li>Loaded onto a Raspberry Pi so that members could chat with it through a Slack channel</li>
	</ul>
</div>

<div class="normal-text">
	<span class="bold-text">Summer Research Paper</span> - <a href="https://soundideas.pugetsound.edu/cgi/viewcontent.cgi?article=1481&context=summer_researchs" style="font-size:18px;">What Do We Mean by Logical Consequence?</a><span class="normal-text small">Summer 2016</span>
	<ul class="ul-styling">
		<li>Conducted independent research on differing views within a main subfield of mathematical logic</li>
		<li>Wrote a 20 page research paper on John Etchemendy’s criticism of Tarskian model theory</li>
	</ul>
</div>

<br>
<div class="section-header">Experience</div>

<div class="normal-text">
	<span class="bold-text">Makerspace Assistant</span> - University of Puget Sound, Tacoma, WA<span class="normal-text small">Spring 2018</span><br>
	<span class="empty-indent"></span><span class="bold-text"><a href="http://research.pugetsound.edu/makerspace">Collins Library</a></span>
	<ul class="ul-styling">
		<li>Assisting students and faculty in using 3D printers, Arduino boards, Raspberry Pis, a laser cutter, a silhouette cutter, button makers, and other equipment</li>
	</ul>
</div>

<div class="normal-text">
	<span class="bold-text">Teaching Assistant</span> - University of Puget Sound, Tacoma, WA<span class="normal-text small">Spring 2017</span><br>
	<span class="empty-indent"></span><span class="bold-text"><a href="https://www.pugetsound.edu/academics/departments-and-programs/undergraduate/philosophy/">Philosophy Department</a></span>
	<ul class="ul-styling">
		<li>Assisted professor in administration for class of 19 students on Formal Logic</li>
		<li>Graded homework assignments and provided weekly tutoring sessions for class</li>
	</ul>
</div>

<div class="normal-text">
	<span class="bold-text">Department Tutor</span> - University of Puget Sound, Tacoma, WA<span class="normal-text small">Spring 2016 - Spring 2017, 2018</span><br>
	<span class="empty-indent"></span><span class="bold-text"><a href="mathcs.pugetsound.edu">Computer Science Department</a></span>
	<ul class="ul-styling">
		<li>Weekly peer tutor for all class levels</li>
	</ul>
</div>

<div class="normal-text">
	<span class="bold-text">Media Services Staff</span> - University of Puget Sound, Tacoma, WA<span class="normal-text small">Fall 2014 - Fall 2016</span><br>
	<span class="empty-indent"></span><span class="bold-text"><a href="https://www.pugetsound.edu/about/offices-services/technology-services/media-services/">Technology Services</a></span>
	<ul class="ul-styling">
		<li>Performed troubleshooting for staff and faculty on campus</li>
		<li>Handled media requests for classes, events, and presentations</li>
	</ul>
</div>

<br>
<div class="section-header">School Activities</div>

<div class="normal-text">
	<span class="bold-text indent">ACM</span><span class="bold-text">President</span>, Computer Science club <span class="normal-text small">2016 - 2017</span><br>
	<span class="bold-text indent">PMU</span> Mathematics Honor Society <span class="normal-text small">Inducted Spring 2017</span><br>
	<span class="bold-text indent">UPE</span> Computer Science Honor Society <span class="normal-text small">Inducted Spring 2016</span><br>
	<span class="bold-text indent">PES</span> Honor Society <span class="normal-text small">Inducted Spring 2015</span>
</div>


<br>
<div class="section-header">Academic and Other Awards</div>

<div class="normal-text">
	<span class="bold-text">School of Music Scholarship</span><span class="normal-text small">2014 - 2018</span><br>
	<span class="bold-text">Edward Goman Math Scholarship</span><span class="normal-text small">2016 - 2018</span><br>
	<span class="bold-text">Graduated with Honors from Budapest Semesters in Mathematics</span><span class="normal-text small">Fall 2017</span><br>
	<span class="bold-text">Collier Interdisciplinary Scholarship</span><span class="normal-text small">Fall 2016</span><br>
</div>

<br>
<div class="section-header">Other Interests</div>

<div class="normal-text">
	<span class="bold-text indent">Interests, Skills</span> Cello, Philosophy of Math, Recreational Math, Data Visualization
</div>