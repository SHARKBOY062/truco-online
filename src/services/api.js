// src/services/api.js
import axios from "axios";

/**
 * PRODUÇÃO — dominio.com/api
 * DESENVOLVIMENTO — localhost:8000/api
 */
const baseURL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname.includes("localhost")
    ? "http://localhost:8000/api"
    : "https://arenatruco.com/api");

const api = axios.create({
  baseURL: baseURL,
});

// Injeta token em TODAS as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Lida com expiração de token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export { api };
