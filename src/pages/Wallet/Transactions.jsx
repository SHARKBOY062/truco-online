import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function Transactions() {

  // DADOS MOCKADOS → Futuramente virão do backend
  const stats = {
    deposits: 1500,
    withdraws: 800,
    bets: 2200,
    wins: 1800,
    losses: 400,
    gamesPlayed: 128,
  };

  const chartData = [
    { name: "Jan", wins: 400, losses: 120 },
    { name: "Fev", wins: 320, losses: 180 },
    { name: "Mar", wins: 500, losses: 140 },
    { name: "Abr", wins: 300, losses: 200 },
    { name: "Mai", wins: 620, losses: 260 },
  ];

  const lastBets = [
    { id: 1, game: "Truco Paulista", amount: 20, result: "pending", date: "Hoje, 14:32" },
    { id: 2, game: "Truco Goiano", amount: 50, result: "lost", date: "Hoje, 13:21" },
    { id: 3, game: "Truco Amazonense", amount: 10, result: "won", date: "Hoje, 12:11" },
  ];

  const wins = lastBets.filter(t => t.result === "won");
  const losses = lastBets.filter(t => t.result === "lost");

  // ===========================
  // CUSTOM DATE FILTER
  // ===========================
  const [showFilter, setShowFilter] = useState(false);
  const [filterRange, setFilterRange] = useState({ start: null, end: null });

  return (
    <div className="pt-10 pb-20 px-4">

      <h1 className="text-3xl font-bold mb-8">Extrato</h1>

      {/* ========================== */}
      {/*        DATE FILTER         */}
      {/* ========================== */}
      <div className="relative mb-8">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-[#111820] border border-gray-700 px-6 py-3 rounded-lg text-white flex items-center gap-2 hover:border-green-500"
        >
          <i className="ri-calendar-line"></i>
          {filterRange.start && filterRange.end
            ? `${filterRange.start} → ${filterRange.end}`
            : "Filtrar por data"}
        </button>

        {showFilter && (
          <div className="
            absolute mt-2 bg-[#0F131A] border border-gray-700 rounded-lg
            p-4 z-50 w-72 shadow-xl
          ">
            <p className="text-sm text-gray-400 mb-2">Período:</p>

            <input
              type="date"
              className="w-full bg-[#111820] border border-gray-700 rounded-lg px-3 py-2 text-sm mb-3"
              onChange={(e) => setFilterRange(r => ({ ...r, start: e.target.value }))}
            />

            <input
              type="date"
              className="w-full bg-[#111820] border border-gray-700 rounded-lg px-3 py-2 text-sm"
              onChange={(e) => setFilterRange(r => ({ ...r, end: e.target.value }))}
            />

            <button
              onClick={() => setShowFilter(false)}
              className="mt-3 w-full bg-green-500 text-black font-semibold py-2 rounded-lg"
            >
              Aplicar
            </button>
          </div>
        )}
      </div>


      {/* ========================== */}
      {/*      STATS CARDS           */}
      {/* ========================== */}

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Total em Depósitos", value: stats.deposits },
          { label: "Total em Saques", value: stats.withdraws },
          { label: "Total Apostado", value: stats.bets },
          { label: "Total Ganho", value: stats.wins },
          { label: "Total Perdido", value: stats.losses },
          { label: "Jogos Jogados", value: stats.gamesPlayed },
        ].map((s, idx) => (
          <div
            key={idx}
            className="bg-[#111820] border border-gray-800 rounded-lg p-5"
          >
            <p className="text-gray-400 text-sm">{s.label}</p>
            <p className="text-2xl font-bold mt-1">R$ {s.value}</p>
          </div>
        ))}
      </div>

      {/* ========================== */}
      {/*         GRÁFICO           */}
      {/* ========================== */}
      <div className="bg-[#111820] border border-gray-800 rounded-lg p-6 mb-10">
        <h2 className="text-xl font-bold mb-4">Evolução de Ganhos e Perdas</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Line type="monotone" dataKey="wins" stroke="#4ade80" strokeWidth={2} />
            <Line type="monotone" dataKey="losses" stroke="#f87171" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ========================== */}
      {/*     LISTA DE APOSTAS       */}
      {/* ========================== */}
      <h2 className="text-xl font-bold mb-4">Últimas Apostas</h2>

      <div className="space-y-3 mb-10">
        {lastBets.map((bet) => (
          <div
            key={bet.id}
            className="bg-[#111820] border border-gray-800 rounded-lg p-4 flex justify-between"
          >
            <div>
              <p className="font-semibold">{bet.game}</p>
              <p className="text-gray-400 text-sm">{bet.date}</p>
            </div>

            <div className="text-right">
              <p className="font-bold">R$ {bet.amount}</p>

              {bet.result === "pending" && (
                <span className="text-yellow-400 text-sm">Pendente</span>
              )}
              {bet.result === "won" && (
                <span className="text-green-400 text-sm">Ganhou</span>
              )}
              {bet.result === "lost" && (
                <span className="text-red-400 text-sm">Perdeu</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ========================== */}
      {/*     ÚLTIMOS GANHOS         */}
      {/* ========================== */}
      <h2 className="text-xl font-bold mb-4">Últimos Ganhos</h2>

      <div className="space-y-3 mb-10">
        {wins.map((t) => (
          <div className="bg-[#111820] border border-gray-800 rounded-lg p-4 flex justify-between">
            <p>{t.game}</p>
            <p className="text-green-400 font-bold">+ R$ {t.amount}</p>
          </div>
        ))}
      </div>

      {/* ========================== */}
      {/*     ÚLTIMAS PERDAS         */}
      {/* ========================== */}
      <h2 className="text-xl font-bold mb-4">Últimas Perdas</h2>

      <div className="space-y-3">
        {losses.map((t) => (
          <div className="bg-[#111820] border border-gray-800 rounded-lg p-4 flex justify-between">
            <p>{t.game}</p>
            <p className="text-red-400 font-bold">- R$ {t.amount}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
