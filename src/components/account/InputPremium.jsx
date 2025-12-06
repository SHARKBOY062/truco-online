export default function InputPremium({
  label,
  value,
  onChange,
  onBlur, // ← SUPORTE AO onBlur (necessário para o CEP funcionar)
  locked = false,
  type = "text",
  icon,
  placeholder,
  helper,
}) {
  return (
    <div className="space-y-1.5">

      {/* LABEL */}
      {label && (
        <label className="block text-[11px] sm:text-sm text-gray-400">
          {label}
        </label>
      )}

      {/* INPUT WRAPPER */}
      <div className="relative">

        {/* ÍCONE ESQUERDO */}
        {icon && (
          <i
            className={`
              ${icon}
              absolute left-3.5 top-1/2 -translate-y-1/2
              text-gray-500 text-base sm:text-lg
            `}
          />
        )}

        {/* INPUT */}
        <input
          type={type}
          value={value}
          readOnly={locked}
          placeholder={placeholder}
          onChange={(e) => !locked && onChange?.(e.target.value)}
          onBlur={onBlur}  // ← AGORA FUNCIONA!
          className={`
            w-full rounded-lg
            bg-[#0E0E0E]
            border border-[#1f1f1f]
            text-white text-sm
            px-3.5 sm:px-4 py-2.5 sm:py-3
            outline-none
            transition-colors duration-200
            placeholder:text-gray-600

            ${locked
              ? "cursor-not-allowed opacity-70"
              : "hover:border-[#2a2a2a] focus:border-[#3a3a3a]"}

            ${icon ? "pl-9 sm:pl-10" : ""}
          `}
        />

        {/* ÍCONE DE CADEADO */}
        {locked && (
          <i className="
            ri-lock-line
            absolute right-3.5 top-1/2 -translate-y-1/2
            text-gray-500 text-base sm:text-lg
          " />
        )}
      </div>

      {/* TEXTO DE AJUDA */}
      {helper && (
        <p className="text-[11px] sm:text-xs text-gray-500 leading-snug">
          {helper}
        </p>
      )}
    </div>
  );
}
