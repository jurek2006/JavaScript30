let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const setTimerBtns = document.querySelectorAll('[data-time]');

function timer(seconds){
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds*1000;

    displayEndTime(then);
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // checki if we should stop it
        if(secondsLeft < 0){
            clearInterval(countdown);
        } else {
            // display it
            displayTimeLeft(secondsLeft);
        }
    }, 1000);
}

function displayTimeLeft(seconds) {

    let secondsLeft = seconds;
    const hours = Math.floor(secondsLeft / 3600);
    secondsLeft -= hours * 3600;
    const mins = Math.floor(secondsLeft / 60);
    secondsLeft -= mins * 60;
    const display = `${hours > 0 ? addLeadingZero(hours) + ':' : ''}${addLeadingZero(mins)}:${addLeadingZero(secondsLeft)}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const mins = end.getMinutes();
    const secs = end.getSeconds();
    endTime.textContent = `Be back at ${addLeadingZero(hour)}:${addLeadingZero(mins)}:${addLeadingZero(secs)}`;
}

const addLeadingZero = (num) => (num < 10 ? '0' : '') + num;

function setTimer() {
    const time = parseInt(this.dataset.time);
    timer(time);
}

setTimerBtns.forEach(btn => btn.addEventListener('click', setTimer ));

document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});
