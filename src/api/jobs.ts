import api from "./axios";

export const getJobs = async () => {
  try {
    const response = await api.get("/Jobs");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createJob = async (jobData: any) => {
  try {
    const response = await api.post("/Jobs", jobData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
