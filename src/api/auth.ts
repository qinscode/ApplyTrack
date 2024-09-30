import api from "./axios";
import { updateToken } from "./axios";

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  const { token } = response.data;
  updateToken(token);
  return response.data;
};

export const googleLogin = async (googleToken: string) => {
  const response = await api.post("/auth/google", { token: googleToken });
  const { token } = response.data;
  updateToken(token);
  return response.data;
};
