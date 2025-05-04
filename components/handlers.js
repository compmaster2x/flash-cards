//handlers.js
import { shuffleCards } from "./math.js";
import { updateRememberedList, attachRemoveHandler, refreshButton   } from "./stageingArea.js";

let frontEl, backEl, cardEl, scoreEl, rememberedListEl, removeCardFromListEl;
let cardsData = [];
let currentIndex = 0;

function init({ front, back, card, score, cards, rememberedList, removeCardFromList }) {
  frontEl = front;
  backEl = back;
  cardEl = card;
  scoreEl = score;
  cardsData = cards;
  rememberedListEl = rememberedList;
  removeCardFromListEl = removeCardFromList;
  currentIndex = 0;
  updateCard();
  updateRememberedList(cardsData, rememberedListEl);
  attachRemoveHandler(cardsData, rememberedListEl, updateRememberedList); 
}

function handleRefresh() {
  refreshButton(cardsData, rememberedListEl, updateRememberedList);
  updateCard(); // чтобы обновить отображение текущей карточки
  displayScore();
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
  updateRememberedList(cardsData, rememberedListEl);
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



export {
  init,
  updateCard,
  displayScore,
  showCongratsMessage,
  handleNextCard,
  handleRemembered,
  toggleFlip,
  updateRememberedList,
  handleRefresh
};
