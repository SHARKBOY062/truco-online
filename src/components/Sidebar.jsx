// src/components/Sidebar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ComingSoonModal from "../components/Modal/ComingSoonModal";
import GoodTime from "../assets/fonts/GoodTime.ttf";

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth(); // ⬅️ adiciona logout aqui
  const isLogged = !!user;

  const [openGeneral, setOpenGeneral] = useState(true);
  const [openCategories, setOpenCategories] = useState(true);
  const [openStakes, setOpenStakes] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const toggleFavorite = (item) => {
    setFavorites((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // AVATAR AUTOMÁTICO BASEADO NO NOME
  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
    user?.name || "Jogador"
  )}`;

  return (
    <>
      {/* Fonte GoodTime registrada (se quiser usar em títulos depois) */}
      <style>
        {`
          @font-face {
            font-family: 'GoodTime';
            src: url(${GoodTime}) format('truetype');
          }
        `}
      </style>

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
          ${open ? "translate-x-0 w-72 sm:w-80 lg:w-80" : "-translate-x-full w-0 pointer-events-none"}
        `}
      >
        <div
          className={`
            h-full overflow-y-auto px-5 pt-20 pb-6 custom-scrollbar
            transition-opacity duration-400
            ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          style={{
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          {/* PERFIL — SOMENTE QUANDO LOGADO */}
          {isLogged && (
            <>
              <div className="flex items-center gap-3 mb-5">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-md bg-[#B90007]/30 opacity-60" />
                  <img
                    src={avatarUrl}
                    className="relative w-10 h-10 rounded-full border border-gray-700 bg-[#111]"
                    alt="Avatar"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-gray-400">Jogador</p>

                  <div className="mt-2 w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#B90007] w-[40%] shadow-[0_0_8px_rgba(185,0,7,1)]" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ------------------- MENU GERAL ------------------- */}
          <button
            onClick={() => setOpenGeneral((s) => !s)}
            className="
              flex items-center justify-between w-full
              py-3 px-1
              bg-black/60 border-y border-[#111722]
              text-left text-gray-400
              uppercase text-[11px] tracking-[0.18em] font-medium
              hover:text-[#B90007]
              transition-colors
            "
          >
            <span>GERAL</span>
            <i
              className={`
                ri-arrow-down-s-line text-base
                transition-transform duration-300
                ${openGeneral ? "" : "rotate-180"}
              `}
            />
          </button>

          {openGeneral && (
            <ul className="space-y-1.5 text-[13px] font-normal mt-2 mb-4">
              <li>
                <Link
                  to="/"
                  className="
                    flex items-center gap-3 py-1.5 px-1
                    text-gray-300
                    hover:text-[#B90007]
                    transition-colors
                  "
                >
                  <i className="ri-home-5-line text-lg text-gray-400" />
                  <span>Início</span>
                </Link>
              </li>

              {isLogged && (
                <>
                  <li>
                    <Link
                      to="/account"
                      className="
                        flex items-center gap-3 py-1.5 px-1
                        text-gray-300
                        hover:text-[#B90007]
                        transition-colors
                      "
                    >
                      <i className="ri-user-3-line text-lg text-gray-400" />
                      <span>Minha Conta</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/wallet/transactions"
                      className="
                        flex items-center gap-3 py-1.5 px-1
                        text-gray-300
                        hover:text-[#B90007]
                        transition-colors
                      "
                    >
                      <i className="ri-file-list-3-line text-lg text-gray-400" />
                      <span>Transações</span>
                    </Link>
                  </li>
                </>
              )}

              <li>
                <button
                  type="button"
                  onClick={() => setShowComingSoon(true)}
                  className="
                    flex w-full items-center gap-3 py-1.5 px-1
                    text-left text-gray-300
                    hover:text-[#B90007]
                    transition-colors
                  "
                >
                  <i className="ri-gift-line text-lg text-gray-400" />
                  <span>Indique e Ganhe</span>
                </button>
              </li>
            </ul>
          )}

          {/* ------------------- CATEGORIAS ------------------- */}
          <button
            onClick={() => setOpenCategories((s) => !s)}
            className="
              mt-1
              flex items-center justify-between w-full
              py-3 px-1
              bg-black/60 border-y border-[#111722]
              text-left text-gray-400
              uppercase text-[11px] tracking-[0.18em] font-medium
              hover:text-[#B90007]
              transition-colors
            "
          >
            <span>CATEGORIAS DE TRUCO</span>
            <i
              className={`
                ri-arrow-down-s-line text-base
                transition-transform duration-300
                ${openCategories ? "" : "rotate-180"}
              `}
            />
          </button>

          {openCategories && (
            <ul className="space-y-1.5 text-[13px] font-normal mt-2 mb-4">
              <li>
                <Link
                  to="/game/truco/paulista"
                  className="
                    flex items-center gap-3 py-1.5 px-1
                    text-gray-300
                    hover:text-[#B90007]
                    transition-colors
                  "
                >
                  <i className="ri-sword-line text-lg text-gray-400" />
                  <span>Truco Paulista</span>
                </Link>
              </li>

              {[
                "Truco Mineiro",
                "Truco Gaudério",
                "Truco Goiano",
                "Truco Baiano",
                "Truco Amazonense",
                "Truco Mato-Grossense",
              ].map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="
                      flex w-full items-center gap-3 py-1.5 px-1
                      text-left text-gray-300
                      hover:text-[#B90007]
                      transition-colors
                    "
                  >
                    <i className="ri-sword-line text-lg text-gray-400" />
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* ------------------- STAKES ------------------- */}
          <button
            onClick={() => setOpenStakes((s) => !s)}
            className="
              mt-1
              flex items-center justify-between w-full
              py-3 px-1
              bg-black/60 border-y border-[#111722]
              text-left text-gray-400
              uppercase text-[11px] tracking-[0.18em] font-medium
              hover:text-[#B90007]
              transition-colors
            "
          >
            <span>TRUCO POR APOSTA</span>
            <i
              className={`
                ri-arrow-down-s-line text-base
                transition-transform duration-300
                ${openStakes ? "" : "rotate-180"}
              `}
            />
          </button>

          {openStakes && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {[2, 5, 10, 20, 40, 50, 80, 100].map((stake) => (
                <button
                  key={stake}
                  className="
                    py-2 text-[13px] font-semibold rounded-lg
                    bg-[#050505] border border-gray-700
                    hover:border-[#B90007] hover:text-[#ffb0b0] hover:bg-black
                    transition-all duration-200
                  "
                >
                  R$ {stake}
                </button>
              ))}
            </div>
          )}

          {/* ------------------- AJUDA / SUPORTE ------------------- */}
          <div className="mt-8 pt-4 border-t border-gray-800/40">
            <span className="block text-[11px] uppercase tracking-[0.18em] text-gray-500 mb-3">
              AJUDA & SUPORTE
            </span>

            <ul className="space-y-1.5 text-[13px] text-gray-300">
              <li>
                <button
                  type="button"
                  className="
                    flex w-full items-center gap-3 py-1.5 px-1
                    text-left
                    hover:text-[#B90007]
                    transition-colors
                  "
                >
                  <i className="ri-headphone-line text-lg text-gray-400" />
                  <span>Suporte Ao Vivo</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="
                    flex w-full items-center gap-3 py-1.5 px-1
                    text-left
                    hover:text-[#B90007]
                    transition-colors
                  "
                >
                  <i className="ri-medal-line text-lg text-gray-400" />
                  <span>Promoções</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="
                    flex w-full items-center gap-3 py-1.5 px-1
                    text-left
                    hover:text-[#B90007]
                    transition-colors
                  "
                >
                  <i className="ri-user-follow-line text-lg text-gray-400" />
                  <span>Indique Um Amigo</span>
                </button>
              </li>

              {/* Sair só aparece quando logado */}
              {isLogged && (
                <li>
                  <button
                    type="button"
                    onClick={logout}
                    className="
                      flex w-full items-center gap-3 py-1.5 px-1
                      text-left
                      hover:text-[#B90007]
                      transition-colors
                    "
                  >
                    <i className="ri-logout-box-line text-lg text-gray-400" />
                    <span>Sair</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}
