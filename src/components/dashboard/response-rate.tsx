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

interface ResponseRateProps {
  data: ResponseRateData[];
}

export function ResponseRate({ data }: ResponseRateProps) {
  const { themesConfig } = useThemesConfig();
  
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
            <Tooltip />
            <Bar
              yAxisId="left"
              dataKey="response_rate"
              fill={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-1"]})`}
              name="Response Rate (%)"
            />
            <Bar
              yAxisId="right"
              dataKey="avg_response_time"
              fill={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-2"]})`}
              name="Avg Response Time (days)"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 