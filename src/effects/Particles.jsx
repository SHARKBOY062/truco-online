export default function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]">
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="
            absolute w-2 h-2 bg-green-400 rounded-full animate-ping
          "
          style={{
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
            animationDelay: `${Math.random()}s`,
          }}
        />
      ))}
    </div>
  );
}
