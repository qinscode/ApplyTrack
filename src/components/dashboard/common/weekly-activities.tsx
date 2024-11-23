import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useThemesConfig } from "@/hooks/use-themes-config";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type WeeklyActivityData = {
  week: string;
  applications: number;
  interviews: number;
  offers: number;
};

type WeeklyActivitiesProps = {
  data: WeeklyActivityData[];
};

export function WeeklyActivities({ data }: WeeklyActivitiesProps) {
  const { themesConfig } = useThemesConfig();

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Weekly Activities Overview</CardTitle>
        <CardDescription>
          Applications, interviews and offers by week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="colorApplications"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-1"]})`}
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-1"]})`}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-2"]})`}
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-2"]})`}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorOffers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-3"]})`}
                  stopOpacity={0.1}
                />
                <stop
                  offset="95%"
                  stopColor={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-3"]})`}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="applications"
              stroke={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-1"]})`}
              fillOpacity={1}
              fill="url(#colorApplications)"
            />
            <Area
              type="monotone"
              dataKey="interviews"
              stroke={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-2"]})`}
              fillOpacity={1}
              fill="url(#colorInterviews)"
            />
            <Area
              type="monotone"
              dataKey="offers"
              stroke={`hsl(${themesConfig.activeTheme.cssVars.light["--chart-3"]})`}
              fillOpacity={1}
              fill="url(#colorOffers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
