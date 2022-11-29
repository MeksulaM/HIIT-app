const form = document.querySelector("form");
const startPauseButton = document.getElementById("start-pause-button");

let numberOfCircuits;
let numberOfSets;
let exerciseDuration;
let restDuration;
let restBetweenSets;
const prepareTime = 10;

let seconds = 4;
let minutes = 0;
let displaySeconds;
let displayMinutes;
let timerInterval;
let timerStatus = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  numberOfCircuits = form[0].value;
  numberOfSets = form[1].value;
  exerciseDuration = form[2].value;
  restDuration = form[3].value;
  restBetweenSets = form[4].value;
});

function measureTime() {
  seconds--;
  
  displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  document.getElementById(
    "timer"
    ).innerText = `${displayMinutes}:${displaySeconds}`;
    
    if (seconds === 0 && minutes === 0) window.clearInterval(timerInterval);
    
    if (seconds === 0 && minutes > 0) {
      minutes--;
      seconds = 60;
    }
  }

startPauseButton.addEventListener("click", () => {
  if (!timerStatus) {
    timerInterval = window.setInterval(measureTime, 1000);
    startPauseButton.innerText = "PAUSE";
    timerStatus = true;
  } else {
    window.clearInterval(timerInterval);
    startPauseButton.innerText = "START";
    timerStatus = false;
  }
});
