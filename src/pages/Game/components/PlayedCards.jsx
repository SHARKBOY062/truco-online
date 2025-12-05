export default function PlayedCards({ tableCards }) {
  return (
    <div className="flex gap-6 my-6">
      {tableCards.map((c, i) => (
        <div key={i} className="
          w-20 h-32 bg-white text-black rounded-xl
          flex items-center justify-center font-bold text-xl
        ">
          {c.label}
        </div>
      ))}
    </div>
  );
}
