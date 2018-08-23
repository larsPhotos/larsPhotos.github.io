
var photos = ["photos/IMG_3826-Edit-Edit-2-1.jpg", "photos/IMG_2710-3-Edit-4-Edit-1.jpg", "photos/IMG_2726-1.jpg"];

// var titles = []; // 
// var descriptions = []; // get descriptions from text files

var current = 0;

document.getElementById("photo").src = photos[current];

function checkKeycode(event) {
    // handling Internet Explorer stupidity with window.event
    // @see http://stackoverflow.com/a/3985882/517705
    var keyDownEvent = event || window.event,
        keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
    if (keycode == 37) { // left arrow
        previous();
    } else if (keycode == 39) { // right arrow
        next();
    }
}

function previous() {
    current = current === 0 ? photos.length - 1 : current - 1;
    console.log("left pressed");
    document.getElementById("photo").src = photos[current];      
}

function next() {
    console.log("next presoed");
    current = current == photos.length - 1 ? 0 : current + 1;
    document.getElementById("photo").src = photos[current];
}


// moving mouse controls showing and hiding

var mouseTimer = null, cursorVisible = true;

function hideElements() {
    // console.log("hiding elements!");
    mouseTimer = null;
    document.body.style.cursor = "none";
    cursorVisible = false;
    arrowsOpacity(0);
}

function showElements(){
    if (mouseTimer) {
        window.clearTimeout(mouseTimer);
    }
    if (!cursorVisible) {
        // console.log("showing elements!");
        document.body.style.cursor = "default";            
        cursorVisible = true;
        arrowsOpacity(1);
    }
    mouseTimer = window.setTimeout(hideElements, 5000);
};

function arrowsOpacity(opacity) {
    var arrows = document.getElementsByClassName("arrows");
    for (var i = 0; i < arrows.length; i++) {
        arrows[i].style.opacity = opacity;
    }
}

document.onkeydown = checkKeycode;

document.onmousemove = showElements;

showElements;

// document.getElementById("description").styledocument.getElementById("photo").width;
