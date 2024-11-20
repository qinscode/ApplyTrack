import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useThemesConfig } from "@/hooks/use-themes-config";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";

type StatusCount = {
  status: string;
  count: number;
  percentage: number;
  change: number;
};

type ApplicationFunnelProps = {
  statusCounts: StatusCount[];
};

export function ApplicationFunnel({ statusCounts }: ApplicationFunnelProps) {
  const { themesConfig } = useThemesConfig();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Funnel</CardTitle>
        <CardDescription>
          Conversion rates through different stages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {statusCounts.map((status, index) => (
          <div key={status.status} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">{status.status}</span>
                <span className="text-sm text-muted-foreground">
                  (
                  {status.count}
                  )
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {status.percentage}
                  %
                </span>
                <span
                  className={`flex items-center text-sm ${
                    status.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status.change >= 0
                    ? (
                        <IconArrowUpRight className="size-4" />
                      )
                    : (
                        <IconArrowDownRight className="size-4" />
                      )}
                  {Math.abs(status.change)}
                  %
                </span>
              </div>
            </div>
            <Progress
              value={status.percentage}
              className="h-2"
              indicatorColor={`hsl(${
                themesConfig.activeTheme.cssVars.light[`--chart-${index + 1}`]
              })`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
