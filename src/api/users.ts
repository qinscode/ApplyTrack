import api, { updateToken } from "./axios";

type User = {
  username: string;
  email: string;
};

type RegisterResponse = {
  user: User;
  token: string;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/Users");
  return response.data;
};

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> => {
  const response = await api.post("/auth/register", userData);
  const { user, token } = response.data;
  updateToken(token);
  return { user, token };
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/Users");
  return response.data;
};
