const wordOfTheGame = validWords[Math.floor(Math.random() * validWords.length)];
console.log(wordOfTheGame);
let word = "";
let num = 0;
let lineComplete = false;
let greenLength = 0;
const allKeys = document.querySelectorAll(".key");
const enterKey = document.querySelector("#enter");
const winnerDisplay = document.querySelector(".winner-display");
const winnerTexts = ["GOOD JOB!", "WELL DONE", "WAY TO GO!", "WINNER!", "WOW!"];

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
    if (greenLength === 5) {
      winnerDisplay.querySelector("h1").textContent =
        winnerTexts[Math.floor(Math.random() * winnerTexts.length)];
        winnerDisplay.querySelector('a').textContent = 'next level'
      winnerDisplay.style.opacity = 1;
    }
  });
  greenLength = 0;
};

//Checks if the user has lost the round
const checkGameOver = (num) => {
  if (num > 5) {
    winnerDisplay.querySelector("h1").textContent = "GAME OVER";
    winnerDisplay.querySelector('a').textContent = 'start over'
    winnerDisplay.style.opacity = 1;
  }
};

//Displays the coloured tiles for each answer
const displayAnswer = (allLetter) => {
  for (i = 0; i < word.length; i++) {
    if (wordOfTheGame[i] === word[i]) {
      allLetter[i].style.backgroundColor = "rgb(96, 159, 141)";
    } else if (wordOfTheGame.includes(word[i])) {
      allLetter[i].style.backgroundColor = "rgb(190, 101, 63)";
    } else {
      allLetter[i].style.backgroundColor = "grey";
    }
  }
  lineComplete = true;
  num++;
  checkWinner(allLetter);
  checkGameOver(num)
};


const keyFunction = (e, allLetter) => {
  if (e.target.id === "backspace" || e.key === "Backspace") {
    word = word.slice(0, -1);
  } else if (e.target.id === "enter" || e.key === "Enter") {
    if (enterKey.disabled) {
      e.preventDefault();
    } else {
      displayAnswer(allLetter);
    }
  } else if ((e.key >= "a" && e.key <= "z") || (e.getModifierState("CapsLock") && (e.key >= "A" && e.key <= "Z" ) && e.key.length === 1)){
    word += e.key.toUpperCase();
  } else if (e.type === "click") {
    word += e.target.textContent;
  }
};

const repeatFunction = (e) => {
  let allLetter = document.querySelectorAll(
    `.line-holder.row${num} > .word-holder`
  );
  lineComplete = false;
  keyFunction(e, allLetter);
  displayLetter(allLetter);
  checkLetter(word);
  if (lineComplete) {
    word = "";
  }
};

window.addEventListener(
  "keyup",
  (keyHandler = (e) => {
    const isNumber = isFinite(e.key);
    if (!isNumber) {
      repeatFunction(e);
    }
  })
);

allKeys.forEach((key) => {
  key.addEventListener(
    "click",
    (clickHandler = (e) => {
      repeatFunction(e);
    })
  );
});
