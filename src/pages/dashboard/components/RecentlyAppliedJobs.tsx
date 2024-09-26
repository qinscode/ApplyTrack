import { useEffect, useState } from "react";
import api from "@/api/axios";

interface RecentJob {
  id: string;
  userId: string;
  userName: string | null;
  jobId: string;
  jobTitle: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

const statusMap: { [key: number]: string } = {
  6: "Interviewing",
  7: "Technical Assessment",
  8: "Offered",
  9: "Rejected",
};

export function RecentlyAppliedJobs() {
  const [recentlyAppliedJobs, setRecentlyAppliedJobs] = useState<RecentJob[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found, user might not be logged in");
        }
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.get<RecentJob[]>("/UserJobs/recent");
        setRecentlyAppliedJobs(response.data);
        console.log("Rec", response.data);
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
          key={job.id}
          className="flex items-center justify-between rounded-lg bg-white p-4 "
        >
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{job.jobTitle}</p>
            <p className="text-xs text-muted-foreground">
              Updated on: {new Date(job.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-sm font-medium">
            {statusMap[job.status] || "Unknown"}
          </div>
        </div>
      ))}
    </div>
  );
}
