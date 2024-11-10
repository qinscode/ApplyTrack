import { Layout } from "@/components/custom/layout";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import { ThemesSwitcher } from "@/components/theme/themes-selector.tsx";
import { THEMES } from "@/lib/themes.ts";
import { useTheme } from "@/components/theme/theme-provider"
import { useThemesConfig } from "@/hooks/use-themes-config"

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
  { type: "Full Time", value: 65, fill: "hsl(var(--chart-1))" },
  { type: "Contract", value: 20, fill: "hsl(var(--chart-2))" },
  { type: "Part Time", value: 10, fill: "hsl(var(--chart-3))" },
  { type: "Internship", value: 5, fill: "hsl(var(--chart-4))" },
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
  { name: "Sydney", value: 35, fill: "hsl(var(--chart-1))" },
  { name: "Melbourne", value: 30, fill: "hsl(var(--chart-2))" },
  { name: "Brisbane", value: 15, fill: "hsl(var(--chart-3))" },
  { name: "Perth", value: 10, fill: "hsl(var(--chart-4))" },
  { name: "Adelaide", value: 10, fill: "hsl(var(--chart-5))" },
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

// 添加响应率数据
const responseRateData = [
  { company_size: "Startup", response_rate: 65, avg_response_time: 3 },
  { company_size: "Small", response_rate: 55, avg_response_time: 5 },
  { company_size: "Medium", response_rate: 45, avg_response_time: 7 },
  { company_size: "Large", response_rate: 35, avg_response_time: 10 },
];

// 添加面试转化率数据
const interviewConversionData = [
  { stage: "Applied → Phone Screen", rate: 25 },
  { stage: "Phone → Technical", rate: 60 },
  { stage: "Technical → Onsite", rate: 70 },
  { stage: "Onsite → Offer", rate: 40 },
];

// 添加每周活动数据
const weeklyActivitiesData = [
  { week: "Week 1", applications: 5, interviews: 2, offers: 0 },
  { week: "Week 2", applications: 8, interviews: 3, offers: 1 },
  { week: "Week 3", applications: 12, interviews: 4, offers: 0 },
  { week: "Week 4", applications: 7, interviews: 5, offers: 2 },
  { week: "Week 5", applications: 10, interviews: 3, offers: 1 },
  { week: "Week 6", applications: 15, interviews: 6, offers: 1 },
];

function SkillCloud() {
  return (
    <div className="flex flex-wrap gap-2">
      {skillsData.map((skill) => (
        <div
          key={skill.text}
          className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-100"
          style={{
            fontSize: `${Math.max(0.8, skill.value / 15)}rem`,
          }}
        >
          {skill.text}
        </div>
      ))}
    </div>
  );
}

