export default function UploadPremium({ label, file, onChange }) {
  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (selected) onChange(selected);
  };

  return (
    <div className="flex flex-col">
      <p className="text-gray-300 text-sm mb-2">{label}</p>

      <label
        className="
          flex items-center justify-between 
          w-full px-4 py-3 rounded-xl cursor-pointer
          bg-[#111418] border border-gray-700
          hover:border-green-500 transition
        "
      >
        <span className="text-gray-400 text-sm">
          {file ? file.name : "Selecione um arquivo..."}
        </span>

        <div
          className="
            bg-green-600 text-black px-3 py-1 rounded-lg text-sm font-bold
            hover:bg-green-500 transition
          "
        >
          Upload
        </div>

        <input
          type="file"
          accept="image/*,application/pdf"
          className="hidden"
          onChange={handleFile}
        />
      </label>
    </div>
  );
}
