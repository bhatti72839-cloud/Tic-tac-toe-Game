document.addEventListener("DOMContentLoaded", () => {
  let boardState = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameActive = true;

  const statusDisplay = document.getElementById("status");
  const cells = document.querySelectorAll(".cell");

  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
  });

  function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (boardState[clickedIndex] !== "" || !gameActive) {
      return;
    }

    boardState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
  }

  function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      if (statusDisplay) statusDisplay.textContent = `Player ${currentPlayer} Wins! 🎉`;
      gameActive = false;
      return;
    }

    if (!boardState.includes("")) {
      if (statusDisplay) statusDisplay.textContent = "It's a Draw! 🤝";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (statusDisplay) statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }

  // Make restartGame available to the HTML button click
  window.restartGame = function() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    if (statusDisplay) statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
  };
});
