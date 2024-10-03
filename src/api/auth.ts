import api from "./axios";
import { updateToken } from "./axios";

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  const { token } = response.data;
  updateToken(token);
  return response.data;
};

export const googleLogin = async (accessToken: string) => {
  console.log(accessToken);
  const response = await api.post("/auth/google", { access_token: accessToken });
  const { token } = response.data;
  updateToken(token);
  return response.data;
};
