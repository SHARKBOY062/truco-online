// src/pages/account/tabs/AccountIdentity.jsx
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import SectionCard from "../../../components/account/SectionCard.jsx";
import InputPremium from "../../../components/account/InputPremium.jsx";
import UploadPremium from "../../../components/account/UploadPremium.jsx";

export default function AccountIdentity({ setIdentityDone }) {
  const { user } = useAuth();

  const [form] = useState({
    fullName: user?.name || "",
    cpf: user?.cpf || "",
  });

  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = async () => {
    setErrorMsg("");

    if (!frontFile || !selfieFile) {
      setErrorMsg(
        "Envie ao menos a frente do documento e a selfie segurando o documento."
      );
      return;
    }

    setSaving(true);

    try {
      console.log("ENVIANDO DOCUMENTAÇÃO:", {
        form,
        frontFile,
        backFile,
        selfieFile,
      });

      setTimeout(() => {
        setIdentityDone(true);
        setSaving(false);
        setErrorMsg("");
        alert("Documento enviado para análise.");
      }, 800);
    } catch (err) {
      console.error(err);
      setErrorMsg("Erro ao enviar o documento. Tente novamente.");
      setSaving(false);
    }
  };

  const canSubmit = frontFile && selfieFile;

  return (
    <div className="min-w-0">
      <SectionCard title="Comprovante de Identidade">

        {/* AVISO IMPORTANTE - EM UMA LINHA */}
        <div className="bg-[#0a0a0a] border border-[#262626] rounded-xl px-4 py-3 mb-6">
          <p className="text-[11px] sm:text-xs text-gray-300 flex items-center gap-2 whitespace-nowrap">
            <i className="ri-shield-keyhole-line text-[#B90007] text-lg flex-shrink-0"></i>

            <span className="truncate">
              Somente aceitamos documentos que correspondam ao CPF cadastrado:{" "}
              <span className="text-white font-semibold">{form.cpf}</span>
            </span>
          </p>
        </div>

        {/* CAMPOS NÃO EDITÁVEIS */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <InputPremium
            label="Nome completo"
            value={form.fullName}
            locked
            icon="ri-user-line"
          />

          <InputPremium
            label="CPF"
            value={form.cpf}
            locked
            icon="ri-id-card-line"
          />
        </div>

        {/* UPLOADS */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <UploadPremium
            label="Documento (frente)*"
            description="Imagem nítida da frente do documento."
            fileName={frontFile?.name}
            onChange={setFrontFile}
            accept="image/*"
            required
          />

          <UploadPremium
            label="Documento (verso)"
            description="Opcional — envie se existir verso."
            fileName={backFile?.name}
            onChange={setBackFile}
            accept="image/*"
          />

          <UploadPremium
            label="Selfie com documento*"
            description="Segure o documento ao lado do rosto."
            fileName={selfieFile?.name}
            onChange={setSelfieFile}
            accept="image/*"
            required
          />
        </div>

        {/* ERRO ELEGANTE */}
        {errorMsg && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-[#250000] border border-[#4a0000] text-red-400 text-[12px] sm:text-[13px] flex items-center gap-2">
            <i className="ri-error-warning-line text-lg"></i>
            {errorMsg}
          </div>
        )}

        {/* BOTÕES */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">

          <button
            type="button"
            className="
              px-4 sm:px-5 py-2.5
              rounded-full
              border border-[#333333]
              text-xs sm:text-sm text-gray-300
              bg-[#050505]
              hover:bg-[#101010]
              transition-all duration-200
            "
            onClick={() => {
              setFrontFile(null);
              setBackFile(null);
              setSelfieFile(null);
              setErrorMsg("");
            }}
          >
            Limpar uploads
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!canSubmit || saving}
            className={`
              inline-flex items-center justify-center gap-2
              px-6 py-2.5 rounded-full
              text-xs sm:text-sm font-semibold
              transition-all duration-200
              active:scale-95
              ${
                canSubmit
                  ? "bg-[#B90007] text-white hover:bg-[#e01515] shadow-[0_0_14px_rgba(185,0,7,0.6)]"
                  : "bg-[#2a2a2a] text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {saving ? (
              <>
                <i className="ri-loader-4-line animate-spin text-sm" />
                Enviando...
              </>
            ) : (
              <>
                <i className="ri-upload-cloud-line text-sm" />
                Enviar para análise
              </>
            )}
          </button>
        </div>

      </SectionCard>
    </div>
  );
}
