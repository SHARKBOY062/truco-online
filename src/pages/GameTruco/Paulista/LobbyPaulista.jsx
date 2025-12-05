import { useNavigate } from "react-router-dom";
import SeatTable from "./components/SeatTable";

export default function LobbyPaulista() {
  const navigate = useNavigate();

  const criarMesa = (tipo) => {
    const mesaId = Math.floor(Math.random() * 99999);
    navigate(`/truco/paulista/mesa/${mesaId}?tipo=${tipo}`);
  };

  return (
    <div className="w-full min-h-screen text-white px-6 py-10">

      <h1 className="text-3xl font-bold mb-6">Truco Paulista</h1>

      <p className="text-gray-400 mb-6">
        Escolha um lugar na mesa ou crie sua própria mesa.
      </p>

      {/* TABELA — MESA REDONDA */}
      <div className="flex justify-center mb-10">
        <SeatTable seats={4} />
      </div>

      {/* BOTÕES DE JOGO */}
      <div className="flex flex-col gap-4 max-w-md mx-auto">

        <button
          onClick={() => criarMesa("1x1")}
          className="bg-green-600 hover:bg-green-500 text-black font-bold py-3 rounded-xl"
        >
          Criar Mesa 1x1
        </button>

        <button
          onClick={() => criarMesa("2x2")}
          className="bg-green-600 hover:bg-green-500 text-black font-bold py-3 rounded-xl"
        >
          Criar Mesa 2x2
        </button>
      </div>

    </div>
  );
}
