import Flashcard from './flashCard.js'
import FlashcardDeck from "./FlashcardDeck.js"
import FlashcardUI from "./FlashCardUI.js"
import cardsData from "../data/info.js"

export default class FlashcardApp {
    constructor({front, back, card, score, rememberedList}){
        const flashcards = cardsData.map(data => new Flashcard(data.question, data.answer, data.isRemembered))//?
        this.deck = new FlashcardDeck(flashcards)
        this.ui = new FlashcardUI(front, back, card, score, rememberedList)
    }

    init(){
        // localStorage.removeItem("cardState");
        this.deck.loadState()
        this.ui.updateCard(this.deck.currentCard)
        this.ui.updateScore(this.deck.rememberedCount, this.deck.cards.length)
        this.ui.updateRememberedList(this.deck.cards)
        this.attachHandlers()
    }

    attachHandlers(){
        document.getElementById("card").addEventListener("click", () => this.ui.toggleFlip())
        document.getElementById("nextBtn").addEventListener("click", () => this.nextCard())
        document.getElementById("remembered").addEventListener("click", () => this.rememberCard())
        document.getElementById("refresh").addEventListener("click", () => this.reset())

        this.ui.rememberedListEl.addEventListener("click", (e) => {
            if(e.target.tagName === "LI"){
                const index = parseInt(e.target.dataset.index)
                const remembered = this.deck.cards.filter(c => c.isRemembered)
                remembered[index].isRemembered = false
                this.deck.saveState()
                this.ui.updateRememberedList(this.deck.cards)
                this.ui.updateScore(this.deck.rememberedCount, this.deck.cards.length)
            }
        })
    }


    nextCard(){
        const index = this.deck.shuffleNext()
        if(index === -1){
            this.ui.showCongratsMessage()
            return
        }
        this.ui.updateCard(this.deck.currentCard)
        this.ui.updateScore(this.deck.rememberedCount, this.deck.cards.length )
    }

    rememberCard(){
        this.deck.rememberCurrent()
        this.deck.saveState()
        this.ui.updateRememberedList(this.deck.cards);
        if(this.deck.isComplete()){
            this.ui.showCongratsMessage()
        } else{
            this.nextCard()
        }
    }

    reset(){
        this.deck.reset()
        this.deck.clearState()
        this.ui.updateCard(this.deck.currentCard)
        this.ui.updateScore(this.deck.rememberedCount, this.deck.cards.length)
        this.ui.updateRememberedList(this.deck.cards)
    }
}
