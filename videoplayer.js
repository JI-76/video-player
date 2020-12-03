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



// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //



// Event Listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
