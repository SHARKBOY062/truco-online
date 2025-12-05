import { useEffect, useState } from "react";

export default function ParticlesWin({ trigger }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!trigger) return;

    const arr = Array.from({ length: 18 }).map(() => ({
      id: Math.random(),
      x: Math.random() * 200 - 100,
      y: Math.random() * 60 - 30,
      s: Math.random() * 0.6 + 0.4,
      r: Math.random() * 360,
    }));

    setParticles(arr);

    setTimeout(() => setParticles([]), 1200);
  }, [trigger]);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-4 h-4 bg-green-400 rounded-full opacity-80"
          style={{
            transform: `translate(${p.x}px, ${p.y}px) scale(${p.s}) rotate(${p.r}deg)`,
            animation: "confetti-fall 1.2s ease-out forwards",
          }}
        />
      ))}
    </div>
  );
}
