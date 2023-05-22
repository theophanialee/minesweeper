/* ----- constants -----*/
const surrounding = 8;

/* ----- state variables -----*/
const gameElements = {
  board: [],
  width: 8,
  mines: 10,
  alive: true,
  flagged: false,
  state: "hidden",
  }

  const boardSize = gameElements.width*gameElements.width
  let board = gameElements.board;


/* ----- cached elements  -----*/
const gameScreen = document.querySelector("#gameScreen");
const gameBoard = document.querySelector("#gameBoard");
const newButton = document.querySelector("#newButton");
const cell = document.querySelector("cell");
const flagButton = document.querySelector("#flagButton");
const resultMessage = document.querySelector("h2");


/* ----- event listeners -----*/
function handleStart () {
  game.screen = "gameScreen"; 
  render();
}


function handleSetup() {
 // set up table as board size
//create mines and spaces in seperate arrays > combine > randomise > split
const minesArray = Array(gameElements.mines).fill("bomb");
const spacesArray = Array(boardSize - gameElements.mines)
.fill("space");
const combArray = spacesArray.concat(minesArray);
//https://sebhastian.com/shuffle-array-javascript/
const randomisedArray = combArray.sort(() => Math.random()-.5);

for (let i=0; i<boardSize; i++) {
 let total = 0
 const topLeftId = (i - gameElements.width - 1)
 const topCenterId = (i - gameElements.width)
 const topRightId = (i - gameElements.width + 1)
 const rightId = (i + 1)
 const bottRightId = (i + gameElements.width + 1)
 const bottCenterId = (i + gameElements.width)
 const bottLeftId = (i + gameElements.width - 1)
 const leftId = (i - 1)
  // bombed
  if (randomisedArray[i] === "bomb") {
    total = "bomb"
  } //space > count number of bombs and make new array
  else if (randomisedArray[i] === "space") {
    if (randomisedArray[topLeftId] === "bomb") { total = total + 1 }
    if (randomisedArray[topCenterId] === "bomb") { total = total + 1 } 
    if (randomisedArray[topRightId] === "bomb") { total = total + 1} 
    if (randomisedArray[rightId] === "bomb") { total = total + 1 } 
    if (randomisedArray[bottRightId] === "bomb") { total = total + 1 } 
    if (randomisedArray[bottCenterId] === "bomb") { total = total + 1 } 
    if (randomisedArray[bottLeftId] === "bomb") { total = total + 1 } 
    if (randomisedArray[leftId] === "bomb") { total = total + 1 }
  }
    gameElements.board.push(total);

  // replace 0 with indication of space 😊
  if (gameElements.board[i] === 0) {
    gameElements.board[i] = "space";
  }
}
console.log("mines array: ", gameElements.board);
render();

}

function handleClick (e) {
  let clickCell = e.target;
  clickCell.classList.remove(`${gameElements.state}`);
  clickCell.classList.add(`N${gameElements.board[clickCell.id]}`)
  clickCell.innerText = (`${gameElements.board[clickCell.id]}`)

  if (gameElements.board[clickCell.id] === "bomb") {
    resultMessage.innerText = "😵";
    let remaining = document.querySelectorAll(".hidden");
    remaining.classList.remove("hidden");
    }
  } 

function handleFlagging (e) {
  let flagCell = e.target;
  e.preventDefault()
  // console.log (flagCell.classList.value);
  // console.log (flagCell.className);
  console.log(flagCell);
  if (flagCell.classList.contains("flag") === false) {
    flagCell.classList.add("flag") 
    // flagCell.innerText = "🚩"
  } else if (flagCell.classList.contains("flag") === true) {
    flagCell.classList.remove("flag") 
    // flagCell.innerText = `${gameBoard.board[flagCell.id]}`;
  }
}

function handleNumCount () { 
  
}



/* ----- render functions -----*/
function render() {
renderMinesCount ();
renderGameover();
};


// function renderTable() {
// let minesNum = document.querySelector("minesCount")
// minesNum.innerText = 10;
// }
function renderMinesCount () {
  
}

function renderGameover() {
//refresh the board
  gameBoard.innerHTML = '';

//running the new board
  for (let i=0; i<boardSize; i++) {
  let cellDiv = document.createElement("cell");
  cellDiv.id = i;
  cellDiv.classList.add(`${gameElements.state}`);
  // cellDiv.innerText = gameElements.board[i];
  gameBoard.append(cellDiv);
  board.push(cellDiv);
  }
}

function renderResult () {
  let correctFlag = 0;
  for (let i=0; i<boardSize; i++) {
    if (gameElements.board[i].classList.contains ("flag") && gameElements.board[i].classList.contains ("Nbomb")) {
      correctFlag ++
    }
    if (correctFlag === gameElements.mines) {
      resultMessage.innerText = "🥳";
    }
  }
}


/* ----- other functions -----*/

// upon event
function controller() {
  newButton.addEventListener ("click", handleSetup);
  gameBoard.addEventListener ("contextmenu", handleFlagging);
  gameBoard.addEventListener ("click", handleClick);
  }

  //run the main function
controller();


