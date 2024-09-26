// src/types/job.ts
export interface Job {
  job_id: number; // 将 job_id 类型改为 number
  job_title: string;
  business_name: string;
  work_type: string;
  job_type: string;
  pay_range: string;
  suburb: string;
  area: string;
  url: string;
  status:
    | "New"
    | "Pending"
    | "Archived"
    | "Reviewed"
    | "Ghosting"
    | "Applied"
    | "Interviewing"
    | "TechnicalAssessment"
    | "Offered"
    | "Rejected";
  posted_date: string;
  job_description: string;
}
