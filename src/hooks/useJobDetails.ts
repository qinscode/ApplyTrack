import type { Job } from "@/types";
import { adaptJob } from "@/adapters/jobAdapter";
import api from "@/api/axios";
import { useEffect, useState } from "react";

export function useJobDetails(jobId: string | undefined) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/Jobs/${jobId}`);
        const adaptedJob = adaptJob(response.data);
        setJob(adaptedJob);
        setError(null);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to fetch job details");
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  return { job, loading, error };
}
