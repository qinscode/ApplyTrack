import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const jobSchema = z.object({
  job_id: z.string(),
  job_title: z.string(),
  business_name: z.string(),
  work_type: z.string(),
  job_type: z.string(),
  pay_range: z.string(),
  suburb: z.string(),
  area: z.string(),
  url: z.string(),
  status: z.enum([
    "new",
    "Pending",
    "Applied",
    "Archived",
    "Reviewed",
    "Interviewing",
    "Technical Assessment",
    "Accepted",
    "Ghosting",
    "Pass",
    "Rejected",
  ]),
  posted_date: z.string(),
  job_description: z.string(),
});

export type Job = z.infer<typeof jobSchema>;
