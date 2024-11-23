import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type InterviewData = {
  name: string;
  success: number;
  total: number;
};

type InterviewSuccessRateProps = {
  data: InterviewData[];
};

export function InterviewSuccessRate({ data }: InterviewSuccessRateProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Success Rate</CardTitle>
        <CardDescription>
          Success rate at different interview stages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" />
            <Tooltip formatter={value => `${value}%`} />
            <Bar
              dataKey="success"
              fill="hsl(var(--purple-300))"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
