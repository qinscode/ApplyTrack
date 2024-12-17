// src/utils/jobAdapter.ts

import type { Job } from "@/types/schema";

type BackendJob = {
  id: number;
  jobTitle: string;
  businessName: string;
  workType: string | null;
  jobType: string | null;
  payRange: string | null;
  suburb: string | null;
  area: string | null;
  url: string | null;
  status: string;
  postedDate: string | null;
  jobDescription: string;
};

export function adaptJob(backendJob: BackendJob): Job {
  const status = backendJob.status || "New";

  return {
    job_id: backendJob.id,
    job_title: backendJob.jobTitle,
    business_name: backendJob.businessName || "N/A",
    work_type: backendJob.workType || "N/A",
    job_type: backendJob.jobType || "N/A",
    pay_range: backendJob.payRange || "N/A",
    suburb: backendJob.suburb || "N/A",
    area: backendJob.area || "N/A",
    url: backendJob.url || "N/A",
    status: status as Job["status"],
    posted_date: backendJob.postedDate || "N/A",
    job_description: backendJob.jobDescription || "N/A",
  };
}
