
var photos = ["photos/slenderman_in_motion.jpg", 
    "photos/voyage.jpg", 
    "photos/unedited.jpg", 
    "photos/IMG_2675-Edit-1.jpg",
    "photos/always_fly_with_a_camera.jpg",
    "photos/always_fly_with_a_camera_II.jpg"];

var titles = ["slenderman in motion",
    "voyage", 
    "unedited", 
    "IMG_2675-Edit-1",
    "ALWAYS fly with a camera",
    "ALWAYS fly with a camera II"];

var descriptions = ["A silhouetted self-portrait <br>inspired by the game Slenderman<br> taken at Lewis and Clark College.",
    "into the sunset",
    "Sometimes it's nice to get a shot that doesn't need anything in post.",
    "",
    "Golden Rule of Photography: ALWAYS Fly With a Camera.",
    
    ];

var metadata = ["1/26/15 10:24:18 PM<br>30.0 sec at f/8.0, ISO 100<br>18mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "1/6/15 6:36:45 PM<br>1/100 sec at f/5.6,ISO 400<br>250mm (EF-S55-250mm f/4-5.6 IS II)",
    "4/19/15 7:01:23 AM<br>1/320 sec at f/13, ISO 100<br>250mm (EF-S55-250mm f/4-5.6 IS II)", 
    ""];

// var titles = []; // 
// var descriptions = []; // get descriptions from text files

var current = 0;

function update() {
    document.getElementById("photo").src = photos[current];
    document.getElementById("title").innerHTML = titles[current];
    document.getElementById("metadata").innerHTML = metadata[current];
    document.getElementById("description").innerHTML = descriptions[current];    
}

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
    update();      
}

function next() {
    current = current == photos.length - 1 ? 0 : current + 1;
    update();
}

// moving mouse controls showing and hiding

var mouseTimer = null, cursorVisible = true;

function hideElements() {
    // console.log("hiding elements!");
    mouseTimer = null;
    document.body.style.cursor = "none";
    cursorVisible = false;
    arrowsOpacity(0);
    document.getElementById("title").style.opacity = 0;
    document.getElementById("metadata").style.opacity = 0;
    document.getElementById("description").style.opacity = 0;
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
        document.getElementById("title").style.opacity = 1;
        document.getElementById("metadata").style.opacity = 1;
        document.getElementById("description").style.opacity = 1;
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

hideElements;

update();

// document.getElementById("description").styledocument.getElementById("photo").width;
