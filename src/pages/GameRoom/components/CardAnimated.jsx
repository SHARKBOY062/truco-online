import { useState } from "react";

export default function CardAnimated({ value }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="w-20 h-28 cursor-pointer relative flip-card"
      style={{ perspective: "1000px" }}
    >
      <div className={`w-full h-full absolute flip-card ${flipped ? "flipped" : ""}`}>

        {/* FRENTE */}
        <div className="card-front absolute inset-0 bg-white text-black rounded-xl shadow-xl flex justify-center items-center text-3xl font-bold">
          {value}
        </div>

        {/* VERSO */}
        <div className="card-back absolute inset-0 bg-[#0a0f15] rounded-xl border border-gray-600 shadow-xl flex items-center justify-center text-lg text-gray-300">
          🂠
        </div>
      </div>
    </div>
  );
}
