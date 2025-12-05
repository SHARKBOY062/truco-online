// HUD responsivo

export default function HUD({ teamA, teamB, mode }) {
  return (
    <div
      className="
        w-full max-w-3xl
        bg-[#02040a]
        border border-white/10
        rounded-[20px] sm:rounded-[26px]
        px-3 sm:px-5 py-2.5 sm:py-3
        shadow-[0_16px_40px_rgba(0,0,0,0.85)]
        flex flex-col items-center gap-2.5 sm:gap-3
      "
    >
      {/* linha superior: info + modo */}
      <div className="flex items-center justify-between w-full text-[10px] sm:text-xs text-gray-400">
        <span className="truncate">Sala cash • Limite médio</span>
        <span className="whitespace-nowrap ml-2">
          Modo:{" "}
          <span className="text-emerald-400 font-semibold uppercase">
            {mode}
          </span>
        </span>
      </div>

      <div className="w-full h-px bg-white/10" />

      {/* linha principal */}
      <div className="w-full flex items-center justify-between text-xs sm:text-sm md:text-base gap-3">
        {/* TIME A */}
        <div className="flex flex-col items-start gap-1">
          <span className="text-red-400 font-semibold uppercase text-[10px] sm:text-xs">
            Time A
          </span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < teamA.round ? "bg-red-500" : "border border-red-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* MÉTRICAS CENTRAIS */}
        <div className="flex-1 flex items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs md:text-sm">
          <Metric label="Rodada" value={teamA.round} />
          <Metric label="Pontos" value={teamA.points} />
          <Metric label="Tentos" value={teamA.tentos} />
          <Metric label="Jogos" value={teamA.games} />
        </div>

        {/* TIME B */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-sky-400 font-semibold uppercase text-[10px] sm:text-xs">
            Time B
          </span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < teamB.round ? "bg-sky-400" : "border border-sky-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wide">
        {label}
      </span>
      <span className="text-white font-semibold text-xs sm:text-sm md:text-base">
        {value}
      </span>
    </div>
  );
}
