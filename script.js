const resetButton = document.querySelector(".resetButton");
const cells = document.querySelectorAll(".cell");
const turn = document.querySelector(".turn");
const winner = document.querySelector(".winner");
const choose = document.querySelector(".choose");

let board = ['', '', '', '', '', '', '', '', ''];
let xSign = `<div class="xSign"></div>`;
let oSign = `<div class="oSign"></div>`;
let currentPlayer = xSign;
let currentPlayerXO = "X";
let gameEnded = false;
let buttonClicked = false;

/*  - If u click on any cell after that find that cell's index
    - If game ended then do nothing
    - If that board index is empty then updating textcontent and players
    - If game ended then show the winner and gameended true that means you can't put another x or o
      else if every cell is not empty then its tie, else changing players etc
*/
cells.forEach(cell => cell.addEventListener("click", (event) => {
    const cellIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
    buttonClicked = true;
    selectPlayer();

    if (gameEnded) {
        return;
    }

    if (board[cellIndex] === "") {       
        event.target.innerHTML = currentPlayer;
        board[cellIndex] = currentPlayer;   
        
        if (checkWinner()) {
            turn.textContent = "Game ended";
            winner.textContent = `Winner: ${currentPlayerXO}`;
            gameEnded = true;
            resetGame();
        } else if (board.every(cell => cell !== "")) {
            turn.textContent = "Game ended";
            winner.textContent = "It's a tie!";
            gameEnded = true;
            resetGame();
        } else {
            currentPlayer = currentPlayer === xSign ? oSign : xSign;
            currentPlayerXO = currentPlayerXO === "X" ? "O" : "X";
            turn.textContent = `${currentPlayerXO}'s turn`;
        }

    }
    
}));

// Check Winner
function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Reset Game
resetGame();
function resetGame() {
    resetButton.addEventListener("click", () => {
        Array.from(document.getElementsByClassName("cell")).forEach(cell => {
            cell.innerHTML = "";
        })

        gameEnded = false;
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = xSign;
        currentPlayerXO = "X";
        choose.textContent = currentPlayerXO;
        turn.textContent = "X's turn";
        winner.textContent = `Winner: Unknown`;
        buttonClicked = false;
        choose.disabled = false;
    });
}

// Choose between X or O
function selectPlayer() {
    if (buttonClicked = false) {
        choose.disabled = false;
    } else if (buttonClicked = true) {
        choose.disabled = true;
    }
}

choose.addEventListener("click", () => {
    currentPlayer = currentPlayer === xSign ? oSign : xSign;
    currentPlayerXO = currentPlayerXO === "X" ? "O" : "X";
    choose.textContent = currentPlayerXO;
    turn.textContent = `${currentPlayerXO}'s turn`
}); 