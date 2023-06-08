const cells = document.querySelectorAll("td");
const message = document.getElementById("message");
const reset = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let gameStatus = "ongoing";

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function updateBoard() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = board[i];
  }
}

function checkWin() {
  for (let i = 0; i < winConditions.length; i++) {
    let [a, b, c] = winConditions[i];
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  if (!board.includes("")) {
    return "tie";
  }
  return null;
}

function handleClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("id");
  if (board[index] === "" && gameStatus === "ongoing") {
    board[index] = player;
    updateBoard();
    const winner = checkWin();
    if (winner) {
      if (winner === "tie") {
        message.textContent = "It's a tie!";
      } else {
        message.textContent = `${winner} wins!`;
      }
      gameStatus = "over";
    } else {
      player = player === "X" ? "O" : "X";
      message.textContent = `It's ${player}'s turn`;
    }
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  player = "X";
  gameStatus = "ongoing";
  updateBoard();
  message.textContent = `It's ${player}'s turn`;
}

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleClick);
}

reset.addEventListener("click", resetGame);
