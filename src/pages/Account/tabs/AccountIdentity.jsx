// src/pages/account/tabs/AccountIdentity.jsx
import { useState } from "react";
import SectionCard from "../../../components/account/SectionCard.jsx";
import InputPremium from "../../../components/account/InputPremium.jsx";
import SelectPremium from "../../../components/account/SelectPremium.jsx";
import UploadPremium from "../../../components/account/UploadPremium.jsx";

const DOC_TYPES = ["RG", "CNH", "Passaporte"];

export default function AccountIdentity({ setIdentityDone }) {
  const [form, setForm] = useState({
    fullName: "Jogador Pro",
    documentType: "",
    documentNumber: "",
  });

  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);

  const [saving, setSaving] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!form.documentType || !form.documentNumber || !frontFile || !selfieFile) {
      alert("Preencha os dados e envie pelo menos frente do documento e selfie.");
      return;
    }

    setSaving(true);
    try {
      console.log("ENVIAR DOCUMENTO IDENTIDADE:", {
        form,
        frontFile,
        backFile,
        selfieFile,
      });

      setTimeout(() => {
        setIdentityDone(true);
        alert("Documento de identidade enviado para análise.");
        setSaving(false);
      }, 800);
    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro ao enviar o documento.");
      setSaving(false);
    }
  };

  return (
    <div className="min-w-0">
      <SectionCard title="Comprovante de Identidade">
        <p className="text-[11px] sm:text-xs text-gray-400 mb-5">
          Envie um documento oficial com foto. Os arquivos serão analisados pela
          nossa equipe para validação da sua identidade.
        </p>

        {/* DADOS BÁSICOS DO DOCUMENTO */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <InputPremium
            label="Nome completo (como no documento)"
            value={form.fullName}
            onChange={(v) => handleChange("fullName", v)}
            icon="ri-user-line"
          />

          <SelectPremium
            label="Tipo de documento"
            value={form.documentType}
            onChange={(v) => handleChange("documentType", v)}
            options={DOC_TYPES}
            placeholder="Selecione o documento"
          />

          <InputPremium
            label="Número do documento"
            value={form.documentNumber}
            onChange={(v) => handleChange("documentNumber", v)}
            icon="ri-hashtag"
          />

          <InputPremium
            label="País emissor"
            value="Brasil"
            onChange={() => {}}
            locked
            icon="ri-flag-line"
          />
        </div>

        {/* UPLOADS */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <UploadPremium
            label="Documento (frente)"
            description="Imagem nítida da frente do documento."
            fileName={frontFile?.name}
            onChange={setFrontFile}
            accept="image/*"
          />

          <UploadPremium
            label="Documento (verso)"
            description="Opcional, se existir verso com informações."
            fileName={backFile?.name}
            onChange={setBackFile}
            accept="image/*"
          />

          <UploadPremium
            label="Selfie com documento"
            description="Segure o documento ao lado do rosto."
            fileName={selfieFile?.name}
            onChange={setSelfieFile}
            accept="image/*"
          />
        </div>

        {/* ALERTA */}
        <div className="bg-[#090909] border border-[#262626] rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
          <i className="ri-shield-check-line text-[#B90007] text-xl mt-0.5" />
          <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
            Seus arquivos são armazenados de forma segura e utilizados apenas
            para fins de verificação de identidade conforme exigido pela
            legislação vigente.
          </p>
        </div>

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
            }}
          >
            Limpar uploads
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className={`
              inline-flex items-center justify-center gap-2
              px-5 sm:px-6 py-2.5
              rounded-full
              text-xs sm:text-sm font-semibold
              bg-[#B90007] text-white
              shadow-[0_0_18px_rgba(185,0,7,0.85)]
              hover:bg-[#e01515]
              hover:shadow-[0_0_26px_rgba(185,0,7,1)]
              transition-all duration-200
              active:scale-95
              disabled:opacity-60 disabled:cursor-not-allowed
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
