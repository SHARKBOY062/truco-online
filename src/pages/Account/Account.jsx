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
    <div className="w-full max-w-[1250px] mx-auto px-4 sm:px-5 md:px-6 pt-20 sm:pt-24 pb-10 flex flex-col lg:flex-row gap-6 sm:gap-8">
      {/* ============ MENU LATERAL ============ */}
      <aside
        className="
          w-full lg:w-80
          bg-[#050505]
          border border-[#262626]
          rounded-2xl
          p-5 sm:p-6
          shadow-[0_22px_70px_rgba(0,0,0,0.95)]
          space-y-5
          lg:sticky lg:top-24
        "
      >
        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-[#B90007] shadow-[0_0_14px_rgba(185,0,7,0.9)]" />
            Minha Conta
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-500 leading-snug">
            Gerencie seus dados pessoais, documentos e informações de endereço
            em um só lugar.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <MenuItem
            active={tab === "info"}
            label="Informações da Conta"
            icon="ri-user-line"
            subtitle="Dados básicos e contato"
            onClick={() => setTab("info")}
          />

          <MenuItem
            active={tab === "identity"}
            label="Comprovante de Identidade"
            icon="ri-id-card-line"
            subtitle="Documento oficial com foto"
            done={identityDone}
            onClick={() => setTab("identity")}
          />

          <MenuItem
            active={tab === "address"}
            label="Comprovante de Endereço"
            icon="ri-home-4-line"
            subtitle="Residência atual"
            done={addressDone}
            onClick={() => setTab("address")}
          />
        </div>

        {/* Pequeno resumo de status */}
        <div className="mt-4 pt-4 border-t border-[#1b1b1b] text-[11px] sm:text-xs text-gray-500 space-y-1.5">
          <p className="flex items-center justify-between">
            <span>Identidade</span>
            <StatusPill done={identityDone} />
          </p>
          <p className="flex items-center justify-between">
            <span>Endereço</span>
            <StatusPill done={addressDone} />
          </p>
        </div>
      </aside>

      {/* ============ CONTEÚDO DAS ABAS ============ */}
      <div className="flex-1 min-w-0">
        {tab === "info" && <AccountInfo />}
        {tab === "identity" && (
          <AccountIdentity setIdentityDone={setIdentityDone} />
        )}
        {tab === "address" && <AccountAddress setAddressDone={setAddressDone} />}
      </div>
    </div>
  );
}

/* -------------------------------------------
   COMPONENTE DO MENU LATERAL
-------------------------------------------- */

function MenuItem({ active, label, icon, done, onClick, subtitle }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        w-full
        flex items-center justify-between
        px-3.5 sm:px-4 py-2.5 sm:py-3
        rounded-xl
        border
        transition-all duration-200
        text-left
        group
        ${
          active
            ? "bg-[#080808] border-[#B90007] text-white shadow-[0_0_18px_rgba(185,0,7,0.8)]"
            : "bg-[#050505] border-[#262626] text-gray-300 hover:bg-[#101010] hover:border-[#3a3a3a]"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`
            w-9 h-9 sm:w-10 sm:h-10
            rounded-xl
            flex items-center justify-center
            text-base sm:text-lg
            transition-all
            ${
              active
                ? "bg-[#B90007] text-white shadow-[0_0_18px_rgba(185,0,7,0.9)]"
                : "bg-[#0b0b0b] text-gray-300 group-hover:bg-[#111111]"
            }
          `}
        >
          <i className={icon} />
        </div>

        <div className="flex flex-col">
          <span className="text-sm sm:text-base font-medium leading-tight">
            {label}
          </span>
          {subtitle && (
            <span className="text-[11px] sm:text-xs text-gray-500">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {done && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#B90007] font-semibold">
            <i className="ri-check-line text-base" />
            Concluído
          </span>
        )}
        {done && (
          <i className="ri-check-line text-lg text-[#B90007] sm:hidden" />
        )}
        {!done && (
          <span className="text-[10px] sm:text-[11px] text-gray-500">
            {active ? "Em edição" : "Pendente"}
          </span>
        )}
      </div>
    </button>
  );
}

/* -------------------------------------------
   PILL DE STATUS (CONCLUÍDO / PENDENTE)
-------------------------------------------- */

function StatusPill({ done }) {
  if (done) {
    return (
      <span
        className="
          inline-flex items-center gap-1
          px-2.5 py-1
          rounded-full
          text-[10px] sm:text-[11px]
          bg-[#120000]
          border border-[#B90007]
          text-[#B90007]
        "
      >
        <i className="ri-check-line text-xs" />
        Concluído
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex items-center gap-1
        px-2.5 py-1
        rounded-full
        text-[10px] sm:text-[11px]
        bg-[#0a0a0a]
        border border-[#262626]
        text-gray-400
      "
    >
      <i className="ri-time-line text-xs" />
      Pendente
    </span>
  );
}
