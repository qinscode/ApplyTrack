import axios from "axios";

const API_URL = "http://localhost:5051/api"; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
