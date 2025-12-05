import { useState } from "react";

export default function Invite() {
  const [copied, setCopied] = useState(false);

  const inviteLink = "https://trucoonline.com/invite/SEU_CODIGO";

  const referrals = [
    {
      name: "Carlos Silva",
      date: "02/12/2025",
      deposits: 3,
      totalDeposit: 450,
      commission: 22.50,
      status: "Ativo"
    },
    {
      name: "Maria Souza",
      date: "30/11/2025",
      deposits: 1,
      totalDeposit: 100,
      commission: 5.00,
      status: "Depositou"
    },
    {
      name: "João Pedro",
      date: "29/11/2025",
      deposits: 0,
      totalDeposit: 0,
      commission: 0.00,
      status: "Registrado"
    }
  ];

  const totalCommission = referrals.reduce((acc, r) => acc + r.commission, 0);

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="text-white">

      {/* TÍTULO */}
      <h1 className="text-2xl font-bold mb-6">Indique e Ganhe</h1>

      {/* CARD DO LINK */}
      <div className="bg-[#111820] p-6 rounded-xl border border-gray-800 mb-8">

        <h2 className="text-xl font-semibold mb-4">Seu Link de Convite</h2>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div
            className="flex-1 bg-[#0d1319] border border-gray-700 px-4 py-3 rounded-xl text-sm truncate"
          >
            {inviteLink}
          </div>

          <button
            onClick={copyLink}
            className="
              bg-green-500 text-black font-bold px-6 py-3 rounded-xl 
              hover:bg-green-400 transition w-full md:w-auto
            "
          >
            {copied ? "Copiado!" : "Copiar Link"}
          </button>
        </div>
      </div>

      {/* RESUMO GERAL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        <div className="bg-[#111820] p-6 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Total de Indicados</p>
          <p className="text-2xl font-bold mt-1">{referrals.length}</p>
        </div>

        <div className="bg-[#111820] p-6 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Indicados que Depositaram</p>
          <p className="text-2xl font-bold mt-1">
            {referrals.filter(r => r.totalDeposit > 0).length}
          </p>
        </div>

        <div className="bg-[#111820] p-6 rounded-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Saldo Disponível</p>
          <p className="text-2xl font-bold text-green-400 mt-1">
            R$ {totalCommission.toFixed(2)}
          </p>
        </div>

      </div>

      {/* BOTÃO DE RESGATE */}
      <button
        className="
          bg-green-500 text-black font-bold px-8 py-3 rounded-xl 
          hover:bg-green-400 transition mb-10
        "
      >
        Solicitar Resgate
      </button>

      {/* TABELA DE INDICADOS */}
      <div className="bg-[#111820] p-6 rounded-xl border border-gray-800">

        <h2 className="text-xl font-semibold mb-4">Histórico de Indicações</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-700">
                <th className="py-3">Nome</th>
                <th className="py-3">Data</th>
                <th className="py-3">Depósitos</th>
                <th className="py-3">Valor Total</th>
                <th className="py-3">Comissão</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {referrals.map((r, index) => (
                <tr key={index} className="border-b border-gray-800 text-sm">
                  <td className="py-3">{r.name}</td>
                  <td className="py-3">{r.date}</td>
                  <td className="py-3">{r.deposits}</td>
                  <td className="py-3">R$ {r.totalDeposit.toFixed(2)}</td>
                  <td className="py-3 text-green-400 font-semibold">
                    R$ {r.commission.toFixed(2)}
                  </td>
                  <td className="py-3">
                    {r.status === "Ativo" && (
                      <span className="text-green-400">🟢 Ativo</span>
                    )}
                    {r.status === "Depositou" && (
                      <span className="text-yellow-400">🟡 Depositou</span>
                    )}
                    {r.status === "Registrado" && (
                      <span className="text-gray-400">⚪ Registrado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}
