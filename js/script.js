const createLetterBoxes = () => {
    for (let i = 0; i < 6; i++) {
        const lineHolder = document.createElement("div");
        lineHolder.classList.add("line-holder", `row${i+1}`) 
        document.querySelector(".display-box").appendChild(lineHolder);
        for (let i = 0; i < 5; i++) {
          const wordHolder = document.createElement("div");
          wordHolder.className = "word-holder";
          lineHolder.appendChild(wordHolder);
        }
      }
}

createLetterBoxes()

const createKeyboard = () => {
    
}




