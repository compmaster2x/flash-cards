//main.js
import cards from "./data/info.js";
import {
  init,
  handleNextCard,
  handleRemembered,
  toggleFlip,
  handleRefresh
} from "./components/handlers.js";
import { loadCardsState } from "./localStorage/localStorageUtil.js";

const savedCards = loadCardsState();
if(savedCards){
  cards.forEach((card, i) => {
    card.isRemembered = savedCards[i]?.isRemembered || false
  })
}


init({
  front: document.getElementById("front"),
  back: document.getElementById("back"),
  card: document.getElementById("card"),
  score: document.getElementById("score"),
  cards: cards,
  rememberedList: document.getElementById("rememberedList"),
  
});

document.getElementById("card").addEventListener("click", toggleFlip);
document.getElementById("nextBtn").addEventListener("click", handleNextCard);
document.getElementById("remembered").addEventListener("click", handleRemembered);
document.getElementById("refresh").addEventListener("click", handleRefresh);