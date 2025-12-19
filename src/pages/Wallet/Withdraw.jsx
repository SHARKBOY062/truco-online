import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");

  const [externalId, setExternalId] = useState(null);
  const [status, setStatus] = useState("form");
  const [showSuccess, setShowSuccess] = useState(false);

  /* USER */
  useEffect(() => {
    fetch(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(r => r.json())
      .then(d => {
        if (d.user) {
          setName(d.user.name);
          setCpf(d.user.cpf);
        }
      });
  }, []);

  /* POLLING */
  useEffect(() => {
    if (!externalId || status !== "pending") return;

    const i = setInterval(async () => {
      const res = await fetch(`${API_URL}/transactions/${externalId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (data.status === "paid") {
        setShowSuccess(true);
        setTimeout(() => window.location.href = "/", 3000);
        clearInterval(i);
      }

      if (data.status === "failed") {
        alert("Saque falhou. Valor estornado.");
        clearInterval(i);
      }
    }, 4000);

    return () => clearInterval(i);
  }, [externalId, status]);

  /* SUBMIT */
  async function handleWithdraw() {
    if (!amount || !pixKey) return alert("Preencha tudo");

    const res = await fetch(`${API_URL}/withdraws/pix`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        amount: Number(amount),
        client: {
          name,
          document: cpf,
          pix_key: pixKey,
        },
      }),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || "Erro");

    setExternalId(data.external_id);
    setStatus("pending");
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
      <div className="bg-[#050505] border border-[#262626] rounded-2xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4">Saque Pix</h2>

        {status === "form" && (
          <>
            <input disabled value={cpf} className="w-full mb-3 p-3 bg-[#090909]" />
            <input disabled value={name} className="w-full mb-3 p-3 bg-[#090909]" />

            <input
              placeholder="Chave Pix"
              value={pixKey}
              onChange={e => setPixKey(e.target.value)}
              className="w-full mb-3 p-3 bg-[#090909]"
            />

            <input
              type="number"
              placeholder="Valor"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full mb-4 p-3 bg-[#090909]"
            />

            <button
              onClick={handleWithdraw}
              className="w-full bg-[#B90007] py-3 rounded-lg font-bold"
            >
              Solicitar saque
            </button>
          </>
        )}

        {status === "pending" && (
          <p className="text-center text-gray-400">
            Processando saque...
          </p>
        )}
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
          <div className="bg-[#050505] p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold text-[#B90007]">Saque realizado!</h2>
            <p className="text-gray-300 mt-2">
              O valor foi enviado com sucesso.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
