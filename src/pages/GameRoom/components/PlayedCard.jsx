export default function PlayedCard({ card }) {
  if (!card) return null;

  const { value, suit, hidden } = card;

  const suitColor =
    suit === "♥" || suit === "♦" ? "text-red-500" : "text-black";

  return (
    <div
      className={`
        w-20 h-28 rounded-xl shadow-xl 
        flex flex-col items-center justify-center
        text-2xl font-bold transition-all duration-300 
        animate-[fadeIn_0.25s_ease-out]
        ${hidden ? "bg-[#1a1f26] border border-gray-700" : "bg-gradient-to-b from-white to-gray-200"}
      `}
    >
      {/* Carta Oculta */}
      {hidden ? (
        <span className="text-gray-400 text-xl">🂠</span>
      ) : (
        <>
          <p className={`${suitColor} leading-none`}>{value}</p>
          <p className={`${suitColor} text-3xl leading-none`}>{suit}</p>
        </>
      )}
    </div>
  );
}
