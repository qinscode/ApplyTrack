import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface MonthlyData {
  month: string;
  applications: number;
  fill: string;
}

interface MonthlyTrendProps {
  data: MonthlyData[];
}

export function MonthlyTrend({ data }: MonthlyTrendProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Trend</CardTitle>
        <CardDescription>
          Application trend over months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
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
  );
} 