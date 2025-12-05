import { useState } from "react";

import Table from "./components/Table";
import PlayerHand from "./components/PlayerHand";
import OpponentHand from "./components/OpponentHand";
import PlayedCards from "./components/PlayedCards";
import TrucoActions from "./components/TrucoActions";
import Scoreboard from "./components/Scoreboard";

import paulistaRules from "./logic/palistaRules";

export default function GameRoom() {
  const [game, setGame] = useState(paulistaRules.startGame());

  function playCard(card) {
    setGame(prev => paulistaRules.playCard(prev, card));
  }

  function requestPower() {
    setGame(prev => paulistaRules.requestPower(prev));
  }

  function respondPower(response) {
    setGame(prev => paulistaRules.respondPower(prev, response));
  }

  return (
    <div className="min-h-screen bg-[#0F131A] text-white p-6 flex flex-col items-center">
      
      <Scoreboard
        playerPoints={game.playerPoints}
        opponentPoints={game.opponentPoints}
        round={game.round}
      />

      <OpponentHand cards={game.opponentCards} />

      <Table />

      <PlayedCards tableCards={game.tableCards} />

      <PlayerHand
        cards={game.playerCards}
        onPlay={playCard}
        disabled={game.blockPlayer}
      />

      <TrucoActions
        value={game.currentValue}
        onTruco={requestPower}
        onRun={() => respondPower("run")}
        canIncrease={game.canIncrease}
        powerRequested={game.powerRequested}
      />
    </div>
  );
}
