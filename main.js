
/** This is a website. */

var current = 0, mouseTimer = null, cursorVisible = true;

var photos = ["photos/IMG_3826-Edit-Edit-2.jpg", 
    "photos/IMG_3158-Edit-2.jpg", 
    "photos/IMG_4339.jpg", 
    "photos/IMG_2675-Edit-1.jpg",
    "photos/IMG_2231-Edit-Edit.jpg",
    "photos/IMG_2802.jpg",
    "photos/IMG_4676-Edit.jpg",
    "photos/IMG_4513-Edit.jpg",
    "photos/IMG_2600-Edit-2.jpg",
    "photos/IMG_3310-Edit.jpg",
    "photos/IMG_2112-Edit.jpg",
    "photos/IMG_3682-Edit-3.jpg",
    "photos/IMG_3376-Edit.jpg",
    "photos/IMG_3802-Edit-2.jpg",
    "photos/IMG_3043-Edit-2-Edit-1.jpg",
    "photos/IMG_2726-1.jpg",
    "photos/IMG_2123-Edit-2.jpg",
    "photos/IMG_0905-1.jpg",
    "photos/IMG_3136-Edit-Edit.jpg",
    "photos/IMG_2552-Edit-Edit-1.jpg",
    "photos/IMG_1900.jpg"];

var titles = ["slenderman in motion",
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
    "pelicanrock",
    "corbett house",
    "the sculptor"];

var metadata = ["1/26/15 10:24:18 PM<br>30.0 sec at f/8.0, ISO 100<br>18mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "1/6/15 6:36 PM<br>1/100 sec at f/5.6, ISO 400<br>250mm (EF-S55-250mm f/4-5.6 IS II)",
    "4/19/15 7:01 AM<br>1/320 sec at f/13, ISO 100<br>250mm (EF-S55-250mm f/4-5.6 IS II)", 
    "11/6/14 9:54 PM<br>1/60 sec at f/13, ISO 100<br>250mm (EF-S55-250mm f/4-5.6 IS II)",
    "8/21/14 8:50 AM<br>1/250 sec at f/20, ISO 100<br> 55mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "12/18/14 3:26 PM<br>1/250 sec at f/14, ISO 100<br> 109mm (EF-S55-250mm f/4-5.6 IS II)",
    "4/22/15 7:12 AM<br>1/4 sec at f/16, ISO 100<br>18mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "4/22/15 6:44 AM<br>1/15 sec at f/13, ISO 100<br>18mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "10/26/14 12:29 PM<br>1/80 sec at f/11, ISO 100<br>36mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "1/8/15 5:31 PM<br>1/20 sec at f/22, ISO 100<br>18mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "8/11/14 8:07 PM<br>1/2 sec at f/22, ISO 100<br>21mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "1/16/15 6:53 PM<br>1.3 sec at f/11, ISO 200<br>18mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "1/14/15 6:52 PM<br>30.0 sec at f/14, ISO 100<br>18mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "1/8/15 5:53 PM<br>1/100 sec at f/11, ISO 200<br>24mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "1/3/15 6:57 PM<br>30.0 sec at f/10, ISO 400<br>18mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "2/25/17 6:57 PM<br>1/5 sec at f/22, ISO 100<br>18mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "8/11/14 8:25 PM<br>1.3 sec at f/22, ISO 100<br>28mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "6/7/16 6:02 PM<br>1/160 sec at f/5.6, ISO 100<br>43mm (EF-S18-55mm f/3.5-5.6 IS II)",
    "1/6/15 5:51 PM<br>1/640 sec at f/5.6, ISO 100<br>250mm (EF-S55-250mm f/4-5.6 IS II)", 
    "10/8/14 2:04 AM<br>12.0 sec at f/7.1, ISO 400<br>24mm (EF-S18-55mm f/3.5-5.6 IS II)",
     "8/5/14 2:31 PM<br>1/80 sec at f/5.6, ISO 400<br>24mm (EF-S18-55mm f/3.5-5.6 IS II)"];

function update() {
    document.getElementById("photo").src = photos[current];
    document.getElementById("title").innerHTML = titles[current];
    document.getElementById("metadata").innerHTML = metadata[current];
}

function hideElements() {
    console.log("hiding elements!");
    mouseTimer = null;
    document.getElementById("left-arrow").className = "arrows left_arrow hidden";
    document.getElementById("right-arrow").className = "arrows right_arrow hidden";
    document.getElementById("title").className = "outline-text hidden";
    document.getElementById("metadata").className = "outline-text hidden";
    setTimeout(function(){
        document.body.style.cursor = "none";
        cursorVisible = false;
    }, 1800);
}

function showElements() {
    console.log("showing elements!");
    document.getElementById("left-arrow").className = "arrows left_arrow";
    document.getElementById("right-arrow").className = "arrows right_arrow";
    document.getElementById("title").className = "outline-text";
    document.getElementById("metadata").className = "outline-text";
    document.body.style.cursor = "default";
    cursorVisible = true;
}

function mouseMoved(){
    if (mouseTimer) {
        window.clearTimeout(mouseTimer);
    }
    if (!cursorVisible) {
        showElements();
    }
    mouseTimer = window.setTimeout(hideElements, 4000);
};

// handling Internet Explorer stupidity with window.event
// @see http://stackoverflow.com/a/3985882/517705    
function checkKeycode(event) {
    // window.clearTimeout(mouseTimer);
    window.clearTimeout(mouseTimer);
    if (cursorVisible) {
        showElements();
        mouseMoved();
        console.log("was the mouse moved?");
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
    document.body.style.cursor = "default";
}

function next() {
    current = current == photos.length - 1 ? 0 : current + 1;
    update();
}

update();

showElements();

mouseMoved();

window.setTimeout(hideBanner, 4000);

function hideBanner() {
    document.getElementById("banner").className = "text-block banner hidden";
}

document.onmousemove = mouseMoved;

document.onkeydown = checkKeycode;

// document.getElementById("description").styledocument.getElementById("photo").width;
