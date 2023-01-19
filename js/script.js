console.log(validWords[2]);
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
  }else{
    enterKey.disabled = true;
  }
};

window.addEventListener("keyup", (e) => {
  const isNumber = isFinite(e.key);
  if (!isNumber) {
    switch (e.key) {
      case "Backspace":
        word = word.slice(0, -1);
        break;
      case "Enter":
        if (enterKey.disabled) {
          e.preventDefault();
          console.log("key NOT entered");
        } else {
          console.log("key entered");
        }
        break;
      default:
        word += e.key.toUpperCase();
    }

    displayLetter();
    checkLetter();
  }
});

allKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "backspace":
        word = word.slice(0, -1);
        break;
      case "enter":
        if (enterKey.disabled) {
          e.preventDefault();
          console.log("key NOT entered");
        } else {
          console.log("key entered");
        }
        break;
      default:
        word += e.target.textContent;
    }

    displayLetter();
    checkLetter();
  });
});
