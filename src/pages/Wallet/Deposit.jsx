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
  const [status, setStatus] = useState("pending"); // pending | confirming | approved

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

    setPixCode(generateFakePix());
    setStep(3);
  }

  function copyPix() {
    if (!pixCode) return;
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
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[9999] px-4">
      <div
        className="
          w-full max-w-lg mx-auto relative
          bg-[#050505] border border-[#262626] rounded-2xl
          shadow-[0_30px_100px_rgba(0,0,0,0.95)]
          p-5 sm:p-6
        "
      >
        {/* FECHAR */}
        <button
          onClick={() => window.history.back()}
          className="absolute right-4 top-4 text-gray-400 hover:text-white text-xl"
        >
          <i className="ri-close-line" />
        </button>

        {/* BREADCRUMB */}
        <div className="text-xs sm:text-sm text-gray-400 mb-5 flex gap-2 items-center">
          <span className={step === 1 ? "text-[#B90007]" : ""}>
            Tipo de Pagamento
          </span>
          <i className="ri-arrow-right-s-line" />
          <span className={step === 2 ? "text-[#B90007]" : ""}>Detalhes</span>
          <i className="ri-arrow-right-s-line" />
          <span className={step === 3 ? "text-[#B90007]" : ""}>Pagamento</span>
        </div>

        {/* ======================= ETAPA 1 ======================= */}
        {step === 1 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Escolha o seu método de pagamento
            </h2>

            <p className="text-gray-400 text-[11px] sm:text-xs mb-2 tracking-wide">
              RECOMENDADO
            </p>
            {recommendedMethods.map((m) => (
              <button
                key={m.name}
                onClick={() => setStep(2)}
                className="
                  w-full bg-[#090909] border border-[#262626] rounded-xl 
                  px-4 py-3 mb-3 flex justify-between items-center
                  hover:border-[#B90007] hover:shadow-[0_0_22px_rgba(185,0,7,0.6)]
                  transition
                "
              >
                <span className="font-medium">{m.name}</span>
                <i className={`${m.icon} text-xl text-gray-300`} />
              </button>
            ))}

            <p className="text-gray-400 text-[11px] sm:text-xs mt-4 mb-2 tracking-wide">
              OUTROS MÉTODOS
            </p>
            {otherMethods.map((m, idx) => (
              <button
                key={`${m.name}-${idx}`}
                onClick={() => setStep(2)}
                className="
                  w-full bg-[#090909] border border-[#262626] rounded-xl 
                  px-4 py-3 mb-3 flex justify-between items-center
                  hover:border-[#B90007] hover:shadow-[0_0_22px_rgba(185,0,7,0.6)]
                  transition
                "
              >
                <span className="font-medium">{m.name}</span>
                <i className={`${m.icon} text-xl text-gray-300`} />
              </button>
            ))}
          </>
        )}

        {/* ======================= ETAPA 2 ======================= */}
        {step === 2 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Detalhes do pagamento via Pix
            </h2>

            <input
              type="text"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="
                w-full bg-[#090909] border border-[#262626] rounded-lg 
                px-4 py-3 mb-3 text-sm placeholder:text-gray-500
              "
            />

            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full bg-[#090909] border border-[#262626] rounded-lg 
                px-4 py-3 mb-3 text-sm placeholder:text-gray-500
              "
            />

            <input
              type="text"
              placeholder="Seu sobrenome"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="
                w-full bg-[#090909] border border-[#262626] rounded-lg 
                px-4 py-3 mb-4 text-sm placeholder:text-gray-500
              "
            />

            {/* Valores rápidos */}
            <div className="flex gap-2 sm:gap-3 mb-3">
              {quickValues.map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className={`
                    flex-1 py-2 rounded-lg border text-xs sm:text-sm font-semibold
                    ${
                      Number(amount) === v
                        ? "bg-[#B90007] text-white border-[#B90007] shadow-[0_0_18px_rgba(185,0,7,0.8)]"
                        : "bg-[#090909] border-[#262626] text-gray-200 hover:border-[#B90007]/70"
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
              min="1"
              placeholder="Quantidade (R$)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="
                w-full bg-[#090909] border border-[#262626] rounded-lg 
                px-4 py-3 mb-4 text-sm placeholder:text-gray-500
              "
            />

            {/* Termo */}
            <label className="flex items-start gap-2 text-gray-400 text-xs mb-6">
              <input type="checkbox" className="mt-1" />
              <span>
                Autorizo armazenar as informações bancárias em conformidade com
                a LGPD.
              </span>
            </label>

            {/* Botões */}
            <div className="flex justify-between gap-3">
              <button
                onClick={() => setStep(1)}
                className="
                  flex-1 px-4 py-3 rounded-lg border border-[#3b3b3b]
                  text-gray-300 hover:bg-[#151515] text-sm
                "
              >
                Voltar
              </button>

              <button
                onClick={handleDeposit}
                className="
                  flex-1 px-4 py-3 rounded-lg bg-[#B90007] text-white font-bold 
                  text-sm hover:bg-[#e01515]
                  shadow-[0_0_20px_rgba(185,0,7,0.9)]
                "
              >
                Gerar Pix
              </button>
            </div>
          </>
        )}

        {/* ======================= ETAPA 3 — PIX ======================= */}
        {step === 3 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-1">
              Pague com Pix
            </h2>

            {/* STATUS */}
            <p className="text-center text-sm text-gray-400 mb-2">
              {status === "pending" && "Aguardando pagamento..."}
              {status === "confirming" && "Confirmando pagamento..."}
              {status === "approved" && "Pagamento aprovado!"}
            </p>

            {/* TIMER */}
            <p
              className="
                text-center text-[#B90007] text-lg sm:text-xl font-extrabold mb-4
                drop-shadow-[0_0_18px_rgba(185,0,7,0.9)]
              "
            >
              {minutes}:{seconds}
            </p>

            {/* QR CODE */}
            <div className="flex justify-center mb-5">
              <div className="bg-white p-3 rounded-lg shadow-[0_18px_40px_rgba(0,0,0,0.8)]">
                <QRCode value={pixCode} size={180} />
              </div>
            </div>

            {/* PIX COPIA E COLA */}
            <div className="bg-[#090909] border border-[#262626] rounded-lg p-3 mb-3">
              <p className="text-gray-400 text-xs">Pix Copia e Cola:</p>
              <p className="text-white text-xs sm:text-sm break-all mt-1">
                {pixCode}
              </p>

              <button
                onClick={copyPix}
                className="
                  mt-3 w-full bg-[#B90007] text-white rounded-lg py-2 
                  font-bold hover:bg-[#e01515] text-sm
                  shadow-[0_0_18px_rgba(185,0,7,0.9)]
                "
              >
                Copiar código
              </button>
            </div>

            {/* BOTÕES */}
            {status !== "approved" ? (
              <div className="flex justify-between gap-3 mt-5">
                <button
                  onClick={() => setStep(2)}
                  className="
                    flex-1 px-4 py-3 rounded-lg border border-[#3b3b3b]
                    text-gray-300 hover:bg-[#151515] text-sm
                  "
                >
                  Voltar
                </button>

                <button
                  onClick={checkPayment}
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
                className="
                  w-full mt-6 bg-[#B90007] text-white py-3 rounded-lg font-bold
                  shadow-[0_0_22px_rgba(185,0,7,1)]
                "
                onClick={() => window.history.back()}
              >
                Ver saldo
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
