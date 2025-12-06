import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import PopupLogin from "../components/PopupLogin";
import PopupRegister from "../components/PopupRegister";
import logo from "../assets/logo.png";

export default function Header({ onMenuClick }) {
  const { user } = useAuth();
  const isLogged = !!user;

  const [showBalance, setShowBalance] = useState(true);

  // POPUPS
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  return (
    <>
      {/* POPUP LOGIN */}
      {showLoginPopup && (
        <PopupLogin
          onClose={() => setShowLoginPopup(false)}
          onRegister={() => {
            setShowLoginPopup(false);
            setShowRegisterPopup(true);
          }}
        />
      )}

      {/* POPUP REGISTER */}
      {showRegisterPopup && (
        <PopupRegister
          onClose={() => setShowRegisterPopup(false)}
          onLogin={() => {
            setShowRegisterPopup(false);
            setShowLoginPopup(true);
          }}
        />
      )}

      {/* HEADER */}
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
            <i className="ri-menu-line text-[24px] sm:text-[26px]" />
          </button>

          <Link to="/" className="flex items-center">
            <img src={logo} className="h-5 sm:h-6 md:h-7" />
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
                border border-[#262626] focus:border-[#B90007] transition text-sm
              "
            />
            <i className="ri-search-line absolute right-4 top-1.5 text-gray-400 text-lg" />
          </div>
        </div>

        {/* DIREITA */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0 flex-nowrap">
          {!isLogged && (
            <button
              onClick={() => setShowLoginPopup(true)}
              className="
                bg-[#B90007] text-white px-3 py-1.5 rounded-full
                font-bold hover:bg-[#e01515] transition text-[11px] sm:text-xs
                shadow-[0_0_16px_rgba(185,0,7,0.7)]
              "
            >
              Entrar
            </button>
          )}

          {isLogged && (
            <>
              {/* SALDO */}
              <div
                className="
                  flex items-center gap-1.5 sm:gap-2
                  bg-[#050505] px-2 sm:px-3 py-1 rounded-full
                  border border-[#242424]
                "
              >
                <span className="text-[11px] sm:text-sm font-semibold whitespace-nowrap">
                  {showBalance
                    ? `R$ ${Number(user.balance).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}`
                    : "••••••"}
                </span>

                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-gray-300 hover:text-white"
                >
                  {showBalance ? (
                    <i className="ri-eye-off-line text-base sm:text-lg" />
                  ) : (
                    <i className="ri-eye-line text-base sm:text-lg" />
                  )}
                </button>
              </div>

              {/* BUTTONS */}
              <Link
                to="/wallet/deposit"
                className="
                  hidden sm:block bg-[#B90007] text-white px-3 sm:px-4 py-1.5 sm:py-2
                  rounded-full font-semibold hover:bg-[#e01515] transition text-xs sm:text-sm
                "
              >
                Depositar
              </Link>

              <Link
                to="/wallet/withdraw"
                className="
                  hidden sm:block bg-[#111111] text-white px-3 sm:px-4 py-1.5 sm:py-2
                  rounded-full border border-[#2a2a2a] text-xs sm:text-sm
                "
              >
                Sacar
              </Link>

              <Link
                to="/wallet/transactions"
                className="
                  hidden md:block bg-[#111111] text-white px-3 sm:px-4 py-1.5 sm:py-2
                  rounded-full border border-[#2a2a2a] text-xs sm:text-sm
                "
              >
                Extrato
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
}
