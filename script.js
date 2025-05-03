//script.js
  import cards from "./data/info.js";
  import { shuffleCards } from "./components/math.js";


  let current = 0;
  const front = document.getElementById("front");
  const back = document.getElementById("back");
  const card = document.getElementById("card");
  const nextBtn = document.getElementById("nextBtn");
  
  const rememberButt = document.getElementById("remembered")
  const score = document.getElementById("score")


  function updateCard() {
    front.textContent = cards[current].question;
    back.textContent = cards[current].answer;
    card.classList.remove("flipped");
    displayScore();
  }
  

  function displayScore(){
    const rememberedCount = cards.filter(card => card.isRemembered).length
    score.innerHTML = `Score: ${rememberedCount}/${cards.length}`
  }

  function showCongratsMessage(){
    front.textContent = "🎉 Все карточки выучены!"
    back.textContent = "";
    score.innerHTML = `Score: ${cards.length}/ ${cards.length}`
    card.classList.remove("flipped")
  }

  function handleNextCard(){
    const newIndex = shuffleCards(cards, current)
    if(newIndex === -1){
      showCongratsMessage()
      return
    }
    
    current = newIndex
    updateCard()

  }

  function handleRemembered(){
    cards[current].isRemembered = true

    const rememberedCount = cards.filter(card => card.isRemembered).length
    if(rememberedCount === cards.length){
      showCongratsMessage()
      return 
    }
    handleNextCard()
  }

  function toggleFlip(){
    card.classList.toggle("flipped")
  }

  
  card.addEventListener("click", toggleFlip)
  nextBtn.addEventListener("click", handleNextCard)
  rememberButt.addEventListener("click", handleRemembered)

  updateCard();
 