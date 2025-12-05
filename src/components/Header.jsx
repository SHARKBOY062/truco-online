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
        bg-[#111820] border-b border-gray-800
        px-3 sm:px-6
        flex items-center justify-between
        h-[56px]   /* ALTURA FIXA */
      "
      style={{
        paddingTop: "env(safe-area-inset-top)", 
      }}
    >
      {/* ESQUERDA */}
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="active:scale-90 transition">
          <i className="ri-menu-line text-[28px] leading-none text-white"></i>
        </button>

        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-7 sm:h-8 w-auto" />
        </Link>
      </div>

      {/* SEARCH DESKTOP */}
      <div className="hidden lg:flex flex-1 justify-center px-10 items-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Pesquisar mesas, jogadores..."
            className="
              w-full bg-gray-800 text-white px-4 py-2 rounded-full outline-none
              border border-gray-700 focus:border-green-500 transition
            "
          />
          <i className="ri-search-line absolute right-4 top-2.5 text-gray-400 text-xl"></i>
        </div>
      </div>

      {/* DIREITA */}
      <div className="flex items-center gap-2">

        {!isLogged && (
          <Link
            to="/auth/login"
            className="
              bg-green-500 text-black px-4 py-2 rounded-full
              font-bold hover:bg-green-400 transition text-sm
            "
          >
            Entrar
          </Link>
        )}

        {isLogged && (
          <>
            {/* SALDO */}
            <div className="flex items-center gap-2 bg-gray-800 px-2 py-1 rounded-full">
              <span className="text-sm font-semibold select-none">
                {showBalance ? "R$ 1.280,54" : "••••••"}
              </span>

              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-300 hover:text-white transition"
              >
                {showBalance ? (
                  <i className="ri-eye-off-line text-lg"></i>
                ) : (
                  <i className="ri-eye-line text-lg"></i>
                )}
              </button>
            </div>

            {/* MOBILE BUTTONS */}
            <Link
              to="/wallet/deposit"
              className="
                sm:hidden bg-green-500 text-black px-3 py-1.5 
                rounded-full font-semibold text-sm
              "
            >
              Depositar
            </Link>

            <Link
              to="/wallet/withdraw"
              className="
                sm:hidden bg-gray-700 text-white px-3 py-1.5 
                rounded-full font-semibold text-sm
              "
            >
              Sacar
            </Link>

            {/* DESKTOP BUTTONS */}
            <Link
              to="/wallet/deposit"
              className="
                hidden sm:block bg-green-500 text-black px-4 py-2 rounded-full 
                font-semibold hover:bg-green-400 transition
              "
            >
              Depositar
            </Link>

            <Link
              to="/wallet/withdraw"
              className="
                hidden sm:block bg-gray-700 text-white px-4 py-2 rounded-full 
                hover:bg-gray-600 transition
              "
            >
              Sacar
            </Link>

            <Link
              to="/wallet/transactions"
              className="
                hidden md:block bg-gray-700 text-white px-4 py-2 rounded-full 
                hover:bg-gray-600 transition
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
