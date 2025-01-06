import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useThemesConfig } from '@/hooks/use-themes-config'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface SkillTrendData {
  month: string
  react: number
  typescript: number
  node: number
}

interface SkillTrendsProps {
  data: SkillTrendData[]
}

export function SkillTrends({ data }: SkillTrendsProps) {
  const { themesConfig } = useThemesConfig()

  const colors = {
    react: `hsl(${themesConfig.activeTheme.cssVars.light['--chart-1']})`,
    typescript: `hsl(${themesConfig.activeTheme.cssVars.light['--chart-2']})`,
    node: `hsl(${themesConfig.activeTheme.cssVars.light['--chart-3']})`
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-col space-y-1.5">
        <CardTitle>Skill Demand Trends</CardTitle>
        <CardDescription>Popularity of different skills over time</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              {Object.entries(colors).map(([key, color]) => (
                <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.1} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            {Object.entries(colors).map(([key, color]) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                fillOpacity={1}
                fill={`url(#color${key})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
