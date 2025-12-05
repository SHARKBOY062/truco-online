import { useState } from "react";
import GameControls from "./components/GameControls";
import TrucoTable from "./components/TrucoTable";
import GameHistory from "./components/GameHistory";

export default function GameRoom() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white px-4 py-8">

      {/* ======= TOPO (sala + controles) ======= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CONTROLES (lado esquerdo) */}
        <div className="col-span-1">
          <GameControls />
        </div>

        {/* MESA (lado direito, ocupa 2 colunas) */}
        <div className="col-span-1 lg:col-span-2">
          <TrucoTable />
        </div>

      </div>

      {/* ======= HISTÓRICO ======= */}
      <div className="mt-10">
        <GameHistory />
      </div>

    </div>
  );
}
