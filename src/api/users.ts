import api from "./axios";

export const getUsers = async () => {
  const response = await api.get("/Users");
  return response.data;
};

export const createUser = async (userData: any) => {
  const response = await api.post("/Users", userData);
  return response.data;
};
