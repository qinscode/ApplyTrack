import { useEffect, useState } from 'react'
import api from '@/api/axios'

import { Button } from '@/components/ui/button.tsx'
import {
  IconArrowRight,
  IconBriefcase,
  IconBuilding,
  IconChartBar,
  IconChartDots,
  IconChartPie,
  IconRocket
} from '@tabler/icons-react'
import { TotalJobs } from '@/components/dashboard/overview/TodaysJobs.tsx'
import { AppliedJobs } from '@/components/dashboard/overview/AppliedJobs'
import { DailyApplications } from '@/components/dashboard/common/daily-applications'
import { NewJobs } from '@/components/dashboard/overview/NewJobs'
import { DailyTrend } from '@/components/dashboard/overview/DailyTrend.tsx'
import { MonthlyTrend } from '@/components/dashboard/MonthlyTrend'
import { JobTypeDistribution } from '@/components/dashboard/common/job-type-distribution'
import { LocationDistribution } from '@/components/dashboard/common/location-distribution'
import { ResponseRate } from '@/components/dashboard/common/response-rate'
import { SalaryDistribution } from '@/components/dashboard/common/salary-distribution'
import { WeeklyActivities } from '@/components/dashboard/common/weekly-activities'
import { RecentlyAppliedJobs } from '@/components/dashboard/overview/RecentlyAppliedJobs'
import { ApplicationFunnel } from '@/components/dashboard/common/application-funnel'
import {
  responseRateData,
  salaryData,
  skillsData,
  weeklyActivitiesData,
  workTypeData
} from '@/components/dashboard/data/mock-data'
import { SkillsDistribution } from '@/components/dashboard/common/skills-distribution.tsx'
import { WorkLocationTypes } from '@/components/reports/work-location-types'
import { SkillTrends } from '@/components/reports/skill-trends.tsx'
import { InterviewOutcomes } from '@/components/reports/interview-outcomes.tsx'

const interviewOutcomeData = [
  { stage: 'Phone Screen', passed: 80, total: 100 },
  { stage: 'Technical Round', passed: 60, total: 80 },
  { stage: 'System Design', passed: 40, total: 60 },
  { stage: 'Culture Fit', passed: 35, total: 40 },
  { stage: 'Final Round', passed: 30, total: 35 }
]

const skillTrendData = [
  { month: 'Jan', react: 80, typescript: 60, node: 40 },
  { month: 'Feb', react: 85, typescript: 65, node: 45 },
  { month: 'Mar', react: 90, typescript: 75, node: 50 },
  { month: 'Apr', react: 88, typescript: 80, node: 55 },
  { month: 'May', react: 92, typescript: 85, node: 60 },
  { month: 'Jun', react: 95, typescript: 90, node: 65 }
]

const salaryDistributionData = [
  { range: '0-50k', count: 10, fill: 'hsl(var(--chart-1))' },
  { range: '50k-75k', count: 25, fill: 'hsl(var(--chart-2))' },
  { range: '75k-100k', count: 35, fill: 'hsl(var(--chart-3))' },
  { range: '100k-125k', count: 20, fill: 'hsl(var(--chart-4))' },
  { range: '125k+', count: 10, fill: 'hsl(var(--chart-5))' }
]

const locationData = [
  { name: 'Remote', value: 40, fill: 'hsl(var(--chart-1))' },
  { name: 'Hybrid', value: 35, fill: 'hsl(var(--chart-2))' },
  { name: 'On-site', value: 25, fill: 'hsl(var(--chart-3))' }
]

