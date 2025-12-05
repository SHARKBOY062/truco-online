import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code"; // npm install react-qr-code

export default function DepositQR() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [timer, setTimer] = useState(900); // 15 minutos = 900s
  const [status, setStatus] = useState("pending"); 
  // pending | confirming | approved

  const pixCode = `00020101021226880014br.gov.bcb.pix0123SUA-CHAVE-AQUI5204000053039865405100.005802BR5925TRUCO ONLINE6009SAO PAULO62070503***6304ABCD`;

  // TIMER
  useEffect(() => {
    if (timer <= 0) return;
    const t = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  const copyPix = () => {
    navigator.clipboard.writeText(pixCode);
    alert("Código PIX copiado!");
  };

  // Simulação do backend confirmando pagamento
  const simulateCheckPayment = () => {
    setStatus("confirming");
    setTimeout(() => setStatus("approved"), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999] px-4">

      {/* MODAL */}
      <div className="
        bg-[#0F131A] border border-gray-800 rounded-xl 
        w-full max-w-lg p-6 shadow-xl relative
      ">
        {/* BOTÃO FECHAR */}
        <button
          onClick={() => navigate(-1)}
          className="absolute right-4 top-4 text-gray-400 hover:text-white text-xl"
        >
          <i className="ri-close-line"></i>
        </button>

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-center mb-2">Pague com Pix</h2>

        {/* STATUS */}
        <p className="text-center text-sm text-gray-400 mb-4">
          {status === "pending" && "Aguardando pagamento..."}
          {status === "confirming" && "Confirmando pagamento..."}
          {status === "approved" && "Pagamento aprovado!"}
        </p>

        {/* TIMER */}
        <p className="text-center text-green-400 font-semibold text-lg mb-6">
          {minutes}:{seconds}
        </p>

        {/* QR CODE */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-3 rounded-lg">
            <QRCode value={pixCode} size={180} />
          </div>
        </div>

        {/* COPIAR CÓDIGO PIX */}
        <div className="bg-[#111820] border border-gray-700 rounded-lg p-3 mb-4">
          <p className="text-gray-400 text-xs">Código Pix Copia e Cola:</p>
          <p className="text-white text-sm break-all mt-1">{pixCode}</p>

          <button
            onClick={copyPix}
            className="
              mt-3 w-full py-2 rounded-lg bg-green-500 hover:bg-green-400 
              text-black font-bold transition
            "
          >
            Copiar código
          </button>
        </div>

        {/* BOTÕES INFERIORES */}
        {status !== "approved" ? (
          <div className="flex justify-between mt-5">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
            >
              Voltar
            </button>

            <button
              onClick={simulateCheckPayment}
              className="px-6 py-3 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400 transition"
            >
              Já paguei
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/wallet/balance")}
            className="mt-6 w-full py-3 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400 transition"
          >
            Ver saldo
          </button>
        )}
      </div>
    </div>
  );
}
