import { themesConfig, audioConfig } from './config.js';

// Game Variables
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = {
  X: 0,
  O: 0,
  draws: 0
};

// DOM Elements
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
const xWinsDisplay = document.getElementById('x-wins');
const oWinsDisplay = document.getElementById('o-wins');
const drawsDisplay = document.getElementById('draws');
const resetBtn = document.getElementById('reset-game');
const newGameBtn = document.getElementById('new-game');

// Winning Conditions
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// Initialize Game
export function initGame() {
  // Load saved scores
  const savedScores = localStorage.getItem('ticTacToeScores');
  if (savedScores) {
    scores = JSON.parse(savedScores);
    updateScoreDisplay();
  }

  // Set event listeners
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
    cell.addEventListener('mouseenter', handleCellHover);
    cell.addEventListener('mouseleave', handleCellHover);
  });

  resetBtn.addEventListener('click', resetScores);
  newGameBtn.addEventListener('click', newGame);

  // Initialize first game
  newGame();
}

// Handle Cell Click
function handleCellClick() {
  const cellIndex = parseInt(this.dataset.index);

  // If cell is already filled or game is not active, return
  if (gameState[cellIndex] !== '' || !gameActive) return;

  // Play click sound
  if (audioConfig.enabled) {
    const clickSound = document.getElementById('click-sound');
    clickSound.currentTime = 0;
    clickSound.play();
  }

  // Update game state
  gameState[cellIndex] = currentPlayer;
  this.textContent = currentPlayer;
  this.classList.add(currentPlayer.toLowerCase());

  // Check for win or draw
  checkResult();
}

// Handle Cell Hover
function handleCellHover(e) {
  const cell = e.target;
  if (gameState[parseInt(cell.dataset.index)] !== '' || !gameActive) return;

  if (e.type === 'mouseenter') {
    cell.textContent = currentPlayer;
    cell.style.opacity = '0.5';
    cell.classList.add(currentPlayer.toLowerCase() + '-hover');
  } else {
    cell.textContent = '';
    cell.style.opacity = '1';
    cell.classList.remove('x-hover', 'o-hover');
  }
}

// Check Game Result
function checkResult() {
  let roundWon = false;

  // Check all winning conditions
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') continue;

    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      roundWon = true;
      highlightWinningCells(a, b, c);
      break;
    }
  }

  // If won
  if (roundWon) {
    // Play win sound
    if (audioConfig.enabled) {
      const winSound = document.getElementById('win-sound');
      winSound.currentTime = 0;
      winSound.play();
    }

    // Update scores
    scores[currentPlayer]++;
    updateScoreDisplay();
    saveScores();

    // Update status
    currentPlayerDisplay.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  // If draw
  if (!gameState.includes('')) {
    scores.draws++;
    updateScoreDisplay();
    saveScores();

    currentPlayerDisplay.textContent = "Draw!";
    gameActive = false;
    return;
  }

  // Continue game
  changePlayer();
}

// Highlight Winning Cells
function highlightWinningCells(a, b, c) {
  cells[a].classList.add('win');
  cells[b].classList.add('win');
  cells[c].classList.add('win');
}

// Change Player
function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerDisplay.textContent = currentPlayer;
  currentPlayerDisplay.style.color = currentPlayer === 'X' ? 
    getComputedStyle(document.documentElement).getPropertyValue('--x-color') : 
    getComputedStyle(document.documentElement).getPropertyValue('--o-color');
}

// Update Score Display
function updateScoreDisplay() {
  xWinsDisplay.textContent = scores.X;
  oWinsDisplay.textContent = scores.O;
  drawsDisplay.textContent = scores.draws;
}

// Save Scores to Local Storage
function saveScores() {
  localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
}

// Reset Scores
function resetScores() {
  scores = { X: 0, O: 0, draws: 0 };
  updateScoreDisplay();
  saveScores();
  newGame();
}

// Start New Game
function newGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  currentPlayerDisplay.textContent = currentPlayer;
  currentPlayerDisplay.style.color = getComputedStyle(document.documentElement).getPropertyValue('--x-color');

  // Clear cells
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'win');
  });
}
