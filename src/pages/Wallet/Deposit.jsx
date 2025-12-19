import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

const API_URL = import.meta.env.VITE_API_URL;

export default function Deposit() {
  const [step, setStep] = useState(1);

  const [amount, setAmount] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");

  const [pixCode, setPixCode] = useState("");
  const [externalId, setExternalId] = useState(null);

  const [timer, setTimer] = useState(900);
  const [status, setStatus] = useState("pending");

  const quickValues = [120, 240, 600];

  /* ================= USER LOGADO ================= */
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`${API_URL}/user`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (data?.user) {
          setName(data.user.name || "");
          setCpf(data.user.cpf || "");
        }
      } catch {}
    }

    loadUser();
  }, []);

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
          `${API_URL}/transactions/${externalId}`,
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
    if (!amount || Number(amount) <= 0) {
      alert("Informe um valor válido");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/deposits/pix`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          client: {
            name,
            document: cpf,
            phoneNumber: "64992038072",
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao gerar Pix");
      }

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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] px-4">
      <div className="w-full max-w-lg bg-[#050505] border border-[#262626] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] p-6 relative">

        <button
          onClick={() => window.history.back()}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-5">
              Escolha o método de pagamento
            </h2>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#090909] border border-[#262626] rounded-xl px-4 py-4 flex justify-between items-center hover:border-[#B90007] hover:shadow-[0_0_22px_rgba(185,0,7,0.6)] transition"
            >
              <span className="font-medium">Pix</span>
              <i className="ri-qr-code-line text-xl text-gray-300" />
            </button>
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Detalhes do pagamento
            </h2>

            <input
              disabled
              value={cpf}
              className="w-full bg-[#090909] border border-[#262626] rounded-lg px-4 py-3 mb-3 text-sm text-gray-400"
            />

            <input
              disabled
              value={name}
              className="w-full bg-[#090909] border border-[#262626] rounded-lg px-4 py-3 mb-4 text-sm text-gray-400"
            />

            <div className="flex gap-3 mb-4">
              {quickValues.map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className={`flex-1 py-3 rounded-lg border text-sm font-bold ${
                    Number(amount) === v
                      ? "bg-[#B90007] text-white border-[#B90007]"
                      : "bg-[#090909] border-[#262626] text-gray-200"
                  }`}
                >
                  R$ {v}
                </button>
              ))}
            </div>

            <input
              type="number"
              placeholder="Outro valor"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#090909] border border-[#262626] rounded-lg px-4 py-3 mb-4 text-sm"
            />

            <button
              onClick={handleDeposit}
              className="w-full bg-[#B90007] text-white font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(185,0,7,0.9)] hover:bg-[#e01515]"
            >
              Gerar Pix
            </button>
          </>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-2">
              Pague com Pix
            </h2>

            <p className="text-center text-gray-400 mb-3">
              {status === "pending"
                ? "Aguardando pagamento..."
                : "Pagamento aprovado!"}
            </p>

            <p className="text-center text-[#B90007] text-xl font-extrabold mb-4">
              {minutes}:{seconds}
            </p>

            <div className="flex justify-center mb-5">
              <div className="bg-white p-3 rounded-lg">
                <QRCode value={pixCode} size={180} />
              </div>
            </div>

            <div className="bg-[#090909] border border-[#262626] rounded-lg p-3">
              <p className="text-xs text-gray-400">Pix Copia e Cola</p>
              <p className="break-all text-xs text-white mt-1">
                {pixCode}
              </p>

              <button
                onClick={copyPix}
                className="mt-3 w-full bg-[#B90007] text-white rounded-lg py-2 font-bold"
              >
                Copiar código
              </button>
            </div>

            {status === "approved" && (
              <button
                onClick={() => window.history.back()}
                className="w-full mt-5 bg-green-600 text-white py-3 rounded-lg font-bold"
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
