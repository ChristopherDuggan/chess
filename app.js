const board = new Array(64)
let flipped = true;

// white pieces
board[0] = board[7] = 'wR';
board[1] = board[6] = 'wN';
board[2] = board[5] = 'wB';
board[3] = 'wK';
board[4] = 'wQ';
for (let i = 8; i < 16; i++) {
  board[i] = 'wP';
}

// black pieces
for (let i = 48; i < 56; i++) {
  board[i] = 'bP';
}
board[56] = board[63] = 'bR';
board[57] = board[62] = 'bN';
board[58] = board[61] = 'bB';
board[59] = 'bK';
board[60] = 'bQ';

const boardDisplay = document.querySelector('#board-display');

for (let i = 0; i < board.length; i++) {
  const row = Math.floor(i/8);
  const square = document.createElement('div');
  square.classList.add('square');
  if (i % 2 === row % 2) {
    square.classList.add('light');
  } else {
    square.classList.add('dark');
  }
  square.textContent = String.fromCharCode(row + 97) + ((i % 8) + 1);
  if (board[i]) {
    const piece = document.createElement('img');
    piece.src = `images/${board[i]}.svg`;
    piece.classList.add('piece');
    square.appendChild(piece);
  }
  boardDisplay.appendChild(square)
}

const squares = document.querySelectorAll('.square');

const flipBoard = function() {
    boardDisplay.classList.toggle('flipped');
    squares.forEach(square => square.classList.toggle('flipped'));
};

const flipButton = document.createElement('button');
flipButton.textContent = 'flip board';
document.querySelector('body').appendChild(flipButton);
flipButton.addEventListener('click', flipBoard);

flipBoard();
