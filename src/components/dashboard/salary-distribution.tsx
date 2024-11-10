import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useThemesConfig } from "@/hooks/use-themes-config";

interface SalaryData {
  range: string;
  count: number;
}

interface SalaryDistributionProps {
  data: SalaryData[];
}

export function SalaryDistribution({ data }: SalaryDistributionProps) {
  const { themesConfig } = useThemesConfig();
  
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Salary Range Distribution</CardTitle>
        <CardDescription>
          Distribution of job applications by salary range
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
              fill={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-1"]})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 