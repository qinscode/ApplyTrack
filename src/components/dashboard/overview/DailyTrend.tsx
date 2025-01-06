import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from 'recharts'

interface DailyData {
  date: string
  count: number
}

interface DailyTrendProps {
  data: DailyData[]
}

const chartConfig = {
  count: {
    label: 'new JobsTable',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export function DailyTrend({ data }: DailyTrendProps) {
  // Sort data by date in ascending order
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Daily New Jobs</CardTitle>
        <CardDescription>Showing daily new job postings for the last period</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center">
        <div className="w-full">
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={sortedData}
              margin={{
                left: 20,
                right: 12,
                top: 12,
                bottom: 12
              }}
              width={500}
            >
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-count)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  const day = String(date.getDate()).padStart(2, '0')
                  const month = String(date.getMonth() + 1).padStart(2, '0')
                  return `${day}.${month}`
                }}
                fontSize={12}
                interval={0}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area
                dataKey="count"
                type="monotone"
                fill="url(#colorCount)"
                fillOpacity={1}
                stroke="var(--color-count)"
                strokeWidth={2}
              >
                <LabelList
                  dataKey="count"
                  position="top"
                  style={{ fill: 'var(--foreground)', fontSize: 12 }}
                />
              </Area>
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              New jobs trending up by 5.2% this period <TrendingUp className="size-4" />
            </div>
            <div className="mb-4 flex items-center gap-2 leading-none text-muted-foreground">
              Recent Dates
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
