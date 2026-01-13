let currentRound = 1;
let userScore = 0;
let computerScore = 0;
let results = [];

const userImg = document.getElementById("user-img");
const computerImg = document.getElementById("computer-img");

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
}

function goToInstructions() {
  showScreen("instructions");
}

function startGame() {
  document.getElementById("vs-container").style.display = "none";
  showScreen("game");
}

function playRound(userChoice) {
  if (currentRound > 3) return;

  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  userImg.src = `assets/user/${userChoice}.png`;
  computerImg.src = `assets/computer/${computerChoice}.png`;
  document.getElementById("vs-container").style.display = "flex";

  let winner = getWinner(userChoice, computerChoice);

  results.push(`Round ${currentRound}: ${winner}`);
  currentRound++;

  if (currentRound > 3) {
    setTimeout(showResults, 1200);
  }
}

function getWinner(user, computer) {
  if (user === computer) return "Draw";
  if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
    userScore++;
    return "You Won";
  } else {
    computerScore++;
    return "Computer Won";
  }
}

function showResults() {
  showScreen("result");

  const container = document.getElementById("round-results");
  container.innerHTML = "";

  results.forEach(r => {
    const p = document.createElement("p");
    p.textContent = r;
    container.appendChild(p);
  });

  const final = document.getElementById("final-winner");
  final.textContent =
    userScore > computerScore
      ? "You are the Final Winner!"
      : userScore < computerScore
      ? "Best of luck next time! Computer Wins!"
      : "It's a Draw!";
}

function restartGame() {
  currentRound = 1;
  userScore = 0;
  computerScore = 0;
  results = [];
  document.getElementById("vs-container").style.display = "none";
  showScreen("intro"); 
}

document.addEventListener("DOMContentLoaded", () => {
  showScreen("intro");

  const startBtn = document.getElementById("start-game");
  startBtn.addEventListener("click", startGame);
});
