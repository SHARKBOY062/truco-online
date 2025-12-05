// src/pages/GameRoom/mesa/Mesa.jsx

export default function Mesa() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* CÍRCULO CENTRAL */}
      <div
        className="
          relative
          w-[60%] max-w-[520px]
          aspect-square
          rounded-full
          border-[10px]
          border-[#f4edc4]
          shadow-[0_0_60px_rgba(0,0,0,0.6)]
          overflow-hidden
        "
      >
        {/* Gradiente azul da mesa */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#1455ff_0%,#043479_40%,#021533_75%,#000814_100%)]" />

        {/* Deck central */}
        <CenterDeck />
      </div>
    </div>
  );
}

function CenterDeck() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[18%] max-w-[90px] aspect-[3/4]">
        {/* 3 cartas levemente sobrepostas */}
        {[-10, 0, 10].map((angle, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translateX(${(i - 1) * 6}px) rotate(${angle}deg)`,
            }}
          >
            <div
              className="
                w-full h-full
                rounded-[16px]
                border-[3px]
                border-white
                bg-gradient-to-b from-[#e0573f] via-[#c93730] to-[#7b1413]
                shadow-[0_0_25px_rgba(0,0,0,0.8)]
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}
