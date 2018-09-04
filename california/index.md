<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>lars.photos</title>
    <link rel="stylesheet" type="text/css" href="main.css">
    <link href='https://fonts.googleapis.com/css?family=Open Sans Condensed:300' rel='stylesheet'>
    <link rel="stylesheet" media="screen" href="https://fontlibrary.org/face/bebas" type="text/css"/>
    <link rel="shortcut icon" href="photos/favicon.ico">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>

<body>

<div class="background"></div>

<img id="photo" src="photos/hi-rez/IMG_3826-Edit-Edit-2.jpg"> 

<!-- <div>
    <img id="photo">
</div> -->
<!-- <img id="photo" class="photo" src="photos/hi-rez/IMG_3826-Edit-Edit-2.jpg"> -->

<div id="page"> 

    <ul class="menu"> 
        <li>
            <a href="/" class="drop-shadow">oregon</a>
        </li>

        <li>
            <a href="/california" class="drop-shadow">california</a>
        </li>

        <li>
            <a href="/bio" class="drop-shadow">bio</a>
        </li>

        <li>
            <a id="500px" class="drop-shadow" href="https://500px.com/larsmayrand" target="_blank">500px</a>
        </li>

        <li>
            <a id="github" class="drop-shadow" href="https://github.com/larsPhotos/larsPhotos.github.io" target="_blank">github</a>
        </li>
    </ul>

    <div> 
        <button id="left-arrow" class="arrows left_arrow" onclick="previous()">&#8249;</button>

        <button id="right-arrow" class="arrows right_arrow" onclick="next()">&#8250;</button>

        <button id="down-arrow" class="arrows down_arrow" onclick="scroll()">&#8250;</button>
    </div>

    <div id="banner" class="text-block banner">
        <p>
            <h1>
                lars.photos
            </h1>
        </p>
    </div>

    <div id="title-box" class="text-box title"></div>
    <div id="title" class="text-block title"></div>    
    <div id="metadata-box" class="text-box metadata"></div>
    <div id="metadata" class="outline-text metadata"></div>
    <div id="index" class="outline-text index"></div>

</div> 

<div class="row">
    <div class="column">
        <img src="photos/hi-rez/IMG_1900.jpg" class="preview-image"> 
        <img src="photos/hi-rez/IMG_2112-Edit.jpg" class="preview-image"> 
        <img src="photos/hi-rez/IMG_2123-Edit-2.jpg" class="preview-image"> 
        <img src="photos/hi-rez/IMG_2802.jpg" class="preview-image"> 
    </div>
    <div class="column">
        <img src="photos/hi-rez/IMG_3043-Edit-2-Edit.jpg" class="preview-image"> 
        <img src="photos/hi-rez/IMG_3136-Edit-Edit.jpg" class="preview-image"> 
        <img src="photos/hi-rez/IMG_3158-Edit-2.jpg" class="preview-image"> 
        <img src="photos/hi-rez/IMG_3310-Edit.jpg" class="preview-image">         
    </div>
    <div class="column">
        <img src="photos/hi-rez/IMG_3376-Edit.jpg" class="preview-image">         
        <img src="photos/hi-rez/IMG_3682-Edit-3.jpg" class="preview-image"> 
        <img src="photos/hi-rez/IMG_3802-Edit-2.jpg" class="preview-image"> 
    </div>
</div>


<script src="main.js"></script>

</body>
</html>
