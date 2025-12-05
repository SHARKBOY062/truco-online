// src/pages/GameRoom/mesa/AvatarChip.jsx

export default function AvatarChip() {
  return (
    <div
      className="
        w-[82px] h-[82px]
        rounded-full
        bg-[radial-gradient(circle_at_30%_20%,#fefce8_0,#facc15_35%,#b45309_100%)]
        shadow-[0_0_25px_rgba(0,0,0,0.85)]
        border border-yellow-300/70
        flex items-center justify-center
      "
    >
      <div
        className="
          w-[56px] h-[56px]
          rounded-full
          bg-[radial-gradient(circle_at_30%_20%,#4c1d95,#1e1038)]
          flex flex-col items-center justify-center
          text-white
        "
      >
        <div className="w-6 h-6 rounded-full bg-purple-300 mb-1" />
        <div className="w-8 h-3 rounded-full bg-purple-300 mt-[-4px]" />
      </div>
    </div>
  );
}
