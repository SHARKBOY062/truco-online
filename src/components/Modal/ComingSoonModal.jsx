export default function ComingSoonModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        bg-black/70 backdrop-blur-sm
        flex items-center justify-center
        px-4
      "
    >
      {/* CONTAINER */}
      <div
        className="
          relative w-full max-w-md
          rounded-2xl
          bg-[#050505]
          border border-[#262626]
          shadow-[0_24px_80px_rgba(0,0,0,1)]
          px-5 sm:px-7 py-6 sm:py-7
          text-center
          animate-fade-in
          overflow-hidden
        "
      >
        {/* GLOW VINHO NO TOPO */}
        <div className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-gradient-to-b from-[#B90007]/40 via-transparent to-transparent" />

        {/* BOTÃO FECHAR (CANTO) */}
        <button
          onClick={onClose}
          className="
            absolute right-3.5 top-3.5
            text-gray-500 hover:text-gray-200
            text-xl
            transition-colors
          "
          aria-label="Fechar aviso"
        >
          <i className="ri-close-line" />
        </button>

        {/* ÍCONE PRINCIPAL */}
        <div className="relative flex justify-center mb-4 sm:mb-5">
          <div
            className="
              w-14 h-14 sm:w-16 sm:h-16
              rounded-full
              flex items-center justify-center
              bg-[#0b0b0b]
              border border-[#3a3a3a]
              shadow-[0_0_22px_rgba(185,0,7,0.7)]
            "
          >
            <i className="ri-vip-crown-2-line text-3xl text-[#B90007]" />
          </div>
        </div>

        {/* TÍTULO */}
        <h2 className="relative text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
          Em Breve
        </h2>

        {/* SUBTÍTULO LEVE */}
        <p className="relative text-[11px] sm:text-xs text-gray-400 mb-1 uppercase tracking-[0.18em]">
          Recurso em construção
        </p>

        {/* TEXTO */}
        <p className="relative text-sm sm:text-base text-gray-300 leading-relaxed mt-2 mb-5 sm:mb-6 px-1">
          O recurso{" "}
          <span className="text-[#B90007] font-semibold">
            Indique &amp; Ganhe
          </span>{" "}
          está quase pronto. Estamos finalizando os últimos detalhes para
          entregar uma experiência de indicação realmente premiada.
        </p>

        {/* BOTÃO PRINCIPAL */}
        <button
          onClick={onClose}
          className="
            relative
            w-full
            bg-[#B90007]
            hover:bg-[#e01515]
            text-white
            font-bold
            py-2.5 sm:py-3
            rounded-full
            text-sm sm:text-base
            shadow-[0_0_18px_rgba(185,0,7,0.9)]
            hover:shadow-[0_0_26px_rgba(185,0,7,1)]
            transition-all
            active:scale-95
          "
        >
          Entendi, voltar para o jogo
        </button>

        {/* FOOTER PEQUENO */}
        <p className="relative mt-3 text-[11px] sm:text-xs text-gray-500">
          Você será um dos primeiros a saber quando essa função estiver ativa.
        </p>
      </div>
    </div>
  );
}
