import { motion } from "framer-motion";

export default function Hand({ cards = [] }) {
  const normalize = (card) =>
    typeof card === "string" ? { rank: card, suit: null } : card || {};

  return (
    <div
      className="
        flex justify-center gap-2 sm:gap-4 mt-4 sm:mt-6
        relative
      "
      style={{ transform: "perspective(900px) rotateX(18deg)" }}
    >
      {cards.map((raw, i) => {
        const { rank, suit } = normalize(raw);
        const { symbol, color } = mapSuit(suit);

        return (
          <motion.div
            key={i}
            whileHover={{ y: -18, scale: 1.08, rotate: 0 }}
            className="
              w-[56px] h-[80px]
              sm:w-[72px] sm:h-[104px]
              md:w-[80px] md:h-[116px]
              rounded-xl
              bg-gradient-to-br from-[#fefcf6] to-[#e5f9f0]
              shadow-[0_10px_22px_rgba(0,0,0,0.65)]
              border-2 border-emerald-400/60
              cursor-pointer select-none
              relative
            "
          >
            {/* canto superior esquerdo */}
            <div className="absolute top-1.5 left-2 flex flex-col items-center text-[9px] sm:text-[10px] leading-tight">
              <span className="font-semibold text-black">{rank}</span>
              {suit && (
                <span style={{ color }} className="mt-[1px]">
                  {symbol}
                </span>
              )}
            </div>

            {/* centro */}
            <div className="flex h-full items-center justify-center text-xl sm:text-3xl">
              {suit ? (
                <span style={{ color }}>{symbol}</span>
              ) : (
                <span className="text-black">{rank}</span>
              )}
            </div>

            {/* canto inferior direito espelhado */}
            <div className="absolute bottom-1.5 right-2 rotate-180 flex flex-col items-center text-[9px] sm:text-[10px] leading-tight">
              <span className="font-semibold text-black">{rank}</span>
              {suit && (
                <span style={{ color }} className="mt-[1px]">
                  {symbol}
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function mapSuit(suit) {
  if (!suit) return { symbol: "", color: "#111827" };
  if (suit === "♥" || suit === "♦") {
    return { symbol: suit, color: "#ef4444" };
  }
  return { symbol: suit, color: "#111827" };
}
