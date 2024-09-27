import { useState, useEffect, useCallback } from "react";
import api from "@/api/axios";
import { Job } from "@/types";
import { adaptJob } from "@/adapters/jobAdapter.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setJobStatusCounts } from "@/store/jobStatusSlice";
import { toast } from "@/components/ui/use-toast.ts";

type JobStatus = Job["status"];

const setupApiToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, user might not be logged in");
  }
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export function useJobStatusUpdate(initialStatus: Job["status"]) {
  const [status, setStatus] = useState<Job["status"]>(initialStatus);
  const dispatch = useDispatch();

  const isValidJobStatus = (status: string): status is Job["status"] => {
    return [
      "New",
      "Pending",
      "Applied",
      "Archived",
      "Reviewed",
      "Interviewing",
      "TechnicalAssessment",
      "Offered",
      "Ghosting",
      "Rejected",
    ].includes(status);
  };

  const fetchUpdatedJobCounts = async () => {
    try {
      const response = await api.get("/UserJobs/count");
      dispatch(setJobStatusCounts(response.data));
    } catch (error) {
      console.error("Failed to fetch updated job counts:", error);
    }
  };

  const updateJobStatus = async (jobId: number, newStatus: string) => {
    if (!isValidJobStatus(newStatus)) {
      console.error("Invalid status:", newStatus);
      toast({
        title: "Error",
        description: "Invalid job status selected.",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found, user might not be logged in");
    }
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      await api.put(`/UserJobs/${jobId}/status/${newStatus}`);
      setStatus(newStatus);
      toast({
        title: "Status updated",
        description: `Job status has been updated to ${newStatus}`,
      });

      // Fetch and update the job counts in Redux store
      await fetchUpdatedJobCounts();
    } catch (error: any) {
      console.error("Failed to update job status:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes("UserJob not found")) {
          try {
            await api.post(
              "/UserJobs",
              {
                jobId: jobId,
                status: newStatus,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setStatus(newStatus);
            toast({
              title: "Job Added and Status Updated",
              description: `This job has been added to your account with the status ${newStatus}`,
            });

            // Fetch and update the job counts in Redux store
            await fetchUpdatedJobCounts();
          } catch (createError) {
            console.error(
              "Failed to create UserJob relationship:",
              createError
            );
            toast({
              title: "Error",
              description:
                "Failed to add this job to your account. Please try again.",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Error",
            description: "Failed to update job status. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return { status, updateJobStatus };
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

interface JobStatusCount {
  status: string;
  count: number;
}

interface JobStatusResponse {
  statusCounts: JobStatusCount[];
  totalJobsCount: number;
  newJobsCount: number;
}

export function useJobStatusCounts() {
  const dispatch = useDispatch();
  const { statusCounts, totalJobsCount, newJobsCount } = useSelector(
    (state: RootState) => state.jobStatus
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobStatusCounts = useCallback(async () => {
    try {
      setLoading(true);
      setupApiToken();
      const response = await api.get<JobStatusResponse>("/UserJobs/count");
      dispatch(setJobStatusCounts(response.data));
      setError(null);
    } catch (err) {
      console.error("Error fetching job status counts:", err);
      setError("Failed to fetch job status counts");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchJobStatusCounts();
  }, [fetchJobStatusCounts]);

  const getCountByStatus = (status: string) => {
    const statusCount = statusCounts.find((item) => item.status === status);
    return statusCount ? statusCount.count : 0;
  };

  return {
    statusCounts,
    totalJobsCount,
    loading,
    error,
    getCountByStatus,
    newJobsCount,
    refetch: fetchJobStatusCounts,
  };
}
