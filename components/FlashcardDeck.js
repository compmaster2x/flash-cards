import Flashcard from "./flashCard.js";

export default class FlashcardDeck {
    constructor(cards = []){
        this.cards = cards.map(c => new Flashcard(c.question, c.answer, c.isRemembered ?? false));
        this.currentIndex = 0
    }

    get currentCard(){
        return this.cards[this.currentIndex]
    }

    shuffleNext() {
        const available = this.cards
        .map((card, i) => !card.isRemembered && i !== this.currentIndex ? i : null)
        .filter(i => i !== null)

        if (available.length === 0) return -1

        const randomIndex = Math.floor(Math.random() * available.length)
        this.currentIndex = available[randomIndex]
        return this.currentIndex
    }

    rememberCurrent(){
        this.cards[this.currentIndex].isRemembered = true
    }

    reset(){
        this.cards.forEach(c => c.isRemembered = false)
        this.currentIndex = 0
    }

    get rememberedCount(){
        return this.cards.filter(c => c.isRemembered).length
    }

    isComplete(){
        return this.rememberedCount === this.cards.length
    }

    saveState(){
        const state = {
            cards: this.cards,
            currentIndex: this.currentIndex
        };
        localStorage.setItem("cardState", JSON.stringify(this.cards)) //?
    }

    loadState() {
        const saved = JSON.parse(localStorage.getItem("cardState"));
        if (!saved) return;
    
        saved.forEach((savedCard, i) => {
            if (this.cards[i]) {
                this.cards[i].isRemembered = !!savedCard.isRemembered;
            }
        });
        if (typeof saved.currentIndex === "number") {
            this.currentIndex = saved.currentIndex;
        }
    }
    

    clearState(){
        localStorage.removeItem("cardState")
    }


}