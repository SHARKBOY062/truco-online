import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api"; // AXIOS CONFIGURADO
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { user, token } = response.data;

      // salva token e usuário
      localStorage.setItem("token", token);
      login(user);

      navigate("/"); // redireciona para home
    } catch (err) {
      setError("Email ou senha incorretos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-sm bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h1 className="text-xl mb-4">Entrar</h1>

        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Senha"
            type="password"
            className="mt-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="mt-4 w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
