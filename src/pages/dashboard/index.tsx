import { useEffect, useState } from "react";

import api from "@/api/axios.ts";
import { Layout } from "@/components/custom/layout";
import { RecentlyAppliedJobs } from "./overview/RecentlyAppliedJobs.tsx";
import { TotalJobs } from "@/pages/dashboard/overview/TodaysJobs.tsx";
import { AppliedJobs } from "@/pages/dashboard/overview/AppliedJobs.tsx";
import { NewJobs } from "@/pages/dashboard/overview/NewJobs.tsx";
import { DailyApplications } from "@/pages/dashboard/common/daily-applications.tsx";
import { MonthlyTrend } from "@/pages/dashboard/overview/MonthlyTrend.tsx";

export default function Dashboard() {
  const [totalJobs, setTotalJobs] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState(0);
  const [newJobs, setNewJobs] = useState(0);
  const [interviewedJobs, setInterviewedJobs] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  {
    newJobs;
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
        const newJobsResponse = await api.get(`/Jobs/new/today`);
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
        <div className="space-y-8 pr-20">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <TotalJobs totalCount={totalJobs} />
            <AppliedJobs appliedCount={appliedJobs} />
            <NewJobs />
            <DailyApplications />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <div className="col-span-1 lg:col-span-2">
              <MonthlyTrend />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <RecentlyAppliedJobs />
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
}
