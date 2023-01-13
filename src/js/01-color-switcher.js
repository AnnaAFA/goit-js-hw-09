const startBtn = document.querySelector('button[data-start]');
// console.log(startBtn);
const stopBtn = document.querySelector('button[data-stop]');
console.log(stopBtn);

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

let intervalId = null;

function onStartBtnClick() {
  startBtn.setAttribute('disabled', 'true');
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  startBtn.removeAttribute('disabled');
  clearInterval(intervalId);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
