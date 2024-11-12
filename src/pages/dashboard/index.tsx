import { useEffect, useState } from "react";

import api from "@/api/axios.ts";
import { Layout } from "@/components/custom/layout";
import { ThemesSwitcher } from "@/components/theme/themes-selector";
import { THEMES } from "@/lib/themes";

// Overview imports
import { RecentlyAppliedJobs } from "./overview/RecentlyAppliedJobs.tsx";
import { TotalJobs } from "@/pages/dashboard/overview/TodaysJobs.tsx";
import { AppliedJobs } from "@/pages/dashboard/overview/AppliedJobs.tsx";
import { NewJobs } from "@/pages/dashboard/overview/NewJobs.tsx";

// Analytics imports
import { DailyApplications } from "@/pages/dashboard/common/daily-applications.tsx";
import { MonthlyTrend } from "@/pages/dashboard/overview/MonthlyTrend.tsx";
import { ApplicationFunnel } from "@/pages/dashboard/common/application-funnel.tsx";
import { JobTypeDistribution } from "@/pages/dashboard/common/job-type-distribution.tsx";
import { SalaryDistribution } from "@/pages/dashboard/common/salary-distribution.tsx";
import { LocationDistribution } from "@/pages/dashboard/common/location-distribution.tsx";
import { SkillsDistribution } from "@/pages/dashboard/common/skills-distribution.tsx";
import { ResponseRate } from "@/pages/dashboard/common/response-rate.tsx";
import { WeeklyActivities } from "@/pages/dashboard/common/weekly-activities.tsx";

// Data imports
import {
  locationData,
  mockMonthlyData,
  responseRateData,
  salaryData,
  skillsData,
  type StatusCount,
  statusCountsData,
  weeklyActivitiesData,
  workTypeData,
} from "./data/mock-data";

export default function Dashboard() {
  const [totalJobs, setTotalJobs] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState(0);
  const [newJobs, setNewJobs] = useState(0);
  const [interviewedJobs, setInterviewedJobs] = useState(0);
  const [statusCounts] = useState<StatusCount[]>(statusCountsData);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  {
    interviewedJobs;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total jobs
        const totalJobsResponse = await api.get(
          "/Jobs?pageNumber=1&pageSize=1"
        );
        setTotalJobs(totalJobsResponse.data.totalCount);

        // Fetch applied jobs
        const appliedJobsResponse = await api.get(`/UserJobs/status/Applied`);
        setAppliedJobs(appliedJobsResponse.data.totalCount);

        // Fetch New jobs for today
        const newJobsResponse = await api.get(`/Jobs/new`);
        setNewJobs(newJobsResponse.data.totalCount);

        // Fetch interviewed jobs
        const interviewedJobsResponse = await api.get(
          `/UserJobs/status/Interviewing`
        );
        setInterviewedJobs(interviewedJobsResponse.data.totalCount);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Layout.Header
        title="Dashboard"
        className="border-b bg-background/80 backdrop-blur-sm"
      />
      <Layout.Body>
        <div className="relative space-y-2 pr-20">
          <ThemesSwitcher
            themes={THEMES}
            className="fixed right-8 top-20 z-50 rounded-lg bg-background/95 p-2 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/60"
          />

          {/* Key Metrics Section */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Key Metrics
              </h2>
              <p className="text-sm text-muted-foreground">
                Track your job search progress with real-time metrics
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <TotalJobs totalCount={totalJobs} newJobCount={newJobs} />
              <AppliedJobs appliedCount={appliedJobs} />
              <NewJobs />
              <DailyApplications />
            </div>
          </div>

          {/* Application Overview Section */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Application Overview
              </h2>
              <p className="text-sm text-muted-foreground">
                Visualize your application pipeline and recent activities
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <ApplicationFunnel statusCounts={statusCounts} />
              <MonthlyTrend data={mockMonthlyData} />
              <RecentlyAppliedJobs />
            </div>
          </div>

          {/* Job Market Insights Section */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Market Insights
              </h2>
              <p className="text-sm text-muted-foreground">
                Understand job market trends and opportunities
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <JobTypeDistribution data={workTypeData} />
              <SalaryDistribution data={salaryData} />
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <LocationDistribution data={locationData} />
              <SkillsDistribution data={skillsData} />
            </div>
          </div>

          {/* Detailed Analytics Section */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
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
        </div>
      </Layout.Body>
    </Layout>
  );
}
