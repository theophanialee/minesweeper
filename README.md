# Development of pha cafe - minesweeper

## Timeframe, Approach & Development --> 1 week

[1] Day 1 Project planning and sketching
[2] Day 1-3 - Replicate Minesweeper
Main goal: Start small, build an expandable code

- Generate Minesweeper board (4x4)
- Matching the winning condition
- Flagging event
- On click event
  [3] Day 4-5 - Expansions
- Customisable board size
- Aleternative win: Through flagging
- Floodfill mechanism
- Render front screen to game screen and handle game over
  [4] Day 6 - Styling
- Replace render icons
- Add audio

## Tools used

HTML
CSS
JavaScript
Git & GitHub
Vercel & Vite
Photoshop

## Description

Pha Cafe reflects the classic old school windows game -- [Minesweeper] (https://minesweeperonline.com/). The game was designed and implemented using HTML, CSS, and Javascript while attending the Software Engineering Immersive course at General Assembly.
I chose to recreate this game as it is one of my favourite classics, themed by my favourite pastime, cafe hopping.

## Deployment

Link: https://minesweeper-wine-zeta.vercel.app/

## How to Play

The goal of the game is to clear the board, meaning to /open/ every suqare that does not have mine 💣 under it.
The game will automatically be over.
/Flags/ 🚩 are provided to mark tiles which are though to contain mines.

In a similar vein, step (/open/) all the tiles except those with spilt coffee beneathe to win in Pha Cafe. Adding a spin to the original game, if all coffee (/mines/) are cleaned (/flagged), YOU WIN!

Winning conditions:
[1] Walk through the entire cafe without stepping on dirty tiles
[2] Clean all dirty tiles

Upon clicking:
[1] If number -> number represents the number of coffee tiles around it
[2] If space -> all neighbouring tiles will be opened for you since they are clean
[3] If coffee -> YOU LOSE!

To increase difficulty, try increasing the board size. In Pha Cafe, it is possilbe to play up till 99x99 size board.

## Ideation Sketch

![Code framework](https://miro.com/app/board/uXjVMImBMrI=/)

![Pseudocode] (https://dark-fahrenheit-42f.notion.site/Project-1-Build-a-browser-game-5d73fa033e71454db339d5755aecf11a)

## Biggest challenge

Counting the bombs was a challenge for me as I was not able to understand the logic when using 2D arrays and loops.

Floodfill mechanism using recurssion. It was very hard to imaging the floodfill mechanism at first. After many trials, I found myself looping and looping over a function which checks the neighbouring cells, similar to the one which counts the bombs surrounding the cell.

I was advised to write the Pseudocode for it and it made the purpose of the function much clearer, and eventually was able to solve the problem.

# Experience

I was very worried about this project and my progress at SEI bootcamp due to a steep learning curve. However I found it enjoyable acquiring new knowledge and exercising thinking to understand the logic behind a code and eventually apply them to other situations.

# Key takeaways

As reminded by Simon (Instructor, GA) and Eileen (TA, GA) over and over again, we should always start small. Though seemed impossible to write a code for an entire game initially, by taking things one small step at a time, I have discovered how far it can bring you!

Also, I have learnt to appreciate errors in our console because they are an indication of a function or block of code actually running. If the app does not crash, there is still hope!
