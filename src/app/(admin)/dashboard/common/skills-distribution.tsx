import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useThemesConfig } from "@/hooks/use-themes-config";

type SkillData = {
  text: string;
  value: number;
};

type SkillsDistributionProps = {
  data: SkillData[];
};

export function SkillsDistribution({ data }: SkillsDistributionProps) {
  const { themesConfig } = useThemesConfig();

  // 根据value值排序，使较大的值在前面
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Distribution</CardTitle>
        <CardDescription>
          Most requested skills in job applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-[300px] items-start justify-center overflow-hidden">
          <div className="flex flex-wrap gap-2">
            {sortedData.map((skill, index) => {
              // 使用主题颜色，循环使用颜色
              const colorIndex = (index % 5) + 1;
              const color = `hsl(${
                themesConfig.activeTheme.cssVars.light[`--chart-${colorIndex}`]
              })`;

              return (
                <div
                  key={skill.text}
                  className="rounded-full px-3 py-1 transition-all hover:scale-110"
                  style={{
                    backgroundColor: `${color}20`, // 使用20%的透明度
                    color,
                    fontSize: `${Math.max(0.8, skill.value / 15)}rem`,
                  }}
                >
                  {skill.text}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
