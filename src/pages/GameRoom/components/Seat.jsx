import DeckBack from "./DeckBack";

export default function Seat({
  name,
  status = "online",
  position,
  showDeck = false,
  deckPosition = "bottom", // "bottom" | "left" | "right"
  isTurn = false,          // destaca o jogador da vez
}) {
  // Classes de posição do deck em relação ao avatar
  let deckPositionClasses = "";

  switch (deckPosition) {
    case "left":
      deckPositionClasses =
        "right-[110%] top-1/2 -translate-y-1/2";
      break;
    case "right":
      deckPositionClasses =
        "left-[110%] top-1/2 -translate-y-1/2";
      break;
    case "bottom":
    default:
      deckPositionClasses =
        "top-[105%] left-1/2 -translate-x-1/2";
      break;
  }

  return (
    <div
      className="absolute text-white select-none"
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* AVATAR COM ARO E GLOW RESPONSIVO */}
        <div
          className={`
            relative flex items-center justify-center
            w-16 h-16 sm:w-20 sm:h-20
            rounded-full
            bg-gradient-to-br from-white/85 via-white to-white/70
            p-[2px] sm:p-[3px]
            ${isTurn
              ? "shadow-[0_0_18px_rgba(74,222,128,0.9)]"
              : "shadow-[0_0_12px_rgba(0,0,0,0.75)]"}
          `}
        >
          <div
            className="
              w-full h-full rounded-full
              bg-[#111827]
              flex items-center justify-center
              text-[10px] sm:text-[12px]
              font-semibold tracking-tight
            "
          >
            {name}
          </div>
        </div>

        {/* STATUS */}
        <div className="mt-1 text-[10px] sm:text-[11px] text-emerald-300/90">
          {status}
        </div>

        {/* DECK VIRADO — POSICIONADO DE FORMA ELEGANTE */}
        {showDeck && (
          <div
            className={`
              pointer-events-none
              absolute flex gap-[2px] sm:gap-[4px]
              ${deckPositionClasses}
            `}
          >
            <div className="rotate-[-14deg] translate-y-[1px] sm:translate-y-[2px]">
              <DeckBack />
            </div>
            <div className="rotate-[0deg]">
              <DeckBack />
            </div>
            <div className="rotate-[12deg] translate-y-[1px]">
              <DeckBack />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
