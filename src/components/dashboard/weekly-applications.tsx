import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface WeeklyData {
  week: string;
  applications: number;
}

interface WeeklyApplicationsProps {
  data: WeeklyData[];
}

export function WeeklyApplications({ data }: WeeklyApplicationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Applications</CardTitle>
        <CardDescription>
          Applications submitted per week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
  );
} 