
/** This is a website. */

// wait for something to go away
const WAIT_TIME = 3000;

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// biggest photos: manor hosue, corbett house, portlandia IV, marssh, enchanted
var current = 0, mouseTimer = null, cursorVisible = true;

var photos;

// load photo data
function loadData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            photos = JSON.parse(xmlhttp.responseText); // this. also works?
        }
    };
    xmlhttp.open("GET", "photo_metadata.txt", false); // synchronous, i think this is fine
    xmlhttp.send();
}
    
function loadPhotos() {
    for (var i = 0; i < 3; i++) {
       for (var j = i; j < photos.length - 1; j += 3) {
            document.getElementById("column_" + i).innerHTML += "<img src=photos/small/" + photos[j].file + " class='preview-image' onclick='photo(" + j + ")'>";
        }    
    }    
}

// Use 
function formatTitle(photo) {
    return photo.useTitle ? photo.title : photo.file;
}

function formatMetadata(photo) {
    var date = new Date(photo.date);
    
    var time;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

    if (date.getHours() == 0) {
        time = "12:" + minutes + " AM";
    } else if (date.getHours() > 12) {
        time = date.getHours() - 12 + ":" + minutes + " PM";
    } else {
        time = date.getHours() + ":" + minutes + " AM";
    }
    

    return MONTHS[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() 
        + ", " + time + "<br>" + photo.shutterSpeed
        + " sec at f/" + photo.aperture + " ISO " + photo.iso;
}

function update() {
    if (cursorVisible) {
        mouseMoved();
    }
    // document.getElementById("photo").src = "photos/lo-rez/" + photos[current];
    document.getElementById("title").innerHTML = formatTitle(photos[current]);
    document.getElementById("metadata").innerHTML = formatMetadata(photos[current]);
    
    // document.getElementById("title-box").innerHTML = titles[current];
    // document.getElementById("metadata-box").innerHTML = metadata[current];
    
    // document.getElementById("index").innerHTML = (current + 1) + "/" + photos.length;
    // document.getElementById("index-box").innerHTML = (current + 1) + "/" + photos.length;
    document.getElementById("photo").src = "photos/small/" + photos[current].file;
}

// portlandia IV, corbett house, zombie tree

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
    // console.log("trying to update photo...");
    current = index;
    update();
    scroll(0,0);
}

loadData();
update();
loadPhotos();
mouseMoved();

window.setTimeout(hideBanner, WAIT_TIME);

function hideBanner() {
    document.getElementById("banner").className = "text-block banner hidden";
    // document.getElementById("site-banner").className = "site-banner hidden";
}

document.onmousemove = mouseMoved;

document.onkeydown = checkKeycode;
