
/** This is a website. */

var current = 0, mouseTimer = null, cursorVisible = true;

var photos = 
    ["IMG_3826-Edit-Edit-2.jpg", 
    "IMG_3158-Edit-2.jpg", 
    "IMG_4339.jpg", 
    "IMG_2675-Edit.jpg",
    "IMG_2231-Edit-Edit.jpg",
    "IMG_2802.jpg",
    "IMG_4676-Edit.jpg",
    "IMG_4513-Edit.jpg",
    "IMG_2600-Edit-2.jpg",
    "IMG_3310-Edit.jpg",
    "IMG_2112-Edit.jpg",
    "IMG_3682-Edit-3.jpg",
    "IMG_3376-Edit.jpg",
    "IMG_3802-Edit-2.jpg",
    "IMG_3043-Edit-2-Edit.jpg",
    "IMG_2726.jpg",
    "IMG_2123-Edit-2.jpg",
    "IMG_0905.jpg",
    "IMG_3136-Edit-Edit.jpg",
    "IMG_2552-Edit-Edit.jpg",
    "IMG_1900.jpg"];

var titles = 
    ["slenderman in motion",
    "voyage", 
    "unedited", 
    "edited",
    "ALWAYS fly with a camera",
    "ALWAYS fly with a camera II",
    "portlandia",
    "portlandia II",
    "portlandia III",
    "pacifica, CA",
    "pacifica, CA II",
    "pacifica, CA III",
    "pacifica, CA IV",
    "pacifica, CA V",
    "IMG_3043-Edit-2-Edit-1.jpg",
    "IMG_2726-1.jpg",
    "pier beauty",
    "IMG_0905-1.jpg",
    "pelican rock",
    "corbett house",
    "the sculptor"];

var metadata = 
    ["January 26, 2015 10:24 PM<br>30.0 sec at f/8.0 ISO 100",
    "January 6, 2015 6:36 PM<br>1/100 sec at f/5.6 ISO 400",
    "April 19, 2015 7:01 AM<br>1/320 sec at f/13 ISO 100",
    "November 6, 2014 9:54 PM<br>1/60 sec at f/13 ISO 100",
    "August 21, 2014 8:50 AM<br>1/250 sec at f/20 ISO 100",
    "December 18, 2014 3:26 PM<br>1/250 sec at f/14 ISO 100",
    "April 22, 2015 7:12 AM<br>1/4 sec at f/16 ISO 100",
    "April 22, 2015 6:44 AM<br>1/15 sec at f/13, ISO 100",
    "October 26, 2014 12:29 PM<br>1/80 sec at f/11 ISO 100",
    "January 8, 2015 5:31 PM<br>1/20 sec at f/22 ISO 100",
    "August 11, 2014 8:07 PM<br>1/2 sec at f/22 ISO 100",
    "January 14, 2015 6:53 PM<br>1.3 sec at f/11 ISO 200",
    "January 14, 2015 6:52 PM<br>30.0 sec at f/14 ISO 100",
    "January 8 2015 5:53 PM<br>1/100 sec at f/11 ISO 200",
    "January 3, 2015 6:57 PM<br>30.0 sec at f/10 ISO 400",
    "February 25 2017 6:57 PM<br>1/5 sec at f/22, ISO 100",
    "August 11, 2014 8:25 PM<br>1.3 sec at f/22 ISO 100",
    "June 7, 2016 6:02 PM<br>1/160 sec at f/5.6 ISO 100",
    "January 6, 2015 5:51 PM<br>1/640 sec at f/5.6 ISO 100", 
    "October 8, 2014 2:04 AM<br>12.0 sec at f/7.1 ISO 400",
    "August 5, 2014 2:31 PM<br>1/80 sec at f/5.6 ISO 400"];

function update() {
    if (cursorVisible) {
        mouseMoved();
    }
    document.getElementById("photo").src = "photos/lo-rez/" + photos[current];
    
    document.getElementById("title").innerHTML = titles[current];
    document.getElementById("metadata").innerHTML = metadata[current];
    document.getElementById("title-box").innerHTML = titles[current];
    document.getElementById("metadata-box").innerHTML = metadata[current];
    document.getElementById("index").innerHTML = (current + 1) + "/" + photos.length;
    document.getElementById("photo").src = "photos/hi-rez/" + photos[current];
    // document.getElementById("index-box").innerHTML = (current + 1) + "/" + photos.length;
}

function hideElements() {
    // console.log("hiding elements!");
    mouseTimer = null;
    document.getElementById("left-arrow").className = "arrows left_arrow hidden";
    document.getElementById("right-arrow").className = "arrows right_arrow hidden";
    document.getElementById("title").className = "text-block title hidden";
    document.getElementById("metadata").className = "outline-text metadata hidden";
    document.getElementById("title-box").className = "text-box title hidden";
    document.getElementById("metadata-box").className = "text-box metadata hidden";
    document.getElementById("index").className = "outline-text index hidden";
    // document.getElementById("index-box").className = "text-box index hidden";
    setTimeout(function(){
        document.body.style.cursor = "none";
        cursorVisible = false;
    }, 1800);
}

function showElements() {
    // console.log("showing elements!");
    document.getElementById("left-arrow").className = "arrows left_arrow";
    document.getElementById("right-arrow").className = "arrows right_arrow";
    document.getElementById("title").className = "text-block title";
    document.getElementById("metadata").className = "outline-text metadata";
    document.getElementById("title-box").className = "text-box title";
    document.getElementById("metadata-box").className = "text-box metadata";
    document.getElementById("index").className = "outline-text index";
    // document.getElementById("index-box").className = "text-box index";
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
    mouseTimer = window.setTimeout(hideElements, 3000);
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
    current = current === 0 ? photos.length - 1 : current - 1;
    update();      
}

function next() {
    current = current == photos.length - 1 ? 0 : current + 1;
    update();
}

update();

mouseMoved();

window.setTimeout(hideBanner, 3000);

function hideBanner() {
    document.getElementById("banner").className = "text-block banner hidden";
}

document.onmousemove = mouseMoved;

document.onkeydown = checkKeycode;

// document.getElementById("description").styledocument.getElementById("photo").width;
