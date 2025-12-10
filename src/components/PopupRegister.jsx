import { useState } from "react";
import { api } from "../services/api";
import GoodTime from "../assets/fonts/GoodTime.ttf";
import logo from "../assets/logo.png";

export default function PopupRegister({ onClose, onLogin }) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ======================
  // FUNÇÃO DE MÁSCARA CPF
  // ======================
  function maskCpf(value) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPass) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/register", {
        name,
        cpf,
        email,
        password,
        password_confirmation: confirmPass,
      });

      onLogin();
    } catch (err) {
      console.log(err.response?.data);
      const backend = err.response?.data;

      if (backend?.message) {
        setError(backend.message);
        setLoading(false);
        return;
      }

      if (backend?.errors) {
        const firstError = Object.values(backend.errors)[0][0];
        setError(firstError);
        setLoading(false);
        return;
      }

      setError("Erro ao registrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

      {/* FONTE */}
      <style>
        {`
          @font-face {
            font-family: 'GoodTime';
            src: url(${GoodTime}) format('truetype');
          }
        `}
      </style>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Popup */}
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
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white text-3xl"
        >
          <i className="ri-close-line"></i>
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} className="h-12 sm:h-14 object-contain" />
        </div>

        {/* Título */}
        <h2
          className="text-center text-xl sm:text-2xl font-bold mb-8 text-white"
          style={{ fontFamily: "GoodTime" }}
        >
          Criar nova conta
        </h2>

        {/* Erro */}
        {error && (
          <div className="text-red-400 text-center text-sm mb-4">{error}</div>
        )}

        {/* FORM */}
        <form onSubmit={handleRegister} className="flex flex-col gap-6">

          {/* NOME */}
          <div>
            <label className="text-sm text-gray-300" style={{ fontFamily: "GoodTime" }}>
              Nome completo
            </label>
            <input
              type="text"
              className="
                w-full mt-2 px-4 py-3.5
                bg-[#1A1D24] border border-[#2d2f36]
                rounded-xl text-white
                focus:border-[#B90007]
                focus:ring-2 focus:ring-[#b9000750]
                transition-all
              "
              style={{ fontFamily: "Inter, sans-serif" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* CPF – COM MÁSCARA */}
          <div>
            <label className="text-sm text-gray-300" style={{ fontFamily: "GoodTime" }}>
              CPF
            </label>
            <input
              type="text"
              maxLength={14}
              className="
                w-full mt-2 px-4 py-3.5
                bg-[#1A1D24] border border-[#2d2f36]
                rounded-xl text-white
                focus:border-[#B90007]
                focus:ring-2 focus:ring-[#b9000750]
                transition-all
              "
              style={{ fontFamily: "Inter, sans-serif" }}
              value={cpf}
              onChange={(e) => setCpf(maskCpf(e.target.value))}
              placeholder="000.000.000-00"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300" style={{ fontFamily: "GoodTime" }}>
              Email
            </label>
            <input
              type="email"
              className="
                w-full mt-2 px-4 py-3.5
                bg-[#1A1D24] border border-[#2d2f36]
                rounded-xl text-white
                focus:border-[#B90007]
                focus:ring-2 focus:ring-[#b9000750]
                transition-all
              "
              style={{ fontFamily: "Inter, sans-serif" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* SENHA */}
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
                  focus:border-[#B90007]
                  focus:ring-2 focus:ring-[#b9000750]
                  transition-all
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
                <i className={showPass ? "ri-eye-off-line" : "ri-eye-line"}></i>
              </button>
            </div>
          </div>

          {/* CONFIRMAR SENHA */}
          <div>
            <label className="text-sm text-gray-300" style={{ fontFamily: "GoodTime" }}>
              Confirmar senha
            </label>

            <div className="relative mt-2">
              <input
                type={showConfirmPass ? "text" : "password"}
                className="
                  w-full px-4 py-3.5
                  bg-[#1A1D24] border border-[#2d2f36]
                  rounded-xl text-white
                  focus:border-[#B90007]
                  focus:ring-2 focus:ring-[#b9000750]
                  transition-all
                "
                style={{ fontFamily: "Inter, sans-serif" }}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-white"
              >
                <i className={showConfirmPass ? "ri-eye-off-line" : "ri-eye-line"}></i>
              </button>
            </div>
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-[#B90007] hover:bg-[#e01515]
              text-white font-bold py-3.5 rounded-xl
              shadow-[0_0_18px_rgba(185,0,7,0.4)]
              transition active:scale-[0.98]
              flex items-center justify-center gap-3
            "
            style={{ fontFamily: "GoodTime" }}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Criando...
              </>
            ) : (
              "CRIAR CONTA"
            )}
          </button>
        </form>

        {/* LOGIN LINK */}
        <div className="mt-4 text-center text-sm text-gray-300">
          Já tem conta?{" "}
          <span
            onClick={onLogin}
            className="text-[#B90007] hover:underline cursor-pointer"
            style={{ fontFamily: "GoodTime" }}
          >
            Fazer login
          </span>
        </div>
      </div>
    </div>
  );
}
