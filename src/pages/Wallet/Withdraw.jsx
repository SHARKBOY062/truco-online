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

  const [loading, setLoading] = useState(false);

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

  /* ================= FORMAT PIX ================= */
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

    setLoading(true);

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

    setLoading(false);

    if (!res.ok) {
      return alert(data.message || "Erro ao solicitar saque");
    }

    /**
     * ✅ FECHA POPUP IMEDIATAMENTE
     * 📄 REDIRECIONA PARA EXTRATO
     * ⏳ STATUS SERÁ ATUALIZADO PELO WEBHOOK
     */
    navigate("/wallet/transactions", { replace: true });
  }

  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] px-4">
      <div className="w-full max-w-md bg-[#050505] border border-[#262626] rounded-2xl p-6 animate-fade-in relative">

        {/* FECHAR */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          disabled={loading}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Saque via Pix</h2>

        {/* CPF */}
        <input
          disabled
          value={cpf}
          className="w-full mb-3 p-3 bg-[#090909] border border-[#262626] rounded-lg text-sm text-gray-400"
        />

        {/* NOME */}
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
          disabled={loading}
          className="w-full bg-[#B90007] py-3 rounded-lg font-bold hover:bg-[#e01515] transition disabled:opacity-50"
        >
          {loading ? "Processando..." : "Solicitar saque"}
        </button>
      </div>
    </div>
  );
}
