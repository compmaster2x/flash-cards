export default class FlashcardUI{
    constructor(front, back, card, score, rememberedList){
        this.frontEl = front;
        this.backEl = back
        this.cardEl = card
        this.scoreEl = score
        this.rememberedListEl = rememberedList
    }

    updateCard(card){
        this.frontEl.textContent = card.question
        this.backEl.textContent = card.answer
        this.cardEl.classList.remove("flipped")
    }

    updateScore(rememberedCount, totalCount){
        this.scoreEl.innerHTML = `Score: ${rememberedCount}/${totalCount}`
    }

    showCongratsMessage(){
        this.frontEl.textContent = "🎉 Все карточки выучены!";
        this.backEl.textContent = ""
        this.cardEl.classList.remove("flipped")
        this.scoreEl.innerHTML = `Score: ✅`
    }

    toggleFlip(){
        this.cardEl.classList.toggle("flipped")
    }

    updateRememberedList(cards){
        this.rememberedListEl.innerHTML = ""
        cards
        .filter(c => c.isRemembered)
        .forEach((card, i) => {
            const li = document.createElement("li")
            li.dataset.index = i
            li.innerHTML = `<strong> ${card.question}</strong><br>${card.answer}`
            this.rememberedListEl.appendChild(li)
        });
    }
}

