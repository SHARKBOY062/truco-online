import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import logo from "../assets/logo.png";
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
      const response = await api.post("/login", {
        email,
        password,
      });

      // CORREÇÃO AQUI 👇
      login(response.data.user, response.data.token);

      onClose();

    } catch (err) {
      console.log(err.response?.data);
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

      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        className="
          relative bg-[#0F1116]
          w-full max-w-lg
          p-8 sm:p-12
          rounded-3xl
          border border-[#242424]
          shadow-[0_0_40px_rgba(0,0,0,0.6)]
          animate-fadeIn
        "
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl"
        >
          <i className="ri-close-line"></i>
        </button>

        <div className="flex justify-center mb-6">
          <img src={logo} className="h-12 sm:h-14 object-contain" />
        </div>

        <h2
          className="text-center text-xl sm:text-2xl font-bold mb-8 text-white whitespace-nowrap"
          style={{ fontFamily: "GoodTime" }}
        >
          Faça login na sua conta
        </h2>

        {error && (
          <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-sm text-gray-300" style={{ fontFamily: "GoodTime" }}>
              Email ou CPF
            </label>

            <input
              type="text"
              className="
                w-full mt-2 px-4 py-3.5 
                bg-[#1A1D24] border border-[#2d2f36]
                rounded-xl text-white
                focus:border-[#B90007] outline-none
              "
              style={{ fontFamily: "Inter, sans-serif" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300" style={{ fontFamily: "GoodTime" }}>
              Senha
            </label>

            <div className="relative mt-2">
              <input
                type={showPass ? "text" : "password"}
                className="
                  w-full px-4 py-3.5
                  bg-[#1A1D24] border border-[#2d2f36]
                  rounded-xl text-white
                  focus:border-[#B90007] outline-none
                  transition
                "
                style={{ fontFamily: "Inter, sans-serif" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-white"
              >
                <i className={showPass ? "ri-eye-off-line text-xl" : "ri-eye-line text-xl"}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-[#B90007] hover:bg-[#e01515]
              text-white font-semibold py-3.5 rounded-xl
              shadow-[0_0_18px_rgba(185,0,7,0.4)]
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

        <div className="mt-4 text-center text-sm text-gray-300">
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
