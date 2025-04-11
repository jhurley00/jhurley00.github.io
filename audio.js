const audio = document.getElementById('audio');
const volumeSlider = document.getElementById('volume-slider');

function togglePlay() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function muteAudio() {
    audio.muted = !audio.muted;
}

function setVolume(value) {
    audio.volume = value;
}

window.onload = () => {
    document.getElementById("popup").style.display = "block";
};

// Close the pop-up when the button is clicked
function closePopup() {
    document.getElementById("popup").style.display = "none";
}