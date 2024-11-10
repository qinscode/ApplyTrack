import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useThemesConfig } from "@/hooks/use-themes-config";

interface InterviewConversionData {
  stage: string;
  rate: number;
}

interface InterviewConversionProps {
  data: InterviewConversionData[];
}

export function InterviewConversion({ data }: InterviewConversionProps) {
  const { themesConfig } = useThemesConfig();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Conversion Funnel</CardTitle>
        <CardDescription>
          Success rate between interview stages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="stage" type="category" width={150} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar
              dataKey="rate"
              fill={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-3"]})`}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 