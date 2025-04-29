//script.js
import cards from "./data/info.js";
  
  let current = 0;
  const front = document.getElementById("front");
  const back = document.getElementById("back");
  const card = document.getElementById("card");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const rememberButt = document.getElementById("remembered")
  const score = document.getElementById("score")
  const currentCard = cards[current]

  function updateCard() {
    let attempts = 0;
    while (cards[current]?.isRemembered) {
      current = (current + 1) % cards.length;
      attempts++;
      if (attempts > cards.length) {
        front.textContent = "🎉 All cards rememorised!";
        back.textContent = "";
        score.innerHTML = `Score: 10/10`
        return;
      }
    }
  
    front.textContent = cards[current].question;
    back.textContent = cards[current].answer;
    card.classList.remove("flipped");
  
    displayScore();
  }
  

  function displayScore(){
    let count = 0
    cards.forEach((card) => {
        if (card.isRemembered) count++ 
    })

    score.innerHTML = `Score: ${count}/${cards.length}`
  }
  
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
  
  nextBtn.addEventListener("click", () => {
    let start = current;
    do {
      current = (current + 1) % cards.length;
    } while (cards[current].isRemembered && current !== start);
  
    updateCard();
  });
  
  prevBtn.addEventListener("click", () => {
    let start = current;
    do {
      current = (current - 1 + cards.length) % cards.length;
    } while (cards[current].isRemembered && current !== start);
  
    updateCard();
  });
  
  rememberButt.addEventListener("click", () => {
    cards[current].isRemembered = true;
    updateCard();
  })

  updateCard();
  displayScore()