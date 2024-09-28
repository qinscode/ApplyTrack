import axios from "axios";

const API_URL = "http://localhost:5051/api";

const getToken = () => localStorage.getItem("token");

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
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// updateToken method to update the token in local storage
export const updateToken = (newToken) => {
  localStorage.setItem("token", newToken);
};

// clearToken method to remove the token from local storage
export const clearToken = () => {
  localStorage.removeItem("token");
};

export default api;
