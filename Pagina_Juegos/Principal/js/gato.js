let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = 'X';
let gameOver = false;
let messageElement = document.getElementById('message');

function makeMove(position) {
    if (gameOver || board[position] !== ' ') return;

    board[position] = currentPlayer;
    document.getElementsByClassName('cell')[position].textContent = currentPlayer;
    if (checkWinner()) {
        messageElement.textContent = `¡${currentPlayer} ha ganado!`;
        gameOver = true;
    } else if (board.indexOf(' ') === -1) {
        messageElement.textContent = '¡Empate!';
        gameOver = true;
    } else {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        messageElement.textContent = `Turno de ${currentPlayer}`;
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] !== ' ' && board[a] === board[b] && board[b] === board[c]) {
            return true;
        }
    }

    return false;
}

function resetGame() {
    board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    currentPlayer = 'X';
    gameOver = false;
    messageElement.textContent = 'Esperando inicio...';
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
    }
}
