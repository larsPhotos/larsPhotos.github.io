/*

bugs: 

basic shit: swiping, first to last photo...

shop, fullscreen, share...


*/

/** This is a website. */

// swiping logic, adapted from Ana Tudor: https://css-tricks.com/simple-swipe-with-vanilla-javascript/

// biggest photos: manor hosue, corbett house, portlandia IV, marssh, enchanted

// wait for something to go away
const WAIT_TIME = 1800;

// const WAIT_TIME = 180000;

const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var mouseTimer = null, cursorVisible = true;

var photos;

let i = 0, x0 = null, locked = false, w;

var container = document.querySelector(".container"),
    title = document.getElementById("title")
    metadata = document.getElementById("metadata"),
    page = document.getElementById("page");

loadData();
loadPhotos();
update();
mouseMoved();

var N = container.children.length;
container.style.setProperty("--n", N);

console.log("N = " + N);

function size() { w = window.innerWidth };
size();

addEventListener("resize", size, false);


// load photo data
function loadData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            photos = JSON.parse(xmlhttp.responseText); 
        }
    };
    xmlhttp.open("GET", "photo_metadata.txt", false); // synchronous, this should be fine
    xmlhttp.send();
}
    
function loadPhotos() {
    // populate grid view
    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var columns = viewportWidth < 480 ? 2 : 3; 
    for (var i = 0; i < columns; i++) {
        var column = document.getElementById("column_" + i);
       for (var j = i; j < photos.length; j += columns) {
            column.innerHTML += "<img src=photos/small/" + photos[j].file + " class='preview-image' onclick='photo(" + j + ")'>";
        }    
    }    

    console.log("photos.length - 1 = " + (photos.length - 1));
    // populate swipe view
    for (var i = 0; i < photos.length; i++) {
        container.innerHTML += "<div class='stupid-container'><img src=photos/small/" + photos[i].file + " class='image'></div>";
    }   

    // console.log("container length in load = " + container.children.length);
}


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

function update(animate) {
    if (cursorVisible) {
        mouseMoved();
    }

    container.classList.toggle("smooth", animate);    
    container.style.setProperty("--i", i);
    container.scrollIntoView();

    title.innerHTML = formatTitle(photos[i]);
    metadata.innerHTML = formatMetadata(photos[i]);
}

function hideText() {
    mouseTimer = null;
    page.classList.add("hidden");
    setTimeout(function(){
        document.body.style.cursor = "none";
        cursorVisible = false;
    }, 1800);
}

function showText() {
    page.classList.remove("hidden");
    document.body.style.cursor = "default";
    cursorVisible = true;
}

function mouseMoved(){
    showText();
    if (mouseTimer) {
        window.clearTimeout(mouseTimer);
    }
    if (!cursorVisible) {
        showText();
    }
    mouseTimer = window.setTimeout(hideText, WAIT_TIME);
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
    i = i == 0 ? photos.length - 1 : i - 1;
    update(true);      
}

function next() {
    i = i == photos.length - 1 ? 0 : i + 1;
    update(true);
}

function photo(index) {
    i = index;
    update(false);
}

window.setTimeout(hideBanner, WAIT_TIME);

function hideBanner() {
    document.getElementById("banner").className = "text-block banner hidden";
}

function unify(e) { 
    console.log("unify");
    return e.changedTouches ? e.changedTouches[0] : e;
}

function lock(e) {
    console.log("locking");
    x0 = unify(e).clientX;
    container.classList.toggle('smooth', !(locked = true)); 
}

function drag(e) {
    console.log("drag");
    mouseMoved(); // this is going to be a problem
    e.preventDefault();
    if (locked) {
        container.style.setProperty("--tx", `${Math.round(unify(e).clientX - x0)}px`);
    }
}

function move(e) {
    console.log("move");
    if (locked) {
        let dx = unify(e).clientX - x0, 
            s = Math.sign(dx),
            f = +(s*dx/w).toFixed(2);
        if ((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > .2) {
            container.style.setProperty('--i', i -= s);
            f = 1 - f;
            update();
        }
        container.style.setProperty("--tx", "0px");
        container.style.setProperty("--f", f);
        container.classList.toggle('smooth', !(locked = false));
        x0 = null;
    }  
}

container.addEventListener("mousedown", lock, false);
container.addEventListener("touchstart", lock, false);

container.addEventListener("mousemove", drag, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mouseup", move, false);
container.addEventListener("touchend", move, false);

document.onkeydown = checkKeycode;
