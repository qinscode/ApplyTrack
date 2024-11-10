import { Layout } from "@/components/custom/layout";
import { PageHeader } from "@/components/page-header";
import { useState } from "react";
import { ThemesSwitcher } from "@/components/theme/themes-selector";
import { THEMES } from "@/lib/themes";
import { ApplicationFunnel } from "@/components/dashboard/application-funnel";
import { WeeklyApplications } from "@/components/dashboard/weekly-applications";
import { MonthlyTrend } from "@/components/dashboard/monthly-trend";
import { JobTypeDistribution } from "@/components/dashboard/job-type-distribution";
import { InterviewSuccessRate } from "@/components/dashboard/interview-success-rate";
import { SalaryDistribution } from "@/components/dashboard/salary-distribution";
import { LocationDistribution } from "@/components/dashboard/location-distribution";
import { SkillsDistribution } from "@/components/dashboard/skills-distribution";
import { ResponseRate } from "@/components/dashboard/response-rate";
import { InterviewConversion } from "@/components/dashboard/interview-conversion";
import { WeeklyActivities } from "@/components/dashboard/weekly-activities";

interface StatusCount {
  status: string;
  count: number;
  percentage: number;
  change: number;
}

const mockWeeklyData = [
  { week: "Week 1", applications: 5 },
  { week: "Week 2", applications: 8 },
  { week: "Week 3", applications: 12 },
  { week: "Week 4", applications: 7 },
  { week: "Week 5", applications: 10 },
  { week: "Week 6", applications: 15 },
];

const mockMonthlyData = [
  { month: "Jan", applications: 20, fill: "var(--color-january)" },
  { month: "Feb", applications: 35, fill: "var(--color-february)" },
  { month: "Mar", applications: 45, fill: "var(--color-march)" },
  { month: "Apr", applications: 30, fill: "var(--color-april)" },
  { month: "May", applications: 40, fill: "var(--color-may)" },
  { month: "Jun", applications: 50, fill: "var(--color-june)" },
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
  { stage: "Applied → Phone Screen", rate: 25 },
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
  const [statusCounts] = useState<StatusCount[]>([
    { status: "Applied", count: 100, percentage: 100, change: 5.2 },
    { status: "Reviewed", count: 75, percentage: 75, change: 3.1 },
    { status: "Interviewing", count: 45, percentage: 45, change: -2.3 },
    { status: "Technical Assessment", count: 30, percentage: 30, change: 1.5 },
    { status: "Offered", count: 10, percentage: 10, change: 0.8 },
  ]);

  return (
    <Layout>
      <PageHeader title="Application Analytics" />
      <Layout.Body>
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
                  <ApplicationFunnel statusCounts={statusCounts} />
                  
                  <div className="grid gap-8 md:grid-cols-2">
                    <WeeklyApplications data={mockWeeklyData} />
                    <MonthlyTrend data={mockMonthlyData} />
                  </div>

                  <div className="grid gap-8 md:grid-cols-2">
                    <JobTypeDistribution data={workTypeData} />
                    <InterviewSuccessRate data={interviewData} />
                  </div>

                  <SalaryDistribution data={salaryData} />

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
      </Layout.Body>
    </Layout>
  );
}
