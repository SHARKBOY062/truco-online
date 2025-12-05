export default function Confetti() {
  const pieces = Array.from({ length: 40 });

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {pieces.map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-400 opacity-80"
          style={{
            left: Math.random() * 100 + "%",
            animation: `confetti-fall ${2 + Math.random() * 2}s linear forwards`,
            animationDelay: Math.random() * 1 + "s",
          }}
        ></div>
      ))}
    </div>
  );
}