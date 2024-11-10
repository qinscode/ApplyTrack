import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useThemesConfig } from "@/hooks/use-themes-config";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface MonthlyData {
  month: string;
  applications: number;
}

interface MonthlyTrendProps {
  data: MonthlyData[];
}

export function MonthlyTrend({ data }: MonthlyTrendProps) {
  const { themesConfig } = useThemesConfig();
  
  const chartConfig = {
    applications: {
      label: "Applications",
      color: `hsl(${themesConfig.activeTheme.cssVars.light["--chart-1"]})`,
    },
  } as const;

  const chartData = data.map(item => ({
    month: item.month.slice(0, 3),
    applications: item.applications,
  }));

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-col space-y-1.5">
        <CardTitle>Monthly Trend</CardTitle>
        <CardDescription>
          Showing total applications for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="applicationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={chartConfig.applications.color}
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor={chartConfig.applications.color}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="applications"
              type="natural"
              stroke={chartConfig.applications.color}
              strokeWidth={2}
              fill="url(#applicationGradient)"
              fillOpacity={1}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="size-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
