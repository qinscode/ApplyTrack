import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5051/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  },
);

export const updateToken = (newToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", newToken);
  }
};

export const clearToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export default api;
