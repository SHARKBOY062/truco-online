export default function OpponentHand({ cards }) {
  return (
    <div className="flex gap-4 opacity-60 mt-4">
      {cards.map(c => (
        <div
          key={c.id}
          className="
            w-20 h-32 bg-gray-900 border border-gray-700 rounded-xl
          "
        />
      ))}
    </div>
  );
}
