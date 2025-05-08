import Flashcard from './flashCard.js'
import FlashcardDeck from "./FlashcardDeck.js"
import FlashcardUI from "./FlashCardUI.js"


export default class FlashcardApp {
    constructor({front, back, card, score, rememberedList}) {
        this.ui = new FlashcardUI(front, back, card, score, rememberedList)
    }

    async  init(){
        
        try{
            const response = await fetch("http://localhost:3000/cards")
            const data = await response.json()

            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("API ne vernyl spisok")
            }

            const flashcards = data.map(
                item => new Flashcard(item.question, item.answer, item.isRemembered ?? false)
            )

            this.deck = new FlashcardDeck(flashcards)

            this.deck.loadState()
            this.ui.updateCard(this.deck.currentCard)
            this.ui.updateScore(this.deck.rememberedCount, this.deck.cards.length)
            this.ui.updateRememberedList(this.deck.cards)
            this.attachHandlers()
        } catch (err) {
            console.error("error init", err)
            this.frontEl.textContent = "error load"
            this.backEl.textContent = ""
        }
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
