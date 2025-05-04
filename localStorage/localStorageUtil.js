//localStorageUtils.js

const STORAGE_KEY = "cardState"

function saveCardsState(cardsData){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cardsData))
}

function loadCardsState(){
    const saved = localStorage.getItem(STORAGE_KEY)

    return saved? JSON.parse(saved) : null
}

function clearCardsState(){
    localStorage.removeItem(STORAGE_KEY)
}

export { saveCardsState, loadCardsState, clearCardsState };