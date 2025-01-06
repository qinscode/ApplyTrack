import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useThemesConfig } from '@/hooks/use-themes-config'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface InterviewOutcomeData {
  stage: string
  passed: number
  total: number
}

interface InterviewOutcomesProps {
  data: InterviewOutcomeData[]
}

export function InterviewOutcomes({ data }: InterviewOutcomesProps) {
  const { themesConfig } = useThemesConfig()

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-col space-y-1.5">
        <CardTitle>Interview Success Rate</CardTitle>
        <CardDescription>Success rate at each interview stage</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="passed"
              fill={`hsl(${themesConfig.activeTheme.cssVars.light['--chart-1']})`}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="total"
              fill={`hsl(${themesConfig.activeTheme.cssVars.light['--chart-2']})`}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
