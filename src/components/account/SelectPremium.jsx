import { useState, useRef, useEffect } from "react";

export default function SelectPremium({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Selecione...",
  helper,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, []);

  return (
    <div className="relative space-y-1.5" ref={ref}>
      {label && (
        <p className="text-gray-400 mb-0 text-[11px] sm:text-sm">{label}</p>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="
          w-full bg-[#050505] border border-[#262626] 
          py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-lg
          text-left text-sm text-white
          hover:border-[#3a3a3a] focus:border-[#B90007]
          focus:shadow-[0_0_16px_rgba(185,0,7,0.8)]
          transition-all duration-200
          flex justify-between items-center
        "
      >
        <span className={!value ? "text-gray-500" : ""}>
          {value || placeholder}
        </span>

        <i
          className={`
            ri-arrow-down-s-line text-lg text-gray-400
            transition-transform duration-200
            ${open ? "rotate-180 text-gray-200" : ""}
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute w-full mt-2
            bg-[#050505]
            border border-[#262626]
            rounded-xl
            max-h-56 overflow-y-auto
            shadow-[0_22px_70px_rgba(0,0,0,0.95)]
            z-40
            animate-fade-in
          "
        >
          {options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              className={`
                w-full text-left px-4 py-2.5 text-sm
                text-gray-200
                hover:bg-[#101010]
                transition-colors
                ${opt === value ? "bg-[#101010]" : ""}
              `}
              onClick={() => {
                onChange && onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}

          {options.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              Nenhuma opção disponível.
            </div>
          )}
        </div>
      )}

      {helper && (
        <p className="text-[11px] sm:text-xs text-gray-500 leading-snug">
          {helper}
        </p>
      )}
    </div>
  );
}
