// videoplayer.js


// Add const to handle HTML Elements
// Use document.getElementById() with Ids
// Use document.querySelector() with Class names or the Element itself (only 1 of these HTML elements on the webpage)
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //

function showPlayIcon() {
     // change appearance from Pause to Play
     playBtn.classList.replace('fa-pause', 'fa-play');
     playBtn.setAttribute('title', 'Play');
};

function togglePlay() {
    if (video.paused) {
        // if paused; play
        video.play();
        // change appearance from Play to Pause
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        // if playing; pause
        video.pause();
        // change appearance from Pause to Play
        showPlayIcon();
    };
};

// Event Listeners
// On Video End, show play button icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //

// Calculate Display Time format
function displayTime(time) {
    // minutes
    const minutes = Math.floor(time / 60);
    // seconds
    // for number < 10 add preceeding "0"
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    //console.log(minutes, seconds);
    return `${minutes}:${seconds}`;
};


// Update Progress Bar as Video plays
function updateProgress() {
    // console.log('currentTime', video.currentTime, 'duration', video.duration);
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    // should display as 01:04 minutes
    //displayTime(64);
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
};

// Click to Seek within video
// Event = e
function setProgress(e) {
    // console.log(e);
    // .offsetX property is where on the progress bar the click occurred
    // .offsetWidth property is the total widith of the progress bar
    const newTime = e.offsetX / progressRange.offsetWidth;
    // update progress bar location to %
    progressBar.style.width = `${newTime * 100}%`;
    // update progress bar appearance to display the % completed
    video.currentTime = newTime * video.duration;

    // console.log(newTime);
};

// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //



// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
// fires 4 times/sec
video.addEventListener('timeupdate', updateProgress);
// fires when video is fully loaded
video.addEventListener('canplay', updateProgress);
// fire when progress bar is clicked
progressRange.addEventListener('click', setProgress);