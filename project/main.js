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
  gameBoard.style.height = `${size*50}px`;
  gameBoard.style.width = `${size*50}px`;
  gameBoard.style.border = "5px solid white";
  // backgroundMusic.play();
}

function handleSetup() {
  gameElements.flags =0
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
  clickCell.classList.remove(gameElements.state);
  let x = "";
  let y = "";
  if (clickCell.id.length === 3) {
   x = parseInt(clickCell.id[0]);
   y = parseInt(clickCell.id[2]);
  } else if (clickCell.id.length === 4 && clickCell.id[1] === "-") {
    x = parseInt(clickCell.id[0]);
    y = parseInt(clickCell.id[2] + clickCell.id[3]);
  } else if (clickCell.id.length === 4 && clickCell.id[2] === "-") {
    x = parseInt(clickCell.id[0] + clickCell.id[1]);
    y = parseInt(clickCell.id[3]);
  }
  else if (clickCell.id.length === 5) {
    x = parseInt(clickCell.id[0] + clickCell.id[1]);
    y = parseInt(clickCell.id[3] + clickCell.id[4]);
  }
  console.log("x-y coord id: ",clickCell.id)
  console.log(gameElements.countArr[x][y]);
  clickCell.classList.add(`N${gameElements.countArr[x][y]}`)
  //put into render function?
  if (gameElements.countArr[x][y] === "bomb") {
    clickCell.innerText = ("💣")
    resultMessage.innerText = "😵"
    // backgroundMusic.pause();
    loseMusic.play();
    setTimeout(function() {
      alert("YOU LOSE! 😵");
    }, 200);
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
    floodNeighbour (x,y);
   } else { 
        clickCell.innerText = (`${gameElements.countArr[x][y]}`);
      }
      console.log ("total: ",countBombs(gameElements.bombArr,x,y));
      renderAltWin();
    }
        

function handleFlagging (e) {
  gameBoard.addEventListener("contextmenu", handleFlagging);
  let flagCell = e.target;
  e.preventDefault()
  // console.log (flagCell.classList.value);
  // console.log (flagCell.className);
  let x = parseInt(flagCell.id[0]);
  let y = parseInt(flagCell.id[2]);
  console.log(flagCell.id)
  console.log(flagCell);
  if (flagCell.classList.contains("flag") === false) {
    flagCell.classList.add("flag"); 
    flagCell.innerText = "🚩";
    gameElements.flags+=1;
    flagCount.innerText = `Flags: ${gameElements.mines - gameElements.flags}`;
  } else if (flagCell.classList.contains("flag") === true) {
    flagCell.classList.remove("flag") ;
    flagCell.innerText = "";
    gameElements.flags-=1;
    flagCount.innerText = `Flags: ${gameElements.mines - gameElements.flags}`;
  }
  let flagEl = document.querySelectorAll(".flag")
  if (flagEl.length >= gameElements.mines) {
    gameBoard.removeEventListener("contextmenu", handleFlagging);
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
    // backgroundMusic.pause();
    setTimeout(function() {
      alert("YOU WON! 🥳");
    }, 200);
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
    // backgroundMusic.pause();
    setTimeout(function() {
      alert("YOU WON! 🥳");
    }, 200);
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
  //to locate cells surrounding x,y and unhide them
  // conditions to unhide surrounding cells: 
  // if its not a bomb (space or count)
  // re-run the function on surrounding cell if that surrounding cell = 0
  // keep the function running until no more surrounding cells = 0 or already revealed
  // if no class "hidden" (ie already revealed), move to the next adjacent cell
  
  // unhide function: 
  // remove class "hidden"
  // add class "N arr[x][y]" (x-y is id of cellEl)

  //recurssion: 
  // [1] condition to end the function
  // [2] x-y should always be different
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) { 
      let neighboutEl = document.getElementById(`${[x+i]}-${[y+j]}`);
      if (i == 0 && j == 0) {
        continue;
      }
      if ((x+i) < 0 || (x+i) > gameElements.size) {
        continue;
      }
      if ((y+j) < 0 || (y+j) > gameElements.size) {
        continue;
      }
      // if (!neighboutEl.classList.contains("hidden")) { // does not contain hidden ie revealed
      //   continue;
      // }
      else {
        neighboutEl.innerText = (`${gameElements.countArr[x+i][y+j]}`);
        neighboutEl.classList.remove(gameElements.state);
        neighboutEl.classList = (`N${gameElements.countArr[x+i][y+j]}`);
 
      }
    }
  }
}