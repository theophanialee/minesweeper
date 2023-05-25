/* ----- state variables -----*/
const gameElements = {
  countArr: [],
  bombArr: [],
  size: 8,
  mines: 3,
  alive: true,
  state: "hidden",
  correctFlag: 0,
  flags: 0,
  }

const display = {
  screen: "startScreen",
}


/* ----- cached elements  -----*/
const sizeButton = document.querySelector("#sizeButton");
const sizeInput = document.querySelector("#sizeEl");
const frontPageDiv = document.querySelector ("h3")
const startScreen = document.querySelector("#startScreen");
const gameScreen = document.querySelector("#gameScreen");
const gameBoard = document.querySelector("#gameBoard");
const newButton = document.querySelector("#newButton");
const flagButton = document.querySelector("#flagButton");
const resultMessage = document.querySelector("h2");
const flagCount = document.querySelector("count");
const backgroundMusic = document.getElementById('backgroundMusic');
const loseMusic = document.getElementById('loseMusic');
const winMusic = document.getElementById('winMusic');

/* ----- event listeners -----*/
function handleStart () {
  display.screen = "gameScreen";
  const inputSize = document.querySelector("#sizeInput");
  const size = parseInt(inputSize.value);
  gameElements.size = size;
  gameElements.mines = size*2-5; 
  gameBoard.style.height = `${size*30}px`;
  gameBoard.style.width = `${size*30}px`;
  gameBoard.style.border = "5px solid white";
  // backgroundMusic.play();
}

function handleSetup() {
  gameElements.correctFlag = 0;
  gameElements.flags =0;
  gameBoard.addEventListener ("click", handleClick);
  gameBoard.addEventListener ("contextmenu", handleFlagging);
  // set up table as board size
  //create mines and spaces in seperate arrays > combine > randomise > split
  // backgroundMusic.play();
  const minesArray = Array(gameElements.mines).fill("bomb");
  const spacesArray = Array(gameElements.size*gameElements.size - gameElements.mines)
  .fill("0"); // 0 indicates space
  const combArray = spacesArray.concat(minesArray);
  //https://sebhastian.com/shuffle-array-javascript/
  const randomisedArray = combArray.sort(() => Math.random()-.5);
  gameElements.bombArr = rowArray(randomisedArray, gameElements.size);
  console.log("bombArr: ", gameElements.bombArr);
  countBoard (); 
render ();
}

function handleClick (e) {
  gameBoard.addEventListener ("click", handleClick);
  let clickCell = e.target;
  console.log(clickCell)
  extractCellId (clickCell);
  let x = extractCellId (clickCell)[0];
  let y = extractCellId (clickCell)[1];
  console.log("x-y coord id: ",clickCell.id)
  console.log(gameElements.countArr[x][y]);
  if (clickCell.classList.contains("flag")) {
    return;
  } else if (gameElements.countArr[x][y] === "bomb") {
    clickCell.innerText = ("💣")
    clickCell.classList.remove(gameElements.state);
    resultMessage.innerText = "😵"
    loseMusic.play();
    clickCell.classList.add(`Nbomb`)
    gameBoard.removeEventListener ("click", handleClick);
    gameBoard.removeEventListener ("contextmenu", handleFlagging);
    // to open all bombs in bombArr
     for (let i=0; i < gameElements.size; i++) {
      for (let j = 0; j < gameElements.size; j++) {
        if (gameElements.countArr[i][j] === "bomb" ) {
        let bombEl = document.getElementById(`${[i]}-${[j]}`);
          bombEl.innerText = ("💣")
          bombEl.classList.add(`Nbomb`)
        }
      }
    }
  } else if (gameElements.countArr[x][y] === 0) {
    clickCell.innerText = (`${gameElements.countArr[x][y]}`);
    clickCell.classList.remove(gameElements.state);
    clickCell.classList.add(`N${gameElements.countArr[x][y]}`)
    floodNeighbour (x,y);
   } else { 
        clickCell.innerText = (`${gameElements.countArr[x][y]}`);
        clickCell.classList.remove(gameElements.state);
        clickCell.classList.add(`N${gameElements.countArr[x][y]}`)
      }
      console.log ("total: ",countBombs(gameElements.bombArr,x,y));
      renderAltWin();
    }
        

function handleFlagging (e) {
  gameBoard.addEventListener("contextmenu", handleFlagging);
  let flagCell = e.target;
  e.preventDefault()
  extractCellId (flagCell);
  let x = extractCellId (flagCell)[0];
  let y = extractCellId (flagCell)[1];
  console.log("flag: ",flagCell.id)
  if (gameElements.flags === gameElements.mines && !flagCell.classList.contains("flag")) {
    return;
  }
  if (flagCell.classList.contains("flag") === true) {
    flagCell.classList.remove("flag") ;
    flagCell.innerText = "";
    gameElements.flags-=1;
    flagCount.innerText = `Flags: ${gameElements.mines - gameElements.flags}`;
  } 
    else if (flagCell.classList.contains("flag") === false) {
    flagCell.classList.add("flag"); 
    flagCell.innerText = "🚩";
    gameElements.flags+=1;
    flagCount.innerText = `Flags: ${gameElements.mines - gameElements.flags}`;
  } 
  checkWin (flagCell, x,y);
  console.log("flags: ", gameElements.flags);
  }


