import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { useDailyApplications } from '@/hooks/use-daily-applications'
import { useThemesConfig } from '@/hooks/use-themes-config'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts'

interface DayConfig {
  label: string
  color: `hsl(${string})`
}

interface ChartConfigType {
  applications: { label: string }
  mon: DayConfig
  tue: DayConfig
  wed: DayConfig
  thu: DayConfig
  fri: DayConfig
  sat: DayConfig
  sun: DayConfig
}

export function DailyApplications() {
  const { themesConfig } = useThemesConfig()
  const { data: chartData, isLoading, error } = useDailyApplications()

  const chartConfig: ChartConfigType = {
    applications: {
      label: 'Applications'
    },
    mon: {
      label: 'Monday',
      color: `hsl(${themesConfig.activeTheme.cssVars.light['--chart-1']})`
    },
    tue: {
      label: 'Tuesday',
      color: `hsl(${themesConfig.activeTheme.cssVars.light['--chart-2']})`
    },
    wed: {
      label: 'Wednesday',
      color: `hsl(${themesConfig.activeTheme.cssVars.light['--chart-3']})`
    },
    thu: {
      label: 'Thursday',
      color: `hsl(${themesConfig.activeTheme.cssVars.light['--chart-4']})`
    },
    fri: {
      label: 'Friday',
      color: `hsl(${themesConfig.activeTheme.cssVars.light['--chart-5']})`
    },
    sat: {
      label: 'Saturday',
      color: `hsl(${themesConfig.activeTheme.cssVars.light['--chart-1']})`
    },
    sun: {
      label: 'Sunday',
      color: `hsl(${themesConfig.activeTheme.cssVars.light['--chart-2']})`
    }
  }

  if (isLoading) {
    return (
      <Card className="flex h-full flex-col">
        <CardHeader>
          <CardTitle>Daily Applications</CardTitle>
          <CardDescription>Applications submitted per day</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error || !chartData) {
    return (
      <Card className="flex h-full flex-col">
        <CardHeader>
          <CardTitle>Daily Applications</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center text-muted-foreground">
          Failed to load daily applications data
        </CardContent>
      </Card>
    )
  }

  const chartDataWithColors = chartData.map((item) => ({
    ...item,
    fill:
      item.day in chartConfig && item.day !== 'applications'
        ? chartConfig[item.day as keyof Omit<ChartConfigType, 'applications'>].color
        : undefined
  }))

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
                tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="applications"
                strokeWidth={2}
                radius={8}
                activeIndex={2}
                fill={`hsl(${themesConfig.activeTheme.cssVars.light['--chart-1']})`}
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
          Trending up by 5.2% this week <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing daily application submissions for the current week
        </div>
      </CardFooter>
    </Card>
  )
}
