import api, { updateToken } from "./axios";

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  if (!response.data.token) {
    throw new Error("No token received from server");
  }

  const { token } = response.data;
  updateToken(token);
  return response.data;
};

export const googleLogin = async (accessToken: string) => {
  const response = await api.post("/auth/google", {
    access_token: accessToken,
  });
  const { token } = response.data;
  updateToken(token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
