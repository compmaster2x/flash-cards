import cards from "./data/info.js";
import {
  init,
  handleNextCard,
  handleRemembered,
  toggleFlip
} from "./components/handlers.js";

init({
  front: document.getElementById("front"),
  back: document.getElementById("back"),
  card: document.getElementById("card"),
  score: document.getElementById("score"),
  cards: cards
});

document.getElementById("card").addEventListener("click", toggleFlip);
document.getElementById("nextBtn").addEventListener("click", handleNextCard);
document.getElementById("remembered").addEventListener("click", handleRemembered);
