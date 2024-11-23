import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useThemesConfig } from "@/hooks/use-themes-config";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type LocationData = {
  name: string;
  value: number;
};

type LocationDistributionProps = {
  data: LocationData[];
};

export function LocationDistribution({ data }: LocationDistributionProps) {
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
        <CardTitle>Location Distribution</CardTitle>
        <CardDescription>Job applications by location</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name} (${value}%)`}
            >
              {chartData.map(entry => (
                <Cell key={`cell-${entry.name}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
