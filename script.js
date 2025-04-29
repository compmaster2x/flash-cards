const cards = [
    { question: "Столица Франции?", answer: "Париж" },
    { question: "2 + 2?", answer: "4" },
    { question: "Солнце — это...", answer: "Звезда" },
    { question: "HTML расшифровывается как?", answer: "HyperText Markup Language" }
  ];
  
  let current = 0;
  const front = document.getElementById("front");
  const back = document.getElementById("back");
  const card = document.getElementById("card");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  
  function updateCard() {
    front.textContent = cards[current].question;
    back.textContent = cards[current].answer;
    card.classList.remove("flipped");
  }
  
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
  
  nextBtn.addEventListener("click", () => {
    current = (current + 1) % cards.length;
    updateCard();
  });
  
  prevBtn.addEventListener("click", () => {
    current = (current - 1 + cards.length) % cards.length;
    updateCard();
  });
  
  // Инициализация
  updateCard();
  