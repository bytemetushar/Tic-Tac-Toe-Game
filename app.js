let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let ORecord = document.querySelector("#O-record");
let XRecord = document.querySelector("#X-record");
let resetleaderbd = document.querySelector("#reset-leaderboard");
let showbtn = document.querySelector("#show");
let msgShowbtn = document.querySelector("#msg-show");
let showBoard = document.querySelector(".show-board");


let turnO = true; //playerX, playerO
let count = 0; //to track draw
let countO = 0;
let countx = 0;
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];


boxes.forEach((box) =>{
    box.addEventListener("click", () =>{

        if(turnO){
            box.innerText = "O";
            turnO = false;
            box.style.backgroundColor ="#ffd6d6";
            box.style.color = "green"
        }else{
            box.innerText = "X";
            turnO = true;
            box.style.backgroundColor ="#ffd6d6";
            box.style.color ="brown";
        }
        box.disabled = true;
        count++;
        let iswinner = checkWinner();
        if(count === 9 && !iswinner){
            draw();
        }
    });
});

const draw = () =>{
    msg.innerText = `Game is Draw!!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    showBoard.classList.add("hide");
    disableBoxes();
    leaderboard(winner);
};


const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "#ffffc7";
    }
}


const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    showBoard.classList.remove("hide");
}

const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                boxes[pattern[0]].style.backgroundColor = "#DADBDD";
                boxes[pattern[1]].style.backgroundColor = "#DADBDD";
                boxes[pattern[2]].style.backgroundColor = "#DADBDD";
                return true;
            }
        }
    }
    
}

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);


// leaderboard 
const leaderboard = (winner) =>{
    if(winner === "O"){
        countO++;
        ORecord.innerText = countO;
    }
    else{
        countx++;
        XRecord.innerText = countx;
    }
}

const resetboard = () =>{
    countO = 0;
    countx = 0;
    ORecord.innerText = "0";
    XRecord.innerText = "0";
}

resetleaderbd.addEventListener("click", resetboard);






