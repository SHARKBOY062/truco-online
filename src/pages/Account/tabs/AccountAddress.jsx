import { useState } from "react";
import SectionCard from "../../../components/account/SectionCard";
import UploadPremium from "../../../components/account/UploadPremium";
import SelectPremium from "../../../components/account/SelectPremium";
import InputPremium from "../../../components/account/InputPremium";

const documentTypes = [
  "Conta de Luz",
  "Conta de Água",
  "Conta de Internet",
  "Extrato Bancário",
  "Contrato de Aluguel",
  "Outros"
];

export default function AccountAddress() {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("");
  const [status, setStatus] = useState("pendente"); // pendente, aprovado, rejeitado
  const [addressExtracted, setAddressExtracted] = useState(null);

  const handleUpload = (f) => {
    setFile(f);

    // Simulação de OCR
    setTimeout(() => {
      setAddressExtracted({
        street: "Rua das Flores, 112",
        city: "Caldas Novas",
        state: "GO",
        zip: "75690000",
      });

      setStatus("pendente");
    }, 1000);
  };

  return (
    <SectionCard title="Comprovante de Endereço">

      {/* Tipo de documento */}
      <SelectPremium
        label="Tipo do Documento"
        value={docType}
        onChange={setDocType}
        options={documentTypes}
      />

      {/* Upload */}
      <UploadPremium
        label="Upload do Documento"
        file={file}
        onChange={handleUpload}
      />

      {/* Status */}
      <div className="mt-6">
        <p className="text-gray-300 mb-2 text-sm">Status do Documento</p>

        {status === "pendente" && (
          <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">
            🔄 Em análise
          </span>
        )}

        {status === "aprovado" && (
          <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-500/40">
            ✔ Aprovado
          </span>
        )}

        {status === "rejeitado" && (
          <div>
            <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 border border-red-500/40">
              ✖ Rejeitado
            </span>

            <p className="text-red-400 text-sm mt-2">
              Documento inválido. Envie novamente.
            </p>

            <button
              className="mt-3 bg-green-500 text-black px-4 py-2 rounded-full hover:bg-green-400 transition"
              onClick={() => {
                setFile(null);
                setStatus("pendente");
              }}
            >
              Reenviar Documento
            </button>
          </div>
        )}
      </div>

      {/* Endereço OCR */}
      {addressExtracted && (
        <div className="mt-8 p-5 border border-gray-700 rounded-xl bg-[#10151b]">
          <p className="text-gray-300 font-semibold mb-3">
            Endereço Detectado
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputPremium label="Endereço" value={addressExtracted.street} locked />
            <InputPremium label="Cidade" value={addressExtracted.city} locked />
            <InputPremium label="Estado" value={addressExtracted.state} locked />
            <InputPremium label="CEP" value={addressExtracted.zip} locked />
          </div>
        </div>
      )}

    </SectionCard>
  );
}
