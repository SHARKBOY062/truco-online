export default function EditButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-2
        px-3 py-1.5
        bg-[#13171f]
        border border-gray-700
        hover:border-green-500 hover:bg-green-500
        text-gray-300 hover:text-black
        transition-all
        rounded-lg shadow-sm
        text-sm font-semibold
      "
    >
      <i className="ri-edit-2-line text-base"></i>
      Editar
    </button>
  );
}
