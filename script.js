'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// defining variables as empty (outside scope)
let scores, currentScore, activePlayer, playing;

//initializing, stasting conditions

const init = function () {
  scores = [0, 0]; // total scores
  currentScore = 0;
  activePlayer = 0; // to know who is active player
  playing = true;

  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // dynamic load of imgs

    // 3. Check for rolled 1:
    if (dice !== 1) {
      // if it is not 1, add dice roll to current score
      currentScore += dice;
      // dynamic selection to keep track of active player
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // if it is 1, switch player
      // if it is player 0 then switch to 1
      // if it is player 0 then switch to 0
      switchPlayer();
    }
  }
});

// Holding score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    console.log(scores);

    // 2. check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      // deactive buttons roll and hold
      playing = false;
      // change colours
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // hide dice
      diceEl.classList.add('hidden');
    } else {
      // if no, switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
