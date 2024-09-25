// src/types/job.ts
export interface Job {
  job_id: string
  job_title: string
  business_name: string
  work_type: string
  job_type: string
  pay_range: string
  suburb: string
  area: string
  url: string
  status:
    | 'New'
    | 'Pending'
    | 'Applied'
    | 'Archived'
    | 'Reviewed'
    | 'Interviewing'
    | 'Technical Assessment'
    | 'Accepted'
    | 'Ghosting'
    | 'Pass'
    | 'Rejected'
  posted_date: string
  job_description: string
}
