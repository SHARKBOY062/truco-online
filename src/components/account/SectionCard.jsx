export default function SectionCard({ title, children }) {
  return (
    <section
      className="
        bg-[#0c0c0c]
        border border-[#1f1f1f]
        rounded-2xl
        px-4 sm:px-5 md:px-7
        py-4 sm:py-5 md:py-7
        mb-6 sm:mb-8
        shadow-[0_18px_40px_rgba(0,0,0,0.6)]
        transition-all duration-200
        hover:shadow-[0_22px_60px_rgba(0,0,0,0.75)]
      "
    >
      {/* Título sem brilho */}
      {title && (
        <div className="flex items-center gap-3 mb-5">
          {/* Barra discreta cinza */}
          <span className="w-1 h-6 rounded-full bg-[#2d2d2d]" />

          <h2 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
            {title}
          </h2>
        </div>
      )}

      {/* Conteúdo */}
      <div>{children}</div>
    </section>
  );
}
