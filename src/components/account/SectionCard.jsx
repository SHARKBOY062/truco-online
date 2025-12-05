export default function SectionCard({ title, children }) {
  return (
    <section
      className="
        bg-[#050505]
        border border-[#262626]
        rounded-2xl
        px-4 sm:px-5 md:px-7
        py-4 sm:py-5 md:py-7
        mb-6 sm:mb-8
        shadow-[0_18px_60px_rgba(0,0,0,0.95)]
        relative overflow-hidden
        transition-all duration-200
        hover:shadow-[0_26px_80px_rgba(0,0,0,1)]
      "
    >
      {/* brilho sutil no topo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#B90007]/10 via-transparent to-transparent" />

      {title && (
        <div className="relative flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <span className="w-1 h-6 sm:h-7 rounded-full bg-[#B90007] shadow-[0_0_14px_rgba(185,0,7,0.9)]" />
          <h2 className="text-lg sm:text-xl font-semibold tracking-wide">
            {title}
          </h2>
        </div>
      )}

      <div className="relative">{children}</div>
    </section>
  );
}
