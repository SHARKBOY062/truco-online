export default function InputPremium({
  label,
  value,
  onChange,
  locked = false,
  type = "text",
  icon
}) {
  return (
    <div className="relative">
      {/* LABEL */}
      <label className="block text-gray-400 mb-1 text-sm">{label}</label>

      <div className="relative">
        {icon && (
          <i className={`${icon} absolute left-3 top-3 text-gray-500 text-lg`} />
        )}

        <input
          type={type}
          value={value}
          readOnly={locked}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full bg-[#151A22] border px-4 py-3 rounded-lg outline-none text-white 
            transition-all duration-200 

            ${locked ? "border-gray-700 cursor-not-allowed opacity-70" : "border-gray-700 focus:border-green-500 hover:border-gray-600"}

            ${icon ? "pl-10" : ""}
          `}
        />

        {locked && (
          <i className="ri-lock-line absolute right-3 top-3 text-gray-500 text-lg" />
        )}
      </div>
    </div>
  );
}
