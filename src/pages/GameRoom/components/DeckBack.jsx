export default function DeckBack() {
  return (
    <div
      className="
        w-[70px] h-[105px] md:w-[82px] md:h-[122px]
        rounded-xl border border-[#0b1120]
        bg-[#020617]
        shadow-[0_10px_22px_rgba(0,0,0,0.8)]
        overflow-hidden
        flex items-center justify-center
        select-none
      "
    >
      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_25%_20%,#22c55e_0,transparent_55%),radial-gradient(circle_at_75%_80%,#22c55e_0,transparent_55%)]" />
      <div className="absolute inset-[5px] rounded-lg border border-[#22c55e66]" />
      <span className="relative z-10 text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase text-emerald-400">
        Truco
      </span>
    </div>
  );
}
