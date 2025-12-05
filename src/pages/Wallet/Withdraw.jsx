import { useState } from "react";

const withdrawMethods = [
  { name: "Pix", icon: "ri-qr-code-line" },
  { name: "Pix Manual", icon: "ri-bank-card-line" },
];

const pixTypes = ["CPF", "E-mail", "Telefone", "Chave Aleatória"];

export default function Withdraw() {
  const [step, setStep] = useState(1);
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
    if (
      step === 2 &&
      (!form.name || !form.cpf || !form.pix_type || !form.pix_key)
    ) {
      return alert("Preencha todas as informações obrigatórias.");
    }
    setStep(step + 1);
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center px-4 z-[9999]">
      {/* CONTAINER DO POPUP */}
      <div
        className="
          bg-[#050505] border border-[#262626] rounded-2xl w-full max-w-lg 
          p-6 shadow-[0_30px_100px_rgba(0,0,0,0.95)] relative
        "
      >
        {/* BOTÃO FECHAR */}
        <button
          onClick={() => window.history.back()}
          className="absolute right-4 top-4 text-gray-400 hover:text-white text-xl"
        >
          <i className="ri-close-line" />
        </button>

        {/* BREADCRUMB */}
        <div className="text-xs sm:text-sm text-gray-400 mb-5 flex gap-2 items-center">
          <span className={step === 1 ? "text-[#B90007]" : ""}>Método</span>
          <i className="ri-arrow-right-s-line" />
          <span className={step === 2 ? "text-[#B90007]" : ""}>
            Informações
          </span>
          <i className="ri-arrow-right-s-line" />
          <span className={step === 3 ? "text-[#B90007]" : ""}>Valor</span>
        </div>

        {/* ETAPA 1 */}
        {step === 1 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Selecione o método de saque
            </h2>

            {withdrawMethods.map((m) => (
              <button
                key={m.name}
                onClick={() => setStep(2)}
                className="
                  w-full bg-[#090909] border border-[#262626] rounded-xl
                  px-4 py-3 mb-3 flex justify-between items-center
                  hover:border-[#B90007] hover:shadow-[0_0_22px_rgba(185,0,7,0.7)]
                  transition
                "
              >
                <span className="font-medium">{m.name}</span>
                <i className={`${m.icon} text-xl text-gray-300`} />
              </button>
            ))}
          </>
        )}

        {/* ETAPA 2 */}
        {step === 2 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Informações do Saque
            </h2>

            <input
              type="text"
              placeholder="Nome completo"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              className="
                w-full bg-[#090909] border border-[#262626] rounded-lg 
                px-4 py-3 mb-3 text-sm placeholder:text-gray-500
              "
            />

            <input
              type="text"
              placeholder="CPF"
              value={form.cpf}
              onChange={(e) => updateForm("cpf", e.target.value)}
              className="
                w-full bg-[#090909] border border-[#262626] rounded-lg 
                px-4 py-3 mb-3 text-sm placeholder:text-gray-500
              "
            />

            {/* SELECT PIX TYPE */}
            <div className="mb-3">
              <p className="text-gray-300 text-xs sm:text-sm mb-1">
                Tipo de chave Pix
              </p>

              <div
                className="
                  bg-[#090909] border border-[#262626] rounded-lg px-4 py-3 
                  cursor-pointer relative
                "
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="text-white text-sm">
                  {form.pix_type || "Selecione o tipo de chave"}
                </span>

                <i className="ri-arrow-down-s-line absolute right-4 top-3 text-gray-400" />

                {dropdownOpen && (
                  <div
                    className="
                      absolute left-0 right-0 bg-[#050505] border border-[#262626]
                      rounded-xl mt-2 py-2 z-50 shadow-[0_18px_60px_rgba(0,0,0,0.9)]
                    "
                  >
                    {pixTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => {
                          updateForm("pix_type", type);
                          setDropdownOpen(false);
                        }}
                        className="
                          px-4 py-2 hover:bg-[#111111] transition cursor-pointer
                          text-sm
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
              className="
                w-full bg-[#090909] border border-[#262626] rounded-lg 
                px-4 py-3 mb-6 text-sm placeholder:text-gray-500
              "
            />

            {/* BOTÕES */}
            <div className="flex justify-between gap-3 mt-4">
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
                onClick={handleContinue}
                className="
                  flex-1 px-4 py-3 rounded-lg bg-[#B90007] text-white font-bold 
                  hover:bg-[#e01515] text-sm
                  shadow-[0_0_20px_rgba(185,0,7,0.9)]
                "
              >
                Continuar
              </button>
            </div>
          </>
        )}

        {/* ETAPA 3 */}
        {step === 3 && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Qual valor deseja sacar?
            </h2>

            <input
              type="number"
              min="1"
              placeholder="Valor do saque"
              value={form.amount}
              onChange={(e) => updateForm("amount", e.target.value)}
              className="
                w-full bg-[#090909] border border-[#262626] rounded-lg 
                px-4 py-3 mb-6 text-lg placeholder:text-gray-500
              "
            />

            <div className="flex justify-between gap-3">
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
                onClick={() => alert("Solicitação de saque enviada!")}
                className="
                  flex-1 px-4 py-3 rounded-lg bg-[#B90007] text-white font-bold 
                  hover:bg-[#e01515] text-sm
                  shadow-[0_0_22px_rgba(185,0,7,1)]
                "
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
