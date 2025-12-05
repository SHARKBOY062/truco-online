// src/pages/GameRoom/mesa/MesaCard.jsx

export default function MesaCard({
  rank = "A",
  suit = "♠",
  faceDown = false,
  className = "",
  style = {},
}) {
  const isRed = suit === "♥" || suit === "♦";
  const colorClass = isRed ? "text-red-600" : "text-black";

  return (
    <div
      className={
        "relative rounded-[10px] sm:rounded-[12px] bg-[#f9f4eb] shadow-[0_8px_16px_rgba(0,0,0,0.7)] border border-black/15 " +
        "flex items-center justify-center overflow-hidden " +
        className
      }
      style={style}
    >
      {/* tamanhos responsivos via tailwind */}
      <div className="w-[44px] h-[64px] sm:w-[56px] sm:h-[80px] lg:w-[68px] lg:h-[100px] relative flex items-center justify-center">
        {faceDown ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#4c1d95,#020617)] rounded-[10px] sm:rounded-[12px]" />
            <div className="absolute inset-[3px] sm:inset-[4px] rounded-[8px] sm:rounded-[10px] border border-yellow-300/70" />
            <div className="absolute inset-[7px] sm:inset-[8px] rounded-[6px] sm:rounded-[8px] border border-purple-300/40" />
            <div className="absolute inset-0 opacity-[0.25] bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0,transparent_40%,transparent_60%,rgba(0,0,0,0.4)_100%)] rounded-[10px] sm:rounded-[12px]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.5)_0,rgba(0,0,0,0.0)_55%)] mix-blend-soft-light rounded-[10px] sm:rounded-[12px]" />

            {/* canto superior esquerdo */}
            <div className="absolute top-1 left-1 flex flex-col items-center leading-none">
              <span
                className={colorClass + " font-semibold text-[12px] sm:text-[14px]"}
              >
                {rank}
              </span>
              <span
                className={colorClass + " mt-[1px] text-[13px] sm:text-[15px]"}
              >
                {suit}
              </span>
            </div>

            {/* naipe central */}
            <div
              className={
                "relative z-10 " +
                colorClass +
                " drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] text-[22px] sm:text-[26px]"
              }
            >
              {suit}
            </div>

            {/* canto inferior direito espelhado */}
            <div className="absolute bottom-1 right-1 flex flex-col items-center leading-none rotate-180">
              <span
                className={colorClass + " font-semibold text-[12px] sm:text-[14px]"}
              >
                {rank}
              </span>
              <span
                className={colorClass + " mt-[1px] text-[13px] sm:text-[15px]"}
              >
                {suit}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
