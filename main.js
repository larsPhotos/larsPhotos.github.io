
/** This is a website. */

const WAIT_TIME = 3000;

var current = 0, mouseTimer = null, cursorVisible = true;
// var photos = 
//     ["always_fly_with_a_camera_II.jpg",
//     "voyage.jpg",
//     "pacifica.jpg",
//     "pacifica_II.jpg",
//     "pacifica_III.jpg",
//     "pacifica_IV.jpg",
//     "pacifica_V.jpg",
//     "pelican_rock.jpg",
//     "marsh.jpg",
//     "pier_beauty.jpg",
//     "zombie_tree.jpg",
//     "IMG_3043-Edit-2-Edit.jpg",
//     "the_sculptor.jpg",
//     "dewey.jpg",
//     "rwb.jpg"
//     ];

// var titles = 
//     ["ALWAYS fly with a camera II",
//     "voyage",
//     "pacifica, CA",
//     "pacifica, CA II",
//     "pacifica, CA III",
//     "pacifica, CA IV",
//     "pacifica, CA V",
//     "pelican rock",
//     "marssssh",
//     "pier beauty",
//     "zombie tree",
//     "IMG_3043-Edit-2-Edit.jpg",
//     "the sculptor",
//     "dewey",
//     "rwb"
//     ];

// var metadata = 
//     [
//     "December 18, 2014 3:26 PM<br>1/250 sec at f/14 ISO 100",
//     "January 6, 2015 6:36 PM<br>1/100 sec at f/5.6 ISO 400",
//     "January 8, 2015 5:31 PM<br>1/20 sec at f/22 ISO 100",
//     "August 11, 2014 8:07 PM<br>1/2 sec at f/22 ISO 100",
//     "January 14, 2015 6:52 PM<br>30.0 sec at f/14 ISO 100",
//     "January 8 2015 5:53 PM<br>1/100 sec at f/11 ISO 200",
//     "January 14, 2015 6:53 PM<br>1.3 sec at f/11 ISO 200",
//     "January 6, 2015 5:51 PM<br>1/640 sec at f/5.6 ISO 100", 
//     "January 9, 2015 6:14 PM<br>1/8 sec at f/22 ISO 100",
//     "August 11, 2014 8:25 PM<br>1.3 sec at f/22 ISO 100",
//     "November 30, 2014 6:07 PM<br>1/4 sec at f/16 ISO 100",
//     "January 3, 2015 6:57 PM<br>30.0 sec at f/10 ISO 400",
//     "August 5, 2014 2:31 PM<br>1/80 sec at f/5.6 ISO 400",
//     "February 14, 2014 10:47 PM<br>30.0 sec at f/8.0 ISO 100",
//     "January 1, 2015 6:31 PM<br>0.5 sec at f/22 ISO 100"    
//     ];

// var photos = 
//     ["always_fly_with_a_camera_II.jpg",
//     "voyage.jpg",
//     "pacifica.jpg",
//     "pacifica_II.jpg",
//     "pacifica_III.jpg",
//     "pacifica_IV.jpg",
//     "pacifica_V.jpg",
//     "pelican_rock.jpg",
//     "marsh.jpg",
//     "pier_beauty.jpg",
//     "zombie_tree.jpg",
//     "IMG_3043-Edit-2-Edit.jpg",
//     "the_sculptor.jpg",
//     "dewey.jpg",
//     "rwb.jpg"
//     ];

var photos = 
    ["slender.jpg",
    "voyage.jpg",
    "always_fly_with_a_camera.jpg",
    "always_fly_with_a_camera_II.jpg",
    "unedited.jpg",
    "edited.jpg",
    "enchanted.jpg",
    "pacifica.jpg",
    "pacifica_II.jpg",
    "pacifica_III.jpg",
    "pacifica_IV.jpg",
    "pacifica_V.jpg",
    "portlandia.jpg",
    "portlandia_II.jpg",
    "portlandia_III.jpg",
    "portlandia_IV.jpg",
    "pelican_rock.jpg",
    "loch_ness.jpg",
    "rwb.jpg",
    "marsh.jpg",
    "pier_beauty.jpg",
    "IMG_2726.jpg",
    "granite_planet.jpg",
    "manor_house.jpg",
    "corbett_house.jpg",
    "zombie_tree.jpg",
    "that_tree.jpg",
    "IMG_3043-Edit-2-Edit.jpg",
    "the_sculptor.jpg",
    "nightfisher.jpg",
    "IMG_0905.jpg",
    "anyone_worldwide.jpg",
    "swirl.jpg",
    "yellow.jpg",
    "IMG_0838.jpg",
    // "IMG_0828.jpg",
    "IMG_0773.jpg",
    "IMG_0689.jpg"
    // "dewey.jpg",
    ];

var titles = 
    ["slenderman in motion",
    "voyage",
    "ALWAYS fly with a camera",
    "ALWAYS fly with a camera II",
    "unedited", 
    "edited",
    "enchanted",
    "pacifica",
    "pacifica II",
    "pacifica III",
    "pacifica IV",
    "pacifica V",
    "portlandia",
    "portlandia II",
    "portlandia III",
    "portlandia IV",
    "pelican rock",
    "loch ness",
    "rwb",
    "marssssh",
    "pier beauty",
    "IMG_2726.jpg",
    "granite planet",
    "manor house",
    "corbett house",
    "zombie tree",
    "\"that tree\"",
    "IMG_3043-Edit-2-Edit.jpg",
    "the_sculptor",
    "nightfisher",
    "IMG_0905.jpg",
    "anyone worldwide",
    "swirl",
    "yellow",
    "IMG_0838.jpg",
    // "IMG_0828.jpg",
    "IMG_0773.jpg",
    "IMG_0689.jpg"];

