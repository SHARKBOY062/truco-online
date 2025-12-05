import { useRef } from "react";

export default function UploadPremium({
  label,
  description = "Arraste um arquivo ou clique para selecionar.",
  fileName,
  onChange,
  accept,
}) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange && onChange(file);
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <p className="text-gray-400 text-[11px] sm:text-sm mb-0">{label}</p>
      )}

      <div
        onClick={handleClick}
        className="
          group
          relative
          flex flex-col items-center justify-center
          w-full
          rounded-xl
          border border-dashed border-[#333333]
          bg-[#050505]
          px-4 py-5 sm:px-5 sm:py-6
          cursor-pointer
          transition-all duration-200
          hover:border-[#B90007]
          hover:shadow-[0_0_22px_rgba(185,0,7,0.9)]
        "
      >
        <div
          className="
            w-11 h-11 sm:w-12 sm:h-12
            rounded-full
            flex items-center justify-center
            bg-[#0b0b0b]
            border border-[#262626]
            mb-3 sm:mb-4
            group-hover:bg-[#B90007]
            group-hover:border-[#B90007]
            transition-all
          "
        >
          <i className="ri-upload-2-line text-xl text-gray-300 group-hover:text-white" />
        </div>

        <p className="text-xs sm:text-sm text-gray-200 font-medium">
          Clique para enviar
        </p>
        <p className="text-[11px] sm:text-xs text-gray-500 text-center mt-1">
          {description}
        </p>

        {fileName && (
          <p className="mt-3 text-[11px] sm:text-xs text-gray-300 truncate max-w-full">
            <span className="text-gray-500 mr-1">Arquivo:</span>
            {fileName}
          </p>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
