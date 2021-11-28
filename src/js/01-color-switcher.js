const refs = {
  startBtn: document.querySelector('button[data-action="start"]'),
  stopBtn: document.querySelector('button[data-action="stop"]'),
  body: document.querySelector('body')
}

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

let currentColor = null;

function startChanging() {
  refs.startBtn.disabled = true;
  currentColor = setInterval(() => {
    refs.body.style.backgroundColor = colors[randomIntegerFromInterval(0, 5)];
  }, 1000);
}

function stopChanging() {
  refs.startBtn.disabled = false;
  clearInterval(currentColor);
}

refs.startBtn.addEventListener('click', startChanging);
refs.stopBtn.addEventListener('click', stopChanging);