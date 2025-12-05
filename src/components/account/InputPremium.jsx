export default function InputPremium({
  label,
  value,
  onChange,
  locked = false,
  type = "text",
  icon,
  placeholder,
  helper,
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-[11px] sm:text-sm text-gray-400">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <i
            className={`
              ${icon}
              absolute left-3.5 top-1/2 -translate-y-1/2
              text-gray-500 text-base sm:text-lg
            `}
          />
        )}

        <input
          type={type}
          value={value}
          readOnly={locked}
          placeholder={placeholder}
          onChange={(e) => !locked && onChange && onChange(e.target.value)}
          className={`
            w-full rounded-lg
            bg-[#050505]
            border border-[#262626]
            text-white text-sm
            px-3.5 sm:px-4 py-2.5 sm:py-3
            outline-none
            transition-all duration-200
            placeholder:text-gray-600

            ${locked
              ? "cursor-not-allowed opacity-70"
              : "hover:border-[#3a3a3a] focus:border-[#B90007] focus:shadow-[0_0_18px_rgba(185,0,7,0.85)]"}
            
            ${icon ? "pl-9 sm:pl-10" : ""}
          `}
        />

        {locked && (
          <i className="ri-lock-line absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-base sm:text-lg" />
        )}
      </div>

      {helper && (
        <p className="text-[11px] sm:text-xs text-gray-500 leading-snug">
          {helper}
        </p>
      )}
    </div>
  );
}
