export const mockMonthlyData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 }
]

export const workTypeData = [
  { type: 'Full Time', value: 65 },
  { type: 'Contract', value: 20 },
  { type: 'Part Time', value: 10 },
  { type: 'Internship', value: 5 }
]

export const interviewData = [
  { name: 'Technical', success: 75, total: 100 },
  { name: 'Behavioral', success: 85, total: 100 },
  { name: 'Final', success: 60, total: 100 }
]

export const salaryData = [
  { range: '0-50k', count: 5 },
  { range: '50k-75k', count: 15 },
  { range: '75k-100k', count: 25 },
  { range: '100k-125k', count: 20 },
  { range: '125k+', count: 10 }
]

export const locationData = [
  { name: 'Sydney', value: 35 },
  { name: 'Melbourne', value: 30 },
  { name: 'Brisbane', value: 15 },
  { name: 'Perth', value: 10 },
  { name: 'Adelaide', value: 10 }
]

export const skillsData = [
  { text: 'React', value: 30 },
  { text: 'TypeScript', value: 28 },
  { text: 'JavaScript', value: 25 },
  { text: 'Node.js', value: 20 },
  { text: 'Next.js', value: 18 },
  { text: 'TailwindCSS', value: 15 },
  { text: 'GraphQL', value: 12 },
  { text: 'Docker', value: 10 },
  { text: 'AWS', value: 8 },
  { text: 'Git', value: 8 }
]

export const responseRateData = [
  { company_size: 'Startup', response_rate: 65, avg_response_time: 3 },
  { company_size: 'Small', response_rate: 55, avg_response_time: 5 },
  { company_size: 'Medium', response_rate: 45, avg_response_time: 7 },
  { company_size: 'Large', response_rate: 35, avg_response_time: 10 }
]

export const interviewConversionData = [
  { stage: 'applied → Phone Screen', rate: 25 },
  { stage: 'Phone → Technical', rate: 60 },
  { stage: 'Technical → Onsite', rate: 70 },
  { stage: 'Onsite → Offer', rate: 40 }
]

export const weeklyActivitiesData = [
  { week: 'Week 1', applications: 5, interviews: 2, offers: 0 },
  { week: 'Week 2', applications: 8, interviews: 3, offers: 1 },
  { week: 'Week 3', applications: 12, interviews: 4, offers: 0 },
  { week: 'Week 4', applications: 7, interviews: 5, offers: 2 },
  { week: 'Week 5', applications: 10, interviews: 3, offers: 1 },
  { week: 'Week 6', applications: 15, interviews: 6, offers: 1 }
]

export interface StatusCount {
  status: string
  count: number
  percentage: number
  change: number
}

export const statusCountsData: StatusCount[] = [
  { status: 'Applied', count: 100, percentage: 100, change: 5.2 },
  { status: 'Reviewed', count: 75, percentage: 75, change: 3.1 },
  { status: 'Interviewing', count: 45, percentage: 45, change: -2.3 },
  { status: 'Technical Assessment', count: 30, percentage: 30, change: 1.5 },
  { status: 'Offered', count: 10, percentage: 10, change: 0.8 }
]
