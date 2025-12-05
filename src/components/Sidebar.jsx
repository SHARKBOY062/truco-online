import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar.png";
import ComingSoonModal from "../components/Modal/ComingSoonModal";

export default function Sidebar({ open }) {
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
      {/* MODAL */}
      <ComingSoonModal
        open={showComingSoon}
        onClose={() => setShowComingSoon(false)}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40
          backdrop-blur-2xl bg-[#0D1117]/80 border-r border-[#0b0e13]
          shadow-[4px_0_25px_rgba(0,0,0,0.6)]
          transition-all duration-500 ease-in-out
          overflow-hidden
          ${open ? "translate-x-0 w-80" : "-translate-x-full w-0 pointer-events-none"}
        `}
      >
        <div
          className={`
            h-full overflow-y-auto px-6 pt-24 pb-10 space-y-10 custom-scrollbar
            transition-opacity duration-500
            ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >

          {/* ================= PERFIL ================= */}
          {isLogged && (
            <>
              <div className="flex items-center gap-4">
                <img
                  src={avatar}
                  className="w-12 h-12 rounded-full border border-gray-700 shadow-lg"
                />

                <div>
                  <p className="font-semibold text-white text-lg">Jogador Pro</p>
                  <p className="text-sm text-gray-400">Nível 12 • Veterano</p>
                  <div className="mt-2 w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[65%] shadow-[0_0_8px_#22c55e]" />
                  </div>
                </div>
              </div>

              <div className="bg-[#0F131A] p-5 rounded-2xl border border-gray-800 shadow-lg">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-4">
                  Suas Estatísticas
                </p>

                <div className="grid grid-cols-3 text-center">
                  <div>
                    <p className="text-green-400 font-bold text-xl">148</p>
                    <p className="text-xs text-gray-400">Jogos</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-bold text-xl">89</p>
                    <p className="text-xs text-gray-400">Vitórias</p>
                  </div>
                  <div>
                    <p className="text-green-400 font-bold text-xl">5</p>
                    <p className="text-xs text-gray-400">Sequência</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-gray-800/50" />
            </>
          )}

          {/* ================= GERAL ================= */}
          <button
            onClick={() => setOpenGeneral(!openGeneral)}
            className="flex justify-between w-full text-left text-gray-400 mb-2 uppercase text-[11px] tracking-widest font-semibold hover:text-green-400 transition"
          >
            Geral
            <i className={`ri-arrow-down-s-line transition ${openGeneral ? "" : "rotate-180"}`} />
          </button>

          {openGeneral && (
            <ul className="space-y-3 text-[15px] pl-1 font-medium">

              <Link
                to="/"
                className="flex items-center gap-3 hover:text-green-400 transition"
              >
                <i className="ri-home-5-line text-xl text-gray-400" />
                Início
              </Link>

              <Link
                to="/account"
                className="flex items-center gap-3 hover:text-green-400 transition"
              >
                <i className="ri-user-3-line text-xl text-gray-400" />
                Minha Conta
              </Link>

              <Link
                to="/wallet/transactions"
                className="flex items-center gap-3 hover:text-green-400 transition"
              >
                <i className="ri-file-list-3-line text-xl text-gray-400" />
                Transações
              </Link>

              {/* BOTÃO INDIQUE E GANHE */}
              <li
                onClick={() => setShowComingSoon(true)}
                className="flex items-center gap-3 hover:text-green-400 cursor-pointer transition"
              >
                <i className="ri-gift-line text-xl text-gray-400" />
                Indique e Ganhe
              </li>
            </ul>
          )}

          <div className="w-full h-px bg-gray-800/50" />

          {/* ================= CATEGORIAS DE TRUCO ================= */}
          <button
            onClick={() => setOpenCategories(!openCategories)}
            className="flex justify-between w-full text-left text-gray-400 mb-2 uppercase text-[11px] tracking-widest font-semibold hover:text-green-400 transition"
          >
            Categorias de Truco
            <i className={`ri-arrow-down-s-line transition ${openCategories ? "" : "rotate-180"}`} />
          </button>

          {openCategories && (
            <ul className="space-y-3 pl-1 text-[15px] font-medium">

              {/* LINK REAL PARA A SALA DO TRUCO PAULISTA */}
              <Link
                to="/game/truco/paulista"
                className="flex items-center gap-3 hover:text-green-400 cursor-pointer transition"
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
                  className="flex items-center justify-between hover:text-green-400 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <i className="ri-sword-line text-xl text-gray-400" />
                    {item}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-600/40">
                      ● {Math.floor(Math.random() * 120 + 40)}
                    </span>

                    <i
                      onClick={() => toggleFavorite(item)}
                      className={`
                        ri-star-fill cursor-pointer text-lg transition 
                        ${favorites.includes(item)
                          ? "text-yellow-400 scale-110 drop-shadow-[0_0_6px_#facc15]"
                          : "text-gray-600 hover:text-yellow-300"}
                      `}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="w-full h-px bg-gray-800/50" />

          {/* ================= STAKES ================= */}
          <button
            onClick={() => setOpenStakes(!openStakes)}
            className="flex justify-between w-full text-left text-gray-400 mb-2 uppercase text-[11px] tracking-widest font-semibold hover:text-green-400 transition"
          >
            Truco por Aposta
            <i className={`ri-arrow-down-s-line transition ${openStakes ? "" : "rotate-180"}`} />
          </button>

          {openStakes && (
            <div className="grid grid-cols-2 gap-3">
              {[2, 5, 10, 20, 40, 50, 80, 100].map((stake) => (
                <button
                  key={stake}
                  className="py-2.5 px-3 text-[14px] font-semibold rounded-lg bg-[#161B22] border border-gray-700 hover:border-green-500 hover:text-green-400 hover:bg-gray-700/40 transition"
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
