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
  const [showSuccess, setShowSuccess] = useState(false);

  const quickValues = [120, 240, 600];

  /* ================= USER ================= */
  useEffect(() => {
    fetch(`${API_URL}/user`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.user) {
          setName(d.user.name || "");
          setCpf(d.user.cpf || "");
        }
      });
  }, []);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (step !== 3 || timer <= 0 || status === "approved") return;
    const i = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(i);
  }, [step, timer, status]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  /* ================= POLLING ================= */
  useEffect(() => {
    if (!externalId || step !== 3 || status === "approved") return;

    const interval = setInterval(async () => {
      const res = await fetch(`${API_URL}/transactions/${externalId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (data.status === "paid") {
        setStatus("approved");
        setShowSuccess(true);

        // 🔊 SOM
        new Audio("/sounds/success.mp3").play().catch(() => {});

        // ⏱️ FECHA E REDIRECIONA
        setTimeout(() => {
          window.location.href = "/";
        }, 4000);

        clearInterval(interval);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [externalId, step, status]);

  /* ================= GERAR PIX ================= */
  async function handleDeposit() {
    if (!amount || Number(amount) <= 0) return alert("Informe um valor válido");

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
    if (!res.ok) return alert(data.message || "Erro ao gerar Pix");

    setPixCode(data.pix.qr_code_text);
    setExternalId(data.external_id);
    setStep(3);
    setTimer(900);
  }

  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] px-4">
      <div className="w-full max-w-lg bg-[#050505] border border-[#262626] rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] p-6 relative animate-fade-in">

        {/* FECHAR */}
        <button
          onClick={() => window.location.href = "/"}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          disabled={status === "approved"}
        >
          ✕
        </button>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-5">Escolha o método</h2>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#090909] border border-[#262626] rounded-xl px-4 py-4 flex justify-between items-center hover:border-[#B90007]"
            >
              <span>Pix</span>
              <i className="ri-qr-code-line text-xl" />
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Detalhes</h2>

            <input disabled value={cpf} className="w-full mb-3 p-3 bg-[#090909] border border-[#262626]" />
            <input disabled value={name} className="w-full mb-4 p-3 bg-[#090909] border border-[#262626]" />

            <div className="flex gap-3 mb-4">
              {quickValues.map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className={`flex-1 py-3 rounded-lg border ${
                    Number(amount) === v
                      ? "bg-[#B90007] text-white border-[#B90007]"
                      : "bg-[#090909] border-[#262626]"
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
              className="w-full mb-4 p-3 bg-[#090909] border border-[#262626]"
            />

            <button
              onClick={handleDeposit}
              className="w-full bg-[#B90007] py-3 rounded-lg font-bold"
            >
              Gerar Pix
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-2">
              {status === "approved" ? "Pagamento confirmado!" : "Pague com Pix"}
            </h2>

            {status === "pending" && (
              <>
                <p className="text-center text-gray-400 mb-3">
                  Aguardando pagamento...
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
                  <p className="break-all text-xs">{pixCode}</p>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* 🎉 POPUP DE SUCESSO */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[10000] animate-fade-in">
          <div className="bg-[#050505] border border-[#262626] rounded-2xl p-8 text-center shadow-[0_0_40px_rgba(185,0,7,0.9)]">
            <h2 className="text-3xl font-extrabold text-[#B90007] mb-2">
              🎉 Parabéns!
            </h2>
            <p className="text-gray-300">
              Seu depósito foi confirmado com sucesso.
            </p>
          </div>

          {/* CONFETTI */}
          {[...Array(40)].map((_, i) => (
            <span
              key={i}
              className="fixed top-0 w-2 h-2 bg-[#B90007] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `confetti-fall ${3 + Math.random() * 2}s linear infinite`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
