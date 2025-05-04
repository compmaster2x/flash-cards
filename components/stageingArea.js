function updateRememberedList(cardsData, rememberedListEl) {
    rememberedListEl.innerHTML = "";
    const remembered = cardsData.filter(card => card.isRemembered);
    remembered.forEach(card => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${card.question}</strong><br>${card.answer}`;
      rememberedListEl.appendChild(li);
    });
  }
  
  export { updateRememberedList };