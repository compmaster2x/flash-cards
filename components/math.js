//math.js
function shuffleCards(cards, currentIndex){
  const unrememberedIndexes = cards
  .map((card, index) => !card.isRemembered? index : null)
  .filter(index => index !== null)

  if (unrememberedIndexes === 0) return -1

  if (unrememberedIndexes.length === 1) return unrememberedIndexes[0]

  const filteredIndexes = unrememberedIndexes.filter(index => index !== currentIndex)

  const randomIndex = Math.floor(Math.random() * filteredIndexes.length)

  return filteredIndexes[randomIndex]
}
  
  export { shuffleCards };
  