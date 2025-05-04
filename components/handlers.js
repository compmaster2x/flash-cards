//handlers.js
import { shuffleCards } from "./math.js";

let frontEl, backEl, cardEl, scoreEl, rememberedListEl;
let cardsData = [];
let currentIndex = 0;

function init({ front, back, card, score, cards, rememberedList }) {
  frontEl = front;
  backEl = back;
  cardEl = card;
  scoreEl = score;
  cardsData = cards;
  rememberedListEl = rememberedList;
  currentIndex = 0;
  updateCard();
  updateRememberedList();
}

function updateCard() {
  frontEl.textContent = cardsData[currentIndex].question;
  backEl.textContent = cardsData[currentIndex].answer;
  cardEl.classList.remove("flipped");
  displayScore();
}

function displayScore() {
  const rememberedCount = cardsData.filter(card => card.isRemembered).length;
  scoreEl.innerHTML = `Score: ${rememberedCount}/${cardsData.length}`;
}

function showCongratsMessage() {
  frontEl.textContent = "🎉 Все карточки выучены!";
  backEl.textContent = "";
  scoreEl.innerHTML = `Score: ${cardsData.length}/${cardsData.length}`;
  cardEl.classList.remove("flipped");
}

function handleNextCard() {
  const newIndex = shuffleCards(cardsData, currentIndex);
  if (newIndex === -1) {
    showCongratsMessage();
    return;
  }
  currentIndex = newIndex;
  updateCard();
}

function handleRemembered() {
  
  cardsData[currentIndex].isRemembered = true;
  updateRememberedList(); 
  const rememberedCount = cardsData.filter(card => card.isRemembered).length;
  if (rememberedCount === cardsData.length) {
    showCongratsMessage();
    return;
  }
  handleNextCard();
}

function toggleFlip() {
  cardEl.classList.toggle("flipped");
}

function updateRememberedList(){
  rememberedListEl.innerHTML = ""
  const remembered = cardsData.filter(card => card.isRemembered)
  remembered.forEach(card => {
    const li = document.createElement("li")
    li.innerHTML = `<strong>${card.question}</strong><br>${card.answer}`;
    rememberedListEl.appendChild(li)
  })
}

export {
  init,
  updateCard,
  displayScore,
  showCongratsMessage,
  handleNextCard,
  handleRemembered,
  toggleFlip,
  updateRememberedList
};
