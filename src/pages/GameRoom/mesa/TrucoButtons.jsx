import { motion } from "framer-motion";

export default function TrucoButtons({ onTruco, onCover, onRun }) {
  return (
    <div className="flex gap-4 justify-center mt-4">

      {/* Cobrir */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="px-6 py-2 bg-blue-600 rounded-lg text-white shadow-lg"
        onClick={onCover}
      >
        Cobrir
      </motion.button>

      {/* TRUCO */}
      <motion.button
        whileHover={{
          scale: 1.2,
          boxShadow: "0 0 25px rgba(0,255,0,0.8)",
        }}
        whileTap={{
          scale: 0.9,
          rotate: [-2, 2, -2, 0],
          transition: { duration: 0.3 },
        }}
        onClick={() => {
          onTruco();
        }}
        className="
          px-6 py-2 bg-green-600 text-white
          rounded-lg font-bold shadow-[0_0_15px_rgba(0,255,0,0.5)]
        "
      >
        TRUCO!
      </motion.button>

      {/* Correr */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="px-6 py-2 bg-red-600 rounded-lg text-white shadow-lg"
        onClick={onRun}
      >
        Correr
      </motion.button>

    </div>
  );
}
