const board = new Array(64)
board.fill(null);
const move = [];
let prevMove = []

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
  // prevent taking your own pieces
  if (move[0][0] === move[2][0]) return false;
  switch (piece) {
  // move restrictions for pawn
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
    case 'wN':
    case 'bN':
      // + 17 + 15 + 10 + 6 - 15 -17 - 10 - 6
      if (index2 === index1 + 17
      || index2 === index1 + 15
      || index2 === index1 + 10
      || index2 === index1 + 6
      || index2 === index1 - 17
      || index2 === index1 - 15
      || index2 === index1 - 10
      || index2 === index1 - 6) return true
      break;
    case 'wB':
    case 'bB':
      if (move[1] === move[3] && 
        ((index1 - index2) % 7 === 0 || (index1 - index2) % 9 === 0)
      ) return true

      break;
    case 'wR':
    case 'bR':
      if ((index1 - index2) % 8 === 0) {
        return true;
      } else  if (index1 < 8 && index2 < 8) {
        return true;
      } else if (index1 > 7 && index1 < 16
        && index2 > 7 && index2 < 16) {
        return true;
      } else if (index1 > 15 && index1 < 24
        && index2 > 15 && index2 < 24) {
        return true;
      } else if (index1 > 23 && index1 < 32
        && index2 > 23 && index2 < 32) {
        return true;
      } else if (index1 > 31 && index1 < 40
        && index2 > 31 && index2 < 40) {
        return true;
      } else if (index1 > 39 && index1 < 48
        && index2 > 39 && index2 < 48) {
        return true;
      } else if (index1 > 47 && index1 < 56
        && index2 > 47 && index2 < 56) {
        return true;
      } else if (index1 > 55 && index1 < 64
        && index2 > 55 && index2 < 64) {
        return true;
      }
      break;
    case 'wQ':
    case 'bQ':
      if (move[1] === move[3] && 
        ((index1 - index2) % 7 === 0 || (index1 - index2) % 9 === 0)
      ) {
        return true
      } else if ((index1 - index2) % 8 === 0) {
        return true;
      } else  if (index1 < 8 && index2 < 8) {
        return true;
      } else if (index1 > 7 && index1 < 16
        && index2 > 7 && index2 < 16) {
        return true;
      } else if (index1 > 15 && index1 < 24
        && index2 > 15 && index2 < 24) {
        return true;
      } else if (index1 > 23 && index1 < 32
        && index2 > 23 && index2 < 32) {
        return true;
      } else if (index1 > 31 && index1 < 40
        && index2 > 31 && index2 < 40) {
        return true;
      } else if (index1 > 39 && index1 < 48
        && index2 > 39 && index2 < 48) {
        return true;
      } else if (index1 > 47 && index1 < 56
        && index2 > 47 && index2 < 56) {
        return true;
      } else if (index1 > 55 && index1 < 64
        && index2 > 55 && index2 < 64) {
        return true;
      }
      break;

    default:
      return false;
  }

}

const boardClick = function(e) {
  if (move.length === 0 && e.target.nodeName === 'IMG') {
    move.push(e.target.id)
  } else if (move.length === 2) {
    move.push(e.target.id)
  };
  
  if (e.target.classList.contains('light') 
    || e.target.parentNode.classList.contains('light')) {
    move.push('light');
  } else {
    move.push('dark');
  }

  if (move.length === 4) {
    const [piece, index1] = move[0].split(' ');
    const destination = move[2].split(' ');
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
    prevMove = [...move];
    move.length = 0;
  };
};
boardDisplay.addEventListener('click', boardClick);
