// input
const timerMinutes = document.getElementById("minutes"); 
const timerSeconds = document.getElementById("seconds"); 

// buttons
const buttonRun = document.getElementById("start");
const buttonStop = document.getElementById("stop");
const buttonReset = document.getElementById("reset");
const buttonSetOneMinut = document.getElementById("one-minut-button");
const buttonSetFiveMinut = document.getElementById("five-minut-button");
const buttonSetTenMinut = document.getElementById("ten-minut-button");

let audio_file = new Audio('./assets/krya.mp3');
let minutes = localStorage.getItem("minutes") ?? 0;
let seconds = localStorage.getItem("seconds") ?? 0;
let timer = null;

timerMinutes.value = minutes;
timerSeconds.value = seconds;

let isRun = Number(localStorage.getItem("isRun")) ?? 0;

const minutesChange = (e) => {
    if(e.target.value >= 0){
        minutes = e.target.value;
        localStorage.setItem("minutes", e.target.value);
    }
}

const secondsChange = (e) => {
    if(e.target.value >= 0){
        seconds = e.target.value;
        localStorage.setItem("seconds", e.target.value);
    }
}

const setTimeByButton = (time) => {
    minutes = time;
    seconds = 0;
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("seconds", seconds);

    timerMinutes.value = minutes;
    timerSeconds.value = seconds;

}

const playMusic = () => {
    audio_file.loop = true;
    audio_file.autoplay = true;
    audio_file.play();
}

const stopPlayMusic = () => {
    audio_file.loop = false;
    audio_file.autoplay = false;
    audio_file.pause();
    audio_file.currentTime = 0;
}

const startTimer = () => {
    if (minutes > 0 || seconds > 0 || isRun) {

        minutes = isNaN(parseInt(timerMinutes.value)) ? 0 : parseInt(timerMinutes.value);
        seconds = isNaN(parseInt(timerSeconds.value)) ? 0 : parseInt(timerSeconds.value);
        
        buttonRun.removeEventListener('click', startTimer);
        timerMinutes.classList.add('disable');
        timerSeconds.classList.add('disable');

        isRun=1;
        localStorage.setItem("isRun", isRun);
        timer = setInterval(() => {
        if (minutes == 0 && seconds == 1) {
            clearInterval(timer);

            isRun=0;
            localStorage.setItem("isRun", isRun);

            buttonRun.addEventListener('click', startTimer);

            playMusic();
            document.body.classList.add('red-back');

        } else if(minutes > 0 && seconds == 0){
            --minutes; 
            timerMinutes.value = `${Math.trunc(minutes)}`;
            seconds = 60; 
            localStorage.setItem("minutes", minutes);
        }
        --seconds;
        timerSeconds.value = `${(seconds)}`;
        localStorage.setItem("seconds", seconds);

        }, 1000);
    }

}

if(isRun){
    startTimer();
}

const stopTimer = () => {
    clearInterval(timer);
    buttonRun.addEventListener('click', startTimer);
    isRun = 0;
    localStorage.setItem("isRun", isRun);
}

const resetTimer = () => {
    clearInterval(timer);
    minutes = 0;
    seconds = 0;
    
    timerMinutes.value = minutes;
    timerSeconds.value = seconds;

    buttonRun.addEventListener('click', startTimer);

    document.body.classList.remove('red-back');
    timerMinutes.classList.remove('disable');
    timerSeconds.classList.remove('disable');
    stopPlayMusic();
    localStorage.clear();
}

// input listener
timerMinutes.addEventListener('change', minutesChange);
timerSeconds.addEventListener('change', secondsChange);

// button click
buttonRun.addEventListener('click', startTimer);
buttonStop.addEventListener('click', stopTimer);
buttonReset.addEventListener('click', resetTimer);

buttonSetOneMinut.addEventListener('click', () => {
    setTimeByButton(1);
});

buttonSetFiveMinut.addEventListener('click', () => {
    setTimeByButton(5);
});

buttonSetTenMinut.addEventListener('click', () => {
    setTimeByButton(10);
});

