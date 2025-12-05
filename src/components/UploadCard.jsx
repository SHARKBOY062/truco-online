export default function UploadCard({ title, status, onUpload }) {
  const statusColor =
    status === "aprovado"
      ? "text-green-400"
      : status === "pendente"
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="bg-[#0F131A] border border-gray-800 rounded-xl p-5 w-full">
      <div className="flex justify-between mb-3">
        <h3 className="text-gray-200 font-medium">{title}</h3>
        <span className={statusColor + " text-sm capitalize"}>{status}</span>
      </div>

      <label
        className="
        w-full h-40 flex flex-col justify-center items-center
        border border-dashed border-gray-700 rounded-xl
        hover:border-green-500 hover:bg-white/5 transition cursor-pointer
      "
      >
        <i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-2"></i>
        <p className="text-gray-400 text-sm">Clique para enviar arquivo</p>
        <input type="file" className="hidden" onChange={onUpload} />
      </label>
    </div>
  );
}
