import type { ChartConfig } from '@/components/ui/chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { TrendingUp } from 'lucide-react'
import { LabelList, Pie, PieChart } from 'recharts'

interface NewJobsProps {
  data: {
    jobType: string | null
    count: number
  }[]
}

const chartConfig = {
  first: {
    label: 'Top 1',
    color: 'hsl(var(--chart-1))'
  },
  second: {
    label: 'Top 2',
    color: 'hsl(var(--chart-2))'
  },
  third: {
    label: 'Top 3',
    color: 'hsl(var(--chart-3))'
  },
  fourth: {
    label: 'Top 4',
    color: 'hsl(var(--chart-4))'
  },
  fifth: {
    label: 'Top 5',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

export function NewJobs({ data }: NewJobsProps) {
  // Transform the data for the pie chart
  const chartData = data.slice(0, 5).map((item, index) => ({
    browser: item.jobType || 'Unknown',
    visitors: item.count,
    fill: `var(--color-${Object.keys(chartConfig)[index]})`
  }))

  const total = chartData.reduce((sum, item) => sum + item.visitors, 0)
  const topJobType = chartData[0]?.browser || 'No data'
  const topJobCount = chartData[0]?.visitors || 0
  const percentage = total ? ((topJobCount / total) * 100).toFixed(1) : 0

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Job Classification Distribution</CardTitle>
        <CardDescription>Top 5 Job Classification</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />

            <Pie data={chartData} dataKey="visitors" nameKey="browser" label>
              {' '}
              <LabelList
                dataKey="visitors"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Most common: {topJobType} <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {percentage}% of total available positions ({topJobCount} jobs)
        </div>
      </CardFooter>
    </Card>
  )
}
