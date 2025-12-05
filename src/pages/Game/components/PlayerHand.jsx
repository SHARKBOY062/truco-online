export default function PlayerHand({ cards, onPlay, disabled }) {
  return (
    <div className="flex gap-4 mt-6">
      {cards.map(c => (
        <div
          key={c.id}
          onClick={() => !disabled && onPlay(c)}
          className="
            w-20 h-32 bg-white text-black rounded-xl cursor-pointer
            hover:scale-110 transition transform
            flex items-center justify-center font-bold text-xl
          "
        >
          {c.label}
        </div>
      ))}
    </div>
  );
}
