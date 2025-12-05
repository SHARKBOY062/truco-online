import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-[#0F131A] text-white pt-20">

      {/* Container principal. max-w-[1250px] e mx-auto centralizam em telas maiores. */}
      {/* O overflow-x-hidden garante que o container pai não crie um scroll horizontal desnecessário. */}
      <div className="w-full max-w-[1250px] mx-auto px-4 overflow-x-hidden">

        {/* BANNERS */}
        <div className="mb-8">
          <BannerCarousel />
        </div>

        {/* MODOS DE JOGO (CARROSSEL SUPERIOR) */}
        <h2 className="text-2xl font-bold mb-4">Modos de Jogo</h2>

        {/* CORREÇÃO CARROSSEL: flex, space-x-4, overflow-x-auto, flex-shrink-0 nos itens internos. */}
        <div 
          className="flex space-x-4 overflow-x-auto p-1 
          scrollbar-hide snap-x snap-mandatory"
        >
          {trucoModes.map((m) => (
            <div
              key={m.name}
              className="w-36 h-48 sm:w-48 sm:h-64 rounded-xl bg-[#151a22]
              border border-gray-800 hover:border-green-500 transition relative 
              overflow-hidden flex-shrink-0 snap-start"
            >
              <img
                src={m.img}
                alt={m.name}
                className="w-full h-full object-contain p-2" 
              />

              <button
                className="absolute inset-0 hidden sm:flex justify-center items-center
                opacity-0 hover:opacity-100 transition"
              >
                <span className="bg-green-500 text-black px-6 py-2 rounded-full font-bold">
                  Jogar Agora
                </span>
              </button>

              <button
                className="sm:hidden absolute inset-0"
                onClick={() => alert(`Entrar em ${m.name}`)}
              />
            </div>
          ))}
        </div>

        {/* MESAS DISPONÍVEIS (CARROSSEL INFERIOR) */}
        <h2 className="text-2xl font-bold mt-10 mb-4">Mesas Disponíveis</h2>

        {/* CORREÇÃO CARROSSEL: flex, space-x-4, overflow-x-auto, flex-shrink-0 nos itens internos. */}
        <div 
          className="flex space-x-4 overflow-x-auto p-1 
          scrollbar-hide snap-x snap-mandatory"
        >
          {exampleTables.map((t) => (
            <div
              key={t.id}
              className="w-40 sm:w-52 rounded-xl bg-[#111820]
              border border-gray-800 hover:border-green-500 transition relative flex-shrink-0 snap-start"
            >
              <div className="h-28 sm:h-36 bg-gray-800 flex justify-center items-center">
                <img
                  src={t.img}
                  className="w-full h-full object-contain p-3" 
                />
              </div>

              <div className="p-3 text-base">
                <p className="font-bold">Mesa #{t.id}</p>
                <p className="text-gray-400">{t.mode}</p>
                <p className="text-gray-400">Stake: R$ {t.stake}</p>
              </div>

              <div
                className="hidden sm:block absolute bottom-0 w-full p-3 
              opacity-0 hover:opacity-100 transition"
              >
                <Button className="bg-green-500 text-black font-bold w-full py-2">
                  Entrar
                </Button>
              </div>

              <button
                className="sm:hidden absolute inset-0"
                onClick={() => alert(`Entrar na mesa ${t.id}`)}
              />
            </div>
          ))}
        </div>

        {/* CRIAR APOSTA */}
        <div className="bg-[#111820] p-6 rounded-xl border border-gray-800 mt-10 mb-20">
          <h2 className="text-2xl font-semibold mb-6">Criar Aposta</h2>

          <div className="bg-gray-900 border border-gray-700 p-5 rounded-xl mb-10">
            <h3 className="text-lg font-bold">Convide amigos para jogar!</h3>
            <p className="text-gray-400 text-base mb-4">
              Gere um link exclusivo para convidar seus amigos.
            </p>
            <Button className="bg-green-500 text-black font-bold w-full py-3">
              Gerar Link de Convite
            </Button>
          </div>

          {/* GRID RESPONSIVO: grid-cols-1 no mobile, grid-cols-2 em telas maiores */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-2 text-lg">Valor do Stake</p>
              <StakeSelector
                stakes={stakes}
                value={selectedStake}
                onChange={setSelectedStake}
              />
            </div>

            <div>
              <p className="text-gray-300 mb-2 text-lg">Estilo de Truco</p>
              <ModeSelector
                modes={trucoModes}
                selected={selectedMode}
                onChange={setSelectedMode}
              />
            </div>
          </div>

          <div className="mt-8">
            <Button
              className="bg-green-500 text-black font-bold w-full py-3"
              onClick={() => {
                if (!selectedMode || !selectedStake)
                  return alert("Selecione stake e modo!");
                alert(
                  `Mesa criada:\n${selectedMode}\nValor: R$ ${selectedStake}`
                );
              }}
            >
              Criar Mesa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}