import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  // começa fechado para não aparecer no mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;

      if (window.innerWidth < 1024) {
        // mobile / tablet: SEMPRE fechado
        setSidebarOpen(false);
      } else {
        // desktop: sempre aberto
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex relative">
      {/* SIDEBAR */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ÁREA PRINCIPAL */}
      <div
        className={`
          flex-1 flex flex-col transition-[margin] duration-300
          ${sidebarOpen ? "ml-0 lg:ml-80" : "ml-0"}
        `}
      >
        <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />

        {/* Cada página controla o padding horizontal */}
        <main
          className="
            flex-1
            pt-[calc(56px+env(safe-area-inset-top))]
            sm:pt-[calc(64px+env(safe-area-inset-top))]
            pb-10
          "
        >
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
