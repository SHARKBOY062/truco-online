import { useState } from "react";

function parseValue(raw) {
  if (!raw) return { rank: "?", suitKey: "P", suit: "♣", isRed: false };

  const value = String(raw).trim().toUpperCase();

  const last = value.slice(-1);
  const body = value.slice(0, -1) || value;

  const suitMap = {
    "♠": { suit: "♠", isRed: false },
    "♣": { suit: "♣", isRed: false },
    "♥": { suit: "♥", isRed: true },
    "♦": { suit: "♦", isRed: true },
    P: { suit: "♣", isRed: false }, // Paus
    C: { suit: "♥", isRed: true }, // Copas
    E: { suit: "♠", isRed: false }, // Espadas
    O: { suit: "♦", isRed: true }, // Ouros
  };

  if (suitMap[last]) {
    return {
      rank: body,
      suitKey: last,
      suit: suitMap[last].suit,
      isRed: suitMap[last].isRed,
    };
  }

  return { rank: value, suitKey: "E", suit: "♠", isRed: false };
}

export default function Card({ value, delay = 0 }) {
  const [flip, setFlip] = useState(false);

  const { rank, suit, isRed } = parseValue(value);

  const textColor = isRed ? "text-red-600" : "text-gray-900";
  const pipColor = isRed ? "text-red-500" : "text-gray-900";

  return (
    <div
      className={`card-flip ${flip ? "flipped" : ""} deal-card`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => setFlip(!flip)}
    >
      {/* largura/altura responsivas */}
      <div className="card-flip-inner w-[60px] h-[88px] sm:w-[76px] sm:h-[110px] md:w-[96px] md:h-[140px] relative">
        {/* FRENTE */}
        <div
          className={`
            card-face absolute inset-0
            rounded-xl shadow-[0_8px_18px_rgba(0,0,0,0.4)]
            bg-gradient-to-br from-[#f9fafb] via-[#f3f4f6] to-[#e5e7eb]
            border border-[#d1d5db]
            overflow-hidden
            flex
          `}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.8)_0,transparent_45%)] pointer-events-none" />

          {/* canto superior esquerdo */}
          <div className="absolute top-1 left-1 flex flex-col items-center">
            <span
              className={`font-bold ${textColor} text-[10px] sm:text-[11px] md:text-xs`}
            >
              {rank}
            </span>
            <span
              className={`${pipColor} text-[9px] sm:text-[10px] md:text-xs`}
            >
              {suit}
            </span>
          </div>

          {/* canto inferior direito */}
          <div className="absolute bottom-1 right-1 flex flex-col items-center rotate-180">
            <span
              className={`font-bold ${textColor} text-[10px] sm:text-[11px] md:text-xs`}
            >
              {rank}
            </span>
            <span
              className={`${pipColor} text-[9px] sm:text-[10px] md:text-xs`}
            >
              {suit}
            </span>
          </div>

          {/* centro da carta */}
          <div className="m-auto flex flex-col items-center justify-center">
            {["J", "Q", "K"].includes(rank) ? (
              <div className="flex flex-col items-center justify-center">
                <div
                  className="
                    w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12
                    rounded-lg
                    border border-[#9ca3af]
                    bg-gradient-to-br from-[#e5e7eb] to-[#d1d5db]
                    flex items-center justify-center
                    shadow-[inset_0_0_6px_rgba(0,0,0,0.25)]
                  "
                >
                  <span
                    className={`
                      font-extrabold tracking-tight
                      ${pipColor}
                      text-lg sm:text-xl md:text-2xl
                    `}
                  >
                    {rank}
                  </span>
                </div>
                <span
                  className={`
                    mt-1 font-semibold
                    ${pipColor}
                    text-[10px] sm:text-xs md:text-sm
                  `}
                >
                  {suit}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span
                  className={`
                    font-extrabold leading-none
                    ${pipColor}
                    text-2xl sm:text-3xl md:text-4xl
                  `}
                >
                  {rank}
                </span>
                <span
                  className={`${pipColor} mt-1 text-base sm:text-lg md:text-xl`}
                >
                  {suit}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* VERSO */}
        <div
          className="
            card-back card-face
            absolute inset-0
            rounded-xl border border-[#0b1120]
            bg-[#020617]
            shadow-[0_10px_22px_rgba(0,0,0,0.7)]
            overflow-hidden
            flex items-center justify-center
          "
        >
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_25%_20%,#22c55e_0,transparent_55%),radial-gradient(circle_at_75%_80%,#22c55e_0,transparent_55%)]" />
          <div className="absolute inset-[5px] sm:inset-[6px] rounded-lg border border-[#22c55e66]" />

          <span className="relative z-10 font-bold tracking-[0.2em] uppercase text-emerald-400 text-[12px] sm:text-[14px] md:text-[16px]">
            Truco
          </span>
        </div>
      </div>
    </div>
  );
}
