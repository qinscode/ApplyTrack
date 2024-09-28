import api from "./axios";

interface User {
  username: string;
  email: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/Users");
  return response.data;
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.post("/Users", userData);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/Users");
  return response.data;
};
