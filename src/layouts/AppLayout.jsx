import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fecha automaticamente o sidebar em telas pequenas
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-[#0F131A] text-white min-h-screen relative">

      {/* SIDEBAR */}
      <Sidebar open={sidebarOpen} />

      {/* CONTEÚDO PRINCIPAL */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ${sidebarOpen ? "ml-0 lg:ml-80" : "ml-0"}
        `}
      >

        {/* HEADER FIXO */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* MAIN (CORRIGIDO) */}
        <main
          className="
            flex-1 px-4 sm:px-6
            pt-[calc(56px+env(safe-area-inset-top))]
            pb-10
            min-h-screen
          "
        >
          <Outlet />
        </main>

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
