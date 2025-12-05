import { useState } from "react";

// Lista de métodos de saque
const withdrawMethods = [
  { name: "Pix", icon: "ri-qr-code-line" },
  { name: "Pix Manual", icon: "ri-bank-card-line" },
];

// Tipos oficiais de chave Pix (Banco Central)
const pixTypes = [
  "CPF",
  "E-mail",
  "Telefone",
  "Chave Aleatória",
];

export default function Withdraw() {
  const [step, setStep] = useState(1);
  const [selectedPixType, setSelectedPixType] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    pix_key: "",
    pix_type: "",
    amount: "",
  });

  function updateForm(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleContinue() {
    if (step === 2 && (!form.name || !form.cpf || !form.pix_type || !form.pix_key)) {
      return alert("Preencha todas as informações obrigatórias.");
    }
    setStep(step + 1);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center px-4 z-[9999]">

      {/* CONTAINER DO POPUP */}
      <div className="bg-[#0F131A] border border-gray-800 rounded-xl w-full max-w-lg p-6 shadow-xl relative">

        {/* BOTÃO FECHAR */}
        <button
          onClick={() => window.history.back()}
          className="absolute right-4 top-4 text-gray-400 hover:text-white text-xl"
        >
          <i className="ri-close-line"></i>
        </button>

        {/* BREADCRUMB */}
        <div className="text-sm text-gray-400 mb-5 flex gap-2 items-center">
          <span className={step === 1 ? "text-green-400" : ""}>Método</span>
          <i className="ri-arrow-right-s-line"></i>
          <span className={step === 2 ? "text-green-400" : ""}>Informações</span>
          <i className="ri-arrow-right-s-line"></i>
          <span className={step === 3 ? "text-green-400" : ""}>Valor</span>
        </div>

        {/* ================================================= */}
        {/* ================== ETAPA 1 ====================== */}
        {/* ================================================= */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Selecione o método de saque</h2>

            {withdrawMethods.map((m) => (
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

        {/* ================================================= */}
        {/* ================== ETAPA 2 ====================== */}
        {/* ================================================= */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Informações do Saque</h2>

            {/* NOME COMPLETO */}
            <input
              type="text"
              placeholder="Nome completo"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              className="w-full bg-[#111820] border border-gray-700 rounded-lg px-4 py-3 mb-3"
            />

            {/* CPF */}
            <input
              type="text"
              placeholder="CPF"
              value={form.cpf}
              onChange={(e) => updateForm("cpf", e.target.value)}
              className="w-full bg-[#111820] border border-gray-700 rounded-lg px-4 py-3 mb-3"
            />

            {/* =================== SELECT PERSONALIZADO =================== */}
            <div className="mb-3">
              <p className="text-gray-300 text-sm mb-1">Tipo de chave Pix</p>

              <div
                className="bg-[#111820] border border-gray-700 rounded-lg px-4 py-3 cursor-pointer relative"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="text-white">
                  {form.pix_type || "Selecione o tipo de chave"}
                </span>

                <i className="ri-arrow-down-s-line absolute right-4 top-3 text-gray-400"></i>

                {dropdownOpen && (
                  <div className="absolute left-0 right-0 bg-[#0F131A] border border-gray-700 rounded-lg mt-2 py-2 z-50">
                    {pixTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => {
                          updateForm("pix_type", type);
                          setDropdownOpen(false);
                        }}
                        className="
                          px-4 py-2 hover:bg-gray-700 transition cursor-pointer
                        "
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CHAVE PIX */}
            <input
              type="text"
              placeholder="Digite sua chave Pix"
              value={form.pix_key}
              onChange={(e) => updateForm("pix_key", e.target.value)}
              className="w-full bg-[#111820] border border-gray-700 rounded-lg px-4 py-3 mb-6"
            />

            {/* BOTÕES */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
              >
                Voltar
              </button>

              <button
                onClick={handleContinue}
                className="px-6 py-3 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400 transition"
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {/* ================================================= */}
        {/* ================== ETAPA 3 ====================== */}
        {/* ================================================= */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">Qual valor deseja sacar?</h2>

            <input
              type="number"
              placeholder="Valor do saque"
              value={form.amount}
              onChange={(e) => updateForm("amount", e.target.value)}
              className="w-full bg-[#111820] border border-gray-700 rounded-lg px-4 py-3 mb-6 text-lg"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition"
              >
                Voltar
              </button>

              <button
                onClick={() => alert("Solicitação de saque enviada!")}
                className="px-6 py-3 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400 transition"
              >
                Solicitar Saque
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
