export default function EditField({ label, value, onEdit, type = "text" }) {
  return (
    <div>
      <label className="block text-gray-400 mb-1 text-sm">{label}</label>

      <div className="relative">
        <input
          type={type}
          value={value}
          readOnly
          className="
            w-full bg-[#151A22] border border-gray-700 rounded-lg px-4 py-3 
            text-white opacity-80 cursor-not-allowed
          "
        />

        <button
          className="
            absolute right-3 top-2.5 text-blue-400 hover:text-blue-300 
            transition text-sm font-medium
          "
          onClick={onEdit}
        >
          Editar
        </button>
      </div>
    </div>
  );
}
