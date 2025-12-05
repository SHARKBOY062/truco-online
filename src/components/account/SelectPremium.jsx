import { useState, useRef, useEffect } from "react";

export default function SelectPremium({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Selecione..."
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

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
    <div className="relative" ref={ref}>
      {label && <p className="text-gray-400 mb-1 text-sm">{label}</p>}

      <button
        onClick={() => setOpen(!open)}
        className="
          w-full bg-[#151A22] border border-gray-700 
          py-3 px-4 rounded-lg text-left text-white
          hover:border-gray-600 focus:border-green-500 transition-all flex justify-between items-center
        "
      >
        <span className={`${!value ? "text-gray-500" : ""}`}>
          {value || placeholder}
        </span>

        <i
          className={`ri-arrow-down-s-line text-lg transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="
          absolute w-full bg-[#1A1F27] border border-gray-700 rounded-lg mt-2 
          max-h-56 overflow-y-auto shadow-xl z-40 animate-fade
        ">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className="
                px-4 py-3 hover:bg-[#222832] cursor-pointer text-gray-200
              "
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