var metadata = 
    ["January 26, 2015 10:24 PM<br>30.0 sec at f/8.0 ISO 100",
    "January 6, 2015 6:36 PM<br>1/100 sec at f/5.6 ISO 400",
    "August 21, 2014 8:50 AM<br>1/250 sec at f/20 ISO 100",
    "December 18, 2014 3:26 PM<br>1/250 sec at f/14 ISO 100",
    "April 19, 2015 7:01 AM<br>1/320 sec at f/13 ISO 100",
    "November 6, 2014 9:54 PM<br>1/60 sec at f/13 ISO 100",
    "April 25, 2015 7:44 AM<br>2.5 sec at f/14 ISO 100",
    "January 8, 2015 5:31 PM<br>1/20 sec at f/22 ISO 100",

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
    "March 2, 2017 3:52 PM<br>1/50 sec at f/5.6 ISO 400",
    //
    "April 25, 2015 6:46 AM<br>0.3 sec at f/14 ISO 100",
    "February 25 2017 6:57 PM<br>1/5 sec at f/22, ISO 100",
    "October 8, 2014 2:04 AM<br>12.0 sec at f/7.1 ISO 400",
    "June 7, 2016 5:45 PM<br>0.4 sec at f/10 ISO 100",
    "June 7, 2016 6:02 PM<br>1/160 sec at f/5.6 ISO 100",
    "May 12, 2017 11:09 PM<br>1/80 sec at f/4.0 ISO 400",
    "January 9, 2015 7:20 PM<br>13.0 sec at f/3.5 ISO 1600",
    "March 2, 2017 3:52 PM<br>1/50 sec at f/5.6 ISO 400",
    "April 25, 2015 6:46 AM<br>0.3 sec at f/14 ISO 100",
    "February 25 2017 6:57 PM<br>1/5 sec at f/22, ISO 100",
    "October 8, 2014 2:04 AM<br>12.0 sec at f/7.1 ISO 400",
    "June 7, 2016 5:45 PM<br>0.4 sec at f/10 ISO 100",
    "June 7, 2016 6:02 PM<br>1/160 sec at f/5.6 ISO 100",
    "May 12, 2017 11:09 PM<br>1/80 sec at f/4.0 ISO 400",
    "January 9, 2015 7:20 PM<br>13.0 sec at f/3.5 ISO 1600",
    "March 2, 2017 3:52 PM<br>1/50 sec at f/5.6 ISO 400",
    "April 25, 2015 6:46 AM<br>0.3 sec at f/14 ISO 100",
    "February 25 2017 6:57 PM<br>1/5 sec at f/22, ISO 100",
    "October 8, 2014 2:04 AM<br>12.0 sec at f/7.1 ISO 400",
    "June 7, 2016 5:45 PM<br>0.4 sec at f/10 ISO 100",
    "June 7, 2016 6:02 PM<br>1/160 sec at f/5.6 ISO 100",
    "May 12, 2017 11:09 PM<br>1/80 sec at f/4.0 ISO 400",
    "January 9, 2015 7:20 PM<br>13.0 sec at f/3.5 ISO 1600",
    "March 2, 2017 3:52 PM<br>1/50 sec at f/5.6 ISO 400"
    ];

// function photo(path, title, metadata) {
//     this.path = path;
//     this.title = title;
//     this.metadata = metadata;
// }

function loadPhotos() {
    // document.getElementById("column_1").innerHTML += "<img src=photos/hi-rez/slender.jpg class='preview-image'>";
    for (var i = 0; i < 3; i++) {
        for (var j = i; j < photos.length - 1; j += 3) {
            document.getElementById("column_" + i).innerHTML += "<img src=photos/hi-rez/" + photos[j] + " class='preview-image' onclick='photo(" + j + ")'>";
        }    
    }
    // for (var i = 0; i < photos.length; i += 3) {
    //     document.getElementById("column_1").innerHTML += "<img src=photos/hi-rez/" + photos[i] + " class='preview-image'>";
    // }
    // document.getElementById("column_1").innerHTML += "<img src=photos/hi-rez/" + photos[i] + " class='preview-image'>";
    // document.getElementById("column_1").innerHTML += "<img src=photos/hi-rez/" + photos[i] + " class='preview-image'>";
    

}

loadPhotos();

function update() {
    if (cursorVisible) {
        mouseMoved();
    }
    // document.getElementById("photo").src = "photos/lo-rez/" + photos[current];
    document.getElementById("title").innerHTML = titles[current];
    document.getElementById("metadata").innerHTML = metadata[current];
    
    // document.getElementById("title-box").innerHTML = titles[current];
    // document.getElementById("metadata-box").innerHTML = metadata[current];
    
    // document.getElementById("index").innerHTML = (current + 1) + "/" + photos.length;
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
    console.log("trying to update photo...");
    current = index;
    update();
    scroll(0,0);
}

update();

mouseMoved();

window.setTimeout(hideBanner, WAIT_TIME);

function hideBanner() {
    document.getElementById("banner").className = "text-block banner hidden";
    // document.getElementById("site-banner").className = "site-banner hidden";
}

document.onmousemove = mouseMoved;

document.onkeydown = checkKeycode;

// document.getElementById("description").styledocument.getElementById("photo").width;
