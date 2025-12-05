const deck = [
  "4","5","6","7","Q","J","K","A","2","3"
];

function shuffledDeck() {
  return [...deck, ...deck, ...deck, ...deck] // 40 cartas
    .sort(() => Math.random() - 0.5)
    .map((label, i) => ({
      id: i + "_" + Math.random(),
      label,
      power: deck.indexOf(label)
    }));
}

export default {
  startGame() {
    const cards = shuffledDeck();

    return {
      playerCards: cards.slice(0, 3),
      opponentCards: cards.slice(3, 6),
      tableCards: [],
      round: 1,
      playerPoints: 0,
      opponentPoints: 0,

      currentValue: 1,
      powerRequested: false,
      canIncrease: true,
      blockPlayer: false,
    };
  },

  playCard(game, card) {
    return {
      ...game,
      tableCards: [...game.tableCards, card],
      playerCards: game.playerCards.filter(c => c.id !== card.id),
    };
  },

  requestPower(game) {
    return {
      ...game,
      powerRequested: true,
    };
  },

  respondPower(game, response) {
    if (response === "run") {
      return {
        ...game,
        opponentPoints: game.opponentPoints + game.currentValue,
        powerRequested: false,
      };
    }

    return {
      ...game,
      currentValue: game.currentValue + 2,
      powerRequested: false,
    };
  }
};
