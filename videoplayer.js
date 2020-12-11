// videoplayer.js


// Add const to handle HTML Elements
// Use document.getElementById() with Ids
// Use document.querySelector() with Class names or the Element itself (only 1 of these HTML elements on the webpage)
const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
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
    // update the video to the new location
    video.currentTime = newTime * video.duration;

    // console.log(newTime);
};

// Volume Controls --------------------------- //

// Add global variable to mute volume on\off
// by default, video.volume attribute is set to 1 aka 100%
let lastVolume = 1;

// Volume Bar
function changeVolume(e) {
    // .offsetX property is where on the volume bar the click occurred
    // .offsetWidth property is the total widith of the volume bar
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding Volume down
    if (volume < 0.1) {
        volume = 0;
    };
    // Rounding Volume up
    if (volume > 0.9) {
        volume = 1;
    };
    // update volume bar location to %
    volumeBar.style.width = `${volume * 100}%`;
    // update the video volume to the new %
    video.volume = volume;

    // Change Icon depending on volume
    // remove icon via its class
    volumeIcon.className = '';
    // add back an icon depending on the chosen volume
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    };
    
    // store volume setting
    lastVolume = volume;
    // console.log(volume);
};

// Mute/Unmute
function toggleMute() {

    volumeIcon.className = '';
    // if volume > 0
    if (video.volume) {
        lastVolume = video.volume;
        // toggle from unmute to mute
        video.volume = 0;
        // update volume bar location to 0%
        volumeBar.style.width = 0;
        // update the volume icon appearance to mute
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        // toggle from mute to unmute
        video.volume = lastVolume;
        // update volume bar location to %
        volumeBar.style.width = `${lastVolume * 100}%`;
        // update the volume icon appearance to unmute
        volumeIcon.classList.add('fas', 'fa-volume-up');
        volumeIcon.setAttribute('title', 'Mute');
    };
};

// Change Playback Speed -------------------- //

function changeSpeed() {
    video.playbackRate = speed.value;
    // console.log('video playback rate', video.playbackRate);
    // console.log('selected value', speed.value);
};

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullscreen) { /* Firefox */
      elem.mozRequestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari, and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }

    // ensure player remains centered
    video.classList.add('video-fullscreen');
};
    
 /* Close fullscreen */
 function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }  else if (elem.mozCancelFullscreen) { /* Firefox */
      elem.mozCancelFullscreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari, and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }

    // ensure player remains centered
    video.classList.remove('video-fullscreen');
};

// add global variable to handle fullscreen functionality state
let fullscreen = false;

// Toggle Fullscreen
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    };
    // store the opposite state
    fullscreen = !fullscreen;
};

// Event Listeners
// fire when play button is clicked
playBtn.addEventListener('click', togglePlay);
// fire when ideo is clicked
video.addEventListener('click', togglePlay);
// fires 4 times/sec
video.addEventListener('timeupdate', updateProgress);
// fires when video is fully loaded
video.addEventListener('canplay', updateProgress);
// fire when progress bar is clicked
progressRange.addEventListener('click', setProgress);
// fire when volume bar is clicked
volumeRange.addEventListener('click', changeVolume);
// fire when volume icon is clicked
volumeIcon.addEventListener('click', toggleMute);
// fire when playback selector value changes
speed.addEventListener('change', changeSpeed);
// fire when fullscreen button is clicked
fullscreenBtn.addEventListener('click', toggleFullscreen);