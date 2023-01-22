const wordOfTheGame = validWords[Math.floor(Math.random() * validWords.length)];
console.log(wordOfTheGame);
//Creates the display tiles
const createLetterBoxes = () => {
  for (let i = 0; i < 6; i++) {
    const lineHolder = document.createElement("div");
    lineHolder.classList.add("line-holder", `row${i}`);
    document.querySelector(".display-box").appendChild(lineHolder);
    for (let i = 0; i < 5; i++) {
      const wordHolder = document.createElement("div");
      wordHolder.className = "word-holder";
      lineHolder.appendChild(wordHolder);
    }
  }
};
createLetterBoxes();

//Variables
userScore = document.querySelector(".score span");
if (localStorage.score !== null){
  userScore.textContent = localStorage.score;
}else{
  localStorage.score = 0
  userScore.textContent = 0
}

let word = "";
let rowNum = 0;
let lineComplete = false;
let greenLength = 0;
const winnerTexts = ["GOOD JOB!", "WELL DONE", "WAY TO GO!", "WINNER!", "WOW!"];
const green = 'rgb(96, 159, 141)'
const orange = 'rgb(190, 101, 63)'
const grey = 'rgb(120, 120, 120)'

//DOM elements
const allKeys = document.querySelectorAll(".key");
const enterKey = document.querySelector("#enter");
const gameEndDisplay = document.querySelector(".game-end-display");
const nextGame = document.querySelector(".game-end-display a");
const wordDisplay = document.querySelector('.word-display')
const allRows = document.querySelectorAll('.line-holder')


//Displays letter for each line
const displayLetter = (allLetter) => {
  for (i = 0; i < allLetter.length; i++) {
    allLetter[i].textContent = word[i];
  }
};

//Checks whether the word is part of the vocab
const checkLetter = (word) => {
  if (word.length === 5 && validWords.includes(word)) {
    enterKey.disabled = false;
  } else {
    enterKey.disabled = true;
  }
};

//Checks if the user has won the round
const checkWinner = (allLetter) => {
  allLetter.forEach((letter) => {
    if (letter.style.backgroundColor === "rgb(96, 159, 141)") {
      greenLength++;
    }
  })
  if (greenLength === 5) {
    gameEndDisplay.querySelector("h1").textContent = winnerTexts[Math.floor(Math.random() * winnerTexts.length)];
    gameEndDisplay.querySelector("a").textContent = "Next Level";
    gameEndDisplay.style.opacity = 1;
    gameEndDisplay.style.visibility = "visible";
    wordDisplay.style.display = 'none';
    localStorage.score = Number(localStorage.score) + 1
    userScore.textContent = localStorage.score;
    gameEndDisplay.querySelector(".score-display span").textContent = localStorage.score;
    
    
  };
  greenLength = 0;
};

//Checks if the user has lost the round
const checkGameOver = (rowNum) => {
  if (rowNum >= allRows.length-1) {
    gameEndDisplay.querySelector("h1").textContent = "GAME OVER";
    gameEndDisplay.querySelector("a").textContent = "Start Over";
    gameEndDisplay.querySelector(".score-display span").textContent = localStorage.score;
    gameEndDisplay.style.opacity = 1;
    wordDisplay.style.display = 'block';
    wordDisplay.querySelector('span').textContent = wordOfTheGame
    gameEndDisplay.style.visibility = "visible";
    localStorage.score = 0;
    
  }
};

//Displays the coloured tiles for each answer
const displayAnswer = (allLetter) => {
  for (i = 0; i < word.length; i++) {
    if (wordOfTheGame[i] === word[i]) {
      allLetter[i].style.transform = 'rotateY(360deg)';
      allLetter[i].style.backgroundColor = green;
      allKeys.forEach((key) => {
        if (key.textContent === word[i]){
          key.style.backgroundColor = green
        }
      })
    } else if (wordOfTheGame.includes(word[i])) {
      allLetter[i].style.transform = 'rotateY(360deg)';
      allLetter[i].style.backgroundColor = orange;
      allKeys.forEach((key) => {
        if (key.textContent === word[i] && key.style.backgroundColor !== green){
          key.style.backgroundColor = orange
        }
      })
    } else {
      allLetter[i].style.backgroundColor = grey;
      allLetter[i].style.transform = 'rotateY(360deg)';
      allKeys.forEach((key) => {
        if (key.textContent === word[i]){
          key.style.backgroundColor = grey
        }
      })
    }
  }
  lineComplete = true;
  checkWinner(allLetter);
  checkGameOver(rowNum);
  rowNum++;
  nextGame.addEventListener("click", () => location.reload());
};


//Attaches functionality to keyboard keys and clicks
const keyFunction = (e, allLetter) => {
  if (e.target.id === "backspace" || e.key === "Backspace") {
    word = word.slice(0, -1);
  } else if (e.target.id === "enter" || e.key === "Enter") {
    if (enterKey.disabled) {
      e.preventDefault();
    } else {
      displayAnswer(allLetter);
      enterKey.disabled = true;
    }
  } else if (
    word.length < 5 && ((e.key >= "a" && e.key <= "z") || (e.getModifierState("CapsLock") && (e.key >= "A" && e.key <= "Z") && e.key.length === 1))) {
    word += e.key.toUpperCase();
  } else if (e.type === "click" && word.length < 5) {
    word += e.target.textContent;
  }
};

//Main function that is to be repeated for each row
const repeatFunction = (e) => {
  let allLetter = document.querySelectorAll(`.line-holder.row${rowNum} > .word-holder`);
  lineComplete = false;
  keyFunction(e, allLetter);

  if (word.length <= 5) {
    displayLetter(allLetter);
    if (lineComplete) {
      word = "";
    }
    checkLetter(word);
  }
};

//EVENT LISTENER
window.addEventListener("keyup",(keyHandler = (e) => {
    const isNumber = isFinite(e.key);
    if (!isNumber) {
      repeatFunction(e);
    }
  })
);

allKeys.forEach((key) => {
  key.addEventListener("click",(clickHandler = (e) => {
    repeatFunction(e);
    })
  );
});
