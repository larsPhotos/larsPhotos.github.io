
/** This is a website. */

const WAIT_TIME = 4000;

var current = 0, mouseTimer = null, cursorVisible = true;

var photos = 
    ["slender.jpg",
    "always_fly_with_a_camera.jpg",
    "unedited.jpg",
    "edited.jpg",
    "enchanted.jpg",
    "portlandia.jpg",
    "portlandia_II.jpg",
    "portlandia_III.jpg",
    "portlandia_IV.jpg",
    "IMG_2726.jpg",
    "corbett_house.jpg",
    "that_tree.jpg",
    "IMG_0905.jpg",
    "anyone_worldwide.jpg",
    "swirl.jpg",
    "yellow.jpg"
    ];

var titles = 
    ["slenderman in motion",
    "ALWAYS fly with a camera",
    "unedited", 
    "edited",
    "enchanted",
    "portlandia",
    "portlandia II",
    "portlandia III",
    "portlandia IV",
    "IMG_2726.jpg",
    "corbett house",
    "\"that tree\"",
    "IMG_0905.jpg",
    "anyone worldwide",
    "swirl",
    "yellow"];

var metadata = 
    ["January 26, 2015 10:24 PM<br>30.0 sec at f/8.0 ISO 100",
    "August 21, 2014 8:50 AM<br>1/250 sec at f/20 ISO 100",
    "April 19, 2015 7:01 AM<br>1/320 sec at f/13 ISO 100",
    "November 6, 2014 9:54 PM<br>1/60 sec at f/13 ISO 100",
    "April 25, 2015 7:44 AM<br>2.5 sec at f/14 ISO 100",
    "April 22, 2015 7:12 AM<br>1/4 sec at f/16 ISO 100",
    "April 22, 2015 6:44 AM<br>1/15 sec at f/13, ISO 100",
    "October 26, 2014 12:29 PM<br>1/80 sec at f/11 ISO 100",
    "April 25, 2015 6:46 AM<br>0.3 sec at f/14 ISO 100",
    "February 25 2017 6:57 PM<br>1/5 sec at f/22, ISO 100",
    "October 8, 2014 2:04 AM<br>12.0 sec at f/7.1 ISO 400",
    "June 7, 2016 5:45 PM<br>0.4 sec at f/10 ISO 100",
    "June 7, 2016 6:02 PM<br>1/160 sec at f/5.6 ISO 100",
    "May 12, 2017 11:09 PM<br>1/80 sec at f/4.0 ISO 400",
    "January 9, 2015 7:20 PM<br>13.0 sec at f/3.5 ISO 1600",
    "March 2, 2017 3:52 PM<br>1/50 sec at f/5.6 ISO 400"
    ];

function update() {
    if (cursorVisible) {
        mouseMoved();
    }
    // document.getElementById("photo").src = "photos/lo-rez/" + photos[current];
    document.getElementById("title").innerHTML = titles[current];
    document.getElementById("metadata").innerHTML = metadata[current];
    document.getElementById("title-box").innerHTML = titles[current];
    document.getElementById("metadata-box").innerHTML = metadata[current];
    document.getElementById("index").innerHTML = (current + 1) + "/" + photos.length;
    // document.getElementById("index-box").innerHTML = (current + 1) + "/" + photos.length;
    document.getElementById("photo").src = "photos/hi-rez/" + photos[current];
}

function hideElements() {
    // console.log("hiding elements!");
    mouseTimer = null;
    document.getElementById("page").className = "hidden";
     // document.getElementById("menu").className = "hidden";
    setTimeout(function(){
        document.body.style.cursor = "none";
        cursorVisible = false;
    }, 1800);
}

function showElements() {
    // console.log("showing elements!");
    document.getElementById("page").className = "";
    // document.getElementById("menu").className = "";
    document.body.style.cursor = "default";
    cursorVisible = true;
}

function mouseMoved(){
    showElements();
    if (mouseTimer) {
        window.clearTimeout(mouseTimer);
    }
    if (!cursorVisible) {
        showElements();
    }
    mouseTimer = window.setTimeout(hideElements, WAIT_TIME);
};

// handling Internet Explorer stupidity with window.event
// @see http://stackoverflow.com/a/3985882/517705    
function checkKeycode(event) {
    window.clearTimeout(mouseTimer);
    if (cursorVisible) {
        mouseMoved();
    }
    var keyDownEvent = event || window.event,
        keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
    if (keycode == 37) { // left arrow
        previous();
    } else if (keycode == 39) { // right arrow
        next();
    }
}

function previous() {
    current = current == 0 ? photos.length - 1 : current - 1;
    update();      
}

function next() {
    current = current == photos.length - 1 ? 0 : current + 1;
    update();
}

function photo(index) {
    current = index;
    update();
    scroll(0,0);
}

update();

mouseMoved();

document.onmousemove = mouseMoved;

document.onkeydown = checkKeycode;

// document.getElementById("description").styledocument.getElementById("photo").width;
