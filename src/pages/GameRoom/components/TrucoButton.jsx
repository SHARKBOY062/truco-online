export default function TrucoButtons({ onTruco, onCover, onRun }) {
  return (
    <div
      className="
        w-full max-w-sm
        flex flex-col sm:flex-row
        items-stretch justify-center
        gap-2 sm:gap-3
        mt-1 sm:mt-2
      "
    >
      <button
        onClick={onCover}
        className="
          flex-1
          py-2 sm:py-2.5
          text-xs sm:text-sm
          rounded-lg
          bg-blue-600 hover:bg-blue-500
          shadow-[0_8px_18px_rgba(37,99,235,0.7)]
          font-semibold
          transition-colors
        "
      >
        Cobrir
      </button>

      <button
        onClick={onTruco}
        className="
          flex-1
          py-2 sm:py-2.5
          text-xs sm:text-sm
          rounded-lg
          bg-emerald-500 hover:bg-emerald-400
          shadow-[0_8px_18px_rgba(16,185,129,0.8)]
          font-extrabold
          tracking-wide
        "
      >
        TRUCO!
      </button>

      <button
        onClick={onRun}
        className="
          flex-1
          py-2 sm:py-2.5
          text-xs sm:text-sm
          rounded-lg
          bg-red-600 hover:bg-red-500
          shadow-[0_8px_18px_rgba(220,38,38,0.8)]
          font-semibold
        "
      >
        Correr
      </button>
    </div>
  );
}
