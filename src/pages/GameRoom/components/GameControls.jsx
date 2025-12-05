export default function GameControls({ mode, setMode }) {
  return (
    <div className="bg-[#111820] p-6 rounded-xl border border-gray-800 shadow-xl flex items-center gap-4 flex-wrap">

      {/* Modo de jogo */}
      <div className="flex items-center gap-3">
        <button
          className={`
            px-5 py-2 rounded-full font-bold
            ${mode === "1x1" ? "bg-green-500 text-black" : "bg-gray-700 text-gray-300"}
          `}
          onClick={() => setMode("1x1")}
        >
          1 x 1
        </button>

        <button
          className={`
            px-5 py-2 rounded-full font-bold
            ${mode === "2x2" ? "bg-green-500 text-black" : "bg-gray-700 text-gray-300"}
          `}
          onClick={() => setMode("2x2")}
        >
          2 x 2
        </button>
      </div>

      {/* Entrada */}
      <div className="flex items-center gap-3 ml-auto flex-wrap">

        <input
          type="number"
          placeholder="R$"
          className="
            w-28 px-4 py-2 bg-[#0F131A] border border-gray-700 rounded-xl 
            outline-none focus:border-green-500 text-white
          "
        />

        <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 hover:border-green-500">
          ½
        </button>

        <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 hover:border-green-500">
          2x
        </button>

        <button className="bg-green-500 text-black font-bold px-6 py-2 rounded-xl hover:bg-green-400 transition">
          Entrar na Mesa
        </button>
      </div>
    </div>
  );
}
