import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Mesa from "./mesa/Mesa";
import HUD from "./mesa/HUD";
import EllipseAvatar from "../../assets/Ellipse 1.png";
import FundoMesa from "../../assets/fundo-mesa.png";

export default function TrucoRoom() {
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState("Carregando Jogo...");
  const [showAnimation, setShowAnimation] = useState(false);
  const [showTrucoText, setShowTrucoText] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedBet, setSelectedBet] = useState(null);

  const clickSound = new Audio("/sounds/click.wav");
  const trucoShake = useAnimation();
  const cardsControl = useAnimation();

  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => setLoadingStep("Carregando Jogo..."), 0));
    timers.push(setTimeout(() => setLoadingStep("Buscando usuários..."), 4000));
    timers.push(setTimeout(() => setLoading(false), 8000));
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const intro = new Audio("/sounds/VE 16 Intro A Min 3.wav");
    intro.volume = 0.8;
    intro.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (!loading) setShowAnimation(true);
  }, [loading]);

  const handleTrucoClick = () => {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
    trucoShake.start({
      x: [0, -10, 10, -6, 6, -3, 3, 0],
      transition: { duration: 0.6 },
    });
    setShowTrucoText(true);
    setTimeout(() => setShowTrucoText(false), 2000);
  };

  const handleCardClick = async (index) => {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
    setSelectedCard(index);
    setShowMaintenance(true);

    await cardsControl.start({
      x: 0,
      y: -180,
      scale: 1.4,
      transition: { type: "spring", stiffness: 100 },
    });

    setTimeout(async () => {
      await cardsControl.start({
        x: 0,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 80 },
      });
      setSelectedCard(null);
      setShowMaintenance(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${FundoMesa})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative flex flex-col items-center gap-3 bg-black/60 border border-white/10 px-8 py-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="w-12 h-12 border-4 border-[#5BFF38] border-t-transparent rounded-full animate-spin drop-shadow-[0_0_18px_#5BFF38]" />
          <p className="text-lg font-semibold text-white tracking-[0.18em] uppercase animate-pulse drop-shadow-lg">
            {loadingStep}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full flex justify-center items-center overflow-hidden bg-cover bg-center px-3"
      style={{ backgroundImage: `url(${FundoMesa})` }}
    >
      <div className="absolute inset-0 bg-black/60" />

      {/* Texto TRUCOO!!! */}
      {showTrucoText && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/80 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.h1
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{
              scale: [0.2, 1.2, 1],
              opacity: [0, 1, 1, 0.8],
              y: [30, -10, 0],
            }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-extrabold text-[#5BFF38] tracking-[0.25em] uppercase drop-shadow-[0_0_45px_#5BFF38]"
          >
            TRUCOO!!!
          </motion.h1>
        </motion.div>
      )}

      {/* Tela de manutenção */}
      {showMaintenance && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/80 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.h1
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{
              scale: [0.3, 1.1, 1],
              opacity: [0, 1, 1, 0.8],
            }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-[0.2em] uppercase drop-shadow-[0_0_35px_rgba(255,255,255,0.9)]"
          >
            Jogo em manutenção
          </motion.h1>
        </motion.div>
      )}

      <motion.div
        className="relative w-full flex flex-col items-center md:max-w-7xl z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* HUD topo */}
        <motion.div
          className="
            mt-4 
            md:absolute md:top-[-404px] md:left-20
            md:scale-125 md:drop-shadow-[0_0_24px_rgba(0,0,0,0.9)]
          "
          initial={{ opacity: 0, y: -20 }}
          animate={showAnimation ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <HUD />
        </motion.div>

        {/* Jogadores superiores no mobile */}
        <div className="flex md:hidden w-full justify-around mt-6">
          <SidePlayerCard label="PLAYER 1" />
          <SidePlayerCard label="PLAYER 2" />
        </div>

        {/* Mesa */}
        <motion.div
          className="flex justify-center items-center w-full mt-8 md:absolute md:inset-0"
          initial={{ scale: 0.8, y: 40, opacity: 0 }}
          animate={showAnimation ? { scale: 1, y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5, type: "spring", stiffness: 70 }}
        >
          <Mesa />
        </motion.div>

        {/* Jogadores laterais (desktop) */}
        <motion.div
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2"
          initial={{ x: -200, opacity: 0 }}
          animate={showAnimation ? { x: 0, opacity: 1 } : {}}
        >
          <SidePlayerCard label="PLAYER 3" />
        </motion.div>

        <motion.div
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2"
          initial={{ x: 200, opacity: 0 }}
          animate={showAnimation ? { x: 0, opacity: 1 } : {}}
        >
          <SidePlayerCard label="PLAYER 4" />
        </motion.div>

        {/* VALOR POR PARTIDA E APOSTA — SOMENTE DESKTOP */}
        <div className="hidden md:flex flex-col items-start absolute left-[3%] bottom-[-450px] text-white bg-black/60 border border-white/10 rounded-2xl backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.9)]">
          <div className="px-4 py-3">
            <p className="text-xs font-semibold mb-1 tracking-[0.18em] uppercase text-white/70">
              CONFIGURAÇÃO DA MESA
            </p>
            <p className="text-sm font-semibold mb-1">
              Valor por Partida:{" "}
              <span className="text-[#5BFF38] font-extrabold tracking-[0.12em] uppercase">
                R$ 1,00
              </span>
            </p>
            <p className="text-xs font-semibold mb-2 text-white/70 tracking-[0.16em] uppercase">
              Valor de Aposta:
            </p>
            <div className="flex gap-3">
              {[20, 50, 100, 200].map((valor) => (
                <button
                  key={valor}
                  onClick={() => setSelectedBet(valor)}
                  className={`
                    px-4 py-2 rounded-full text-xs font-bold tracking-[0.12em] uppercase
                    transition-all duration-200
                    ${
                      selectedBet === valor
                        ? "bg-[#5BFF38] text-black shadow-[0_0_18px_rgba(91,255,56,0.85)]"
                        : "bg-black/60 border border-white/20 text-white hover:bg-white hover:text-black hover:shadow-[0_0_18px_rgba(255,255,255,0.5)]"
                    }
                  `}
                >
                  R$ {valor}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cartas 3D */}
        <div
          className="
            flex justify-center gap-4 mb-8
            md:absolute md:left-1/2 md:bottom-[-498px] md:-translate-x-1/2
            [perspective:1000px]
          "
        >
          {[
            { valor: "A", naipe: "♥", cor: "text-red-500", rot: -12 },
            { valor: "K", naipe: "♣", cor: "text-black", rot: 0 },
            { valor: "Q", naipe: "♦", cor: "text-red-500", rot: 12 },
          ].map((carta, i) => (
            <motion.div
              key={i}
              onClick={() => handleCardClick(i)}
              animate={
                selectedCard === i
                  ? cardsControl
                  : showAnimation
                  ? { y: 0, opacity: 1 }
                  : {}
              }
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${carta.rot}deg) rotateX(8deg)`,
              }}
              className={`
                relative
                w-[75px] h-[115px] md:w-[90px] md:h-[135px]
                bg-gradient-to-br from-[#ffffff] via-[#f5f5f5] to-[#dcdcdc]
                rounded-[12px]
                shadow-[0_18px_35px_rgba(0,0,0,0.75)]
                flex flex-col justify-between
                p-2 cursor-pointer hover:scale-110 hover:rotateY(0deg) transition-all duration-300
                border border-gray-300/60
                ${
                  selectedCard === i
                    ? "z-50 ring-2 ring-[#5BFF38] ring-offset-2 ring-offset-black/80"
                    : ""
                }
              `}
              initial={{ y: 120, opacity: 0 }}
              transition={{
                delay: 1.6 + i * 0.15,
                type: "spring",
                stiffness: 80,
              }}
            >
              <div className={`text-sm font-bold ${carta.cor} tracking-[0.08em]`}>
                {carta.valor}
                <span className="ml-0.5">{carta.naipe}</span>
              </div>
              <div className={`flex items-center justify-center text-3xl ${carta.cor}`}>
                {carta.naipe}
              </div>
              <div className={`text-sm font-bold rotate-180 ${carta.cor} text-right tracking-[0.08em]`}>
                {carta.valor}
                <span className="ml-0.5">{carta.naipe}</span>
              </div>
              <div className="absolute inset-0 rounded-[12px] bg-gradient-to-t from-transparent via-white/10 to-white/25 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Botões */}
        <motion.div
          className="
            flex flex-col items-center gap-6
            mt-2 md:mt-0
            md:absolute md:bottom-[-420px] md:left-[82%] md:-translate-x-1/2
          "
          initial={{ y: 150, opacity: 0 }}
          animate={showAnimation ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 1.4, type: "spring", stiffness: 70 }}
        >
          {/* Mobile */}
          <div className="flex justify-between w-full px-4 md:hidden">
            <button
              onClick={() => console.log("Correr")}
              className="flex-1 mx-1 h-[65px] rounded-full bg-gradient-to-br from-[#4b1510] to-[#8b2616] text-white font-semibold text-sm tracking-[0.12em] shadow-[0_0_18px_rgba(0,0,0,0.8)] uppercase hover:brightness-110 transition min-w-[110px] border border-white/10"
            >
              Correr
            </button>
            <motion.button
              animate={trucoShake}
              onClick={handleTrucoClick}
              className="flex-1 mx-1 h-[65px] rounded-full bg-[#5BFF38] text-black font-extrabold text-sm tracking-[0.18em] shadow-[0_0_26px_rgba(91,255,56,0.9)] uppercase hover:brightness-110 transition min-w-[130px] border border-black/40"
            >
              Truco
            </motion.button>
            <div className="flex-1 mx-1 h-[65px] rounded-full bg-gradient-to-br from-[#4b1510] to-[#8b2616] text-white flex flex-col justify-center text-center text-xs shadow-[0_0_18px_rgba(0,0,0,0.9)] min-w-[120px] border border-white/10">
              <span className="font-medium tracking-[0.16em] uppercase text-white/70">
                Saldo
              </span>
              <span className="text-sm font-semibold">R$ 1.280,54</span>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex justify-center gap-4">
            <button
              onClick={() => console.log("Correr")}
              className="h-[55px] px-8 rounded-full bg-gradient-to-br from-[#4b1510] to-[#8b2616] text-white font-semibold text-sm tracking-[0.16em] shadow-[0_0_20px_rgba(0,0,0,0.9)] uppercase hover:brightness-110 transition border border-white/10"
            >
              Correr
            </button>

            <motion.button
              animate={trucoShake}
              onClick={handleTrucoClick}
              className="h-[55px] px-10 rounded-full bg-[#5BFF38] text-black font-extrabold text-sm tracking-[0.22em] shadow-[0_0_28px_rgba(91,255,56,0.95)] uppercase hover:brightness-110 transition border border-black/50"
            >
              Truco
            </motion.button>

            <div className="h-[55px] px-8 rounded-full bg-gradient-to-br from-[#4b1510] to-[#8b2616] text-white flex flex-col justify-center text-center shadow-[0_0_20px_rgba(0,0,0,0.9)] text-xs border border-white/10">
              <span className="font-medium tracking-[0.16em] uppercase text-white/70">
                Saldo
              </span>
              <span className="text-sm font-bold">R$ 1.280,54</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* --- COMPONENTE AUXILIAR --- */
function SidePlayerCard({ label }) {
  return (
    <div className="w-[110px] h-[150px] md:w-[150px] md:h-[190px] bg-gradient-to-b from-[#7a1d14] to-[#3d0c08] rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.75)] flex flex-col items-center justify-center border border-[#ffecd2]/20">
      <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-black overflow-hidden ring-2 ring-[#5BFF38]/70 ring-offset-2 ring-offset-black/70">
        <img src={EllipseAvatar} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <span className="mt-3 md:mt-5 text-[10px] md:text-[11px] tracking-[0.24em] uppercase text-white/90">
        {label}
      </span>
    </div>
  );
}
