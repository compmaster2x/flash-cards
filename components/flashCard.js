// Flashcard.js

export default class Flashcard {
    constructor(question, answer, isRemembered = false) {
        this.question = question
        this.answer = answer
        this.isRemembered = isRemembered
    }
}

