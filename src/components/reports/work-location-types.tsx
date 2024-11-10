import { useThemesConfig } from "@/hooks/use-themes-config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface LocationData {
  name: string;
  value: number;
}

interface WorkLocationTypesProps {
  data: LocationData[];
}

export function WorkLocationTypes({ data }: WorkLocationTypesProps) {
  const { themesConfig } = useThemesConfig();
  
  const chartData = data.map((item, index) => ({
    ...item,
    fill: `hsl(${themesConfig.activeTheme.cssVars.light[`--chart-${index + 1}`]})`
  }));

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-col space-y-1.5">
        <CardTitle>Work Location Type</CardTitle>
        <CardDescription>
          Distribution of remote vs on-site positions
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
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
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 