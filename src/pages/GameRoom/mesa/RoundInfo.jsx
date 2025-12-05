export default function RoundInfo({ info }) {
  return (
    <div className="mt-4 mb-2 flex gap-10 text-lg font-semibold">
      <span className="text-green-400">Você: {info.me}</span>
      <span className="text-gray-400">Rodada: {info.round}</span>
      <span className="text-red-400">Oponente: {info.opp}</span>
    </div>
  );
}
