const audio = document.getElementById('audio');
const volumeSlider = document.getElementById('volume-slider');

// Load saved audio state from localStorage
window.onload = () => {
    document.getElementById("popup").style.display = "block";
    
    // Check if the audio should be paused or played
    const savedState = localStorage.getItem('audioState');
    if (savedState === 'paused') {
        audio.pause();
    } else if (savedState === 'playing') {
        audio.play();
    }

    // Set volume if stored in localStorage
    const savedVolume = localStorage.getItem('audioVolume');
    if (savedVolume) {
        audio.volume = savedVolume;
        volumeSlider.value = savedVolume * 100; // Assuming volume is saved as a decimal (0 to 1)
    }
};

// Toggle play/pause and save state
function togglePlay() {
    if (audio.paused) {
        audio.play();
        localStorage.setItem('audioState', 'playing');
    } else {
        audio.pause();
        localStorage.setItem('audioState', 'paused');
    }
}

// Mute audio (optional, you can add this feature if needed)
function muteAudio() {
    audio.muted = !audio.muted;
}

// Set volume and save it
function setVolume(value) {
    audio.volume = value;
    localStorage.setItem('audioVolume', value);
}

// Close the pop-up when the button is clicked
function closePopup() {
    document.getElementById("popup").style.display = "none";
}
