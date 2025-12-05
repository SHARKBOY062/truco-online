export function getTurnIndex(round, totalPlayers = 4) {
  return round % totalPlayers;
}

export function isPlayersTurn(playerIndex, round) {
  return playerIndex === getTurnIndex(round);
}
