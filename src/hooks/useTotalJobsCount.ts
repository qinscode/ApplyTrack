import { useState, useEffect, useCallback } from "react";
import api from "@/api/axios";
import { Job } from "@/types";
import { adaptJob } from "@/adapters/jobAdapter.ts";

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

export function useJobCountByStatus(
  status: JobStatus,
  currentPage: number = 1,
  PAGE_SIZE: number = 20
) {
  const [totalJobsCount, setTotalJobsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [Jobs, setJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchJobCount = useCallback(async () => {
    try {
      setLoading(true);
      setupApiToken();
      const response = await api.get(
        `/UserJobs/status/${status}?pageNumber=${currentPage}&pageSize=${PAGE_SIZE}`
      );
      setTotalJobsCount(response.data.totalCount);
      setError(null);
      setTotalPages(Math.ceil(response.data.totalCount / PAGE_SIZE));

      const adaptedJobs = response.data.jobs.map(adaptJob);

      // Filter out any jobs that didn't adapt correctly
      const validJobs = adaptedJobs.filter(
        (job: Job) =>
          job.job_id &&
          job.job_title &&
          job.business_name &&
          job.work_type &&
          job.job_type &&
          job.pay_range &&
          job.status &&
          job.posted_date &&
          job.job_description
      );

      setJobs(validJobs);
    } catch (err) {
      console.error(`Error fetching ${status} jobs:`, err);
      setError(`Failed to fetch ${status} jobs count`);
      setTotalJobsCount(0);
    } finally {
      setLoading(false);
    }
  }, [status, currentPage, PAGE_SIZE]);

  useEffect(() => {
    fetchJobCount();
  }, [fetchJobCount]);

  const refetch = useCallback(() => {
    fetchJobCount();
  }, [fetchJobCount]);

  return { totalJobsCount, loading, error, Jobs, totalPages, setJobs, refetch };
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
