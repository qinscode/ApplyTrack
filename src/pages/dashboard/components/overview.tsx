import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 200) + 300,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 200) + 300,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 200) + 300,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 200) + 300,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 200) + 300,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 200) + 300,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 200) + 300,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 200) + 300,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 200) + 300,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 200) + 300,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 200) + 300,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 200) + 300,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
          fill="hsl(var(--primary))"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
