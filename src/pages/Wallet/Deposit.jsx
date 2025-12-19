import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

const API_URL = "https://SEU_BACKEND"; // ex: https://api.seusite.com

export default function Deposit() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [pixCode, setPixCode] = useState("");
  const [externalId, setExternalId] = useState(null);

  const [timer, setTimer] = useState(900);
  const [status, setStatus] = useState("pending"); // pending | approved

  const quickValues = [120, 240, 600];

  /* ================= TIMER ================= */
  useEffect(() => {
    if (step !== 3 || timer <= 0) return;
    const i = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(i);
  }, [step, timer]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  /* ================= POLLING ================= */
  useEffect(() => {
    if (!externalId || step !== 3) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/transactions/${externalId}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (data.status === "paid") {
          setStatus("approved");
          clearInterval(interval);
        }
      } catch {}
    }, 5000);

    return () => clearInterval(interval);
  }, [externalId, step]);

  /* ================= GERAR PIX ================= */
  async function handleDeposit() {
    if (!cpf || !name || !surname || !amount) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/deposits/pix`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          client: {
            name: `${name} ${surname}`,
            document: cpf,
            phoneNumber: "11999999999",
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao gerar Pix");
      }

      // 🔥 AQUI ESTÁ O AJUSTE CORRETO
      setPixCode(data.pix.qr_code_text);
      setExternalId(data.external_id);

      setStatus("pending");
      setTimer(900);
      setStep(3);
    } catch (err) {
      alert(err.message);
    }
  }

  function copyPix() {
    navigator.clipboard.writeText(pixCode);
    alert("Código Pix copiado!");
  }

  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[9999] px-4">
      <div className="w-full max-w-lg bg-[#050505] border border-[#262626] rounded-2xl p-6 relative">

        <button
          onClick={() => window.history.back()}
          className="absolute top-4 right-4 text-xl text-gray-400"
        >
          ✕
        </button>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Escolha o método</h2>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#090909] border border-[#262626] p-4 rounded-lg"
            >
              Pix
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Detalhes do Pix</h2>

            <input
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full mb-2 p-3 bg-[#090909] border border-[#262626]"
            />

            <input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-2 p-3 bg-[#090909] border border-[#262626]"
            />

            <input
              placeholder="Sobrenome"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full mb-3 p-3 bg-[#090909] border border-[#262626]"
            />

            <div className="flex gap-2 mb-3">
              {quickValues.map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className="flex-1 bg-[#090909] border border-[#262626] p-2"
                >
                  R$ {v}
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="Valor"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mb-4 p-3 bg-[#090909] border border-[#262626]"
            />

            <button
              onClick={handleDeposit}
              className="w-full bg-[#B90007] p-3 font-bold"
            >
              Gerar Pix
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold text-center mb-2">
              Pague com Pix
            </h2>

            <p className="text-center mb-3">
              {status === "pending"
                ? "Aguardando pagamento..."
                : "Pagamento aprovado!"}
            </p>

            <p className="text-center text-[#B90007] text-xl mb-4">
              {minutes}:{seconds}
            </p>

            <div className="flex justify-center mb-4 bg-white p-3 rounded">
              <QRCode value={pixCode} size={180} />
            </div>

            <div className="bg-[#090909] p-3 rounded">
              <p className="break-all text-xs">{pixCode}</p>

              <button
                onClick={copyPix}
                className="w-full bg-[#B90007] mt-3 p-2"
              >
                Copiar código
              </button>
            </div>

            {status === "approved" && (
              <button
                onClick={() => window.history.back()}
                className="w-full bg-green-600 mt-4 p-3"
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
