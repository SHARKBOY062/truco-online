export default function PopupPixSuccess({ amount, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[99999] px-4">
      <div className="
        w-full max-w-md bg-[#050505]
        border border-[#262626]
        rounded-2xl p-6
        text-center
        shadow-[0_0_80px_rgba(185,0,7,0.6)]
        animate-fadeIn
      ">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center">
            <i className="ri-check-line text-4xl text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">
          Pagamento confirmado!
        </h2>

        <p className="text-gray-400 text-sm mb-4">
          Seu depósito foi processado com sucesso.
        </p>

        <div className="bg-[#090909] border border-[#262626] rounded-lg py-3 mb-4">
          <p className="text-sm text-gray-400">Valor creditado</p>
          <p className="text-2xl font-bold text-green-400">
            R$ {Number(amount).toFixed(2)}
          </p>
        </div>

        <button
          onClick={onClose}
          className="
            w-full bg-[#B90007]
            hover:bg-[#e01515]
            text-white font-bold
            py-3 rounded-lg
            shadow-[0_0_20px_rgba(185,0,7,0.8)]
          "
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
