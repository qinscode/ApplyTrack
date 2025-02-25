import { z } from 'zod'

export const jobSchema = z.object({
  job_id: z.number(),
  id: z.number(),
  job_title: z.string(),
  business_name: z.string(),
  work_type: z.string(),
  job_type: z.string(),
  pay_range: z.string(),
  suburb: z.string(),
  area: z.string(),
  url: z.string(),
  status: z.enum([
    'New',
    'Pending',
    'Applied',
    'Archived',
    'Reviewed',
    'Interviewing',
    'TechnicalAssessment',
    'Offered',
    'Ghosting',
    'Rejected'
  ]),
  posted_date: z.string(),
  job_description: z.string(),
  techStack: z.array(z.string()).optional()
})

export type Job = z.infer<typeof jobSchema>

export interface EmailAnalysisResult {
  subject: string
  receivedDate: string
  isRecognized: boolean
  job: {
    id: number
    jobTitle: string
    businessName: string
  }
  status: Job['status']
  keyPhrases: string[]
  suggestedActions: string
  similarity: number
  job_id?: number
}
