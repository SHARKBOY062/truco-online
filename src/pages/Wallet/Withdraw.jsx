import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const PIX_TYPES = [
  { value: "cpf", label: "CPF" },
  { value: "email", label: "E-mail" },
  { value: "phone", label: "Telefone" },
  { value: "random", label: "Chave aleatória" },
];

export default function Withdraw() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [pixType, setPixType] = useState("cpf");
  const [pixKey, setPixKey] = useState("");

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  const [externalId, setExternalId] = useState(null);
  const [status, setStatus] = useState("form"); // form | pending
  const [showSuccess, setShowSuccess] = useState(false);

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

  /* ================= POLLING ================= */
  useEffect(() => {
    if (!externalId || status !== "pending") return;

    const i = setInterval(async () => {
      const res = await fetch(`${API_URL}/transactions/${externalId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (data.status === "paid") {
        setShowSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 2500);

        clearInterval(i);
      }

      if (data.status === "failed") {
        alert("Saque falhou. O valor foi estornado.");
        navigate("/");
        clearInterval(i);
      }
    }, 4000);

    return () => clearInterval(i);
  }, [externalId, status, navigate]);

  /* ================= FORMAT PIX KEY ================= */
  function handlePixKeyChange(value) {
    if (pixType === "cpf" || pixType === "phone") {
      setPixKey(value.replace(/\D+/g, ""));
    } else {
      setPixKey(value);
    }
  }

  /* ================= SUBMIT ================= */
  async function handleWithdraw() {
    if (!amount || Number(amount) <= 0) {
      return alert("Informe um valor válido");
    }

    if (!pixKey) {
      return alert("Informe a chave Pix");
    }

    const res = await fetch(`${API_URL}/withdraws/pix`, {
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
          pix_key: pixKey,
          pix_type: pixType,
        },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return alert(data.message || "Erro ao solicitar saque");
    }

    setExternalId(data.external_id);
    setStatus("pending");
  }

  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] px-4">
      <div className="w-full max-w-md bg-[#050505] border border-[#262626] rounded-2xl p-6 animate-fade-in relative">

        {/* FECHAR */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          disabled={status === "pending"}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Saque via Pix</h2>

        {/* FORM */}
        {status === "form" && (
          <>
            <input
              disabled
              value={cpf}
              className="w-full mb-3 p-3 bg-[#090909] border border-[#262626] rounded-lg text-sm text-gray-400"
            />

            <input
              disabled
              value={name}
              className="w-full mb-4 p-3 bg-[#090909] border border-[#262626] rounded-lg text-sm text-gray-400"
            />

            {/* TIPO DE CHAVE */}
            <label className="text-xs text-gray-400 mb-1 block">
              Tipo da chave Pix
            </label>

            <select
              value={pixType}
              onChange={(e) => {
                setPixType(e.target.value);
                setPixKey("");
              }}
              className="w-full mb-3 p-3 bg-[#090909] border border-[#262626] rounded-lg text-sm"
            >
              {PIX_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>

            {/* CHAVE PIX */}
            <input
              placeholder={
                pixType === "cpf"
                  ? "CPF (somente números)"
                  : pixType === "phone"
                  ? "Telefone com DDD"
                  : pixType === "email"
                  ? "E-mail"
                  : "Chave aleatória"
              }
              value={pixKey}
              onChange={(e) => handlePixKeyChange(e.target.value)}
              className="w-full mb-4 p-3 bg-[#090909] border border-[#262626] rounded-lg text-sm"
            />

            {/* VALOR */}
            <input
              type="number"
              placeholder="Valor do saque"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mb-4 p-3 bg-[#090909] border border-[#262626] rounded-lg text-sm"
            />

            <button
              onClick={handleWithdraw}
              className="w-full bg-[#B90007] py-3 rounded-lg font-bold hover:bg-[#e01515] transition"
            >
              Solicitar saque
            </button>
          </>
        )}

        {/* PENDING */}
        {status === "pending" && (
          <p className="text-center text-gray-400 py-6">
            Processando saque, aguarde...
          </p>
        )}
      </div>

      {/* 🎉 SUCESSO */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[10000] animate-fade-in">
          <div className="bg-[#050505] border border-[#262626] rounded-2xl p-8 text-center shadow-[0_0_40px_rgba(185,0,7,0.9)]">
            <h2 className="text-3xl font-extrabold text-[#B90007] mb-2">
              ✅ Saque realizado!
            </h2>
            <p className="text-gray-300">
              O valor foi enviado com sucesso.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