const Demo4Content = () => {
  const [totalJobs, setTotalJobs] = useState(0)
  const [appliedJobs, setAppliedJobs] = useState(0)
  const [newJobs, setNewJobs] = useState(0)
  const [interviewedJobs, setInterviewedJobs] = useState(0)
  const [jobTypes, setJobTypes] = useState([])
  const [dailyTrend, setDailyTrend] = useState([])

  const [showAddJobDialog, setShowAddJobDialog] = useState(false)

  const handleAddJob = async (jobData: any) => {
    try {
      await api.post('/Jobs', jobData)
    } catch (error) {
      console.error('Error adding job:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total jobs
        const totalJobsResponse = await api.get('/Jobs?pageNumber=1&pageSize=1')
        setTotalJobs(totalJobsResponse.data.totalCount)

        // Daily Trend
        const dailyTrendResponse = await api.get('/Jobs/daily-counts?days=7')
        setDailyTrend(dailyTrendResponse.data)

        // Fetch top job types
        const topJobType = await api.get('/Jobs/top-job-types')
        setJobTypes(topJobType.data)

        // Fetch applied jobs
        const appliedJobsResponse = await api.get(`/UserJobs/status/Applied`)
        setAppliedJobs(appliedJobsResponse.data.totalCount)

        // Fetch new jobs for today
        const newJobsResponse = await api.get(`/Jobs/new`)
        setNewJobs(newJobsResponse.data.totalCount)

        // Fetch interviewed jobs
        const interviewedJobsResponse = await api.get(`/UserJobs/status/Interviewing`)
        setInterviewedJobs(interviewedJobsResponse.data.totalCount)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchData()
  }, [])
  // @ts-ignore
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-3">
          <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8">
            <div className="relative z-10">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Welcome to Your Job Search Dashboard
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground">
                    Track your job search progress, manage applications, and get insights to
                    optimize your career journey.
                  </p>
                  <p className="max-w-[600px] text-xs text-muted-foreground">
                    This application currently collects job data for the Perth, with plans to expand
                    to more regions in the future. The timeline for this expansion is yet to be
                    determined.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button onClick={() => setShowAddJobDialog(true)}>
                      <IconRocket className="mr-2 size-4" />
                      Add New Job
                    </Button>
                    <Button variant="outline">
                      View Reports
                      <IconArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 rounded-lg bg-background/60 p-4 backdrop-blur">
                    <h3 className="font-semibold">Total Jobs</h3>
                    <div className="text-2xl font-bold">{totalJobs}</div>
                    <p className="text-sm text-muted-foreground">Active opportunities</p>
                  </div>
                  <div className="space-y-2 rounded-lg bg-background/60 p-4 backdrop-blur">
                    <h3 className="font-semibold">Applied</h3>
                    <div className="text-2xl font-bold">{appliedJobs}</div>
                    <p className="text-sm text-muted-foreground">Applications sent</p>
                  </div>
                  <div className="space-y-2 rounded-lg bg-background/60 p-4 backdrop-blur">
                    <h3 className="font-semibold">New Today</h3>
                    <div className="text-2xl font-bold">{newJobs}</div>
                    <p className="text-sm text-muted-foreground">Fresh opportunities</p>
                  </div>
                  <div className="space-y-2 rounded-lg bg-background/60 p-4 backdrop-blur">
                    <h3 className="font-semibold">Response Rate</h3>
                    <div className="text-2xl font-bold">
                      {appliedJobs ? Math.round((interviewedJobs / appliedJobs) * 100) : 0}%
                    </div>
                    <p className="text-sm text-muted-foreground">Interview success</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="space-y-8">
            {/* Key Metrics Section */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  <IconChartPie className="size-7" stroke={1.5} />
                  Key Metrics
                </h2>
                <p className="text-sm text-muted-foreground">
                  Track your job search progress with real-time metrics
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <TotalJobs totalCount={totalJobs} newJobCount={newJobs} />
                <AppliedJobs appliedCount={appliedJobs} />
                <NewJobs data={jobTypes} />
                <DailyApplications />
              </div>
            </div>

            {/* Application Overview Section */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  <IconBriefcase className="size-7" stroke={1.5} />
                  Application Overview
                </h2>
                <p className="text-sm text-muted-foreground">
                  Visualize your application pipeline and recent activities
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-6">
                <div className="md:col-span-2">
                  <ApplicationFunnel />
                </div>
                <div className="md:col-span-2">
                  <DailyTrend data={dailyTrend} />
                </div>
                <div className="md:col-span-2">
                  <RecentlyAppliedJobs />
                </div>
              </div>
              <div className="grid gap-8 md:grid-cols-6">
                <div className="md:col-span-6">
                  <MonthlyTrend />
                </div>
              </div>
            </div>

            {/* Job Market Insights Section */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  <IconChartBar className="size-7" stroke={1.5} />
                  Market Insights
                </h2>
                <p className="text-sm text-muted-foreground">
                  Understand job market trends and opportunities
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                <JobTypeDistribution data={workTypeData} />
                <SalaryDistribution data={salaryData} />
                <LocationDistribution data={locationData} />
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <SkillsDistribution data={skillsData} />
              </div>
            </div>

            {/* Detailed Analytics Section */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  <IconChartDots className="size-7" stroke={1.5} />
                  Detailed Analytics
                </h2>
                <p className="text-sm text-muted-foreground">
                  Deep dive into your application metrics and weekly progress
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <ResponseRate data={responseRateData} />
                <WeeklyActivities data={weeklyActivitiesData} />
              </div>
            </div>

            {/* Job Market */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                  <IconBuilding className="size-7" stroke={1.5} />
                  Job Market
                </h2>
                <p className="text-sm text-muted-foreground">
                  Deep dive into your application metrics and weekly progress
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <InterviewOutcomes data={interviewOutcomeData} />
                <SkillTrends data={skillTrendData} />
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <SalaryDistribution data={salaryDistributionData} />
                <WorkLocationTypes data={locationData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Demo4Content }
