import { z } from "zod";

export const jobSchema = z.object({
  job_id: z.number(),
  job_title: z.string(),
  business_name: z.string(),
  work_type: z.string(),
  job_type: z.string(),
  pay_range: z.string(),
  suburb: z.string(),
  area: z.string(),
  url: z.string(),
  status: z.enum([
    "New",
    "Pending",
    "Applied",
    "Archived",
    "Reviewed",
    "Interviewing",
    "TechnicalAssessment",
    "Offered",
    "Ghosting",
    "Pass",
    "Rejected",
  ]),
  posted_date: z.string(),
  job_description: z.string(),
});

export type Job = z.infer<typeof jobSchema>;
