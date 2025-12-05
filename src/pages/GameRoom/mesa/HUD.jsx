// src/pages/GameRoom/mesa/HUD.jsx

export default function HUD() {
  return (
    <div
      className="
        bg-[#082c73]
        rounded-[18px]
        px-5 py-3
        flex items-center
        text-white
        shadow-[0_16px_40px_rgba(0,0,0,0.7)]
        min-w-[230px]
      "
    >
      {/* Bloco "Valendo 1 ponto" */}
      <div className="flex flex-col justify-center mr-6">
        <span className="text-[10px] tracking-[0.16em] uppercase opacity-80">
          Valendo
        </span>

        <div className="flex items-baseline gap-1 mt-0.5">
          <span className="text-3xl font-bold leading-none">1</span>
          <span className="text-[10px] mt-2 opacity-80">ponto</span>
        </div>
      </div>

      {/* Divisor */}
      <div className="w-px h-12 bg-white/20 mr-5" />

      {/* Rodadas + bolinhas */}
      <div className="flex flex-col gap-1 mr-6">
        <span className="text-[11px] font-semibold">Rodadas</span>

        <div className="flex gap-1.5">
          {/* 6 bolinhas coloridas (pode adaptar depois) */}
          {["#16a34a", "#16a34a", "#16a34a", "#eab308", "#ef4444", "#6b7280"].map(
            (color, i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
            )
          )}
        </div>
      </div>

      {/* Pontos times */}
      <div className="flex flex-col gap-0.5 text-[10px]">
        <span className="text-red-400">
          ● <span className="font-semibold">0</span> pontos
        </span>
        <span className="text-sky-400">
          ● <span className="font-semibold">0</span> pontos
        </span>
      </div>
    </div>
  );
}
