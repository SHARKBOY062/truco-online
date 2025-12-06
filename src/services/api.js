// src/services/api.js
import axios from "axios";

// Usa variável de ambiente se existir, senão fallback local
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

// Intercepta **todas** requisições e injeta o token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Garante que sempre envia JSON quando necessário
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptador de respostas (opcional, mas útil)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se o token expirou → logout automático
    if (error.response?.status === 401) {
      console.warn("🔐 Token expirado ou inválido.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login"; // ou rota que você usa no SPA
    }

    return Promise.reject(error);
  }
);

export { api };
