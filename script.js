const form = document.querySelector("form");

let numberOfSets;
let exerciseDuration;
let restDuration;
let restBetweenSets;
const prepareTime = 10;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  numberOfSets = form[0].value;
  exerciseDuration = form[1].value;
  restDuration = form[2].value;
  restBetweenSets = form[3].value;
});
