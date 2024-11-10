import { Layout } from "@/components/custom/layout";
import { PageHeader } from "@/components/page-header";
import { ThemesSwitcher } from "@/components/theme/themes-selector";
import { THEMES } from "@/lib/themes";
import { InterviewOutcomes } from "@/components/reports/interview-outcomes";
import { SkillTrends } from "@/components/reports/skill-trends";
import { WorkLocationTypes } from "@/components/reports/work-location-types";
import { SalaryDistribution } from "@/components/reports/salary-distribution";

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
          </section>
        </div>
      </Layout.Body>
    </Layout>
  );
}
