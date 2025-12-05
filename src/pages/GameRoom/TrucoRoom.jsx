import { useState } from "react";
import Mesa from "./mesa/Mesa";
import HUD from "./mesa/HUD";
import Hand from "./components/Hand";
import TrucoButtons from "./mesa/TrucoButtons";

export default function TrucoRoom() {
  const [mode, setMode] = useState("2x2");

  const teamA = { round: 1, points: 0, tentos: 0, games: 0 };
  const teamB = { round: 1, points: 0, tentos: 0, games: 0 };

  const hand = [
    { rank: "3", suit: "♣" },
    { rank: "A", suit: "♠" },
    { rank: "7", suit: "♦" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#05060a] to-[#080b12] text-white flex justify-center">
      <div className="w-full max-w-6xl px-3 sm:px-4 pb-8 sm:pb-12 flex flex-col items-center">
        {/* HEADER */}
        <header className="w-full flex flex-col items-center mt-4 sm:mt-6 gap-2 sm:gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide text-center">
            Truco Paulista{" "}
            <span className="block sm:inline text-xs sm:text-sm md:text-base font-normal text-gray-400 sm:ml-1">
              — {mode}
            </span>
          </h1>

          {/* toggle 1x1 / 2x2 */}
          <div className="flex items-center justify-center">
            <div className="inline-flex rounded-full bg-[#111622] p-1 border border-white/10 shadow-[0_0_18px_rgba(0,0,0,0.7)] text-xs sm:text-sm">
              <button
                onClick={() => setMode("1x1")}
                className={`px-3 sm:px-4 py-1 rounded-full transition-all ${
                  mode === "1x1"
                    ? "bg-[#1f2937] text-white shadow-[0_0_10px_rgba(0,0,0,0.7)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                1x1
              </button>
              <button
                onClick={() => setMode("2x2")}
                className={`px-3 sm:px-4 py-1 rounded-full transition-all ${
                  mode === "2x2"
                    ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                2x2
              </button>
            </div>
          </div>
        </header>

        {/* CARD PRINCIPAL (HUD + MESA) */}
        <section
          className="
            w-full mt-4 sm:mt-6
            rounded-[24px] sm:rounded-[32px]
            bg-[#070b12]
            border border-white/10
            shadow-[0_20px_40px_rgba(0,0,0,0.85)]
            px-2 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-6
            flex flex-col items-center
          "
        >
          <div className="w-full flex justify-center mb-3 sm:mb-4 px-1 sm:px-0">
            <HUD teamA={teamA} teamB={teamB} mode={mode} />
          </div>

          <div className="w-full">
            <Mesa mode={mode} />
          </div>
        </section>

        {/* PAINEL INFERIOR */}
        <section
          className="
            w-full mt-4 sm:mt-6
            rounded-2xl sm:rounded-3xl
            bg-[#05070d]
            border border-white/5
            shadow-[0_14px_30px_rgba(0,0,0,0.75)]
            flex flex-col items-center
            px-3 sm:px-4 py-4 sm:py-5
            gap-3 sm:gap-4
          "
        >
          {/* linha dourada top */}
          <div className="w-full h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-400/60 to-amber-500/0 mb-1 sm:mb-2" />

          {/* status */}
          <div className="w-full flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm md:text-base">
            <span className="text-emerald-400 font-semibold">
              Você: <span className="font-bold">0</span>
            </span>
            <span className="text-gray-200">
              Rodada: <span className="font-bold">1</span>
            </span>
            <span className="text-red-400 font-semibold">
              Oponentes: <span className="font-bold">0</span>
            </span>
            <span className="text-emerald-300 text-[11px] sm:text-xs">
              Blind: <span className="font-semibold">R$ 1,00</span>
            </span>
          </div>

          {/* mão */}
          <Hand cards={hand} />

          {/* botões */}
          <TrucoButtons
            onTruco={() => console.log("TRUCO!")}
            onCover={() => console.log("Cobrir")}
            onRun={() => console.log("Correr")}
          />
        </section>
      </div>
    </div>
  );
}
