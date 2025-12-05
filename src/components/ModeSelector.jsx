export default function ModeSelector({ modes = [], selected, onChange }) {
  return (
    <div className="flex gap-3 sm:gap-4 overflow-x-auto custom-scrollbar-horizontal py-2 snap-x snap-mandatory">
      {modes.map((mode) => {
        const isActive = selected === mode.name;

        return (
          <button
            key={mode.name}
            type="button"
            onClick={() => onChange(mode.name)}
            className="relative flex-shrink-0 snap-start focus:outline-none group"
          >
            <div
              className={`
                w-[120px] sm:w-[140px] md:w-[150px]
                rounded-2xl overflow-hidden
                transition transform
                bg-black border
                shadow-[0_14px_40px_rgba(0,0,0,0.9)]
                ${
                  isActive
                    ? "border-[#B90007] shadow-[0_0_22px_rgba(185,0,7,0.9)]"
                    : "border-[#262626] group-hover:border-[#B90007]"
                }
              `}
            >
              <div className="relative w-full pb-[115%]">
                <img
                  src={mode.img}
                  alt={mode.name}
                  className="
                    absolute inset-0 w-full h-full
                    object-contain
                    transition-transform duration-300
                    group-hover:scale-[1.05]
                  "
                  draggable={false}
                />

                <div
                  className="
                    absolute inset-x-1 bottom-1
                    bg-black/85 rounded-xl
                    px-2 py-1.5
                    backdrop-blur-[2px]
                  "
                >
                  <p className="text-[11px] sm:text-xs font-semibold leading-snug truncate text-soft-shadow">
                    {mode.name}
                  </p>
                  {isActive ? (
                    <p className="text-[10px] text-[#ff9a9a] uppercase tracking-wide text-soft-shadow">
                      Selecionado
                    </p>
                  ) : (
                    <p className="text-[10px] text-gray-300/85 text-soft-shadow">
                      Clique para escolher
                    </p>
                  )}
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
