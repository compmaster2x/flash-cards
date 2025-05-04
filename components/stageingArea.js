//stageingArea.js
import { displayScore } from "./handlers.js";

import { saveCardsState, clearCardsState } from "../localStorage/localStorageUtil.js";

function updateRememberedList(cardsData, rememberedListEl) {
    rememberedListEl.innerHTML = "";
    const remembered = cardsData.filter(card => card.isRemembered);
    remembered.forEach((card, index) => {
      const li = document.createElement("li");
      
      li.dataset.index = index; 
      li.innerHTML = `<strong>${card.question}</strong><br>${card.answer}`;
      rememberedListEl.appendChild(li);
    });
  }

  function attachRemoveHandler(cardsData, rememberedListEl, updateCallBack){
    rememberedListEl.addEventListener("click", (event) => {
        if (event.target.tagName === "LI"){
            saveCardsState(cardsData);
            const index = parseInt(event.target.dataset.index, 10)

            const rememberedCards = cardsData.filter(c => c.isRemembered)

            const cardToUnremember = rememberedCards[index]

            if(cardToUnremember){
                cardToUnremember.isRemembered = false
                saveCardsState(cardsData);
            updateCallBack(cardsData, rememberedListEl)
            displayScore(); 
        }

        }
    })
  }

  function refreshButton(cardsData, rememberedListEl, updateCallBack){
    clearCardsState();
    cardsData.forEach(card => {
        card.isRemembered = false
    })
    
    updateCallBack(cardsData, rememberedListEl)
  }
  
  export { updateRememberedList, attachRemoveHandler, refreshButton };