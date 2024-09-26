// src/adapters/jobAdapter.ts

import { Job } from "@/types";

interface BackendJob {
  id: number; // 允许 id 为数字
  jobTitle: string;
  businessName: string;
  workType: string;
  jobType: string;
  payRange: string;
  suburb: string | null;
  area: string | null;
  url: string | null;
  status: string;
  postedDate: string | null; // 允许 postedDate 为 null
  jobDescription: string;
}

export function adaptJob(backendJob: BackendJob): Job {
  const adaptedJob: Job = {
    job_id: backendJob.id,
    job_title: backendJob.jobTitle,
    business_name: backendJob.businessName || "",
    work_type: backendJob.workType || "",
    job_type: backendJob.jobType || "",
    pay_range: backendJob.payRange || "",
    suburb: backendJob.suburb || "",
    area: backendJob.area || "",
    url: backendJob.url || "",
    status: backendJob.status as Job["status"],
    posted_date: backendJob.postedDate || "",
    job_description: backendJob.jobDescription || "",
  };

  console.log("Adapted job:", adaptedJob);
  return adaptedJob;
}
