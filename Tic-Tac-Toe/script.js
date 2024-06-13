const boxes=document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// initial variables 
let currentPlayer;
let gameGrid;

const winningPosition=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]  
];


// lets create a function to intitialize the game 
function initialGame(){
    currentPlayer="X"; 
    gameGrid=["","","","","","","","",""];
    // ui pr empty krne k liye 
    boxes.forEach((box,index) =>
    {
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        // green color ko remove krna h 
        box.classList.remove("win");

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player -  ${currentPlayer} `; 
}

initialGame();

boxes.forEach((box,index) =>{
    box.addEventListener('click',() => {
        handleClick(index);
    })
})

// winnig position check 
function checkGameOver(){
    let answer="";

    winningPosition.forEach((position) =>{
        // all boxes contain non-empty value and same value 
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="")
        && (gameGrid[position[0]] === gameGrid[position[1]])
    && (gameGrid[position[1]]===gameGrid[position[2]])){

        // check if winner is x 
        if(gameGrid[position[0]] ==="X")
            answer="X";
        else{
            answer="0";
        }

            // disable pointer 
            boxes.forEach((box) =>{
                box.style.pointerEvents="none";
            }) 
        // How we know x/o is a winner 
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

    }

    });

    // it means we have a winner 
    if(answer!==""){
        gameInfo.innerText=`Winner Player- ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // lets game is tie 
    let fillCount=0;
    gameGrid.forEach((box) =>{
        if(box!==""){
            fillCount++;
        }
    });

    // board is filled and game is tie 
    if(fillCount===9){
        gameInfo.innerText="GAame Tied !";
        newGameBtn.classList.add("active");
    }  

}





function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        // ye ui pr show krne k liye h 
        gameGrid[index]=currentPlayer;
        // or ye hmare grid m changes kre h 
        boxes[index].style.pointerEvents="none";
        // swap kro turn ko 
        swapTurn();
        // check ki koi game jeet to nhi gya 
        checkGameOver();
    }
}

function swapTurn(){
if(currentPlayer==="X"){
    currentPlayer="O";
}
else{
    currentPlayer="X";
}
// ui update 
gameInfo.innerText=`Current Player- ${currentPlayer}`;

}


// for new game 
newGameBtn.addEventListener("click",initialGame);


