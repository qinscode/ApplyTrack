import type { Job } from "@/types/schema";
import api from "./axios";

export const getJobs = async () => {
  try {
    const response = await api.get<Job[]>("/Jobs");
    console.log("Jobs data:", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const getJob = async (id: string) => {
  try {
    const response = await api.get<Job>(`/Jobs/${id}`);
    console.log(`Job ${id} data:`, response.data);
    return response;
  } catch (error) {
    console.error(`Error fetching job ${id}:`, error);
    throw error;
  }
};

export const createJob = async (jobData: Partial<Job>) => {
  try {
    console.log("Creating job with data:", jobData);
    const response = await api.post<Job>("/Jobs", jobData);
    console.log("Created job response:", response.data);
    return response;
  } catch (error) {
    console.error("Error creating job:", error);
    console.error("Job data that caused error:", jobData);
    throw error;
  }
};

export const updateJob = async (id: string, jobData: Partial<Job>) => {
  try {
    console.log(`Updating job ${id} with data:`, jobData);
    const response = await api.put<Job>(`/Jobs/${id}`, jobData);
    console.log("Updated job response:", response.data);
    return response;
  } catch (error) {
    console.error(`Error updating job ${id}:`, error);
    console.error("Update data that caused error:", jobData);
    throw error;
  }
};

export const deleteJob = async (id: string) => {
  try {
    console.log(`Deleting job ${id}`);
    const response = await api.delete(`/Jobs/${id}`);
    console.log("Delete response:", response.data);
    return response;
  } catch (error) {
    console.error(`Error deleting job ${id}:`, error);
    throw error;
  }
};
