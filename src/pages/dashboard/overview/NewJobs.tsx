import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import type { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartStyle,
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

export const description = "An interactive pie chart";

const chartConfig = {
  visitors: {
    label: "Jobs",
  },
  desktop: {
    label: "New Jobs",
  },
  today: {
    label: "Today",
    color: "hsl(var(--chart-1))",
  },
  yesterday: {
    label: "Yesterday",
    color: "hsl(var(--chart-2))",
  },
  twoDaysAgo: {
    label: "2 Days Ago",
    color: "hsl(var(--chart-3))",
  },
  threeDaysAgo: {
    label: "3 Days Ago",
    color: "hsl(var(--chart-4))",
  },
  fourDaysAgo: {
    label: "4 Days Ago",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function NewJobs() {
  const id = "pie-interactive";

  // 使用固定的假数据
  const desktopData = [
    {
      period: "today",
      desktop: 320,
      fill: "var(--color-today)",
    },
    {
      period: "yesterday",
      desktop: 280,
      fill: "var(--color-yesterday)",
    },
    {
      period: "twoDaysAgo",
      desktop: 250,
      fill: "var(--color-twoDaysAgo)",
    },
    {
      period: "threeDaysAgo",
      desktop: 220,
      fill: "var(--color-threeDaysAgo)",
    },
    {
      period: "fourDaysAgo",
      desktop: 200,
      fill: "var(--color-fourDaysAgo)",
    },
  ];

  const [activePeriod, setActivePeriod] = React.useState(desktopData[0].period);

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.period === activePeriod),
    [activePeriod]
  );
  const periods = React.useMemo(
    () => desktopData.map((item) => item.period),
    []
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>New Jobs Trend</CardTitle>
          <CardDescription>Last 5 Days</CardDescription>
        </div>
        <Select value={activePeriod} onValueChange={setActivePeriod}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a period"
          >
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {periods.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex size-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="period"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          New Jobs
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
