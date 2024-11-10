import { useEffect, useState } from "react";
import api from "@/api/axios.ts";

interface RecentJob {
  jobId: string;
  jobTitle: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  businessName: string;
}

export function RecentlyAppliedJobs() {
  const [recentlyAppliedJobs, setRecentlyAppliedJobs] = useState<RecentJob[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<RecentJob[]>("/UserJobs/recent");
        setRecentlyAppliedJobs(response.data);
      } catch (error) {
        console.error("Error fetching recently applied jobs:", error);
        setError(
          "Failed to fetch recently applied jobs. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading recently applied jobs...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (recentlyAppliedJobs.length === 0) {
    return <div>No recently applied jobs found.</div>;
  }

  return (
    <div className="space-y-4">
      {recentlyAppliedJobs.map((job) => (
        <div
          key={job.jobId}
          className="flex items-center justify-between rounded-lg bg-white p-4 "
        >
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{job.jobTitle}</p>
            <p className="text-xs text-muted-foreground">{job.businessName}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {[job.status] || "Unknown"}
            </p>
            <p className="text-xs text-muted-foreground">
              Applied on: {new Date(job.updatedAt).toLocaleDateString()}
            </p>
          </div>
          {/*<div className="text-sm font-medium">{[job.status] || "Unknown"}</div>*/}
        </div>
      ))}
    </div>
  );
}
