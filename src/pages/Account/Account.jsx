import { useState } from "react";
import AccountInfo from "./tabs/AccountInfo";
import AccountIdentity from "./tabs/AccountIdentity";
import AccountAddress from "./tabs/AccountAddress";

export default function Account() {
  // controla qual aba está ativa
  const [tab, setTab] = useState("info");

  // controle do status das abas (para check ✔)
  const [identityDone, setIdentityDone] = useState(false);
  const [addressDone, setAddressDone] = useState(false);

  return (
    <div className="w-full max-w-[1250px] mx-auto px-4 pt-24 pb-10 flex flex-col lg:flex-row gap-8">

      {/* ============ MENU LATERAL ============ */}
      <aside className="w-full lg:w-80 bg-[#0F131A] border border-gray-800 rounded-xl p-6 space-y-4 shadow-lg">

        <MenuItem
          active={tab === "info"}
          label="Informações da Conta"
          icon="ri-user-line"
          onClick={() => setTab("info")}
        />

        <MenuItem
          active={tab === "identity"}
          label="Comprovante de Identidade"
          icon="ri-id-card-line"
          done={identityDone}
          onClick={() => setTab("identity")}
        />

        <MenuItem
          active={tab === "address"}
          label="Comprovante de Endereço"
          icon="ri-home-4-line"
          done={addressDone}
          onClick={() => setTab("address")}
        />
      </aside>

      {/* ============ CONTEÚDO DAS ABAS ============ */}
      <div className="flex-1">
        {tab === "info" && <AccountInfo />}
        {tab === "identity" && (
          <AccountIdentity setIdentityDone={setIdentityDone} />
        )}
        {tab === "address" && (
          <AccountAddress setAddressDone={setAddressDone} />
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------
   COMPONENTE DO MENU LATERAL
-------------------------------------------- */

function MenuItem({ active, label, icon, done, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-4 py-3 rounded-lg
        border transition-all
        ${active ? "bg-[#1A2029] border-green-500 text-white" : "bg-[#151A22] border-gray-800 text-gray-300 hover:bg-[#1c222c]"}
      `}
    >
      <div className="flex items-center gap-3">
        <i className={`${icon} text-lg`} />
        <span>{label}</span>
      </div>

      {done && (
        <i className="ri-check-line text-green-400 text-xl" />
      )}
    </button>
  );
}
