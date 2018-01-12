// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Functions
function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    const icon = this.paused ? '►' : '⏸';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.valueAsNumber;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(evt) {
    const scrubTime = (evt.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(skipBtn => skipBtn.addEventListener('click', skip));

ranges.forEach(rangeBtn => rangeBtn.addEventListener('change', handleRangeUpdate));
ranges.forEach(rangeBtn => rangeBtn.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (evt) => mousedown && scrub(evt)); //jeśli mousedown jest tru to wywoła scrub
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// dodać przycisk fullscreen
// poprawić błąd przy przewijaniu paska postępu, gdy wyjedzie się myszą za niego