/* ----- render functions -----*/
function render() {
renderNewBoard();
renderScreen();
// renderAltWin ();
};

function renderScreen() {
  startScreen.classList.add("hide");
  gameScreen.classList.add("hide");
  // scoreScreen.classList.add("hide");
  document.querySelector(`#${display.screen}`).classList.remove("hide"); //to alter the information to show the screen
}

function renderNewBoard () {
//refresh the board
  gameBoard.innerHTML = '';
  flagCount.innerText = `Flags: ${[gameElements.mines]}`
  resultMessage.innerText = "😊"
//running the new board
  for (let i=0; i < gameElements.size; i++) {
    for (let j = 0; j < gameElements.size; j++) {
      let cellDiv = document.createElement("cell");
      cellDiv.id = `${[i]}-${[j]}`;
      cellDiv.classList.add(gameElements.state);
      // cellDiv.innerText = gameElements.board[i];
      gameBoard.append(cellDiv);
    }
  }
}

function renderAltWin () {
  const hiddenCells = document.querySelectorAll(".hidden");
  console.log("hidden: ", hiddenCells.length)
  if (hiddenCells.length === gameElements.mines) {
    resultMessage.innerText = "🥳";
    winMusic.play();
    gameBoard.removeEventListener ("click", handleClick);
    gameBoard.removeEventListener ("contextmenu", handleFlagging);
  }
}

function checkWin (flagCell,x,y) {
  if (gameElements.bombArr[x][y] === "bomb" && flagCell.classList.contains("flag")) {
    gameElements.correctFlag++
  }
  if (gameElements.correctFlag === gameElements.mines) {
    resultMessage.innerText = "🥳";
    winMusic.play();
    gameBoard.removeEventListener ("click", handleClick);
    gameBoard.removeEventListener ("contextmenu", handleFlagging);
  }
  console.log ("correct: ", gameElements.correctFlag)
}

/* ----- functions -----*/

// upon event
function main() {
  sizeButton.addEventListener ("click", function() {
    handleStart();
    handleSetup ();
  });
  newButton.addEventListener ("click", handleSetup);
  gameBoard.addEventListener ("contextmenu", handleFlagging);
  gameBoard.addEventListener ("click", handleClick);
  }

  //run the main function
main();

function rowArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

function countBoard () {
  gameElements.countArr = [];
  for (let i=0; i < gameElements.size; i++) {
    let countRow = [];
    for (let j = 0; j < gameElements.size; j++) {
      let cellCount = countBombs(gameElements.bombArr,i,j);
       countRow.push (cellCount);
    }
    gameElements.countArr.push (countRow);
  }
  console.log ("countArr: ",gameElements.countArr);
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
        if ( (x + i) < 0 || (x + i) > gameElements.size-1) {
          continue;
        }
        if ( (y + j) < 0 || (y + j) > gameElements.size-1) {
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

function floodNeighbour (x,y) {
  //recurssion
  // [1] condition to end the function
  // [2] x-y should always be different

  // move to the next adjacent cell if:
  // [1] no class "hidden"
  // [2] flagged cell

  // break function when:
  // [1] no more surrounding cells 0
  
  // unhide function: 
  // remove class "hidden"
  // add class "N arr[x][y]" (x-y is id of cellEl)


  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) { 
      if (i == 0 && j == 0) {
        continue;
      }
      if ((x+i) < 0 || (x+i) >= gameElements.size) {
        continue;
      }
      if ((y+j) < 0 || (y+j) >= gameElements.size) {
        continue;
      }
      let neighboutEl = document.getElementById(`${[x+i]}-${[y+j]}`);
      if (!neighboutEl.classList.contains("hidden")) { // does not contain hidden ie revealed
        continue;
      }
      if (neighboutEl.classList.contains("flag")) { // if flagged
        continue;
      }
      if (gameElements.countArr[x][y] === 0) {
        neighboutEl.innerText = (`${gameElements.countArr[x+i][y+j]}`);
        neighboutEl.classList.remove("hidden");
        neighboutEl.classList.add(`N${gameElements.countArr[x+i][y+j]}`);
        floodNeighbour ((x+i),(y+j));
      } else if (gameElements.countArr[x+i][y+j] !== 0){
        break;
      }
    }
  }
}

function extractCellId (targetCell) {
  let x = "";
  let y = "";
  if (targetCell.id.length === 3) {
    x = parseInt(targetCell.id[0]);
    y = parseInt(targetCell.id[2]);
   } else if (targetCell.id.length === 4 && targetCell.id[1] === "-") {
     x = parseInt(targetCell.id[0]);
     y = parseInt(targetCell.id[2] + targetCell.id[3]);
   } else if (targetCell.id.length === 4 && targetCell.id[2] === "-") {
     x = parseInt(targetCell.id[0] + targetCell.id[1]);
     y = parseInt(targetCell.id[3]);
   }
   else if (targetCell.id.length === 5) {
     x = parseInt(targetCell.id[0] + targetCell.id[1]);
     y = parseInt(targetCell.id[3] + targetCell.id[4]);
   }
   return [x,y]
}