import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

export default function Deposit() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [pixCode, setPixCode] = useState("");
  const [timer, setTimer] = useState(900); // 15 min
  const [status, setStatus] = useState("pending"); 
  // pending | confirming | approved

  const recommendedMethods = [{ name: "Pix", icon: "ri-qr-code-line" }];
  const otherMethods = [
    { name: "Pix", icon: "ri-qr-code-line" },
    { name: "Pix", icon: "ri-qr-code-line" },
    { name: "VPag Direct", icon: "ri-bank-card-line" },
  ];

  const quickValues = [120, 240, 600];

  // TIMER DO PIX
  useEffect(() => {
    if (step !== 3 || timer <= 0) return;
    const t = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [step, timer]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  function generateFakePix() {
    return `000201010212BR.GOV.BCB.PIX0136FAKE-PIX-CODE-EXAMPLE5204000053039865405${amount}5802BR5925TRUCO ONLINE6009SAO PAULO62070503***6304ABCD`;
  }

  function handleDeposit() {
    if (!cpf || !name || !surname || !amount) {
      alert("Preencha todas as informações.");
      return;
    }

    // Aqui futuramente: chamada API PIX
    setPixCode(generateFakePix());
    setStep(3); // IR PARA TELA DO QRCODE
  }

  function copyPix() {
    navigator.clipboard.writeText(pixCode);
    alert("Código PIX copiado!");
  }

  function checkPayment() {
    setStatus("confirming");

    setTimeout(() => {
      setStatus("approved");
    }, 2000);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999] px-4">
      <div
        className="
        bg-[#0F131A] border border-gray-800 rounded-xl 
        w-full max-w-lg p-6 shadow-xl relative
      "
      >
        {/* FECHAR */}
        <button
          onClick={() => window.history.back()}
          className="absolute right-4 top-4 text-gray-400 hover:text-white text-xl"
        >
          <i className="ri-close-line"></i>
        </button>

        {/* BREADCRUMB */}
        <div className="text-sm text-gray-400 mb-5 flex gap-2 items-center">
          <span className={step === 1 ? "text-green-400" : ""}>Tipo de Pagamento</span>
          <i className="ri-arrow-right-s-line"></i>
          <span className={step === 2 ? "text-green-400" : ""}>Detalhes</span>
          <i className="ri-arrow-right-s-line"></i>
          <span className={step === 3 ? "text-green-400" : ""}>Pagamento</span>
        </div>

        {/* ======================= ETAPA 1 ======================= */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">
              Escolha o seu método de pagamento
            </h2>

            {/* RECOMENDADO */}
            <p className="text-gray-400 text-xs mb-2">RECOMENDADO</p>
            {recommendedMethods.map((m) => (
              <button
                key={m.name}
                onClick={() => setStep(2)}
                className="
                w-full bg-[#111820] border border-gray-700 rounded-lg 
                px-4 py-3 mb-3 flex justify-between items-center
                hover:border-green-500 transition
              "
              >
                <span>{m.name}</span>
                <i className={`${m.icon} text-xl`}></i>
              </button>
            ))}

            {/* OUTROS MÉTODOS */}
            <p className="text-gray-400 text-xs mt-4 mb-2">OUTROS MÉTODOS</p>
            {otherMethods.map((m) => (
              <button
                key={m.name}
                onClick={() => setStep(2)}
                className="
                w-full bg-[#111820] border border-gray-700 rounded-lg 
                px-4 py-3 mb-3 flex justify-between items-center
                hover:border-green-500 transition
              "
              >
                <span>{m.name}</span>
                <i className={`${m.icon} text-xl`}></i>
              </button>
            ))}
          </>
        )}

        {/* ======================= ETAPA 2 ======================= */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Insira as informações de Pix</h2>

            <input
              type="text"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full bg-[#111820] border border-gray-700 rounded-lg px-4 py-3 mb-3 text-sm"
            />

            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#111820] border border-gray-700 rounded-lg px-4 py-3 mb-3 text-sm"
            />

            <input
              type="text"
              placeholder="Seu sobrenome"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full bg-[#111820] border border-gray-700 rounded-lg px-4 py-3 mb-3 text-sm"
            />

            {/* Valores rápidos */}
            <div className="flex gap-3 mb-3">
              {quickValues.map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className={`
                    flex-1 py-2 rounded-lg border 
                    ${
                      amount == v
                        ? "bg-green-500 text-black border-green-500"
                        : "bg-[#111820] border-gray-700 text-white"
                    }
                  `}
                >
                  R$ {v}
                </button>
              ))}
            </div>

            {/* Campo valor manual */}
            <input
              type="number"
              placeholder="Quantidade (R$)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#111820] border border-gray-700 rounded-lg px-4 py-3 mb-4 text-sm"
            />

            {/* Termo */}
            <label className="flex items-start gap-2 text-gray-400 text-xs mb-6">
              <input type="checkbox" className="mt-1" />
              Autorizo armazenar as informações bancárias.
            </label>

            {/* Botões */}
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Voltar
              </button>

              <button
                onClick={handleDeposit}
                className="px-6 py-3 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400"
              >
                DEPOSITAR
              </button>
            </div>
          </>
        )}

        {/* ======================= ETAPA 3 — PIX ======================= */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold text-center mb-1">
              Pague com Pix
            </h2>

            {/* STATUS */}
            <p className="text-center text-sm text-gray-400 mb-3">
              {status === "pending" && "Aguardando pagamento..."}
              {status === "confirming" && "Confirmando pagamento..."}
              {status === "approved" && "Pagamento aprovado!"}
            </p>

            {/* TIMER */}
            <p className="text-center text-green-400 text-lg font-bold mb-5">
              {minutes}:{seconds}
            </p>

            {/* QR CODE */}
            <div className="flex justify-center mb-5">
              <div className="bg-white p-3 rounded-lg">
                <QRCode value={pixCode} size={180} />
              </div>
            </div>

            {/* PIX COPIA E COLA */}
            <div className="bg-[#111820] border border-gray-700 rounded-lg p-3 mb-3">
              <p className="text-gray-400 text-xs">Pix Copia e Cola:</p>
              <p className="text-white text-sm break-all mt-1">{pixCode}</p>

              <button
                onClick={copyPix}
                className="mt-3 w-full bg-green-500 text-black rounded-lg py-2 font-bold hover:bg-green-400"
              >
                Copiar código
              </button>
            </div>

            {/* BOTÕES */}
            {status !== "approved" ? (
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Voltar
                </button>

                <button
                  onClick={checkPayment}
                  className="px-6 py-3 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400"
                >
                  Já paguei
                </button>
              </div>
            ) : (
              <button className="w-full mt-6 bg-green-500 text-black py-3 rounded-lg font-bold">
                Ver saldo
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
