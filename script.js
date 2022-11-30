const form = document.querySelector("form");
const startPauseButton = document.getElementById("start-pause-button");

let numberOfCircuits;
let numberOfSets;
let exerciseDuration;
let restDuration;
let restBetweenSets;
let prepareTime = 10;

let seconds;
let minutes = 0;
let displaySeconds;
let displayMinutes;
let timerInterval;
let timerStatus = false;

let values = {
  numberOfCircuits: undefined,
  numberOfSets: undefined,
  exerciseDuration: undefined,
  restDuration: undefined,
  restBetweenSets: undefined,
};

let warmUpStatus = true;
let exerciseStatus = false;
let restStatus = false;
let bigRestStatus = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  numberOfCircuits = form[0].value;
  numberOfSets = form[1].value;
  exerciseDuration = form[2].value;
  restDuration = form[3].value;
  restBetweenSets = form[4].value;

  values.numberOfCircuits = numberOfCircuits;
  values.numberOfSets = numberOfSets;
  values.exerciseDuration = exerciseDuration;
  values.restDuration = restDuration;
  values.restBetweenSets = restBetweenSets;
});

function warmUp() {
  prepareTime--;
  if (prepareTime === 0) {
    warmUpStatus = false;
    exerciseStatus = true;
  }
  return prepareTime;
}

function exercise() {
  exerciseDuration--;
  if (exerciseDuration === 0) {
    exerciseStatus = false;
    restStatus = true;
    restDuration = values.restDuration;

    if (numberOfSets === 1) {
      exerciseStatus = false;
      bigRestStatus = true;
    }
  }
  return exerciseDuration;
}

function rest() {
  restDuration--;
  if (restDuration === 0) {
    restStatus = false;
    exerciseStatus = true;
    numberOfSets--;
    exerciseDuration = values.exerciseDuration;
  }
  return restDuration;
}

function bigRest() {
  restBetweenSets--;
  if (restBetweenSets === 0 && numberOfCircuits > 1) {
    bigRestStatus = false;
    exerciseStatus = true;
    numberOfCircuits--;
    exerciseDuration = values.exerciseDuration;
  } else if (restBetweenSets === 0 && numberOfCircuits === 1) {
    bigRestStatus = false;
    exerciseStatus = false;
    restStatus = false;
    warmUpStatus = false;
    timerStatus = false;
  }
  return restBetweenSets--;
}

function measureTime() {
  if (warmUpStatus) {
    seconds = warmUp();
  }

  if (exerciseStatus) {
    seconds = exercise();
  }

  if (restStatus) {
    seconds = rest();
  }

  if (bigRestStatus) {
    seconds = bigRest();
  }

  displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
  displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

  document.getElementById(
    "timer"
  ).innerText = `${displayMinutes}:${displaySeconds}`;
}

startPauseButton.addEventListener("click", () => {
  if (!timerStatus) {
    timerInterval = window.setInterval(measureTime, 100);
    startPauseButton.innerText = "PAUSE";
    timerStatus = true;
  } else {
    window.clearInterval(timerInterval);
    startPauseButton.innerText = "START";
    timerStatus = false;
  }
});
