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
const wordOfTheGame = validWords[Math.floor(Math.random() * validWords.length)];
let word = "";
let rowNum = 0;
let lineComplete = false;
let greenLength = 0;
let finalScore = 0;
let highestScore = 0;
let isWinner = false;
let timeUp=false
const winnerTexts = ["GOOD JOB!", "WELL DONE", "WAY TO GO!", "WINNER!", "WOW!"];
const green = "rgb(96, 159, 141)";
const orange = "rgb(190, 101, 63)";
const grey = "rgb(120, 120, 120)";
const gameURL = "https://munsat.github.io/wordle-project/";

console.log(wordOfTheGame);

//Audio
const winSound = new Audio("./audio/gamewin.wav");
const loseSound = new Audio("./audio/gameover.wav");
const keyStroke = new Audio("./audio/keystroke.wav");
const enterKeySound = new Audio("./audio/incorrect.wav");
const invalidWord = new Audio("./audio/wrongword.wav");

//DOM elements
userScore = document.querySelector(".score span");
const allKeys = document.querySelectorAll(".key");
const enterKey = document.querySelector("#enter");
const gameEndDisplay = document.querySelector(".game-end-display");
const nextGame = document.querySelector(".game-end-display a");
const wordDisplay = document.querySelector(".word-display");
const allRows = document.querySelectorAll(".line-holder");
const socialIconFB = document.querySelector(".fa-facebook");
const socialIconTwitter = document.querySelector(".fa-twitter");
const instruction = document.querySelector(".instruction");
const instructionDisplay = document.querySelector(".explanation-display");
const cancelBtn = document.querySelector(".cancel-btn");
const invalidWordAlert = document.querySelector(".invalid-word-alert");
const newGameBtn = document.querySelector(".new-game");
const highestScoreText = document.querySelector(".highest-score span");
const darkThemeBtn = document.querySelector("#dark-theme");
const hardModeBtn = document.querySelector(".hard-mode");
const easyModeBtn = document.querySelector(".easy-mode");
const hardModeDisplay = document.querySelector(".hard-mode-prompt");
const timer = document.querySelector(".clock");
const countdownDisplay = document.querySelector('.countdown-timer')


//Social Media PopUp Window
const windowParams = `menubar=no,toolbar=no,status=no,resizable=yes,width=570,height=550`;
socialIconFB.addEventListener("click", () => {
  let message = "";
  if (finalScore > 0) {
    message = `MyScored${finalScore}Points`;
  } else {
    message = `IScored${localStorage.getItem("score")}Points`;
  }
  window.open(
    `https://www.facebook.com/dialog/share?app_id=875082810399994&display=popup&hashtag=%23CheckOutMyWordle_${message}&href=https://munsat.github.io/wordle-project/&redirect_uri=https://munsat.github.io/wordle-project/`,
    "_blank",
    windowParams
  );
});

socialIconTwitter.addEventListener("click", () => {
  let message = "";
  if (finalScore > 0) {
    message = `Check out My Wordle. I scored ${finalScore} points!`;
  } else {
    message = `Check out My Wordle. I scored ${localStorage.getItem(
      "score"
    )} points!`;
  }
  window.open(
    `https://twitter.com/intent/tweet?url=${gameURL}&text=${message}`,
    "_blank",
    windowParams
  );
});

//Local Storage for Score
if (!isNaN(parseInt(localStorage.getItem("score")))) {
  userScore.textContent = localStorage.getItem("score");
} else {
  localStorage.setItem("score", 0);
  userScore.textContent = 0;
}

//Local Storage for HighScore
if (!isNaN(parseInt(localStorage.getItem("highestScore")))) {
  highestScoreText.textContent = localStorage.getItem("highestScore");
} else {
  localStorage.setItem("highestScore", 0);
  highestScoreText.textContent = 0;
}

//Local Storage for ColorTheme
darkThemeBtn.checked = localStorage.getItem(darkThemeBtn.value) === "true";
console.log(darkThemeBtn.checked);
if (darkThemeBtn.checked == false) {
  document.body.classList.add("light-theme");
} else {
  document.body.classList.remove("light-theme");
}

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
  });
  if (greenLength === 5) {
    gameEndDisplay.querySelector("h1").textContent =
      winnerTexts[Math.floor(Math.random() * winnerTexts.length)];
    gameEndDisplay.querySelector("a").textContent = "Next Level";
    gameEndDisplay.style.opacity = 1;
    gameEndDisplay.style.visibility = "visible";
    wordDisplay.style.display = "none";
    winSound.play();
    isWinner = true;
    if (!isNaN(parseInt(localStorage.getItem("score")))) {
      localStorage.setItem(
        "score",
        parseInt(localStorage.getItem("score")) + 1
      );
      if (
        parseInt(localStorage.getItem("highestScore")) <
        parseInt(localStorage.getItem("score"))
      ) {
        localStorage.setItem("highestScore", localStorage.getItem("score"));
      }
      userScore.textContent = localStorage.getItem("score");
      highestScoreText.textContent = localStorage.getItem("highestScore");
      gameEndDisplay.querySelector(".score-display span").textContent =
        localStorage.getItem("score");
    }
  } else if (rowNum < allRows.length - 1) {
    enterKeySound.play();
  }
  greenLength = 0;
};

