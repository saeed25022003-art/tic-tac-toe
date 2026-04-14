let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let scoreO = document.querySelector("#scoreO");
let scoreX = document.querySelector("#scoreX");
let turnO= true;//playerX,playerO
let gameOver = false;

const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
function resetPage() {
    localStorage.setItem("keyO",0);
    localStorage.setItem("keyX",0);
    location.reload();
}
function startPage() {
    location.reload();
}
boxes.forEach((box) => 
{
box.addEventListener("click",() =>{
    if(gameOver){
    location.reload();
    return;
   }
   if(turnO){
   box.innerText="O";
   turnO=false;
   }else{
    box.innerText="X";
    turnO=true;
   }
   box.disabled=true;
   checkWinner();
});

});
const showWinner = (winner) => {
    let currentScore = Number(localStorage.getItem(`key${winner}`)) || 0;
    let newScore = currentScore + 1;
    
    localStorage.setItem(`key${winner}`, newScore);
    
    if (winner === 'X') {
        scoreX.innerText = `X: ${newScore}`;
    } else {
        scoreO.innerText = `O: ${newScore}`;
    }

    msg.innerText = `${winner} Wins`;
    msgContainer.classList.remove("hide");
    disableBoxes(); 
};
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

window.onload = () => {
    scoreX.innerText = `X: ${localStorage.getItem("keyX") || 0}`;
    scoreO.innerText = `O: ${localStorage.getItem("keyO") || 0}`;
};


const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                gameOver=true;
                return;
            }

        }
    }
};