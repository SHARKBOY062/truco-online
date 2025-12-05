export default function CardUnified({
  title,
  subtitle,
  stake,
  image,
  buttonLabel = "Jogar Agora",
  onClick
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex gap-6 items-center shadow hover:border-green-500 transition">

      {/* IMAGEM */}
      <div className="w-28 h-28 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>

      {/* TEXTO */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-1">{title}</h2>

        {subtitle && (
          <p className="text-gray-400 mb-1">{subtitle}</p>
        )}

        {stake && (
          <p className="text-gray-400 mb-2">Stake: R$ {stake}</p>
        )}

        <button
          onClick={onClick}
          className="mt-3 px-5 py-2 bg-green-500 hover:bg-green-400 text-black rounded-lg font-semibold"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
