// src/pages/GameRoom/TrucoRoom.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Mesa from "./mesa/Mesa";
import HUD from "./mesa/HUD";
import EllipseAvatar from "../../assets/Ellipse 1.png";
import FundoMesa from "../../assets/fundo-mesa.png";

export default function TrucoRoom() {
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState("Carregando Jogo...");
  const [showAnimation, setShowAnimation] = useState(false);
  const clickSound = new Audio("/sounds/click.wav");

  // controla loading e texto
  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => setLoadingStep("Carregando Jogo..."), 0));
    timers.push(setTimeout(() => setLoadingStep("Buscando usuários..."), 4000));
    timers.push(setTimeout(() => setLoading(false), 8000));
    return () => timers.forEach(clearTimeout);
  }, []);

  // som de intro assim que aparece o loading
  useEffect(() => {
    const intro = new Audio("/sounds/VE 16 Intro A Min 3.wav");
    intro.volume = 0.8;
    intro.play().catch(() => {});
  }, []);

  // libera animações quando termina o loading
  useEffect(() => {
    if (!loading) setShowAnimation(true);
  }, [loading]);

  // som global de clique
  useEffect(() => {
    const handleClick = () => {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- TELA DE LOADING ---------- */
  if (loading) {
    return (
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${FundoMesa})` }}
      >
        <div className="flex flex-col items-center gap-3 bg-black/50 px-8 py-6 rounded-2xl">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-semibold text-white tracking-wide animate-pulse drop-shadow-lg">
            {loadingStep}
          </p>
        </div>
      </div>
    );
  }

  /* ---------- JOGO ---------- */
  return (
    <div
      className="min-h-screen w-full flex justify-center items-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${FundoMesa})` }}
    >
      <motion.div
        className="relative w-full max-w-7xl aspect-[16/8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* MESA CENTRAL */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, y: 40, opacity: 0 }}
          animate={showAnimation ? { scale: 1, y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5, type: "spring", stiffness: 70 }}
        >
          <Mesa />
        </motion.div>

        {/* HUD */}
        <motion.div
          className="absolute top-6 left-10"
          initial={{ opacity: 0, y: -20 }}
          animate={showAnimation ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <HUD />
        </motion.div>

        {/* PLAYER ESQUERDA */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2"
          initial={{ x: -200, opacity: 0 }}
          animate={showAnimation ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 1.2, type: "spring", stiffness: 60 }}
        >
          <SidePlayerCard label="PLAYER 3" />
        </motion.div>

        {/* PLAYER DIREITA */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2"
          initial={{ x: 200, opacity: 0 }}
          animate={showAnimation ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 1.2, type: "spring", stiffness: 60 }}
        >
          <SidePlayerCard label="PLAYER 3" />
        </motion.div>

        {/* PLAYER INFERIOR + BOTÕES */}
        <motion.div
          className="absolute left-16 -bottom-42 flex items-center gap-6"
          initial={{ y: 150, opacity: 0 }}
          animate={showAnimation ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 1.4, type: "spring", stiffness: 70 }}
        >
          <BottomPlayerCard username="@username" />
          <TrucoButtonsPanel
            balanceLabel="Saldo Atual:"
            balanceValue="R$100,00"
            onTruco={() => console.log("PEDIR TRUCO")}
            onRun={() => console.log("Correr")}
          />
        </motion.div>

        {/* AS 3 CARTAS (ALTURA AUMENTADA ~5cm) */}
        <div className="absolute right-16 -bottom-31 flex gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              onClick={() => {
                clickSound.currentTime = 0;
                clickSound.play().catch(() => {});
              }}
              className="
                w-[80px] h-[130px]
                bg-[#e5e7eb]
                rounded-[10px]
                shadow-[0_16px_30px_rgba(0,0,0,0.4)]
                flex items-end justify-center
                pb-4
                text-[12px] font-semibold
                text-black
                cursor-pointer
                hover:scale-105 transition-transform
              "
              initial={{ y: 120, opacity: 0 }}
              animate={showAnimation ? { y: 0, opacity: 1 } : {}}
              transition={{
                delay: 1.6 + i * 0.15,
                type: "spring",
                stiffness: 80,
              }}
            >
              CARTA
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- COMPONENTES AUXILIARES ---------------- */

function SidePlayerCard({ label }) {
  return (
    <div
      className="
        w-[150px] h-[190px]
        bg-[#a32117]
        rounded-[32px]
        shadow-[0_20px_40px_rgba(0,0,0,0.55)]
        flex flex-col items-center justify-center
      "
    >
      <div className="w-[80px] h-[80px] rounded-full bg-black overflow-hidden">
        <img src={EllipseAvatar} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <span className="mt-5 text-[11px] tracking-[0.16em] uppercase text-white/90">
        {label}
      </span>
    </div>
  );
}

function BottomPlayerCard({ username }) {
  return (
    <div
      className="
        w-[210px] h-[120px]
        bg-[#a32117]
        rounded-[30px]
        shadow-[0_18px_35px_rgba(0,0,0,0.55)]
        flex items-center gap-3
        px-5
      "
    >
      <div className="w-[60px] h-[60px] rounded-full bg-black overflow-hidden">
        <img src={EllipseAvatar} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] text-white/70">PLAYER</span>
        <span className="text-[14px] font-semibold text-white">{username}</span>
      </div>
    </div>
  );
}

/* Painel de botões ao lado do username */
function TrucoButtonsPanel({
  balanceLabel,
  balanceValue,
  onTruco,
  onRun,
}) {
  return (
    <div className="flex items-center gap-4">
      {/* PEDIR TRUCO */}
      <button
        onClick={onTruco}
        className="
          px-8 h-[70px]
          rounded-[999px]
          bg-[#5BFF38]
          text-black
          font-extrabold
          tracking-[0.12em]
          text-sm
          shadow-[0_16px_30px_rgba(0,0,0,0.4)]
          uppercase
          hover:brightness-110
          transition
        "
      >
        PEDIR TRUCO
      </button>

      {/* Correr */}
      <button
        onClick={onRun}
        className="
          px-10 h-[70px]
          rounded-[999px]
          bg-[#8b2616]
          text-white
          font-semibold
          tracking-[0.14em]
          text-sm
          shadow-[0_16px_30px_rgba(0,0,0,0.4)]
          uppercase
          hover:brightness-110
          transition
        "
      >
        CORRER
      </button>

      {/* Saldo Atual */}
      <div
        className="
          px-8 h-[70px]
          rounded-[999px]
          bg-[#8b2616]
          text-white
          shadow-[0_16px_30px_rgba(0,0,0,0.4)]
          flex flex-col justify-center
        "
      >
        <span className="text-sm font-medium">{balanceLabel}</span>
        <span className="text-lg font-semibold">{balanceValue}</span>
      </div>
    </div>
  );
}
