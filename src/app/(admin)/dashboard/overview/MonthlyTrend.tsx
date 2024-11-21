"use client";

import type { DailyStatistic } from "@/api/statistics";
import type { ChartConfig } from "@/components/ui/chart";
import { statisticsApi } from "@/api/statistics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  visitors: {
    label: "Jobs",
  },
  activeJobsCount: {
    label: "Active Jobs",
    color: "hsl(var(--chart-1))",
  },
  newJobsCount: {
    label: "New Jobs",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function MonthlyTrend() {
  const [timeRange, setTimeRange] = React.useState("90");
  const [data, setData] = React.useState<DailyStatistic[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await statisticsApi.getJobsStatistics(Number(timeRange));
        setData(response.dailyStatistics);
      } catch (error) {
        console.error("Error fetching jobs statistics:", error);
      }
    };

    fetchData();
  }, [timeRange]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Jobs Trend</CardTitle>
          <CardDescription>
            Showing job statistics for the selected period
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 90 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90" className="rounded-lg">
              Last 90 days
            </SelectItem>
            <SelectItem value="30" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillActive" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-activeJobsCount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-activeJobsCount)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillNew" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-newJobsCount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-newJobsCount)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={(
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              )}
            />
            <Area
              dataKey="newJobsCount"
              type="natural"
              fill="url(#fillNew)"
              stroke="var(--color-newJobsCount)"
              stackId="a"
            />
            <Area
              dataKey="activeJobsCount"
              type="natural"
              fill="url(#fillActive)"
              stroke="var(--color-activeJobsCount)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