//Checks if the user has lost the round
const checkGameOver = (rowNum) => {
  if (rowNum >= allRows.length - 1 && !isWinner ||timeUp===true) {
    gameEndDisplay.querySelector("h1").textContent = "GAME OVER";
    gameEndDisplay.querySelector("a").textContent = "Start Over";
    gameEndDisplay.querySelector(".score-display span").textContent =
      localStorage.getItem("score");
    gameEndDisplay.style.opacity = 1;
    wordDisplay.style.display = "block";
    wordDisplay.querySelector("span").textContent = wordOfTheGame;
    gameEndDisplay.style.visibility = "visible";
    loseSound.play();
    finalScore = localStorage.getItem("score");
    localStorage.setItem("score", 0);
  }
};

//Displays the coloured tiles for each answer
const displayAnswer = (allLetter) => {
  for (i = 0; i < word.length; i++) {
    if (wordOfTheGame[i] === word[i]) {
      allLetter[i].style.transform = "rotateY(360deg)";
      allLetter[i].style.backgroundColor = green;
      allKeys.forEach((key) => {
        if (key.textContent === word[i]) {
          key.style.backgroundColor = green;
        }
      });
    } else if (wordOfTheGame.includes(word[i])) {
      allLetter[i].style.transform = "rotateY(360deg)";
      allLetter[i].style.backgroundColor = orange;
      allKeys.forEach((key) => {
        if (
          key.textContent === word[i] &&
          key.style.backgroundColor !== green
        ) {
          key.style.backgroundColor = orange;
        }
      });
    } else {
      allLetter[i].style.backgroundColor = grey;
      allLetter[i].style.transform = "rotateY(360deg)";
      allKeys.forEach((key) => {
        if (key.textContent === word[i]) {
          key.style.backgroundColor = grey;
        }
      });
    }
  }
  lineComplete = true;
  checkWinner(allLetter);
  checkGameOver(rowNum);
  rowNum++;
  nextGame.addEventListener("click", () => location.reload());
};

//Attaches functionality to keyboard keys and clicks
const keyAction = (e, allLetter) => {
  if (e.target.id === "backspace" || e.key === "Backspace") {
    keyStroke.load();
    keyStroke.play();
    word = word.slice(0, -1);
  } else if (e.target.id === "enter" || e.key === "Enter") {
    if (enterKey.disabled) {
      e.preventDefault();
      allRows[rowNum].classList.add("row-shake");
      invalidWordAlert.style.visibility = "visible";
      invalidWordAlert.style.opacity = 1;
      invalidWord.load();
      invalidWord.play();
      setTimeout(() => {
        allRows[rowNum].classList.remove("row-shake");
        invalidWordAlert.style.visibility = "hidden";
        invalidWordAlert.style.opacity = 0;
      }, 500);
    } else {
      displayAnswer(allLetter);
      enterKey.disabled = true;
    }
  } else if (
    word.length < 5 &&
    ((e.key >= "a" && e.key <= "z") ||
      (e.getModifierState("CapsLock") &&
        e.key >= "A" &&
        e.key <= "Z" &&
        e.key.length === 1))
  ) {
    keyStroke.load();
    keyStroke.play();
    word += e.key.toUpperCase();
  } else if (e.type === "click" && word.length < 5) {
    keyStroke.load();
    keyStroke.play();
    word += e.target.textContent;
  }
};

//Main function that is to be repeated for each row
const repeatGame = (e) => {
  let allLetter = document.querySelectorAll(
    `.line-holder.row${rowNum} > .word-holder`
  );
  lineComplete = false;
  keyAction(e, allLetter);

  if (word.length <= 5) {
    displayLetter(allLetter);
    if (lineComplete) {
      word = "";
    }
    checkLetter(word);
  }
};

//Toggle instruction display
const toggleDisplay = () => {
  instructionDisplay.classList.toggle("exp-toggle-display");
};


//EVENT LISTENER
easyModeBtn.addEventListener("click", () => {
  hardModeDisplay.style.opacity = 0;
  hardModeDisplay.style.visibility = "hidden";
  countdownDisplay.style.visibility='hidden'
});

window.addEventListener("keyup",(keyHandler = (e) => {
  const isNumber = isFinite(e.key);
  if (!isNumber) {
    repeatGame(e);
  }
})
);
allKeys.forEach((key) => {
key.addEventListener("click",(clickHandler = (e) => {
  repeatGame(e);
  })
);
});

let timeLeft = 10;
const checkSecond = (sec) => {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  } else if (sec < 0) {
    sec = "59";
  }
  return sec;
};

//ADD timer to the game
hardModeBtn.addEventListener("click", () => {
  hardModeDisplay.style.opacity = 0;
  hardModeDisplay.style.visibility = "hidden";
  countdownDisplay.style.visibility='visible'
  const intervalID = setInterval(() => {
    presentTime = timer.innerHTML;
    timeArray = presentTime.split(":");
    console.log(timeArray);
    let m = timeArray[0];
    let s = checkSecond(timeArray[1] - 1);
    if (s == 59) {
      m -= 1;
    }
    
    if (m < 0) {
      clearInterval(intervalID);
      timeUp =true
      checkGameOver()
      return
    }
    timer.innerHTML = `${m}:${s}`;
  }, 1000);
});

instruction.addEventListener("click", toggleDisplay);
cancelBtn.addEventListener("click", toggleDisplay);
newGameBtn.addEventListener("click", () => {
  location.reload();
  localStorage.setItem("score", 0);
});

darkThemeBtn.addEventListener("click", () => {
  localStorage.setItem(darkThemeBtn.value, darkThemeBtn.checked);
  if (localStorage.getItem(darkThemeBtn.value) === "false") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }
});
