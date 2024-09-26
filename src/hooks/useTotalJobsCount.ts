import { useState, useEffect } from "react";
import api from "@/api/axios";
import { Job } from "@/types";

type JobStatus = Job["status"];

const setupApiToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, user might not be logged in");
  }
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export function useTotalJobsCount() {
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalJobs = async () => {
      try {
        setLoading(true);
        const response = await api.get("/Jobs?pageNumber=1&pageSize=1");
        setTotalJobs(response.data.totalCount);
        setError(null);
      } catch (err) {
        console.error("Error fetching total jobs:", err);
        setError("Failed to fetch total jobs count");
        setTotalJobs(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalJobs();
  }, []);

  return { totalJobs, loading, error };
}

export function useJobCountByStatus(status: JobStatus) {
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobCount = async () => {
      try {
        setLoading(true);
        setupApiToken();
        const response = await api.get(`/UserJobs/status/${status}`);
        setTotalJobs(response.data.totalCount);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${status} jobs:`, err);
        setError(`Failed to fetch ${status} jobs count`);
        setTotalJobs(0);
      } finally {
        setLoading(false);
      }
    };

    fetchJobCount();
  }, [status]);

  return { totalJobs, loading, error };
}

export function useNewJobsCount() {
  const [totalNewJobs, setTotalNewJobs] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotalNewJobs = async () => {
      try {
        setLoading(true);
        const response = await api.get("/Jobs/new");
        setTotalNewJobs(response.data.totalCount);
        setError(null);
      } catch (err) {
        console.error("Error fetching new jobs:", err);
        setError("Failed to fetch new jobs count");
        setTotalNewJobs(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalNewJobs();
  }, []);

  return { totalNewJobs, loading, error };
}
