import { useState } from "react";

export default function StakeSelector({ stakes, value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative select-none">
      
      <div onClick={() => setOpen(v => !v)}
        className="w-full bg-gray-900 border border-gray-700 
        p-3 rounded-lg cursor-pointer text-base flex justify-between items-center">
        <span className="text-gray-300">
          {value ? `R$ ${value}` : "Selecione o valor..."}
        </span>
        <i className="ri-arrow-down-s-line text-xl text-gray-400"></i>
      </div>

      {open && (
        <div className="absolute left-0 right-0 max-h-48 overflow-y-auto
        mt-1 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-40 custom-scrollbar">

          {stakes.map(s => (
            <div key={s}
              onClick={() => { onChange(s); setOpen(false); }}
              className="p-3 hover:bg-gray-800 cursor-pointer text-base text-gray-300">
              R$ {s.toLocaleString("pt-BR")}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
