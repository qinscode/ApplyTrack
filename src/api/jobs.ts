import api from "./axios";
import { Job } from "@/types";

export const getJobs = () => {
  return api.get<Job[]>("/Jobs");
};

export const getJob = (id: string) => {
  return api.get<Job>(`/Jobs/${id}`);
};

export const createJob = (jobData: Partial<Job>) => {
  return api.post<Job>("/Jobs", jobData);
};

export const updateJob = (id: string, jobData: Partial<Job>) => {
  return api.put<Job>(`/Jobs/${id}`, jobData);
};

export const deleteJob = (id: string) => {
  return api.delete(`/Jobs/${id}`);
};
