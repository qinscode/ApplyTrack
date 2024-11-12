import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer } from "@/components/ui/chart";

export const description = "A radial chart with text";

export function AppliedJobs({ appliedCount = 0, totalTarget = 5 }) {
  const chartData = [
    { browser: "applied", visitors: appliedCount, fill: "var(--color-safari)" },
  ];

  const progressAngle = Math.min((appliedCount / totalTarget) * 360, 360) + 90;

  const chartConfig = {
    visitors: {
      label: "Applied",
    },
    safari: {
      label: "Applied Jobs",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Applied Jobs</CardTitle>
        <CardDescription>Application Progress</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={progressAngle}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground p-1 text-4xl font-bold"
                        >
                          {chartData[0]!.visitors.toLocaleString()} /{" "}
                          {totalTarget}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 36}
                          className="fill-muted-foreground"
                        >
                          Jobs
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {appliedCount > 0 ? "Active Applications" : "No applications yet"}
        </div>
        <div className="leading-none text-muted-foreground">
          {Math.round((appliedCount / totalTarget) * 100)}% of target reached
        </div>
      </CardFooter>
    </Card>
  );
}
