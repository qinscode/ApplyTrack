import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useThemesConfig } from "@/hooks/use-themes-config.ts";

interface JobTypeData {
  type: string;
  value: number;
}

interface JobTypeDistributionProps {
  data: JobTypeData[];
}

export function JobTypeDistribution({ data }: JobTypeDistributionProps) {
  const { themesConfig } = useThemesConfig();

  const chartData = data.map((item, index) => ({
    ...item,
    fill: `hsl(${
      themesConfig.activeTheme.cssVars.light[`--chart-${index + 1}`]
    })`,
  }));

  return (
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
              data={chartData}
              dataKey="value"
              nameKey="type"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              label={(entry) => `${entry.type} (${entry.value}%)`}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
