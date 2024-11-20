import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useThemesConfig } from "@/hooks/use-themes-config";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type SalaryData = {
  range: string;
  count: number;
};

type SalaryDistributionProps = {
  data: SalaryData[];
};

export function SalaryDistribution({ data }: SalaryDistributionProps) {
  const { themesConfig } = useThemesConfig();

  const chartData = data.map((item, index) => ({
    ...item,
    fill: `hsl(${themesConfig.activeTheme.cssVars.light[`--chart-${index + 1}`]})`,
  }));

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-col space-y-1.5">
        <CardTitle>Salary Distribution</CardTitle>
        <CardDescription>
          Distribution of job offers by salary range
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="range"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name} (${value}%)`}
            >
              {chartData.map(entry => (
                <Cell key={`cell-${entry.range}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
