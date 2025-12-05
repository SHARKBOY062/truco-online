// src/components/ModeSelector.jsx
import React, { useRef } from "react";

export default function ModeSelector({ modes = [], selected, onChange }) {
  const rowRef = useRef(null);

  const scrollRow = (direction = "right") => {
    const el = rowRef.current;
    if (!el) return;
    const first = el.querySelector("button");
    const baseWidth = first?.clientWidth || 220;
    const delta = direction === "left" ? -baseWidth : baseWidth;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const handleSelect = (name) => {
    onChange?.(name);
  };

  return (
    <div className="relative">
      {/* SETAS – só desktop/tablet */}
      <button
        type="button"
        className="
          hidden md:flex items-center justify-center
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          w-7 h-7 rounded-full bg-black/80 border border-white/10
          hover:border-[#B90007] hover:bg-black
        "
        onClick={() => scrollRow("left")}
        aria-label="Anterior"
      >
        <i className="ri-arrow-left-s-line text-sm" />
      </button>

      <button
        type="button"
        className="
          hidden md:flex items-center justify-center
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          w-7 h-7 rounded-full bg-black/80 border border-white/10
          hover:border-[#B90007] hover:bg-black
        "
        onClick={() => scrollRow("right")}
        aria-label="Próximo"
      >
        <i className="ri-arrow-right-s-line text-sm" />
      </button>

      {/* LINHA SCROLLÁVEL */}
      <div
        ref={rowRef}
        className="
          flex gap-3 sm:gap-4
          overflow-x-auto scrollbar-hide custom-scrollbar-horizontal
          py-2
        "
      >
        {modes.map((m) => {
          const active = selected === m.name;

          return (
            <button
              key={m.name}
              type="button"
              onClick={() => handleSelect(m.name)}
              className="relative flex-shrink-0 group focus:outline-none"
            >
              <div className="w-[140px] sm:w-[155px] md:w-[170px]">
                <div className="relative w-full h-40 sm:h-44 md:h-48 rounded-2xl overflow-hidden card-particles bg-[#050505]">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="
                      w-full h-full object-cover rounded-2xl
                      transition-transform duration-300
                      group-hover:scale-[1.05]
                    "
                    draggable={false}
                  />

                  <div
                    className={`
                      absolute inset-0 rounded-2xl border
                      ${
                        active
                          ? "border-[#B90007]/90 shadow-[0_0_16px_rgba(185,0,7,0.9)]"
                          : "border-white/5 group-hover:border-[#B90007]/80"
                      }
                      transition-colors duration-300
                    `}
                  />

                  <div
                    className="
                      absolute inset-x-0 bottom-0 p-2
                      bg-gradient-to-t from-black/90 via-black/70 to-transparent
                    "
                  >
                    <p className="text-[11px] sm:text-xs font-semibold text-center text-soft-shadow">
                      {m.name}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-1 text-[10px] sm:text-[11px] text-gray-500">
        Arraste para o lado para ver todos os estilos.
      </p>
    </div>
  );
}
