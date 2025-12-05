import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Transactions() {
  // =========================
  // MOCKS (futuro: backend)
  // =========================
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

  // Gráfico extra: volume por tipo
  const volumeData = [
    { name: "Depósitos", value: stats.deposits },
    { name: "Saques", value: stats.withdraws },
    { name: "Apostado", value: stats.bets },
  ];

  const lastBets = [
    {
      id: 1,
      game: "Truco Paulista",
      amount: 20,
      result: "pending",
      date: "Hoje, 14:32",
    },
    {
      id: 2,
      game: "Truco Goiano",
      amount: 50,
      result: "lost",
      date: "Hoje, 13:21",
    },
    {
      id: 3,
      game: "Truco Amazonense",
      amount: 10,
      result: "won",
      date: "Hoje, 12:11",
    },
  ];

  const wins = lastBets.filter((t) => t.result === "won");
  const losses = lastBets.filter((t) => t.result === "lost");

  const [showFilter, setShowFilter] = useState(false);
  const [filterRange, setFilterRange] = useState({ start: null, end: null });

  return (
    <div className="min-h-screen bg-[#000000] text-white px-4 sm:px-6 pt-6 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* TÍTULO + RESUMO RÁPIDO */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Extrato (demo)</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Acompanhe seu histórico financeiro dentro da Arena.
            </p>
          </div>

          <div
            className="
              flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs
              bg-[#050505] border border-[#262626] rounded-full px-3 sm:px-4 py-2
            "
          >
            <span className="text-gray-400">Resumo:</span>
            <span className="px-2 py-1 rounded-full bg-[#111111] border border-[#262626]">
              R$ {stats.deposits} em depósitos
            </span>
            <span className="px-2 py-1 rounded-full bg-[#111111] border border-[#262626]">
              R$ {stats.withdraws} em saques
            </span>
            <span className="px-2 py-1 rounded-full bg-[#111111] border border-[#262626]">
              {stats.gamesPlayed} jogos
            </span>
          </div>
        </div>

        {/* FILTRO POR DATA */}
        <div className="relative mb-8">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="
              bg-[#050505] border border-[#262626] px-5 sm:px-6 py-2.5 sm:py-3 
              rounded-full text-white flex items-center gap-2
              hover:border-[#B90007] hover:shadow-[0_0_18px_rgba(185,0,7,0.75)]
              text-sm
            "
          >
            <i className="ri-calendar-line text-lg" />
            {filterRange.start && filterRange.end
              ? `${filterRange.start} → ${filterRange.end}`
              : "Filtrar por data"}
          </button>

          {showFilter && (
            <div
              className="
                absolute mt-3 bg-[#050505] border border-[#262626] rounded-2xl
                p-4 z-50 w-72 shadow-[0_24px_80px_rgba(0,0,0,0.95)]
              "
            >
              <p className="text-sm text-gray-400 mb-2">Período:</p>

              <input
                type="date"
                className="
                  w-full bg-[#090909] border border-[#262626] rounded-lg 
                  px-3 py-2 text-sm mb-3
                "
                onChange={(e) =>
                  setFilterRange((r) => ({ ...r, start: e.target.value }))
                }
              />

              <input
                type="date"
                className="
                  w-full bg-[#090909] border border-[#262626] rounded-lg 
                  px-3 py-2 text-sm
                "
                onChange={(e) =>
                  setFilterRange((r) => ({ ...r, end: e.target.value }))
                }
              />

              <button
                onClick={() => setShowFilter(false)}
                className="
                  mt-3 w-full bg-[#B90007] text-white font-semibold py-2 
                  rounded-lg text-sm hover:bg-[#e01515]
                  shadow-[0_0_16px_rgba(185,0,7,0.9)]
                "
              >
                Aplicar
              </button>
            </div>
          )}
        </div>

        {/* CARDS DE ESTATÍSTICA */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total em Depósitos", value: stats.deposits, highlight: true },
            { label: "Total em Saques", value: stats.withdraws },
            { label: "Total Apostado", value: stats.bets },
            { label: "Total Ganho", value: stats.wins },
            { label: "Total Perdido", value: stats.losses },
            { label: "Jogos Jogados", value: stats.gamesPlayed, isCount: true },
          ].map((s, idx) => (
            <div
              key={idx}
              className="
                bg-[#050505] border border-[#262626] rounded-2xl p-4 sm:p-5
                shadow-[0_14px_50px_rgba(0,0,0,0.8)] relative overflow-hidden
              "
            >
              {/* brilho sutil nos destaques */}
              {s.highlight && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#B90007]/18 via-transparent to-transparent" />
              )}

              <p className="text-gray-400 text-xs sm:text-sm relative z-10">
                {s.label}
              </p>
              <p
                className={`
                  text-xl sm:text-2xl font-bold mt-1 relative z-10
                  ${s.highlight ? "text-[#B90007]" : "text-white"}
                `}
              >
                {s.isCount ? s.value : `R$ ${s.value}`}
              </p>

              {!s.isCount && (
                <p className="text-[11px] text-gray-500 mt-1 relative z-10">
                  {idx === 3
                    ? "Lucro total em jogos."
                    : idx === 4
                    ? "Perdas acumuladas."
                    : "Soma de todas as operações."}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* GRÁFICOS */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* GRÁFICO LINHA */}
          <div
            className="
              bg-[#050505] border border-[#262626] rounded-2xl p-5 sm:p-6
              shadow-[0_18px_60px_rgba(0,0,0,0.9)]
            "
          >
            <h2 className="text-lg sm:text-xl font-bold mb-1">
              Evolução de Ganhos e Perdas
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Acompanhe a performance mês a mês.
            </p>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#050505",
                    borderRadius: "0.75rem",
                    border: "1px solid #262626",
                    color: "#fff",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={30}
                  wrapperStyle={{ fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="wins"
                  name="Ganhos"
                  stroke="#B90007"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="losses"
                  name="Perdas"
                  stroke="#f97373"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* GRÁFICO BARRAS */}
          <div
            className="
              bg-[#050505] border border-[#262626] rounded-2xl p-5 sm:p-6
              shadow-[0_18px_60px_rgba(0,0,0,0.9)]
            "
          >
            <h2 className="text-lg sm:text-xl font-bold mb-1">
              Volume por Tipo de Operação
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Como seu dinheiro está sendo movimentado na plataforma.
            </p>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={volumeData} barCategoryGap={30}>
                <CartesianGrid strokeDasharray="3 3" stroke="#111827" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#050505",
                    borderRadius: "0.75rem",
                    border: "1px solid #262626",
                    color: "#fff",
                  }}
                />
                <Bar
                  dataKey="value"
                  name="Valor"
                  fill="#B90007"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ÚLTIMAS APOSTAS */}
        <h2 className="text-lg sm:text-xl font-bold mb-4">Últimas Apostas</h2>

        <div className="space-y-3 mb-10">
          {lastBets.map((bet) => (
            <div
              key={bet.id}
              className="
                bg-[#050505] border border-[#262626] rounded-2xl p-4
                flex items-center justify-between gap-4
              "
            >
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  {bet.game}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {bet.date}
                </p>
              </div>

              <div className="text-right text-xs sm:text-sm">
                <p className="font-bold text-white">R$ {bet.amount}</p>

                {bet.result === "pending" && (
                  <span className="text-amber-400 text-xs">Pendente</span>
                )}
                {bet.result === "won" && (
                  <span className="text-[#B90007] text-xs font-semibold">
                    Ganhou
                  </span>
                )}
                {bet.result === "lost" && (
                  <span className="text-red-400 text-xs font-semibold">
                    Perdeu
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* GANHOS */}
        <h2 className="text-lg sm:text-xl font-bold mb-4">Últimos Ganhos</h2>

        <div className="space-y-3 mb-10">
          {wins.map((t) => (
            <div
              key={`win-${t.id}`}
              className="
                bg-[#050505] border border-[#262626] rounded-2xl p-4
                flex items-center justify-between
              "
            >
              <p className="text-sm sm:text-base">{t.game}</p>
              <p className="text-[#B90007] font-bold text-sm sm:text-base">
                + R$ {t.amount}
              </p>
            </div>
          ))}
        </div>

        {/* PERDAS */}
        <h2 className="text-lg sm:text-xl font-bold mb-4">Últimas Perdas</h2>

        <div className="space-y-3">
          {losses.map((t) => (
            <div
              key={`loss-${t.id}`}
              className="
                bg-[#050505] border border-[#262626] rounded-2xl p-4
                flex items-center justify-between
              "
            >
              <p className="text-sm sm:text-base">{t.game}</p>
              <p className="text-red-400 font-bold text-sm sm:text-base">
                - R$ {t.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
