const board = new Array(64)
board.fill(null);
const move = [];

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
  square.id = i;
  if (board[i]) {
    const piece = document.createElement('img');
    piece.src = `images/${board[i]}.svg`;
    piece.id = board[i] + ' ' + i;
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

const isLegal = function(piece, index1, index2) {
  // move restrictions for pawn
  switch (piece) {
    case 'wP':
      if (index2 === index1 + 8
      && !board[index2]) return true;
      if (index2 === index1 + 16
        && index1 > 7
        && index1 < 16
        && !board[index2]) return true;
      if (board[index2]
      && (index2 === index1 + 7
      || index2 === index1 + 9)) return true;
      break;
    case 'bP':
      if (index2 === index1 - 8
      && !board[index2]) return true;
      if (index2 === index1 - 16
        && index1 < 56
        && index1 > 47
        && !board[index2]) return true;
      if (board[index2]
      && (index2 === index1 - 7
      || index2 === index1 - 9)) return true;
      break;
  }
  return false

}

const boardClick = function(e) {
  if (move.length === 0 && e.target.nodeName === 'IMG') {
    move.push(e.target.id)
  } else if (move.length === 1) {
    move.push(e.target.id)
  };

  if (move.length === 2) {
    const [piece, index1] = move[0].split(' ');
    const destination = move[1].split(' ');
    let index2;
    if (destination.length === 2) {
      index2 = destination[1];
    } else {
      index2 = destination[0];
    }
    if (index1 === index2) {
      move.length = 0;
      return;
    }
    if (!isLegal(piece, Number(index1), Number(index2))) {
      move.length = 0;
      return;
    }
    board[index2] = piece;
    board[index1] = null;

    for (let i = 0; i < board.length; i++) {
      const row = Math.floor(i/8);
      squares[i].innerHTML = String.fromCharCode(row + 97) + (( i % 8) + 1);
      if (board[i]) {
        const piece = document.createElement('img');
        piece.src = `images/${board[i]}.svg`;
        piece.id = board[i] + ' ' + i;
        piece.classList.add('piece');
        squares[i].appendChild(piece);
      }
    }
    move.length = 0;
  };
};
boardDisplay.addEventListener('click', boardClick);
