import { DirectionsRunRounded } from "@mui/icons-material";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SwitchAccessShortcutAddRoundedIcon from "@mui/icons-material/SwitchAccessShortcutAddRounded";
import { useEffect, useState } from "react";

import api from "@/api/axios.ts";
import { Layout } from "@/components/custom/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Index } from "./overview";
import { RecentlyAppliedJobs } from "./overview/RecentlyAppliedJobs.tsx";
import { Search } from "@/components/search.tsx";
import { Link } from "react-router-dom";
import { Button } from "@/components/custom/button.tsx";
import { CircleHelp } from "lucide-react";
import ThemeSwitch from "@/components/theme-switch.tsx";
import { ThemeCustomizer } from "@/components/theme/theme-customizer.tsx";
import { UserNav } from "@/components/user-nav.tsx";
import { Icons } from "@/components/icons.tsx";

export default function Dashboard() {
  const [totalJobs, setTotalJobs] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState(0);
  const [newJobs, setNewJobs] = useState(0);
  const [interviewedJobs, setInterviewedJobs] = useState(0);

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

        // Fetch New jobs (assuming 'Saved' status represents New jobs)
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
      >
        <div className="ml-auto flex flex-1 items-center space-x-2 px-2 sm:px-4 md:max-w-96 lg:max-w-lg">
          <Search />
          <Link
            to="https://github.com/TinsFox/shadcnui-boilerplate"
            target="_blank"
          >
            <Button variant="ghost" size="icon">
              <Icons.gitHub className="size-5" />
            </Button>
          </Link>
          <Link to="https://shadcnui-boilerplate.pages.dev" target="_blank">
            <Button variant="ghost" size="icon">
              <CircleHelp className="size-5" />
            </Button>
          </Link>
          <ThemeSwitch />
          <ThemeCustomizer />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          <div className="w-full overflow-x-auto pb-2">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Today's Jobs in Seek
                  </CardTitle>
                  <DirectionsRunRounded style={{ fontSize: 20 }} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalJobs}</div>
                  <p className="text-xs text-muted-foreground">
                    +0% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Applied</CardTitle>
                  <SendRoundedIcon style={{ fontSize: 20 }} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{appliedJobs}</div>
                  <p className="text-xs text-muted-foreground">
                    +0% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Interviewed
                  </CardTitle>
                  <ForumOutlinedIcon style={{ fontSize: 20 }} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{interviewedJobs}</div>
                  <p className="text-xs text-muted-foreground">
                    +0% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    New Jobs
                  </CardTitle>
                  <SwitchAccessShortcutAddRoundedIcon
                    style={{ fontSize: 20 }}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {newJobs === 0 ? `${newJobs}` : `+${newJobs}`}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    since yesterday
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-1 lg:col-span-4">
                <CardHeader>
                  <CardTitle>Jobs Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Index />
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentlyAppliedJobs />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Body>
    </Layout>
  );
}
