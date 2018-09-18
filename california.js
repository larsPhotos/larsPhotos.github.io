
/** Logic for california page. */

const WAIT_TIME = 3000;

var current = 0, mouseTimer = null, cursorVisible = true;

var photos = 
    ["always_fly_with_a_camera_II.jpg",
    "voyage.jpg",
    "pacifica.jpg",
    "pacifica_II.jpg",
    "pacifica_III.jpg",
    "pacifica_IV.jpg",
    "pacifica_V.jpg",
    "pelican_rock.jpg",
    "marsh.jpg",
    "pier_beauty.jpg",
    "zombie_tree.jpg",
    "IMG_3043-Edit-2-Edit.jpg",
    "the_sculptor.jpg",
    "dewey.jpg",
    "rwb.jpg"
    ];

var titles = 
    ["ALWAYS fly with a camera II",
    "voyage",
    "pacifica, CA",
    "pacifica, CA II",
    "pacifica, CA III",
    "pacifica, CA IV",
    "pacifica, CA V",
    "pelican rock",
    "marssssh",
    "pier beauty",
    "zombie tree",
    "IMG_3043-Edit-2-Edit.jpg",
    "the sculptor",
    "dewey",
    "rwb"
    ];

var metadata = 
    [
    "December 18, 2014 3:26 PM<br>1/250 sec at f/14 ISO 100",
    "January 6, 2015 6:36 PM<br>1/100 sec at f/5.6 ISO 400",
    "January 8, 2015 5:31 PM<br>1/20 sec at f/22 ISO 100",
    "August 11, 2014 8:07 PM<br>1/2 sec at f/22 ISO 100",
    "January 14, 2015 6:52 PM<br>30.0 sec at f/14 ISO 100",
    "January 8 2015 5:53 PM<br>1/100 sec at f/11 ISO 200",
    "January 14, 2015 6:53 PM<br>1.3 sec at f/11 ISO 200",
    "January 6, 2015 5:51 PM<br>1/640 sec at f/5.6 ISO 100", 
    "January 9, 2015 6:14 PM<br>1/8 sec at f/22 ISO 100",
    "August 11, 2014 8:25 PM<br>1.3 sec at f/22 ISO 100",
    "November 30, 2014 6:07 PM<br>1/4 sec at f/16 ISO 100",
    "January 3, 2015 6:57 PM<br>30.0 sec at f/10 ISO 400",
    "August 5, 2014 2:31 PM<br>1/80 sec at f/5.6 ISO 400",
    "February 14, 2014 10:47 PM<br>30.0 sec at f/8.0 ISO 100",
    "January 1, 2015 6:31 PM<br>0.5 sec at f/22 ISO 100"    
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
