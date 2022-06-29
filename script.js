const screens = document.querySelectorAll('.screen');
const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');

let seconds = 0;
let score = 0;
let selectedInsect = {};

startBtn.addEventListener('click', () => screens[0].classList.add('up'));

chooseInsectBtns.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    const { src, alt } = btn.querySelector('img');
    selectedInsect = { src, alt };
    screens[1].classList.add('up');

    setTimeout(addInsect, 1000);
    startGame();
  })
);

function addInsect() {
  const newInsect = document.createElement('div');
  newInsect.classList.add('insect');
  newInsect.innerHTML = `
  <img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.floor(
    Math.random() * 360
  )}deg)"/>`;
  const { x, y } = getRandomLocation();

  newInsect.style.top = `${y}px`;
  newInsect.style.left = `${x}px`;
  newInsect.addEventListener('click', catchInsect);
  gameContainer.appendChild(newInsect);
}

function catchInsect(newInsect) {
  increaseScore();
  this.classList.add('caught');
  setTimeout(() => this.remove(), 2000);
  setTimeout(addInsect, 1000);
  setTimeout(addInsect, 1500);
}

function increaseScore() {
  ++score;
  scoreElement.innerText = `Score: ${score}`;
  if (score === 20) {
    messageElement.classList.add('visible');
  }
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;

  timeElement.innerText = `Time: ${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  ++seconds;
}

function startGame() {
  setInterval(increaseTime, 1000);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = 100 + Math.floor(Math.random() * (width - 200));
  const y = 100 + Math.floor(Math.random() * (height - 200));
  return { x, y };
}
