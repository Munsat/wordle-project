for (let i = 0; i < 6; i++) {
  const lineHolder = document.createElement("div");
  lineHolder.className = "line-holder";
  document.querySelector(".display-box").appendChild(lineHolder);
  for (let i = 0; i < 5; i++) {
    const wordHolder = document.createElement("div");
    wordHolder.className = "word-holder";
    lineHolder.appendChild(wordHolder);
  }
}
