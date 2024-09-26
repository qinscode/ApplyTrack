// src/adapters/jobAdapter.ts

import { Job } from "@/types";

interface BackendJob {
  id: string;
  jobTitle: string;
  businessName: string;
  workType: string;
  jobType: string;
  payRange: string;
  suburb: string | null;
  area: string | null;
  url: string | null;
  status: string;
  postedDate: string;
  jobDescription: string;
}

export function adaptJob(backendJob: BackendJob): Job {
  return {
    job_id: backendJob.id,
    job_title: backendJob.jobTitle,
    business_name: backendJob.businessName,
    work_type: backendJob.workType,
    job_type: backendJob.jobType,
    pay_range: backendJob.payRange,
    suburb: backendJob.suburb || "",
    area: backendJob.area || "",
    url: backendJob.url || "",
    status: backendJob.status as Job["status"],
    posted_date: backendJob.postedDate,
    job_description: backendJob.jobDescription,
  };
}
