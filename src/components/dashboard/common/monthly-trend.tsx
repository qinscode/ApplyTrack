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
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

// 定义数据类型接口
interface MonthlyData {
  month: string
  desktop: number
}

interface MonthlyTrendProps {
  data: MonthlyData[]
  title?: string
  description?: string
  changePercentage?: number
  dateRange?: string
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export function MonthlyTrend({
  data,
  title = 'Monthly Trend',
  description = 'Showing total visitors for the last 6 months',
  changePercentage = 5.2,
  dateRange = 'January - June 2024'
}: MonthlyTrendProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center">
        <div className="w-full">
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={data}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12
              }}
              width={500}
            >
              <defs>
                <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                fontSize={12}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Area
                dataKey="desktop"
                type="monotone"
                fill="url(#colorDesktop)"
                fillOpacity={1}
                stroke="var(--color-desktop)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {changePercentage > 0 ? 'Trending up' : 'Trending down'} by{' '}
              {Math.abs(changePercentage)}% this month <TrendingUp className="size-4" />
            </div>
            <div className="mb-4 flex items-center gap-2 leading-none text-muted-foreground">
              {dateRange}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
