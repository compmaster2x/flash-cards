import FlashcardApp from "./components/FlashcardApp.js";

const app = new FlashcardApp({
    front: document.getElementById("front"),
    back: document.getElementById("back"),
    card: document.getElementById("card"),
    score: document.getElementById("score"),
    rememberedList: document.getElementById("rememberedList")
})

app.init()  
