import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function Header({ onMenuClick }) {
  const isLogged = true;
  const [showBalance, setShowBalance] = useState(true);

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-[999]
        bg-[#000000]/92 backdrop-blur-xl border-b border-[#1b1b1b]
        px-2.5 sm:px-4 md:px-6
        flex flex-nowrap items-center justify-between
        h-[54px] sm:h-[64px]
      "
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* ESQUERDA */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button
          onClick={onMenuClick}
          className="active:scale-90 transition text-white"
          aria-label="Abrir menu"
        >
          <i className="ri-menu-line text-[24px] sm:text-[26px] leading-none" />
        </button>

        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo Truco Online"
            className="h-5 sm:h-6 md:h-7 w-auto object-contain"
          />
        </Link>
      </div>

      {/* SEARCH DESKTOP */}
      <div className="hidden lg:flex flex-1 justify-center px-6 xl:px-10 items-center min-w-0">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Pesquisar mesas, jogadores..."
            className="
              w-full bg-[#050505] text-white px-4 py-1.5 rounded-full outline-none
              border border-[#262626] focus:border-[#B90007] transition
              text-sm
            "
          />
          <i className="ri-search-line absolute right-4 top-1.5 text-gray-400 text-lg" />
        </div>
      </div>

      {/* DIREITA */}
      <div
        className="
          flex items-center gap-1.5 sm:gap-3
          flex-shrink-0 flex-nowrap
        "
      >
        {!isLogged && (
          <Link
            to="/auth/login"
            className="
              bg-[#B90007] text-white px-3 py-1.5 rounded-full
              font-bold hover:bg-[#e01515] transition text-[11px] sm:text-xs
              shadow-[0_0_16px_rgba(185,0,7,0.7)]
              whitespace-nowrap
            "
          >
            Entrar
          </Link>
        )}

        {isLogged && (
          <>
            {/* SALDO */}
            <div
              className="
                flex items-center gap-1.5 sm:gap-2
                bg-[#050505] px-2 sm:px-3 py-1 rounded-full
                border border-[#242424]
                max-w-[150px] sm:max-w-none
              "
            >
              <span
                className="
                  text-[11px] sm:text-sm font-semibold select-none
                  whitespace-nowrap
                "
              >
                {showBalance ? "R$ 1.280,54" : "••••••"}
              </span>

              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-300 hover:text-white transition flex-shrink-0"
                aria-label={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
              >
                {showBalance ? (
                  <i className="ri-eye-off-line text-base sm:text-lg" />
                ) : (
                  <i className="ri-eye-line text-base sm:text-lg" />
                )}
              </button>
            </div>

            {/* BOTÕES MOBILE */}
            <Link
              to="/wallet/deposit"
              className="
                sm:hidden bg-[#B90007] text-white px-3 py-1.5 
                rounded-full font-semibold text-[11px]
                shadow-[0_0_14px_rgba(185,0,7,0.7)]
                whitespace-nowrap
              "
            >
              Depositar
            </Link>

            <Link
              to="/wallet/withdraw"
              className="
                sm:hidden bg-[#111111] text-white px-3 py-1.5 
                rounded-full font-semibold text-[11px]
                border border-[#2a2a2a]
                whitespace-nowrap
              "
            >
              Sacar
            </Link>

            {/* BOTÕES DESKTOP / TABLET */}
            <Link
              to="/wallet/deposit"
              className="
                hidden sm:block bg-[#B90007] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full 
                font-semibold hover:bg-[#e01515] transition text-xs sm:text-sm
                shadow-[0_0_14px_rgba(185,0,7,0.7)]
                whitespace-nowrap
              "
            >
              Depositar
            </Link>

            <Link
              to="/wallet/withdraw"
              className="
                hidden sm:block bg-[#111111] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full 
                hover:bg-[#181818] transition text-xs sm:text-sm
                border border-[#2a2a2a]
                whitespace-nowrap
              "
            >
              Sacar
            </Link>

            <Link
              to="/wallet/transactions"
              className="
                hidden md:block bg-[#111111] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full 
                hover:bg-[#181818] transition text-xs sm:text-sm
                border border-[#2a2a2a]
                whitespace-nowrap
              "
            >
              Extrato
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
