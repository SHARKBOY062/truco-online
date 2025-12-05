export default function SeatTable({ seats = 4 }) {
  return (
    <div className="relative w-[450px] h-[450px] bg-[#111] rounded-full border-4 border-green-600 shadow-[0_0_40px_rgba(0,255,100,0.4)] flex items-center justify-center">

      <p className="text-gray-300 text-xl font-semibold absolute">
        Mesa Disponível
      </p>

      {[...Array(seats)].map((_, i) => {
        const angle = (i / seats) * 2 * Math.PI;
        const x = 180 * Math.cos(angle);
        const y = 180 * Math.sin(angle);

        return (
          <button
            key={i}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            className="
              absolute w-20 h-20 rounded-full bg-[#1a1f26]
              border-2 border-gray-600 hover:border-green-400 hover:scale-110
              flex items-center justify-center text-gray-300 transition
            "
          >
            Assento {i + 1}
          </button>
        );
      })}
    </div>
  );
}
