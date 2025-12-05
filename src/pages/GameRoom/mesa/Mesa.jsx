// src/pages/GameRoom/mesa/Mesa.jsx
import CardsOnTable from "./CardsOnTable";

export default function Mesa({ mode = "2x2" }) {
  const is2x2 = mode === "2x2";

  return (
    <div className="w-full flex justify-center mt-4 md:mt-6">
      <div className="relative w-full max-w-[720px] md:max-w-[900px] aspect-[4/3]">
        {/* QUADRO EXTERNO ROXO */}
        <div
          className="
            absolute inset-0
            rounded-[32px]
            bg-gradient-to-br from-[#5b1f84] via-[#4b1570] to-[#34104d]
            border border-white/12
            shadow-[0_20px_60px_rgba(0,0,0,0.9)]
          "
        />

        {/* MESA VERDE COM BORDA PRETA + DOURADA */}
        <div className="absolute inset-[10%] flex items-center justify-center">
          <svg
            viewBox="0 0 700 450"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="feltGradient" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#15803d" />
              </radialGradient>
            </defs>

            {/* contorno preto – maiorzinho */}
            <path
              d="
                M 140 40
                Q  70 40  45  95
                Q  20 150  35 205
                Q  55 260  55 285
                Q  55 320  35 360
                Q  20 405  55 435
                Q  90 465  160 465
                Q 280 470 340 455
                Q 350 452 350 452
                Q 420 470 540 465
                Q 610 465 645 435
                Q 680 405 665 360
                Q 645 320 645 285
                Q 645 260 665 205
                Q 680 160 655 100
                Q 620 40 550 40
                Q 470 40 410 60
                Q 380 70 350 70
                Q 320 70 290 60
                Q 230 40 140 40
                Z
              "
              fill="#020617"
            />

            {/* linha dourada */}
            <path
              d="
                M 155 55
                Q  90 55  65 105
                Q  40 155  55 205
                Q  70 245  70 280
                Q  70 315  55 355
                Q  40 395  70 420
                Q 100 445 170 448
                Q 280 452 340 440
                Q 350 438 350 438
                Q 420 452 530 448
                Q 600 445 630 420
                Q 660 395 645 355
                Q 630 315 630 280
                Q 630 245 645 205
                Q 660 165 640 115
                Q 610 55 545 55
                Q 470 55 410 75
                Q 380 85 350 85
                Q 320 85 290 75
                Q 230 55 155 55
                Z
              "
              fill="none"
              stroke="#facc15"
              strokeWidth="8"
            />

            {/* preenchimento verde feltro */}
            <path
              d="
                M 165 65
                Q 100 65  80 110
                Q 60 155  75 205
                Q 90 245  90 280
                Q 90 315  75 350
                Q 60 390  90 415
                Q 120 440 185 442
                Q 280 446 340 435
                Q 350 433 350 433
                Q 420 446 515 442
                Q 580 440 610 415
                Q 640 390 625 350
                Q 610 315 610 280
                Q 610 245 625 205
                Q 640 170 625 125
                Q 600 65 535 65
                Q 470 65 410 85
                Q 380 95 350 95
                Q 320 95 290 85
                Q 230 65 165 65
                Z
              "
              fill="url(#feltGradient)"
            />
          </svg>
        </div>

        {/* AVATARES NAS CURVAS */}
        <AvatarChip top="22%" left="50%" />
        {is2x2 && (
          <>
            <AvatarChip top="50%" left="18%" />
            <AvatarChip top="50%" left="82%" />
          </>
        )}

        {/* CARTAS EM U (TOPO + LATERAIS) */}
        <div className="absolute inset-[10%]">
          <CardsOnTable />
        </div>

        {/* POTE CENTRAL */}
        <div className="absolute left-1/2 bottom-[20%] -translate-x-1/2 flex flex-col items-center gap-1">
          <div className="flex gap-[3px]">
            <Chip color="#f97316" />
            <Chip color="#eab308" />
            <Chip color="#22c55e" />
          </div>
          <span className="px-3 py-[2px] rounded-full bg-black/70 text-[10px] md:text-xs font-semibold tracking-wide text-amber-300 border border-amber-400/60">
            POTE: R$ 3,00
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------- auxiliares ---------------------- */

function AvatarChip({ top, left }) {
  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="
          w-14 h-14 sm:w-16 sm:h-16
          rounded-full
          bg-gradient-to-br from-[#fde68a] via-[#facc15] to-[#b45309]
          shadow-[0_0_20px_rgba(0,0,0,0.85)]
          flex items-center justify-center
        "
      >
        <div
          className="
            w-10 h-10 sm:w-11 sm:h-11
            rounded-full
            bg-[#020617]
            flex items-center justify-center
            text-[18px] sm:text-[20px]
            text-white
          "
        >
          👤
        </div>
      </div>
    </div>
  );
}

function Chip({ color }) {
  return (
    <div
      className="w-3 h-3 rounded-full border border-white/80 shadow-[0_0_8px_rgba(0,0,0,0.7)]"
      style={{ backgroundColor: color }}
    />
  );
}
