// src/pages/account/tabs/AccountAddress.jsx
import { useState } from "react";
import SectionCard from "../../../components/account/SectionCard.jsx";
import InputPremium from "../../../components/account/InputPremium.jsx";
import SelectPremium from "../../../components/account/SelectPremium.jsx";
import UploadPremium from "../../../components/account/UploadPremium.jsx";

const ADDRESS_DOC_TYPES = [
  "Conta de Luz",
  "Conta de Água",
  "Conta de Internet",
  "Extrato Bancário",
  "Outro comprovante",
];

export default function AccountAddress({ setAddressDone }) {
  const [form, setForm] = useState({
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    zip: "",
    country: "Brasil",
    documentType: "",
  });

  const [addressFile, setAddressFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (
      !form.street ||
      !form.number ||
      !form.city ||
      !form.state ||
      !form.zip ||
      !form.documentType ||
      !addressFile
    ) {
      alert("Preencha o endereço completo e envie um comprovante.");
      return;
    }

    setSaving(true);
    try {
      console.log("ENVIAR COMPROVANTE DE ENDEREÇO:", {
        form,
        addressFile,
      });

      setTimeout(() => {
        setAddressDone(true);
        alert("Comprovante de endereço enviado para análise.");
        setSaving(false);
      }, 800);
    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro ao enviar o comprovante.");
      setSaving(false);
    }
  };

  return (
    <div className="min-w-0">
      <SectionCard title="Comprovante de Endereço">
        <p className="text-[11px] sm:text-xs text-gray-400 mb-5">
          Informe seu endereço atual e envie um comprovante recente em seu nome
          (emitido há no máximo 90 dias).
        </p>

        {/* ENDEREÇO */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <InputPremium
            label="Logradouro"
            value={form.street}
            onChange={(v) => handleChange("street", v)}
            icon="ri-road-map-line"
            placeholder="Rua / Avenida"
          />

          <InputPremium
            label="Número"
            value={form.number}
            onChange={(v) => handleChange("number", v)}
            icon="ri-hashtag"
          />

          <InputPremium
            label="Complemento"
            value={form.complement}
            onChange={(v) => handleChange("complement", v)}
            placeholder="Apartamento, bloco, etc. (opcional)"
          />

          <InputPremium
            label="Bairro"
            value={form.district}
            onChange={(v) => handleChange("district", v)}
          />

          <InputPremium
            label="Cidade"
            value={form.city}
            onChange={(v) => handleChange("city", v)}
            icon="ri-building-4-line"
          />

          <InputPremium
            label="Estado"
            value={form.state}
            onChange={(v) => handleChange("state", v)}
            placeholder="Ex.: SP"
          />

          <InputPremium
            label="CEP"
            value={form.zip}
            onChange={(v) => handleChange("zip", v)}
            icon="ri-map-pin-line"
            placeholder="00000-000"
          />

          <InputPremium
            label="País"
            value={form.country}
            onChange={() => {}}
            locked
            icon="ri-flag-line"
          />
        </div>

        {/* TIPO DE DOCUMENTO + UPLOAD */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <SelectPremium
            label="Tipo de comprovante"
            value={form.documentType}
            onChange={(v) => handleChange("documentType", v)}
            options={ADDRESS_DOC_TYPES}
            placeholder="Selecione o tipo de documento"
            helper="O documento deve estar em seu nome ou em nome de um responsável."
          />

          <UploadPremium
            label="Comprovante de endereço"
            description="PDF ou imagem legível do documento."
            fileName={addressFile?.name}
            onChange={setAddressFile}
            accept="image/*,.pdf"
          />
        </div>

        {/* ALERTA */}
        <div className="bg-[#090909] border border-[#262626] rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
          <i className="ri-information-line text-[#B90007] text-xl mt-0.5" />
          <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
            O endereço informado deve corresponder ao comprovante enviado. Caso
            haja divergência, sua conta poderá exigir nova validação.
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
              setForm((prev) => ({
                ...prev,
                street: "",
                number: "",
                complement: "",
                district: "",
                city: "",
                state: "",
                zip: "",
                documentType: "",
              }));
              setAddressFile(null);
            }}
          >
            Limpar formulário
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
                <i className="ri-check-double-line text-sm" />
                Salvar comprovante
              </>
            )}
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
