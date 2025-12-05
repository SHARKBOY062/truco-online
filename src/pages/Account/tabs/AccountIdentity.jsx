import UploadCard from "../../../components/UploadCard";

export default function AccountIdentity() {
  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold mb-4">Comprovante de Identidade</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <UploadCard
          title="Frente do Documento"
          status="pendente"
          onUpload={(e) => console.log(e.target.files[0])}
        />

        <UploadCard
          title="Verso do Documento"
          status="pendente"
          onUpload={(e) => console.log(e.target.files[0])}
        />

        <UploadCard
          title="Selfie Segurando o Documento"
          status="pendente"
          onUpload={(e) => console.log(e.target.files[0])}
        />

      </div>

      {/* STATUS FINAL */}
      <div className="bg-[#0F131A] border border-gray-800 p-5 rounded-xl">
        <h3 className="font-medium text-gray-200 mb-3">Status da Verificação</h3>

        <p className="text-gray-400 text-sm mb-4">
          Seus documentos estão em análise. Você será notificado quando forem aprovados.
        </p>

        <button
          className="
            px-5 py-2 rounded-lg bg-green-500 text-black font-semibold
            hover:bg-green-400 transition
          "
        >
          Reenviar Documentação
        </button>
      </div>
    </div>
  );
}
