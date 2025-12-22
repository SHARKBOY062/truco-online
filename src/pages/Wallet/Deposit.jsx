import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

const API_URL = import.meta.env.VITE_API_URL;

export default function Deposit() {
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const [step, setStep] = useState(1);

  // user
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [initialBalance, setInitialBalance] = useState(null);

  // deposit
  const [amount, setAmount] = useState(""); // string (input)
  const [loading, setLoading] = useState(false);

  // pix
  const [pixCode, setPixCode] = useState("");
  const [timer, setTimer] = useState(900);

  const quickValues = [20, 50, 120, 240, 600];

  const amountNumber = useMemo(() => {
    const n = Number(String(amount).replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  }, [amount]);

  const isValidAmount = amountNumber >= 1;

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
          setInitialBalance(Number(d.user.balance ?? 0));
        }
      })
      .catch(() => {});
  }, []);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (step !== 3 || timer <= 0) return;
    const t = setInterval(() => setTimer((v) => v - 1), 1000);
    return () => clearInterval(t);
  }, [step, timer]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  /* ================= SALDO WATCHER (FONTE DE VERDADE) ================= */
  useEffect(() => {
    if (step !== 3 || initialBalance === null) return;

    intervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${API_URL}/user`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        const newBalance = Number(data?.user?.balance ?? 0);

        if (newBalance > initialBalance) {
          clearInterval(intervalRef.current);

          // 🔥 Atualiza "cache" local para header/estado global (se você usar)
          localStorage.setItem("balance", String(newBalance));

          // 🔥 Dispara evento para qualquer componente ouvir (Header por exemplo)
          window.dispatchEvent(
            new CustomEvent("balance:update", { detail: { balance: newBalance } })
          );

          // som + fecha popup
          new Audio("/sounds/success.mp3").play().catch(() => {});
          navigate("/", { replace: true });
        }
      } catch (_) {}
    }, 2000);

    return () => clearInterval(intervalRef.current);
  }, [step, initialBalance, navigate]);

  /* ================= GERAR PIX ================= */
  async function handleDeposit() {
    if (!isValidAmount) return alert("Informe um valor válido (mínimo R$ 1).");

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/deposits/pix`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: amountNumber,
          client: {
            name,
            document: cpf,
            phoneNumber: "64992038072",
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return alert(data.message || "Erro ao gerar Pix");
      }

      setPixCode(data?.pix?.qr_code_text || "");
      setStep(3);
      setTimer(900);

      // garante baseline do saldo no momento de iniciar o QR
      // (se o user ainda não tinha carregado, ou se mudou)
      if (typeof data?.user?.balance !== "undefined") {
        setInitialBalance(Number(data.user.balance ?? initialBalance ?? 0));
      }
    } catch (e) {
      alert("Erro ao gerar Pix");
    } finally {
      setLoading(false);
    }
  }

  function copyPix() {
    if (!pixCode) return;
    navigator.clipboard.writeText(pixCode);
    alert("Código Pix copiado!");
  }

  function close() {
    // limpa watcher
    if (intervalRef.current) clearInterval(intervalRef.current);
    navigate("/", { replace: true });
  }

  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] px-4">
      <div className="w-full max-w-lg bg-[#050505] border border-[#262626] rounded-2xl p-6 relative shadow-[0_30px_90px_rgba(0,0,0,0.95)]">

        {/* FECHAR */}
        <button
          onClick={close}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full
                     text-gray-400 hover:text-white hover:bg-[#111111]
                     transition active:scale-95"
          title="Fechar"
        >
          ✕
        </button>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Adicionar saldo</h2>
            <p className="text-sm text-gray-400 mb-5">
              Escolha o método de depósito.
            </p>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#090909] border border-[#262626] rounded-xl px-4 py-4 flex justify-between items-center
                         hover:border-[#B90007] transition"
            >
              <div>
                <div className="font-bold">Pix</div>
                <div className="text-xs text-gray-400">Pagamento instantâneo</div>
              </div>
              <i className="ri-qr-code-line text-2xl" />
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Depósito via Pix</h2>
            <p className="text-sm text-gray-400 mb-4">
              Informe o valor e gere o QR Code.
            </p>

            {/* dados */}
            <div className="grid grid-cols-1 gap-3 mb-4">
              <input
                disabled
                value={cpf}
                className="w-full p-3 bg-[#090909] border border-[#262626] rounded-lg text-sm text-gray-400"
              />
              <input
                disabled
                value={name}
                className="w-full p-3 bg-[#090909] border border-[#262626] rounded-lg text-sm text-gray-400"
              />
            </div>

            {/* valor */}
            <label className="text-xs text-gray-400 mb-1 block">
              Valor do depósito
            </label>

            <input
              type="number"
              inputMode="decimal"
              placeholder="Ex: 50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mb-3 p-3 bg-[#090909] border border-[#262626]
                         rounded-lg text-sm focus:border-[#B90007] transition"
            />

            {/* rápidos */}
            <div className="flex flex-wrap gap-2 mb-4">
              {quickValues.map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(String(v))}
                  className={`px-4 py-2 rounded-lg border transition text-sm
                    ${
                      Number(amountNumber) === v
                        ? "bg-[#B90007] border-[#B90007]"
                        : "bg-[#090909] border-[#262626] hover:border-[#B90007]"
                    }`}
                >
                  R$ {v}
                </button>
              ))}
            </div>

            {/* resumo */}
            <div className="bg-[#090909] border border-[#262626] rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Você vai depositar</span>
                <span className="font-extrabold text-white">
                  R$ {isValidAmount ? amountNumber.toFixed(2) : "0,00"}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Após o pagamento, o saldo atualiza automaticamente e esta janela fecha.
              </div>
            </div>

            <button
              onClick={handleDeposit}
              disabled={!isValidAmount || loading}
              className="w-full bg-[#B90007] py-3 rounded-lg font-bold
                         hover:bg-[#e01515] transition
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Gerando Pix..." : "Gerar Pix"}
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full mt-3 py-3 rounded-lg font-bold
                         bg-[#090909] border border-[#262626]
                         hover:border-[#B90007] transition"
            >
              Voltar
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-1">Pague com Pix</h2>
            <p className="text-center text-[#B90007] text-xl font-extrabold mb-4">
              {minutes}:{seconds}
            </p>

            <div className="bg-[#090909] border border-[#262626] rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Valor</span>
                <span className="font-extrabold">R$ {amountNumber.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Assim que o pagamento for confirmado, seu saldo será atualizado automaticamente.
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <div className="bg-white p-3 rounded-lg">
                <QRCode value={pixCode || " "} size={190} />
              </div>
            </div>

            <div className="bg-[#090909] border border-[#262626] p-3 rounded-xl">
              <p className="break-all text-xs text-gray-300 mb-3">{pixCode}</p>
              <button
                onClick={copyPix}
                className="w-full bg-[#B90007] py-2 rounded-lg font-bold hover:bg-[#e01515] transition"
              >
                Copiar código
              </button>
            </div>

            <button
              onClick={() => {
                // permite voltar e gerar outro valor
                setStep(2);
                setPixCode("");
                setTimer(900);
              }}
              className="w-full mt-3 py-3 rounded-lg font-bold
                         bg-[#090909] border border-[#262626]
                         hover:border-[#B90007] transition"
            >
              Alterar valor
            </button>
          </>
        )}
      </div>
    </div>
  );
}
