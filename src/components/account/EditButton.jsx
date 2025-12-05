export default function EditButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex items-center gap-2
        px-3.5 py-1.5
        bg-[#050505]
        border border-[#262626]
        text-gray-200
        rounded-lg
        text-xs sm:text-sm font-semibold
        shadow-[0_6px_18px_rgba(0,0,0,0.6)]
        transition-all duration-200
        hover:bg-[#B90007]
        hover:border-[#B90007]
        hover:text-white
        hover:shadow-[0_0_18px_rgba(185,0,7,0.8)]
        active:scale-95
      "
    >
      <i className="ri-edit-2-line text-sm sm:text-base" />
      <span>Editar</span>
    </button>
  );
}
