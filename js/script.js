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

const displayLetter = () => {
  for (i = 0; i < word.length; i++) {
    allLetter[i].textContent = word[i];
  }
};

window.addEventListener("keyup", (e) => {
  const isNumber = isFinite(e.key);
  if (!isNumber) {
    word += e.key.toUpperCase();
    console.log(word);
    displayLetter();
  }
});

allKeys.forEach((key) => {
  key.addEventListener("click", (e) => {
    word += e.target.textContent;
    console.log(word);
    displayLetter();
  });
});
