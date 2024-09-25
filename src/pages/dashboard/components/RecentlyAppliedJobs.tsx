import { Job } from "@/types";
import { jobs } from "@/pages/tasks/data/tasks.ts";

// Mock data for recently applied jobs
const recentlyAppliedJobs: Job[] = jobs;

export function RecentlyAppliedJobs() {
  return (
    <div className="space-y-8">
      {recentlyAppliedJobs.map((job, index) => (
        <div key={index} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{job.job_title}</p>
            <p className="text-sm text-muted-foreground">{job.business_name}</p>
          </div>
          <div className="ml-auto font-medium">{job.status}</div>
        </div>
      ))}
    </div>
  );
}
