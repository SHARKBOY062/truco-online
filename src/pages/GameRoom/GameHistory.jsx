export default function GameHistory() {
  const fakeHistory = [
    { user: "Peixoto", stake: 20, mode: "Truco Paulista", result: "Vitória", profit: "+R$ 40" },
    { user: "João", stake: 10, mode: "Truco Mineiro", result: "Derrota", profit: "-R$ 10" },
    { user: "Maria", stake: 50, mode: "Truco Paulista", result: "Vitória", profit: "+R$ 100" },
    { user: "Lucas", stake: 20, mode: "Truco Gaudério", result: "Vitória", profit: "+R$ 40" },
  ];

  return (
    <div className="bg-[#111820] rounded-xl border border-gray-800 shadow-xl p-6">

      <h2 className="text-lg font-bold mb-4">Histórico Geral de Mesas</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="pb-3">Usuário</th>
              <th className="pb-3">Modo</th>
              <th className="pb-3">Aposta</th>
              <th className="pb-3">Resultado</th>
              <th className="pb-3">Lucro</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {fakeHistory.map((row, i) => (
              <tr key={i} className="border-t border-gray-800">
                <td className="py-3 font-semibold">{row.user}</td>
                <td className="py-3">{row.mode}</td>
                <td className="py-3 text-green-400">R$ {row.stake}</td>
                <td className="py-3">{row.result}</td>
                <td className="py-3 font-bold">{row.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