export default function DashboardStats() {
  const [statusCounts] = useState<StatusCount[]>([
    { status: "Applied", count: 100, percentage: 100, change: 5.2 },
    { status: "Reviewed", count: 75, percentage: 75, change: 3.1 },
    { status: "Interviewing", count: 45, percentage: 45, change: -2.3 },
    { status: "Technical Assessment", count: 30, percentage: 30, change: 1.5 },
    { status: "Offered", count: 10, percentage: 10, change: 0.8 },
  ]);

  const { themesConfig } = useThemesConfig()
  
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
                  {/* Application Funnel */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Funnel</CardTitle>
                      <CardDescription>
                        Conversion rates through different stages
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {statusCounts.map((status, index) => (
                        <div key={status.status} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {status.status}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ({status.count})
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                {status.percentage}%
                              </span>
                              <span
                                className={`flex items-center text-sm ${
                                  status.change >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {status.change >= 0 ? (
                                  <IconArrowUpRight className="h-4 w-4" />
                                ) : (
                                  <IconArrowDownRight className="h-4 w-4" />
                                )}
                                {Math.abs(status.change)}%
                              </span>
                            </div>
                          </div>
                          <Progress 
                            value={status.percentage} 
                            className="h-2" 
                            indicatorColor={`hsl(${themesConfig.activeTheme.cssVars.light[`--chart-${index + 1}`]})`}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Weekly Trend */}
                  <div className="grid gap-8 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Weekly Applications</CardTitle>
                        <CardDescription>
                          Applications submitted per week
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={mockWeeklyData}>
                            <XAxis
                              dataKey="week"
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={true}
                            />
                            <YAxis
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={true}
                              tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip />
                            <Bar
                              dataKey="applications"
                              fill="hsl(var(--purple-300))"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* Monthly Trend */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Monthly Trend</CardTitle>
                        <CardDescription>
                          Application trend over months
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={mockMonthlyData}>
                            <defs>
                              <linearGradient
                                id="applicationGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="hsl(var(--purple-300))"
                                  stopOpacity={0.2}
                                />
                                <stop
                                  offset="100%"
                                  stopColor="hsl(var(--purple-300))"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <XAxis
                              dataKey="month"
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={true}
                            />
                            <YAxis
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={true}
                              tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="applications"
                              stroke="hsl(var(--purple-300))"
                              strokeWidth={2}
                              fill="url(#applicationGradient)"
                              dot={false}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 新增分析图表 */}
                  <div className="grid gap-8 md:grid-cols-2">
                    {/* 工作类型分布 */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Job Type Distribution</CardTitle>
                        <CardDescription>
                          Distribution of different employment types
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={workTypeData}
                              dataKey="value"
                              nameKey="type"
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              label={(entry) =>
                                `${entry.type} (${entry.value}%)`
                              }
                            />
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* 面试成功率 */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Interview Success Rate</CardTitle>
                        <CardDescription>
                          Success rate at different interview stages
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={interviewData} layout="vertical">
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip formatter={(value) => `${value}%`} />
                            <Bar
                              dataKey="success"
                              fill="hsl(var(--purple-300))"
                              radius={[0, 4, 4, 0]}
                            >
                              {/* 可以添加自定义标签显示百分比 */}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* 薪资范围分布 */}
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Salary Range Distribution</CardTitle>
                        <CardDescription>
                          Distribution of job applications by salary range
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={salaryData}>
                            <XAxis
                              dataKey="range"
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={true}
                            />
                            <YAxis
                              stroke="#888888"
                              fontSize={12}
                              tickLine={false}
                              axisLine={true}
                            />
                            <Tooltip />
                            <Bar
                              dataKey="count"
                              fill="hsl(var(--purple-300))"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 新增地理位置和技能分布 */}
                  <div className="grid gap-8 md:grid-cols-2">
                    {/* 地理位置分布 */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Location Distribution</CardTitle>
                        <CardDescription>
                          Job applications by location
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={locationData}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              label={({ name, value }) => `${name} (${value}%)`}
                            >
                              {locationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* 技能标签云 */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Skills Distribution</CardTitle>
                        <CardDescription>
                          Most requested skills in job applications
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex h-[300px] items-center justify-center">
                          <SkillCloud />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 添加响应率分析 */}
                  <div className="grid gap-8 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Response Rate by Company Size</CardTitle>
                        <CardDescription>
                          Response rates and average response time
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={responseRateData}>
                            <XAxis dataKey="company_size" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Bar
                              yAxisId="left"
                              dataKey="response_rate"
                              fill="hsl(var(--purple-300))"
                              name="Response Rate (%)"
                            />
                            <Bar
                              yAxisId="right"
                              dataKey="avg_response_time"
                              fill="hsl(var(--blue-300))"
                              name="Avg Response Time (days)"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    {/* 面试转化率漏斗图 */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Interview Conversion Funnel</CardTitle>
                        <CardDescription>
                          Success rate between interview stages
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                            data={interviewConversionData}
                            layout="vertical"
                          >
                            <XAxis type="number" domain={[0, 100]} />
                            <YAxis
                              dataKey="stage"
                              type="category"
                              width={150}
                            />
                            <Tooltip formatter={(value) => `${value}%`} />
                            <Bar
                              dataKey="rate"
                              fill="hsl(var(--purple-300))"
                              radius={[0, 4, 4, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 每周活动势 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Activities Overview</CardTitle>
                      <CardDescription>
                        Applications, interviews and offers by week
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={weeklyActivitiesData}>
                          <defs>
                            <linearGradient
                              id="colorApplications"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--purple-300))"
                                stopOpacity={0.1}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--purple-300))"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorInterviews"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--blue-300))"
                                stopOpacity={0.1}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--blue-300))"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorOffers"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--green-300))"
                                stopOpacity={0.1}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--green-300))"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="week" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="applications"
                            stroke="hsl(var(--purple-300))"
                            fillOpacity={1}
                            fill="url(#colorApplications)"
                          />
                          <Area
                            type="monotone"
                            dataKey="interviews"
                            stroke="hsl(var(--blue-300))"
                            fillOpacity={1}
                            fill="url(#colorInterviews)"
                          />
                          <Area
                            type="monotone"
                            dataKey="offers"
                            stroke="hsl(var(--green-300))"
                            fillOpacity={1}
                            fill="url(#colorOffers)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout.Body>
    </Layout>
  );
}
