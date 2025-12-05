export default function EditField({
  label,
  value,
  onEdit,
  type = "text",
  subtle = false,
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-[11px] sm:text-sm text-gray-400">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          value={value}
          readOnly
          className={`
            w-full rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm
            bg-[#050505] border border-[#262626]
            text-gray-200/90 cursor-not-allowed
            outline-none select-none
            ${subtle ? "" : "shadow-[0_8px_30px_rgba(0,0,0,0.8)]"}
          `}
        />

        <button
          type="button"
          onClick={onEdit}
          className="
            absolute right-2.5 top-1/2 -translate-y-1/2
            inline-flex items-center gap-1.5
            px-2.5 py-1
            rounded-full
            bg-[#0b0b0b]
            border border-[#333333]
            text-[11px] sm:text-xs text-gray-200
            hover:bg-[#B90007]
            hover:border-[#B90007]
            hover:text-white
            shadow-[0_0_0_rgba(0,0,0,0)]
            hover:shadow-[0_0_14px_rgba(185,0,7,0.8)]
            transition-all duration-200
            active:scale-95
          "
        >
          <i className="ri-edit-line text-xs" />
          <span>Editar</span>
        </button>
      </div>
    </div>
  );
}
