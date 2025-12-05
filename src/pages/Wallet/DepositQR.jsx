import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";

export default function DepositQR() {
  const navigate = useNavigate();
  const { id } = useParams(); // se precisar futuramente

  const [timer, setTimer] = useState(900);
  const [status, setStatus] = useState("pending"); // pending | confirming | approved

  const pixCode =
    "00020101021226880014br.gov.bcb.pix0123SUA-CHAVE-AQUI5204000053039865405100.005802BR5925TRUCO ONLINE6009SAO PAULO62070503***6304ABCD";

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

  const simulateCheckPayment = () => {
    setStatus("confirming");
    setTimeout(() => setStatus("approved"), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[9999] px-4">
      <div
        className="
          bg-[#050505] border border-[#262626] rounded-2xl 
          w-full max-w-lg p-6 shadow-[0_30px_100px_rgba(0,0,0,0.95)] relative
        "
      >
        {/* BOTÃO FECHAR */}
        <button
          onClick={() => navigate(-1)}
          className="absolute right-4 top-4 text-gray-400 hover:text-white text-xl"
        >
          <i className="ri-close-line" />
        </button>

        {/* HEADER */}
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">
          Pague com Pix
        </h2>

        {/* STATUS */}
        <p className="text-center text-sm text-gray-400 mb-3">
          {status === "pending" && "Aguardando pagamento..."}
          {status === "confirming" && "Confirmando pagamento..."}
          {status === "approved" && "Pagamento aprovado!"}
        </p>

        {/* TIMER */}
        <p
          className="
            text-center text-[#B90007] font-extrabold text-lg sm:text-xl mb-5
            drop-shadow-[0_0_18px_rgba(185,0,7,0.9)]
          "
        >
          {minutes}:{seconds}
        </p>

        {/* QR CODE */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-3 rounded-lg shadow-[0_18px_40px_rgba(0,0,0,0.8)]">
            <QRCode value={pixCode} size={180} />
          </div>
        </div>

        {/* COPIAR CÓDIGO PIX */}
        <div className="bg-[#090909] border border-[#262626] rounded-lg p-3 mb-4">
          <p className="text-gray-400 text-xs">Código Pix Copia e Cola:</p>
          <p className="text-white text-xs sm:text-sm break-all mt-1">
            {pixCode}
          </p>

          <button
            onClick={copyPix}
            className="
              mt-3 w-full py-2 rounded-lg bg-[#B90007] hover:bg-[#e01515]
              text-white font-bold text-sm
              shadow-[0_0_18px_rgba(185,0,7,0.9)]
            "
          >
            Copiar código
          </button>
        </div>

        {/* BOTÕES INFERIORES */}
        {status !== "approved" ? (
          <div className="flex justify-between gap-3 mt-5">
            <button
              onClick={() => navigate(-1)}
              className="
                flex-1 px-4 py-3 rounded-lg border border-[#3b3b3b]
                text-gray-300 hover:bg-[#151515] text-sm
              "
            >
              Voltar
            </button>

            <button
              onClick={simulateCheckPayment}
              className="
                flex-1 px-4 py-3 rounded-lg bg-[#B90007] text-white font-bold 
                hover:bg-[#e01515] text-sm
                shadow-[0_0_18px_rgba(185,0,7,0.9)]
              "
            >
              Já paguei
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/wallet/balance")}
            className="
              mt-6 w-full py-3 rounded-lg bg-[#B90007] text-white font-bold 
              hover:bg-[#e01515] text-sm
              shadow-[0_0_22px_rgba(185,0,7,1)]
            "
          >
            Ver saldo
          </button>
        )}
      </div>
    </div>
  );
}
