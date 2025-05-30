const board = new Array(64)
const boardDisplay = document.querySelector('#board-display');

for (let i = 0; i < board.length; i++) {
  const row = Math.floor(i/8);
  board[i] = i
  const square = document.createElement('div');
  square.classList.add('square');
  if (i % 2 === row % 2) {
    square.classList.add('dark');
  } else {
    square.classList.add('light');
  }
  square.textContent = String.fromCharCode(row + 97) + ((i % 8) + 1);
  boardDisplay.appendChild(square)
}

