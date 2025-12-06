// src/pages/account/Account.jsx
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import AccountInfo from "./tabs/AccountInfo";
import AccountIdentity from "./tabs/AccountIdentity";
import AccountAddress from "./tabs/AccountAddress";

export default function Account() {
  const { user } = useAuth();
  const [tab, setTab] = useState("info");

  const [identityDone, setIdentityDone] = useState(false);
  const [addressDone, setAddressDone] = useState(false);

  return (
    <div className="w-full max-w-[1250px] mx-auto px-4 sm:px-5 md:px-6 pt-20 sm:pt-24 pb-10 flex flex-col lg:flex-row gap-6 sm:gap-8">

      {/* ========= MENU LATERAL ========= */}
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
        {/* TÍTULO */}
        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-[#B90007]" />
            Minha Conta
          </h1>

          <p className="text-[11px] sm:text-xs text-gray-400">
            Olá, <span className="text-white font-semibold">{user?.name}</span>
          </p>

          <p className="text-[11px] sm:text-xs text-gray-500 leading-snug">
            Gerencie seus dados pessoais, documentos e endereço.
          </p>
        </div>

        {/* MENU */}
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

        {/* RESUMO DE STATUS */}
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

      {/* ========= CONTEÚDO DAS ABAS ========= */}
      <div className="flex-1 min-w-0">
        {tab === "info" && <AccountInfo user={user} />}
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
   MENU ITEM — sem brilho vermelho,
   sem textos extras, ícone premium
-------------------------------------------- */

function MenuItem({ active, label, icon, done, onClick, subtitle }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        w-full flex items-center justify-between
        px-4 py-3 rounded-xl border
        transition-all duration-200 text-left group

        ${
          active
            ? "bg-[#0e0e0e] border-[#2c2c2c] text-white"
            : "bg-[#050505] border-[#1c1c1c] text-gray-300 hover:bg-[#0b0b0b]"
        }
      `}
    >
      <div className="flex items-center gap-3">

        {/* ÍCONE PREMIUM */}
        <div
          className={`
            w-10 h-10 flex items-center justify-center
            rounded-xl text-xl transition-all

            ${
              active
                ? "bg-[#1a1a1a] text-white shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                : "bg-[#0a0a0a] text-gray-400 group-hover:bg-[#141414] group-hover:text-gray-200"
            }
          `}
        >
          <i className={`${icon} text-xl`} />
        </div>

        {/* LABEL */}
        <div className="flex flex-col">
          <span className="text-sm sm:text-base font-medium">{label}</span>
          {subtitle && (
            <span className="text-[11px] sm:text-xs text-gray-500">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* CHECK SIMPLES — sem texto */}
      <div className="flex items-center">
        {done && <i className="ri-check-line text-lg text-green-500" />}
      </div>
    </button>
  );
}

/* -------------------------------------------
   STATUS PILL — minimalista
-------------------------------------------- */

function StatusPill({ done }) {
  return done ? (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] bg-[#101010] border border-[#303030] text-green-500">
      <i className="ri-check-line text-xs" />
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] bg-[#0a0a0a] border border-[#1d1d1d] text-gray-500">
      <i className="ri-time-line text-xs" />
    </span>
  );
}
