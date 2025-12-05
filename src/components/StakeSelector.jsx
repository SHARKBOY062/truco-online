export default function StakeSelector({ stakes = [], value, onChange }) {
  return (
    <div className="bg-black border border-[#1f1f1f] rounded-xl p-3 sm:p-4">
      <div className="flex flex-wrap gap-2">
        {stakes.map((stake) => {
          const isActive = value === stake;
          return (
            <button
              key={stake}
              type="button"
              onClick={() => onChange(stake)}
              className={`
                px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold
                border transition
                ${
                  isActive
                    ? "bg-[#B90007] text-white border-[#ff6b6b] shadow-[0_0_16px_rgba(185,0,7,0.9)]"
                    : "bg-[#050505] text-gray-200 border-[#262626] hover:border-[#B90007] hover:text-[#ffc4c4]"
                }
              `}
            >
              R$ {stake}
            </button>
          );
        })}
      </div>
    </div>
  );
}
