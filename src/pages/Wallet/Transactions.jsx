import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";

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
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [lastBets, setLastBets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showFilter, setShowFilter] = useState(false);
  const [filterRange, setFilterRange] = useState({ start: null, end: null });

  // =====================================================================
  // 🔥 BUSCA OS DADOS REAIS DO USUÁRIO
  // =====================================================================
  useEffect(() => {
    async function loadExtract() {
      try {
        const res = await api.get("/extract");

        setStats(res.data.stats);
        setChartData(res.data.chart);
        setVolumeData(res.data.volume);
        setLastBets(res.data.last_bets);

      } catch (err) {
        console.log("Erro ao carregar extrato:", err);
        setStats(null);
      }

      setLoading(false);
    }

    loadExtract();
  }, []);

  // =====================================================================
  // LOADING
  // =====================================================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg">
        Carregando extrato...
      </div>
    );
  }

  // =====================================================================
  // Caso backend ainda não tenha retornado stats
  // =====================================================================
  if (stats === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Nenhum dado encontrado para este usuário.
      </div>
    );
  }

  // Valores filtrados para exibir ganhos/perdas
  const wins = lastBets.filter((t) => t.result === "won");
  const losses = lastBets.filter((t) => t.result === "lost");

  return (
    <div className="min-h-screen bg-[#000000] text-white px-4 sm:px-6 pt-6 pb-16">
      <div className="max-w-6xl mx-auto">

        {/* TÍTULO + RESUMO */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Extrato</h1>
            <p className="text-gray-400 text-sm mt-1">
              Acompanhe seu histórico financeiro dentro da Arena.
            </p>
          </div>

          <div className="bg-[#050505] border border-[#262626] rounded-full px-4 py-2 flex flex-wrap gap-3 text-xs">
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

        {/* ======================= FILTRO POR DATA ======================= */}
        <div className="relative mb-8">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="bg-[#050505] border border-[#262626] px-6 py-3 rounded-full flex items-center gap-2 text-sm"
          >
            <i className="ri-calendar-line text-lg" />
            {filterRange.start ? `${filterRange.start} → ${filterRange.end}` : "Filtrar por data"}
          </button>

          {showFilter && (
            <div className="absolute mt-3 bg-[#050505] border border-[#262626] rounded-2xl p-4 w-72 shadow-xl z-50">
              <p className="text-gray-400 text-sm mb-2">Período:</p>

              <input
                type="date"
                className="w-full bg-[#090909] border border-[#262626] rounded-lg px-3 py-2 text-sm mb-3"
                onChange={(e) => setFilterRange((r) => ({ ...r, start: e.target.value }))}
              />

              <input
                type="date"
                className="w-full bg-[#090909] border border-[#262626] rounded-lg px-3 py-2 text-sm"
                onChange={(e) => setFilterRange((r) => ({ ...r, end: e.target.value }))}
              />

              <button
                onClick={() => setShowFilter(false)}
                className="mt-3 w-full bg-[#B90007] text-white py-2 rounded-lg text-sm"
              >
                Aplicar
              </button>
            </div>
          )}
        </div>

        {/* ======================= CARDS DE ESTATÍSTICA ======================= */}
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
              className="bg-[#050505] border border-[#262626] rounded-2xl p-5 shadow-md relative"
            >
              {s.highlight && (
                <div className="absolute inset-0 bg-[#B90007]/15 pointer-events-none" />
              )}

              <p className="text-gray-400 text-sm">{s.label}</p>
              <p className={`text-2xl font-bold mt-2 ${s.highlight ? "text-[#B90007]" : "text-white"}`}>
                {s.isCount ? s.value : `R$ ${s.value}`}
              </p>
            </div>
          ))}
        </div>

        {/* ======================= GRÁFICOS ======================= */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">

          {/* GANHOS / PERDAS */}
          <div className="bg-[#050505] border border-[#262626] p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-2">Evolução de Ganhos e Perdas</h2>
            <p className="text-gray-400 text-xs mb-4">Acompanhe sua performance mês a mês.</p>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip wrapperStyle={{ background: "#111", borderRadius: "8px" }} />

                <Line type="monotone" dataKey="wins" name="Ganhos" stroke="#B90007" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="losses" name="Perdas" stroke="#888" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Volume */}
          <div className="bg-[#050505] border border-[#262626] p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-2">Volume por Tipo de Operação</h2>
            <p className="text-gray-400 text-xs mb-4">Como o dinheiro se movimenta na plataforma.</p>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip wrapperStyle={{ background: "#111", borderRadius: "8px" }} />
                <Bar dataKey="value" fill="#B90007" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ======================= ÚLTIMAS APOSTAS ======================= */}
        <h2 className="text-xl font-bold mb-4">Últimas Apostas</h2>

        <div className="space-y-3 mb-10">
          {lastBets.map((bet) => (
            <div key={bet.id} className="bg-[#050505] border border-[#262626] rounded-2xl p-4 flex justify-between">
              <div>
                <p className="font-semibold">{bet.game}</p>
                <p className="text-gray-400 text-sm">{bet.date}</p>
              </div>

              <div className="text-right">
                <p className="font-bold">R$ {bet.amount}</p>

                {bet.result === "pending" && <span className="text-yellow-400 text-xs">Pendente</span>}
                {bet.result === "won" && <span className="text-green-400 text-xs">Ganhou</span>}
                {bet.result === "lost" && <span className="text-red-400 text-xs">Perdeu</span>}
              </div>
            </div>
          ))}
        </div>

        {/* ======================= ÚLTIMOS GANHOS ======================= */}
        <h2 className="text-xl font-bold mb-4">Últimos Ganhos</h2>

        <div className="space-y-3 mb-10">
          {wins.map((t) => (
            <div key={t.id} className="bg-[#050505] border border-[#262626] rounded-2xl p-4 flex justify-between">
              <p>{t.game}</p>
              <p className="text-green-400 font-bold">+ R$ {t.amount}</p>
            </div>
          ))}
        </div>

        {/* ======================= ÚLTIMAS PERDAS ======================= */}
        <h2 className="text-xl font-bold mb-4">Últimas Perdas</h2>

        <div className="space-y-3">
          {losses.map((t) => (
            <div key={t.id} className="bg-[#050505] border border-[#262626] rounded-2xl p-4 flex justify-between">
              <p>{t.game}</p>
              <p className="text-red-400 font-bold">- R$ {t.amount}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
