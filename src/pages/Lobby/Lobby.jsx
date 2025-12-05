// src/pages/Lobby/Lobby.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import StakeSelector from "../../components/StakeSelector";
import ModeSelector from "../../components/ModeSelector";
import BannerCarousel from "../../components/BannerCarousel";

import paulistaImg from "../../assets/truco-paulista.png";
import mineiroImg from "../../assets/truco-mineiro.png";
import gauchoImg from "../../assets/truco-gauderio.png";
import goianoImg from "../../assets/truco-goiano.png";
import baianoImg from "../../assets/truco-baiano.png";
import amazonenseImg from "../../assets/truco-amazonense.png";

const trucoModes = [
  { name: "Truco Paulista", img: paulistaImg },
  { name: "Truco Mineiro", img: mineiroImg },
  { name: "Truco Gaudério (RS)", img: gauchoImg },
  { name: "Truco Goiano", img: goianoImg },
  { name: "Truco Baiano", img: baianoImg },
  { name: "Truco Amazonense", img: amazonenseImg },
];

const stakes = [
  2, 5, 10, 20, 40, 50, 80, 100,
  200, 500, 1000, 2000, 5000,
  10000, 20000, 50000,
];

export default function Lobby() {
  const navigate = useNavigate();

  const [selectedStake, setSelectedStake] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  const exampleTables = [
    { id: 101, mode: "Truco Paulista", stake: 10, img: paulistaImg },
    { id: 102, mode: "Truco Mineiro", stake: 20, img: mineiroImg },
    { id: 103, mode: "Truco Gaudério (RS)", stake: 5, img: gauchoImg },
    { id: 104, mode: "Truco Goiano", stake: 50, img: goianoImg },
    { id: 105, mode: "Truco Baiano", stake: 40, img: baianoImg },
    { id: 106, mode: "Truco Amazonense", stake: 80, img: amazonenseImg },
  ];

  const goToTrucoPaulista = () => {
    navigate("/game/truco/paulista");
  };

  const handleCreateTable = () => {
    if (!selectedMode || !selectedStake) {
      alert("Selecione o valor do stake e o estilo de truco.");
      return;
    }

    alert(
      `Mesa criada com sucesso!\n\nModo: ${selectedMode}\nValor: R$ ${selectedStake}`
    );
  };

  return (
    <main className="min-h-screen bg-black text-white pt-[72px] sm:pt-[80px]">
      <div className="w-full max-w-[1250px] mx-auto px-3 sm:px-4 md:px-6 overflow-x-hidden animate-fade-in">

        {/* BANNERS */}
        <section aria-label="Banners promocionais" className="mb-6 sm:mb-8">
          <BannerCarousel />
        </section>

        {/* MODOS DE JOGO */}
        <section aria-label="Modos de Jogo" className="mb-8 sm:mb-10">
          <div className="flex items-baseline justify-between mb-2 sm:mb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#B90007] shadow-[0_0_12px_rgba(185,0,7,0.9)]" />
                Modos de Jogo
              </h2>
              <p className="mt-1 text-[11px] sm:text-xs text-gray-400">
                Escolha a variação de truco que você quer jogar agora.
              </p>
            </div>

            <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">
              Arraste para o lado
            </span>
          </div>

          <div className="flex gap-3 sm:gap-4 overflow-x-auto custom-scrollbar-horizontal py-2 snap-x snap-mandatory">
            {trucoModes.map((m) => (
              <article
                key={m.name}
                className="relative flex-shrink-0 snap-start group"
              >
                <div className="w-[140px] sm:w-[170px] md:w-[200px]">
                  <div className="relative w-full pb-[140%] rounded-2xl overflow-hidden card-particles">
                    {/* CARD BASE */}
                    <div
                      className="
                        absolute inset-0 rounded-2xl
                        bg-gradient-to-b from-[#111111] via-[#050505] to-black
                        card-glow
                        transition-transform duration-300
                        group-hover:-translate-y-1 group-hover:scale-[1.02]
                        group-hover:shadow-[0_22px_55px_rgba(0,0,0,1)]
                      "
                    >
                      <img
                        src={m.img}
                        alt={m.name}
                        className="
                          w-full h-full object-cover rounded-2xl
                          transition-transform duration-300
                          group-hover:scale-[1.05]
                        "
                        draggable={false}
                      />

                      <div
                        className="
                          absolute inset-0 rounded-2xl border border-white/5
                          group-hover:border-[#B90007]/85
                          transition-colors duration-300
                        "
                      />
                    </div>

                    {/* HOVER DESKTOP - BOTÃO CENTRO */}
                    <button
                      type="button"
                      className="
                        hidden sm:flex absolute inset-0 items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        bg-black/45 rounded-2xl backdrop-blur-[3px]
                      "
                      onClick={goToTrucoPaulista}
                    >
                      <Button
                        size="sm"
                        className="
                          !bg-[#B90007]
                          !shadow-[0_0_20px_rgba(185,0,7,1)]
                          border border-[#ff8080]/70
                        "
                      >
                        Jogar Agora
                      </Button>
                    </button>

                    {/* MOBILE - CARD INTEIRO CLICÁVEL */}
                    <button
                      type="button"
                      className="sm:hidden absolute inset-0"
                      onClick={goToTrucoPaulista}
                      aria-label={`Entrar em ${m.name}`}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* MESAS DISPONÍVEIS */}
        <section aria-label="Mesas Disponíveis" className="mb-8 sm:mb-10">
          <div className="flex items-baseline justify-between mb-2 sm:mb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#B90007] shadow-[0_0_12px_rgba(185,0,7,0.9)]" />
                Mesas Disponíveis
              </h2>
              <p className="mt-1 text-[11px] sm:text-xs text-gray-400">
                Entre direto em uma mesa pública com aposta definida.
              </p>
            </div>

            <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">
              Arraste para o lado
            </span>
          </div>

          <div className="flex gap-3 sm:gap-4 overflow-x-auto custom-scrollbar-horizontal py-2 snap-x snap-mandatory">
            {exampleTables.map((t) => (
              <article
                key={t.id}
                className="relative flex-shrink-0 snap-start group"
              >
                <div className="w-[150px] sm:w-[180px] md:w-[210px]">
                  <div className="relative w-full pb-[150%] rounded-2xl overflow-hidden card-particles">
                    {/* IMAGEM DA MESA */}
                    <img
                      src={t.img}
                      alt={t.mode}
                      className="
                        absolute inset-0 w-full h-full
                        object-cover rounded-2xl
                        shadow-[0_10px_30px_rgba(0,0,0,0.95)]
                        transition-transform duration-300
                        group-hover:scale-[1.05] group-hover:-translate-y-1
                      "
                      draggable={false}
                    />

                    {/* OVERLAY GRADIENT + INFO */}
                    <div
                      className="
                        absolute inset-x-0 bottom-0 p-2 sm:p-3
                        bg-gradient-to-t from-black/96 via-black/80 to-transparent
                        rounded-b-2xl
                        flex flex-col gap-1
                        backdrop-blur-[2px]
                      "
                    >
                      {/* sombra de base atrás do texto */}
                      <div className="absolute inset-x-1 bottom-1 top-auto h-16 rounded-xl bg-black/70 blur-[3px]" />

                      <div className="relative flex flex-col gap-0.5">
                        <p className="font-bold text-xs sm:text-sm leading-tight text-soft-shadow text-white">
                          Mesa #{t.id}
                        </p>
                        <p className="text-[11px] sm:text-xs text-gray-100 truncate text-soft-shadow">
                          {t.mode}
                        </p>
                        <p className="text-[11px] sm:text-xs text-gray-100 text-soft-shadow">
                          Stake:{" "}
                          <span className="font-semibold">R$ {t.stake}</span>
                        </p>

                        {/* Desktop: botão visível */}
                        <div className="hidden sm:block mt-1">
                          <Button
                            size="sm"
                            className="
                              w-full
                              !bg-[#B90007]
                              !shadow-[0_0_16px_rgba(185,0,7,0.9)]
                            "
                            onClick={goToTrucoPaulista}
                          >
                            Entrar
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Borda neon leve */}
                    <div
                      className="
                        absolute inset-0 rounded-2xl border border-white/5
                        group-hover:border-[#B90007]/85
                        transition-colors duration-300
                      "
                    />

                    {/* Mobile - card inteiro clica */}
                    <button
                      type="button"
                      className="sm:hidden absolute inset-0"
                      onClick={goToTrucoPaulista}
                      aria-label={`Entrar na mesa ${t.id}`}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CRIAR APOSTA */}
        <section
          aria-label="Criar Aposta"
          className="
            relative mb-20
            rounded-2xl border border-[#1f1f1f]
            bg-gradient-to-b from-black via-[#050505] to-black
            shadow-[0_24px_70px_rgba(0,0,0,1)]
            overflow-hidden
          "
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5" />

          <div className="relative p-4 sm:p-6 md:p-7 space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-[#B90007] animate-gold-pulse" />
                Criar Aposta
              </h2>
              <p className="mt-1 text-[11px] sm:text-xs text-gray-400">
                Configure uma mesa privada escolhendo aposta e estilo de truco.
              </p>
            </div>

            {/* BLOCO CONVITE */}
            <div className="bg-black/90 border border-[#262626] p-4 sm:p-5 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,1)]">
              <h3 className="text-base sm:text-lg font-bold mb-1">
                Convide amigos para jogar!
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">
                Gere um link exclusivo para convidar seus amigos e iniciar uma
                mesa privada com o estilo de truco que você escolher.
              </p>
              <Button
                size="md"
                className="w-full !bg-[#B90007]"
              >
                Gerar Link de Convite
              </Button>
            </div>

            {/* STAKE + MODO */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <p className="text-gray-300 mb-2 text-sm sm:text-lg">
                  Valor do Stake
                </p>
                <StakeSelector
                  stakes={stakes}
                  value={selectedStake}
                  onChange={setSelectedStake}
                />
              </div>

              <div>
                <p className="text-gray-300 mb-2 text-sm sm:text-lg">
                  Estilo de Truco
                </p>

                <ModeSelector
                  modes={trucoModes}
                  selected={selectedMode}
                  onChange={setSelectedMode}
                />
              </div>
            </div>

            {/* BOTÃO CRIAR MESA */}
            <div className="pt-2">
              <Button
                size="lg"
                className="w-full !bg-[#B90007]"
                onClick={handleCreateTable}
              >
                Criar Mesa
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
