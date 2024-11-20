import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5051/api";
const getToken = () => {
  // Check if we're in a browser environment before accessing localStorage
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to add the auth token header to requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// updateToken method to update the token in local storage
export const updateToken = (newToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", newToken);
  }
};

// clearToken method to remove the token from local storage
export const clearToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

export default api;
