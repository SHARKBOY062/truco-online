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

    const payload = {
      amount: Number(amount),
      client: {
        name,
        document: cpf.replace(/\D+/g, ""),
        pix_key: pixKey,
        pix_type: pixType, // 🔥 SEM MAPEAR, SEM ALTERAR
      },
    };

    const res = await fetch(`${API_URL}/withdraws/pix`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      return alert(data.message || "Erro ao solicitar saque");
    }

    /**
     * ✅ Fecha popup e vai para extrato
     * ⏳ Status final via webhook
     */
    navigate("/wallet/transactions", { replace: true });
  }

  /* ================= UI ================= */
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] px-4">
      <div className="w-full max-w-md bg-[#050505] border border-[#262626] rounded-2xl p-6 relative animate-fade-in shadow-[0_30px_90px_rgba(0,0,0,0.95)]">

        <button
          onClick={() => navigate("/", { replace: true })}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full
                     text-gray-400 hover:text-white hover:bg-[#111111]
                     transition active:scale-95"
          title="Fechar"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">Saque via Pix</h2>

        <input disabled value={cpf} className="w-full mb-3 p-3 bg-[#090909] border border-[#262626] rounded-lg text-sm text-gray-400" />
        <input disabled value={name} className="w-full mb-4 p-3 bg-[#090909] border border-[#262626] rounded-lg text-sm text-gray-400" />

        <label className="text-xs text-gray-400 mb-1 block">Tipo da chave Pix</label>

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

        <input
          type="number"
          placeholder="Valor do saque"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-5 p-3 bg-[#090909] border border-[#262626] rounded-lg text-sm"
        />

        <button
          onClick={handleWithdraw}
          disabled={loading}
          className="w-full bg-[#B90007] py-3 rounded-lg font-bold disabled:opacity-50"
        >
          {loading ? "Processando..." : "Solicitar saque"}
        </button>
      </div>
    </div>
  );
}
