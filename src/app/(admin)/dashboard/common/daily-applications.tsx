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
import { useThemesConfig } from "@/hooks/use-themes-config";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

const chartData = [
  { day: "mon", applications: 18 },
  { day: "tue", applications: 20 },
  { day: "wed", applications: 27 },
  { day: "thu", applications: 17 },
  { day: "fri", applications: 25 },
  { day: "sat", applications: 12 },
  { day: "sun", applications: 8 },
];

export function DailyApplications() {
  const { themesConfig } = useThemesConfig();

  const chartConfig = {
    applications: {
      label: "Applications",
    },
    mon: {
      label: "Monday",
      color: `hsl(${themesConfig.activeTheme.cssVars.light["--chart-1"]})`,
    },
    tue: {
      label: "Tuesday",
      color: `hsl(${themesConfig.activeTheme.cssVars.light["--chart-2"]})`,
    },
    wed: {
      label: "Wednesday",
      color: `hsl(${themesConfig.activeTheme.cssVars.light["--chart-3"]})`,
    },
    thu: {
      label: "Thursday",
      color: `hsl(${themesConfig.activeTheme.cssVars.light["--chart-4"]})`,
    },
    fri: {
      label: "Friday",
      color: `hsl(${themesConfig.activeTheme.cssVars.light["--chart-5"]})`,
    },
    sat: {
      label: "Saturday",
      color: `hsl(${themesConfig.activeTheme.cssVars.light["--chart-1"]})`,
    },
    sun: {
      label: "Sunday",
      color: `hsl(${themesConfig.activeTheme.cssVars.light["--chart-2"]})`,
    },
  } as const;

  const chartDataWithColors = chartData.map(item => ({
    ...item,
    fill: chartConfig[item.day].color,
  }));

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-col space-y-1.5">
        <CardTitle>Daily Applications</CardTitle>
        <CardDescription>Applications submitted per day</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <div className="w-full">
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartDataWithColors}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value =>
                  chartConfig[value as keyof typeof chartConfig]?.label}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="applications"
                strokeWidth={2}
                radius={8}
                activeIndex={2}
                fill={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-1"]})`}
                activeBar={({ ...props }) => (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this week
          {" "}
          <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing daily application submissions for the current week
        </div>
      </CardFooter>
    </Card>
  );
}
