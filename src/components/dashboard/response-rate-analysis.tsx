import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useThemesConfig } from "@/hooks/use-themes-config";

interface ResponseRateData {
  company_size: string;
  response_rate: number;
  avg_response_time: number;
}

interface ResponseRateAnalysisProps {
  data: ResponseRateData[];
}

export function ResponseRateAnalysis({ data }: ResponseRateAnalysisProps) {
  const { themesConfig } = useThemesConfig();
  
  const chartColor1 = `hsl(${themesConfig.activeTheme.cssVars.light["--chart-1"]})`;
  const chartColor2 = `hsl(${themesConfig.activeTheme.cssVars.light["--chart-2"]})`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Response Rate by Company Size</CardTitle>
        <CardDescription>
          Response rates and average response time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="company_size" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              formatter={(value, name) => {
                if (name === "response_rate") return `${value}%`;
                return `${value} days`;
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="response_rate"
              fill={chartColor1}
              name="Response Rate"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="avg_response_time"
              fill={chartColor2}
              name="Avg Response Time"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 