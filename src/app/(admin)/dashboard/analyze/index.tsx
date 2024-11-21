"use client";
import { ApplicationFunnel } from "@/app/(admin)/dashboard/common/application-funnel";
import { DailyApplications } from "@/app/(admin)/dashboard/common/daily-applications";
import { InterviewConversion } from "@/app/(admin)/dashboard/common/interview-conversion";
import { InterviewSuccessRate } from "@/app/(admin)/dashboard/common/interview-success-rate";
import { JobTypeDistribution } from "@/app/(admin)/dashboard/common/job-type-distribution";
import { LocationDistribution } from "@/app/(admin)/dashboard/common/location-distribution";
import { MonthlyTrend } from "@/app/(admin)/dashboard/common/monthly-trend";
import { ResponseRate } from "@/app/(admin)/dashboard/common/response-rate";
import { SalaryDistribution } from "@/app/(admin)/dashboard/common/salary-distribution";
import { SkillsDistribution } from "@/app/(admin)/dashboard/common/skills-distribution";
import { WeeklyActivities } from "@/app/(admin)/dashboard/common/weekly-activities";
import { ThemesSwitcher } from "@/components/theme/themes-selector";
import { THEMES } from "@/lib/themes";

const mockMonthlyData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const workTypeData = [
  { type: "Full Time", value: 65 },
  { type: "Contract", value: 20 },
  { type: "Part Time", value: 10 },
  { type: "Internship", value: 5 },
];

const interviewData = [
  { name: "Technical", success: 75, total: 100 },
  { name: "Behavioral", success: 85, total: 100 },
  { name: "Final", success: 60, total: 100 },
];

const salaryData = [
  { range: "0-50k", count: 5 },
  { range: "50k-75k", count: 15 },
  { range: "75k-100k", count: 25 },
  { range: "100k-125k", count: 20 },
  { range: "125k+", count: 10 },
];

const locationData = [
  { name: "Sydney", value: 35 },
  { name: "Melbourne", value: 30 },
  { name: "Brisbane", value: 15 },
  { name: "Perth", value: 10 },
  { name: "Adelaide", value: 10 },
];

const skillsData = [
  { text: "React", value: 30 },
  { text: "TypeScript", value: 28 },
  { text: "JavaScript", value: 25 },
  { text: "Node.js", value: 20 },
  { text: "Next.js", value: 18 },
  { text: "TailwindCSS", value: 15 },
  { text: "GraphQL", value: 12 },
  { text: "Docker", value: 10 },
  { text: "AWS", value: 8 },
  { text: "Git", value: 8 },
];

const responseRateData = [
  { company_size: "Startup", response_rate: 65, avg_response_time: 3 },
  { company_size: "Small", response_rate: 55, avg_response_time: 5 },
  { company_size: "Medium", response_rate: 45, avg_response_time: 7 },
  { company_size: "Large", response_rate: 35, avg_response_time: 10 },
];

const interviewConversionData = [
  { stage: "applied → Phone Screen", rate: 25 },
  { stage: "Phone → Technical", rate: 60 },
  { stage: "Technical → Onsite", rate: 70 },
  { stage: "Onsite → Offer", rate: 40 },
];

const weeklyActivitiesData = [
  { week: "Week 1", applications: 5, interviews: 2, offers: 0 },
  { week: "Week 2", applications: 8, interviews: 3, offers: 1 },
  { week: "Week 3", applications: 12, interviews: 4, offers: 0 },
  { week: "Week 4", applications: 7, interviews: 5, offers: 2 },
  { week: "Week 5", applications: 10, interviews: 3, offers: 1 },
  { week: "Week 6", applications: 15, interviews: 6, offers: 1 },
];

export default function DashboardStats() {
  return (

    <div className="relative grid gap-4">
      <section id="charts" className="scroll-mt-20">
        <div className="sticky -top-6 z-50 bg-background py-1" />
        <div className="grid gap-4">
          <div>
            <ThemesSwitcher
              themes={THEMES}
              className="fixed right-8 top-20 z-50 rounded-lg bg-background/95 p-2 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/60"
            />

            <div className="space-y-8 pr-20">
              <div className="grid gap-8 ">
                <ApplicationFunnel />
                <DailyApplications />
                <MonthlyTrend data={mockMonthlyData} />
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <JobTypeDistribution data={workTypeData} />
                <InterviewSuccessRate data={interviewData} />
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <SalaryDistribution data={salaryData} />
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <LocationDistribution data={locationData} />
                <SkillsDistribution data={skillsData} />
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <ResponseRate data={responseRateData} />
                <InterviewConversion data={interviewConversionData} />
              </div>

              <WeeklyActivities data={weeklyActivitiesData} />
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}
