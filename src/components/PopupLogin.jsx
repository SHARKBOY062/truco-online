import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import logo from "../assets/logo.png";
import banner from "../assets/banner-login.png"; // <- substitua pelo seu banner real
import GoodTime from "../assets/fonts/GoodTime.ttf";

export default function PopupLogin({ onClose, onRegister }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", { email, password });
      login(response.data.user, response.data.token);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Usuário ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <style>
        {`
          @font-face {
            font-family: 'GoodTime';
            src: url(${GoodTime}) format('truetype');
          }
        `}
      </style>

      {/* Fundo escuro e blur */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        className="
          relative bg-[#0F1116]
          w-full max-w-lg
          p-8 sm:p-10
          rounded-3xl
          border border-[#242424]
          shadow-[0_0_40px_rgba(0,0,0,0.6)]
          animate-fadeIn
          overflow-hidden
        "
      >
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl transition"
        >
          <i className="ri-close-line"></i>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            className="h-12 sm:h-14 object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
            alt="Logo"
          />
        </div>

        {/* Banner — ponta a ponta */}
        <div className="relative -mx-10 sm:-mx-12 mb-6 mt-2">
          <img
            src={banner}
            alt="Banner"
            className="
              w-full rounded-2xl
              shadow-[0_0_25px_rgba(0,0,0,0.4)]
              border border-[#1d1f25]
              hover:scale-[1.02]
              transition-transform duration-500
            "
          />
        </div>

        {/* Título */}
        <h2
          className="text-center text-xl sm:text-2xl font-bold mb-8 text-white tracking-wide"
          style={{ fontFamily: "GoodTime" }}
        >
          Faça login na sua conta
        </h2>

        {/* Mensagem de erro */}
        {error && (
          <div className="mb-4 text-red-400 text-sm text-center bg-red-950/30 border border-red-800/50 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              className="text-sm text-gray-300 tracking-wider"
              style={{ fontFamily: "GoodTime" }}
            >
              Email ou CPF
            </label>
            <input
              type="text"
              className="
                w-full mt-2 px-4 py-3.5
                bg-[#1A1D24] border border-[#2d2f36]
                rounded-xl text-white
                placeholder-gray-500
                focus:border-[#B90007] outline-none
                transition-all duration-200
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email ou CPF"
            />
          </div>

          <div>
            <label
              className="text-sm text-gray-300 tracking-wider"
              style={{ fontFamily: "GoodTime" }}
            >
              Senha
            </label>
            <div className="relative mt-2">
              <input
                type={showPass ? "text" : "password"}
                className="
                  w-full px-4 py-3.5
                  bg-[#1A1D24] border border-[#2d2f36]
                  rounded-xl text-white
                  placeholder-gray-500
                  focus:border-[#B90007] outline-none
                  transition-all duration-200
                "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition"
              >
                <i
                  className={
                    showPass
                      ? "ri-eye-off-line text-xl"
                      : "ri-eye-line text-xl"
                  }
                ></i>
              </button>
            </div>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-[#B90007] hover:bg-[#e01515]
              text-white font-semibold py-3.5 rounded-xl
              shadow-[0_0_20px_rgba(185,0,7,0.4)]
              transition active:scale-[0.98]
              flex items-center justify-center gap-3
            "
            style={{ fontFamily: "GoodTime" }}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Entrando...
              </>
            ) : (
              "ENTRAR"
            )}
          </button>
        </form>

        {/* Criar conta */}
        <div className="mt-6 text-center text-sm text-gray-300">
          Não tem conta?{" "}
          <span
            className="text-[#B90007] hover:underline cursor-pointer"
            onClick={onRegister}
            style={{ fontFamily: "GoodTime" }}
          >
            Criar conta
          </span>
        </div>
      </div>
    </div>
  );
}
