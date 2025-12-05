export default function Scoreboard({ playerPoints, opponentPoints, round }) {
  return (
    <div className="flex gap-10 text-xl font-bold my-4">
      
      <div className="text-green-400">
        Você: {playerPoints}
      </div>

      <div className="text-gray-400">
        Rodada: {round}
      </div>

      <div className="text-red-400">
        Oponente: {opponentPoints}
      </div>
    </div>
  );
}
