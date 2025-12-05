import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import ComingSoonModal from "../components/Modal/ComingSoonModal";

export default function Sidebar({ open, onClose }) {
  const [openGeneral, setOpenGeneral] = useState(true);
  const [openCategories, setOpenCategories] = useState(true);
  const [openStakes, setOpenStakes] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const isLogged = false;

  const toggleFavorite = (item) => {
    setFavorites((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <>
      {/* MODAL "EM BREVE" */}
      <ComingSoonModal
        open={showComingSoon}
        onClose={() => setShowComingSoon(false)}
      />

      {/* OVERLAY MOBILE */}
      <div
        className={`
          fixed inset-0 z-30 bg-black/60
          transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          lg:hidden
        `}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40
          backdrop-blur-2xl bg-black/90 border-r border-[#0b0e13]
          shadow-[4px_0_25px_rgba(0,0,0,0.6)]
          transition-all duration-500 ease-in-out
          overflow-hidden
          ${open
            ? "translate-x-0 w-72 sm:w-80 lg:w-80"
            : "-translate-x-full w-0 lg:w-0 pointer-events-none"}
        `}
      >
        <div
          className={`
            h-full overflow-y-auto px-6 pt-24 pb-10 custom-scrollbar
            transition-opacity duration-400
            ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          {/* PERFIL (quando logado) */}
          {isLogged && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={avatar}
                  className="w-12 h-12 rounded-full border border-gray-700 shadow-lg"
                  alt="Avatar"
                />

                <div>
                  <p className="font-semibold text-white text-lg">Jogador Pro</p>
                  <p className="text-sm text-gray-400">Nível 12 • Veterano</p>
                  <div className="mt-2 w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#B90007] w-[65%] shadow-[0_0_8px_rgba(185,0,7,1)]" />
                  </div>
                </div>
              </div>

              <div className="bg-[#050505] p-5 rounded-2xl border border-gray-800 shadow-lg mb-6">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-4">
                  Suas Estatísticas
                </p>

                <div className="grid grid-cols-3 text-center gap-2">
                  <div>
                    <p className="text-red-400 font-bold text-xl">148</p>
                    <p className="text-xs text-gray-400">Jogos</p>
                  </div>
                  <div>
                    <p className="text-red-400 font-bold text-xl">89</p>
                    <p className="text-xs text-gray-400">Vitórias</p>
                  </div>
                  <div>
                    <p className="text-red-400 font-bold text-xl">5</p>
                    <p className="text-xs text-gray-400">Sequência</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-gray-800/50 mb-6" />
            </>
          )}

          {/* GERAL */}
          <button
            onClick={() => setOpenGeneral((s) => !s)}
            className="flex justify-between w-full text-left text-gray-400 mb-2 uppercase text-[11px] tracking-widest font-semibold hover:text-[#B90007] transition"
          >
            Geral
            <i
              className={`
                ri-arrow-down-s-line transition
                ${openGeneral ? "" : "rotate-180"}
              `}
            />
          </button>

          {openGeneral && (
            <ul className="space-y-3 text-[15px] pl-1 font-medium mb-4">
              <Link
                to="/"
                className="flex items-center gap-3 hover:text-[#B90007] transition"
              >
                <i className="ri-home-5-line text-xl text-gray-400" />
                Início
              </Link>

              <Link
                to="/account"
                className="flex items-center gap-3 hover:text-[#B90007] transition"
              >
                <i className="ri-user-3-line text-xl text-gray-400" />
                Minha Conta
              </Link>

              <Link
                to="/wallet/transactions"
                className="flex items-center gap-3 hover:text-[#B90007] transition"
              >
                <i className="ri-file-list-3-line text-xl text-gray-400" />
                Transações
              </Link>

              <li
                onClick={() => setShowComingSoon(true)}
                className="flex items-center gap-3 hover:text-[#B90007] cursor-pointer transition"
              >
                <i className="ri-gift-line text-xl text-gray-400" />
                Indique e Ganhe
              </li>
            </ul>
          )}

          <div className="w-full h-px bg-gray-800/50 my-4" />

          {/* CATEGORIAS */}
          <button
            onClick={() => setOpenCategories((s) => !s)}
            className="flex justify-between w-full text-left text-gray-400 mb-2 uppercase text-[11px] tracking-widest font-semibold hover:text-[#B90007] transition"
          >
            Categorias de Truco
            <i
              className={`
                ri-arrow-down-s-line transition
                ${openCategories ? "" : "rotate-180"}
              `}
            />
          </button>

          {openCategories && (
            <ul className="space-y-3 pl-1 text-[15px] font-medium mb-4">
              {/* Truco Paulista – rota real */}
              <Link
                to="/game/truco/paulista"
                className="flex items-center gap-3 hover:text-[#B90007] cursor-pointer transition"
              >
                <i className="ri-sword-line text-xl text-gray-400" />
                Truco Paulista
              </Link>

              {[
                "Truco Mineiro",
                "Truco Gaudério",
                "Truco Goiano",
                "Truco Baiano",
                "Truco Amazonense",
                "Truco Mato-Grossense",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between hover:text-[#B90007] cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <i className="ri-sword-line text-xl text-gray-400" />
                    {item}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#B90007]/20 text-[#ffb0b0] border border-[#B90007]/50">
                      ● {Math.floor(Math.random() * 120 + 40)}
                    </span>

                    <i
                      onClick={() => toggleFavorite(item)}
                      className={`
                        ri-star-fill cursor-pointer text-lg transition 
                        ${
                          favorites.includes(item)
                            ? "text-yellow-400 scale-110 drop-shadow-[0_0_6px_#facc15]"
                            : "text-gray-600 hover:text-yellow-300"
                        }
                      `}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="w-full h-px bg-gray-800/50 my-4" />

          {/* STAKES */}
          <button
            onClick={() => setOpenStakes((s) => !s)}
            className="flex justify-between w-full text-left text-gray-400 mb-2 uppercase text-[11px] tracking-widest font-semibold hover:text-[#B90007] transition"
          >
            Truco por Aposta
            <i
              className={`
                ri-arrow-down-s-line transition
                ${openStakes ? "" : "rotate-180"}
              `}
            />
          </button>

          {openStakes && (
            <div className="grid grid-cols-2 gap-3">
              {[2, 5, 10, 20, 40, 50, 80, 100].map((stake) => (
                <button
                  key={stake}
                  className="
                    py-2.5 px-3 text-[14px] font-semibold rounded-lg
                    bg-[#050505] border border-gray-700
                    hover:border-[#B90007] hover:text-[#ffb0b0] hover:bg-black
                    transition
                  "
                >
                  R$ {stake}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
