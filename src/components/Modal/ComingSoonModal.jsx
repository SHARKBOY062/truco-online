export default function ComingSoonModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="
      fixed inset-0 bg-black/70 backdrop-blur-sm
      flex items-center justify-center z-[9999]
    ">
      <div className="
        bg-[#111820] border border-gray-700 
        rounded-2xl p-8 max-w-md w-full text-center
        shadow-[0_0_25px_rgba(0,255,150,0.15)]
        animate-fade-in
      ">
        
        <i className="ri-tools-fill text-5xl text-green-400 mb-4"></i>

        <h2 className="text-2xl font-bold mb-3">
          Função em Construção
        </h2>

        <p className="text-gray-300 leading-relaxed mb-6">
          O recurso <span className="text-green-400 font-semibold">Indique & Ganhe</span> 
          estará disponível em breve!  
          Nossa equipe está finalizando os últimos detalhes para oferecer a melhor experiência.
        </p>

        <button
          onClick={onClose}
          className="
            bg-green-500 hover:bg-green-400 transition
            text-black font-bold px-6 py-3 rounded-full
          "
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
