import { useState, useRef } from "react";
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

// ---- Função usada para animar carregamento das imagens ---- //
function useSmoothImage() {
  const [loaded, setLoaded] = useState(false);
  const props = {
    loading: "lazy",
    decoding: "async",
    fetchpriority: "low",
    onLoad: () => setLoaded(true),
    style: {
      opacity: loaded ? 1 : 0,
      transition: "opacity .35s ease"
    }
  };
  return props;
}

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

  const goToTrucoPaulista = () => navigate("/game/truco/paulista");

  const modesRowRef = useRef(null);
  const tablesRowRef = useRef(null);

  const scrollRow = (ref, direction = "right") => {
    const el = ref.current;
    if (!el) return;
    const first = el.querySelector("article");
    const baseWidth = first?.clientWidth || 160;
    const delta = direction === "left" ? -baseWidth : baseWidth;
    el.scrollBy({ left: delta, behavior: "smooth" });
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
    <div className="min-h-screen bg-black text-white">
      <div
        className="
          w-full
          max-w-[420px] sm:max-w-[720px] lg:max-w-[1200px]
          mx-auto
          px-2 sm:px-4 md:px-6
          overflow-x-hidden
          animate-fade-in
        "
      >
        {/* BANNER */}
        <section
          aria-label="Banners promocionais"
          className="
            mt-3 sm:mt-4 md:mt-6
            mb-5 sm:mb-7
            w-full max-w-full
          "
        >
          <BannerCarousel />
        </section>

        {/* MODOS DE JOGO */}
        <section aria-label="Modos de Jogo" className="mb-7 sm:mb-9 w-full max-w-full">
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#B90007] shadow-[0_0_6px_rgba(185,0,7,0.9)]" />
                <span className="truncate">Modos de Jogo</span>
              </h2>
              <p className="mt-0.5 text-[10px] text-gray-400">
                Escolha a variação que você quer jogar.
              </p>
            </div>

            <span className="hidden sm:block text-[10px] text-gray-500">Arraste para o lado</span>
          </div>

          <div className="relative w-full max-w-full">
            {/* seta esquerda */}
            <button
              type="button"
              className="
                hidden md:flex items-center justify-center
                absolute left-0 top-1/2 -translate-y-1/2 z-10
                w-7 h-7 rounded-full bg-black/80 border border-white/10
                hover:border-[#B90007]
              "
              onClick={() => scrollRow(modesRowRef, "left")}
              aria-label="Anterior"
            >
              <i className="ri-arrow-left-s-line" />
            </button>

            {/* seta direita */}
            <button
              type="button"
              className="
                hidden md:flex items-center justify-center
                absolute right-0 top-1/2 -translate-y-1/2 z-10
                w-7 h-7 rounded-full bg-black/80 border border-white/10
                hover:border-[#B90007]
              "
              onClick={() => scrollRow(modesRowRef, "right")}
              aria-label="Próximo"
            >
              <i className="ri-arrow-right-s-line" />
            </button>

            <div
              ref={modesRowRef}
              className="
                flex gap-2.5 sm:gap-3.5
                overflow-x-auto scrollbar-hide custom-scrollbar-horizontal
                py-1
                w-full max-w-full
              "
            >
              {trucoModes.map((m) => {
                const imgProps = useSmoothImage();
                return (
                  <article key={m.name} className="flex-shrink-0">
                    <div className="w-[100px] sm:w-[135px] md:w-[165px]">
                      <div className="relative w-full h-28 sm:h-36 md:h-44 rounded-2xl overflow-hidden bg-[#050505]">
                        <img
                          src={m.img}
                          alt={m.name}
                          {...imgProps}
                          className="w-full h-full object-cover rounded-2xl"
                          draggable={false}
                        />

                        <div
                          className={`
                            absolute inset-0 rounded-2xl border
                            ${
                              selectedMode === m.name
                                ? "border-[#B90007]/90 shadow-[0_0_8px_rgba(185,0,7,0.9)]"
                                : "border-white/5 hover:border-[#B90007]/80"
                            }
                            transition-colors duration-200
                          `}
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-2 py-1">
                          <p className="text-[9px] sm:text-[10px] font-semibold text-center text-soft-shadow">
                            {m.name}
                          </p>
                        </div>

                        {/* mobile */}
                        <button
                          type="button"
                          className="sm:hidden absolute inset-0"
                          onClick={goToTrucoPaulista}
                          aria-label={`Entrar em ${m.name}`}
                        />

                        {/* desktop */}
                        <button
                          type="button"
                          className="
                            hidden sm:flex absolute inset-0 items-center justify-center
                            opacity-0 hover:opacity-100 transition-opacity duration-200
                            bg-black/35
                          "
                          onClick={goToTrucoPaulista}
                        >
                          <Button size="xs" className="!bg-[#B90007] !px-3 !py-1 text-[10px]">
                            Jogar
                          </Button>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* MESAS DISPONÍVEIS */}
        <section aria-label="Mesas Disponíveis" className="mb-7 sm:mb-9 w-full max-w-full">
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#B90007]" />
                <span className="truncate">Mesas Disponíveis</span>
              </h2>
              <p className="mt-0.5 text-[10px] text-gray-400">Encontre uma mesa pública e entre em segundos.</p>
            </div>

            <span className="hidden sm:block text-[10px] text-gray-500">Arraste para o lado</span>
          </div>

          <div className="relative w-full max-w-full">
            <button
              type="button"
              className="
                hidden md:flex items-center justify-center
                absolute left-0 top-1/2 -translate-y-1/2 z-10
                w-7 h-7 rounded-full bg-black/80 border border-white/10
                hover:border-[#B90007]
              "
              onClick={() => scrollRow(tablesRowRef, "left")}
              aria-label="Anterior"
            >
              <i className="ri-arrow-left-s-line" />
            </button>

            <button
              type="button"
              className="
                hidden md:flex items-center justify-center
                absolute right-0 top-1/2 -translate-y-1/2 z-10
                w-7 h-7 rounded-full bg-black/80 border border-white/10
                hover:border-[#B90007]
              "
              onClick={() => scrollRow(tablesRowRef, "right")}
              aria-label="Próximo"
            >
              <i className="ri-arrow-right-s-line" />
            </button>

            <div
              ref={tablesRowRef}
              className="
                flex gap-2.5 sm:gap-3.5
                overflow-x-auto scrollbar-hide custom-scrollbar-horizontal
                py-1
                w-full max-w-full
              "
            >
              {exampleTables.map((t) => {
                const imgProps = useSmoothImage();
                return (
                  <article key={t.id} className="flex-shrink-0">
                    <div className="w-[110px] sm:w-[145px] md:w-[175px]">
                      <div className="relative w-full h-30 sm:h-38 md:h-46 rounded-2xl overflow-hidden bg-[#050505]">
                        <img
                          src={t.img}
                          alt={t.mode}
                          {...imgProps}
                          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                          draggable={false}
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-2.5 py-1.5 rounded-b-2xl">
                          <p className="font-bold text-[10px] sm:text-[11px] leading-tight text-soft-shadow">
                            Mesa #{t.id}
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-gray-200 truncate text-soft-shadow">{t.mode}</p>
                          <p className="text-[9px] sm:text-[10px] text-gray-200">
                            Stake: <span className="font-semibold">R$ {t.stake}</span>
                          </p>

                          <div className="hidden sm:block mt-1">
                            <Button size="xs" className="w-full !bg-[#B90007] text-[10px]" onClick={goToTrucoPaulista}>
                              Entrar
                            </Button>
                          </div>
                        </div>

                        {/* mobile */}
                        <button
                          type="button"
                          className="sm:hidden absolute inset-0"
                          onClick={goToTrucoPaulista}
                          aria-label={`Entrar na mesa ${t.id}`}
                        />

                        <div className="absolute inset-0 rounded-2xl border border-white/5 hover:border-[#B90007]/80 transition-colors" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CRIAR APOSTA */}
        <section
          aria-label="Criar Aposta"
          className="
            relative mb-14 w-full max-w-full
            rounded-2xl border border-[#262626]
            bg-gradient-to-b from-black via-[#050505] to-black
            shadow-[0_14px_40px_rgba(0,0,0,0.9)]
            overflow-hidden
          "
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5" />

          <div className="relative p-3.5 sm:p-5 space-y-5">
            <div>
              <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#B90007]" />
                Criar Aposta
              </h2>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                Configure uma mesa privada escolhendo stake e estilo de truco.
              </p>
            </div>

            <div className="bg-black/90 border border-[#333] p-3.5 sm:p-4 rounded-xl">
              <h3 className="text-[12px] sm:text-sm font-bold mb-1">Convide amigos para jogar!</h3>
              <p className="text-gray-400 text-[10px] sm:text-[11px] mb-3">
                Gere um link exclusivo para convidar seus amigos e iniciar uma mesa privada.
              </p>
              <Button size="sm" className="w-full !bg-[#B90007] text-[11px]">
                Gerar Link de Convite
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-300 mb-1.5 text-[12px] sm:text-sm">Valor do Stake</p>
                <StakeSelector stakes={stakes} value={selectedStake} onChange={setSelectedStake} />
              </div>

              <div>
                <p className="text-gray-300 mb-1.5 text-[12px] sm:text-sm">Estilo de Truco</p>
                <ModeSelector modes={trucoModes} selected={selectedMode} onChange={setSelectedMode} />
              </div>
            </div>

            <Button size="md" className="w-full !bg-[#B90007] text-[12px] sm:text-sm" onClick={handleCreateTable}>
              Criar Mesa
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
