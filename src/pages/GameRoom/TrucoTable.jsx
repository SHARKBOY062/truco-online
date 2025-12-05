export default function TrucoTable({ players = [], mode = "1x1" }) {
  const seatPositions = {
    "1x1": [
      { x: 0, y: -180 },  // oponente
      { x: 0, y: 180 },   // você
    ],
    "2x2": [
      { x: 0, y: -180 },  // adversário 1
      { x: 180, y: 0 },   // parceiro
      { x: 0, y: 180 },   // você
      { x: -180, y: 0 },  // adversário 2
    ],
  };

  const positions = seatPositions[mode];

  return (
    <div className="relative w-[550px] h-[550px] flex items-center justify-center">

      {/* ————— MESA PRINCIPAL ————— */}
      <div
        className="
          absolute w-[520px] h-[520px]
          bg-gradient-to-b from-green-700 to-green-800
          rounded-full shadow-[0_0_50px_rgba(0,0,0,0.6)]
          border-[12px] border-[#3b2918]
          flex items-center justify-center
        "
      >

        {/* Glow interno */}
        <div
          className="
            absolute inset-0 rounded-full
            shadow-[inset_0_0_60px_rgba(0,0,0,0.45)]
          "
        />

        {/* Texto TRUCO estilizado */}
        <span className="absolute text-white/30 text-4xl font-extrabold tracking-widest select-none">
          TRUCO
        </span>
      </div>

      {/* ————— POSIÇÕES DOS JOGADORES ————— */}
      {positions.map((pos, index) => (
        <div
          key={index}
          className="absolute flex flex-col items-center"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px)`,
          }}
        >
          {/* Avatar */}
          <div
            className="
              w-20 h-20 rounded-full bg-[#1a1f24]
              border-4 border-gray-700
              shadow-[0_0_15px_rgba(0,0,0,0.5)]
              overflow-hidden
            "
          >
            <img
              src={players[index]?.avatar ?? "/avatar-default.png"}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Nome */}
          <p className="text-gray-200 mt-2 text-sm font-semibold">
            {players[index]?.name ?? "Aguardando..."}
          </p>

          {/* Status */}
          <p className="text-xs text-green-400">
            {players[index]?.status ?? ""}
          </p>
        </div>
      ))}

      {/* ————— CARTAS CENTRAIS (placeholder) ————— */}
      <div className="absolute flex gap-3">
        <div className="w-16 h-24 bg-white rounded-md shadow-lg" />
        <div className="w-16 h-24 bg-white rounded-md shadow-lg" />
      </div>

    </div>
  );
}
