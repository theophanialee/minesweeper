/* ----- constants -----*/
const surrounding = 8;
let total = 0
/* ----- state variables -----*/
const gameElements = {
  bombArr: [],
  board: [],
  width: 4,
  mines: 5,
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
const cell = document.querySelectorAll("cell");
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
  .fill("0"); // 0 indicates space
  const combArray = spacesArray.concat(minesArray);
  //https://sebhastian.com/shuffle-array-javascript/
  const randomisedArray = combArray.sort(() => Math.random()-.5);

  gameElements.bombArr = rowArray(randomisedArray, gameElements.width);
  console.log("bombArr: ", gameElements.bombArr);
render ();
}

function handleClick (e) {
  let clickCell = e.target;
  console.log(clickCell)
  clickCell.classList.remove(`${gameElements.state}`)
  let x = parseInt(clickCell.id[0]);
  let y = parseInt(clickCell.id[2]);
  console.log(clickCell.id)
  console.log("xcoord: ", x)
  console.log("ycoord: ", y)
  clickCell.classList.add(`N${countBombs(gameElements.bombArr,x,y)}`)
  if (gameElements.bombArr[x][y] === "bomb") {
    clickCell.innerText = ("💣")
  }
  if (gameElements.bombArr[x][y] === "0") {
    clickCell.innerText = (`${countBombs(gameElements.bombArr,x,y)}`)
  }
  console.log ("total: ",countBombs(gameElements.bombArr,x,y))
  } 

function handleFlagging (e) {
  let flagCell = e.target;
  e.preventDefault()
  // console.log (flagCell.classList.value);
  // console.log (flagCell.className);
  let x = parseInt(flagCell.id[0]);
  let y = parseInt(flagCell.id[2]);
  console.log(flagCell.id)
  console.log(flagCell);
  if (flagCell.classList.contains("flag") === false) {
    flagCell.classList.add("flag") 
    flagCell.innerText = "🚩"
  } else if (flagCell.classList.contains("flag") === true) {
    flagCell.classList.remove("flag") 
    flagCell.innerText = ""
  }
  checkWin (flagCell, x,y);
 
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
  for (let i=0; i < gameElements.width; i++) {
    for (let j = 0; j < gameElements.width; j++) {
      let cellDiv = document.createElement("cell");
      cellDiv.id = `${[i]}-${[j]}`;
      cellDiv.classList.add(`${gameElements.state}`);
      // cellDiv.innerText = gameElements.board[i];
      gameBoard.append(cellDiv);
    }
  }
}

function renderResult () {
  
}


/* ----- functions -----*/

// upon event
function controller() {
  newButton.addEventListener ("click", handleSetup);
  gameBoard.addEventListener ("contextmenu", handleFlagging);
  gameBoard.addEventListener ("click", handleClick);
  }
  //run the main function
controller();

function rowArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

function countBombs (arr,x,y) {

  let total = 0
  if (arr[x][y] === "bomb") {
    total = "bomb"
  }
  if (arr[x][y] == 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) {
          continue;
        }
        if ( (x + i) < 0 || (x + i) > gameElements.width-1) {
          continue;
        }
        if ( (y + j) < 0 || (y + j) > gameElements.width-1) {
          continue;
       }
       if (arr[x+i][y+j] === "bomb") {
          total++;
        } else {
          total = total
        }
      }
    }
  }
    return total
}

function checkWin (flagCell,x,y) {
  let correctFlag = 0;
  if (gameElements.bombArr[x][y] === "bomb" && flagCell.classList.contains("flag")) {
    correctFlag ++
  }
  if (correctFlag === gameElements.bombArr) {
    resultMessage.innerText = "🥳";
  }
  console.log ("correct: ", correctFlag)
}