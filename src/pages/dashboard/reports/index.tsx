import { Layout } from "@/components/custom/layout";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Pie, PieChart, Cell, Area, AreaChart } from "recharts";

// 添加面试结果数据
const interviewOutcomeData = [
  { stage: "Phone Screen", passed: 80, total: 100 },
  { stage: "Technical Round", passed: 60, total: 80 },
  { stage: "System Design", passed: 40, total: 60 },
  { stage: "Culture Fit", passed: 35, total: 40 },
  { stage: "Final Round", passed: 30, total: 35 },
];

// 添加技能需求趋势数据
const skillTrendData = [
  { month: "Jan", react: 80, typescript: 60, node: 40 },
  { month: "Feb", react: 85, typescript: 65, node: 45 },
  { month: "Mar", react: 90, typescript: 75, node: 50 },
  { month: "Apr", react: 88, typescript: 80, node: 55 },
  { month: "May", react: 92, typescript: 85, node: 60 },
  { month: "Jun", react: 95, typescript: 90, node: 65 },
];

// 添加薪资分布数据
const salaryDistributionData = [
  { range: "0-50k", count: 10, fill: "hsl(var(--chart-1))" },
  { range: "50k-75k", count: 25, fill: "hsl(var(--chart-2))" },
  { range: "75k-100k", count: 35, fill: "hsl(var(--chart-3))" },
  { range: "100k-125k", count: 20, fill: "hsl(var(--chart-4))" },
  { range: "125k+", count: 10, fill: "hsl(var(--chart-5))" },
];

// 添加工作地点分布数据
const locationData = [
  { name: "Remote", value: 40, fill: "hsl(var(--chart-1))" },
  { name: "Hybrid", value: 35, fill: "hsl(var(--chart-2))" },
  { name: "On-site", value: 25, fill: "hsl(var(--chart-3))" },
];

export default function Reports() {
  return (
    <Layout>
      <PageHeader title="Job Market Reports" />
      <Layout.Body>
        <div className="grid gap-4">
          {/* 面试结果分析 */}
          <Card>
            <CardHeader>
              <CardTitle>Interview Success Rate</CardTitle>
              <CardDescription>
                Success rate at each interview stage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={interviewOutcomeData}>
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="passed"
                    fill="hsl(var(--purple-300))"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="total"
                    fill="hsl(var(--muted))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 其他图表... */}
        </div>
      </Layout.Body>
    </Layout>
  );
} 