let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector("#msg-container");
let msg = document.querySelector("#msg");
let scoreO = document.querySelector("#scoreO");
let scoreX = document.querySelector("#scoreX");

let turnO = true; // true = O, false = X
let count = 0; // To track Draw

const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8],
];

// Initialize scores from LocalStorage
window.onload = () => {
    scoreX.innerText = `X: ${localStorage.getItem("keyX") || 0}`;
    scoreO.innerText = `O: ${localStorage.getItem("keyO") || 0}`;
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const resetScores = () => {
    localStorage.setItem("keyO", 0);
    localStorage.setItem("keyX", 0);
    scoreO.innerText = "O: 0";
    scoreX.innerText = "X: 0";
    resetGame();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#b0413e";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "blue";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    updateScore(winner);
};

const updateScore = (winner) => {
    let currentScore = Number(localStorage.getItem(`key${winner}`)) || 0;
    let newScore = currentScore + 1;
    localStorage.setItem(`key${winner}`, newScore);
    
    if (winner === "X") {
        scoreX.innerText = `X: ${newScore}`;
    } else {
        scoreO.innerText = `O: ${newScore}`;
    }
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetScores);
