const wordOfTheGame = validWords[Math.floor(Math.random()*validWords.length)]
console.log(wordOfTheGame)
const createLetterBoxes = () => {
  for (let i = 0; i < 6; i++) {
    const lineHolder = document.createElement("div");
    lineHolder.classList.add("line-holder", `row${i + 1}`);
    document.querySelector(".display-box").appendChild(lineHolder);
    for (let i = 0; i < 5; i++) {
      const wordHolder = document.createElement("div");
      wordHolder.className = "word-holder";
      lineHolder.appendChild(wordHolder);
    }
  }
};
createLetterBoxes();

let word = "";
const allKeys = document.querySelectorAll(".key");
const row1 = document.querySelectorAll(".row1.wordholder");
const allLetter = document.querySelectorAll(".line-holder.row1 > .word-holder");
const enterKey = document.querySelector("#enter");

const displayLetter = () => {
  for (i = 0; i < allLetter.length; i++) {
    allLetter[i].textContent = word[i];
  }
};

const checkLetter = () => {
  if (word.length === 5 && validWords.includes(word)) {
    enterKey.disabled = false;
  } else {
    enterKey.disabled = true;
  }
};

const displayAnswer = () => {
  for (i=0;i<word.length;i++){
    if (wordOfTheGame[i]===word[i]){
      allLetter[i].style.backgroundColor = 'green'
    }else if (wordOfTheGame.includes(word[i])){
      allLetter[i].style.backgroundColor = 'orange'
    }else{
      allLetter[i].style.backgroundColor = 'grey'
    }
  }
}

const keyFunction = (e) => {
  if (e.target.id === "backspace" || e.key === "Backspace") {
    word = word.slice(0, -1);
  } else if (e.target.id === "enter" || e.key === "Enter") {
    if (enterKey.disabled) {
      e.preventDefault();
      console.log("key NOT entered");
    } else {
      console.log("key entered");
      displayAnswer()
    }
  } else if ((e.key >= "a" && e.key <= "z") || (e.getModifierState('CapsLock') && (e.key >= "A" && e.key <= "Z" && e.key.length ===1))){
    word += e.key.toUpperCase();
  }else if (e.type === "click") {
    word += e.target.textContent;
  }
};



window.addEventListener("keyup", (e) => {
  const isNumber = isFinite(e.key);
  if (!isNumber) {
    keyFunction(e);
    checkLetter();
    displayLetter();
    
  }
});

allKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    keyFunction(e);
    checkLetter();
    displayLetter();
    
  });
});
