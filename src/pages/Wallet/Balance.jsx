import { useContext } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import PageTitle from "../../components/PageTitle";

export default function Balance() {
  const { balance } = useContext(WalletContext);

  return (
    <div className="min-h-screen bg-[#000000] text-white px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-3xl mx-auto">
        <PageTitle>Meu Saldo</PageTitle>

        <div
          className="
            mt-6 sm:mt-8
            bg-[#050505]/95 rounded-2xl border border-[#262626]
            shadow-[0_24px_80px_rgba(0,0,0,0.95)]
            p-6 sm:p-8 text-center relative overflow-hidden
          "
        >
          {/* brilho sutil */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5" />

          <p className="text-sm sm:text-base text-gray-400 tracking-wide">
            Saldo Disponível
          </p>

          <p
            className="
              mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold
              text-[#B90007]
              drop-shadow-[0_0_22px_rgba(185,0,7,0.75)]
            "
          >
            R$ {balance?.toFixed(2)}
          </p>

          <p className="mt-3 text-xs sm:text-sm text-gray-500">
            Este é o valor disponível para apostas, saques e transferências.
          </p>
        </div>
      </div>
    </div>
  );
}
