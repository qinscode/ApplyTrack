import { statisticsApi } from "@/api";
import { useQuery } from "@tanstack/react-query";

type FunnelStatus = {
  status: string;
  count: number;
  percentage: number;
  change: number; // 这个值暂时用固定值，后续可以通过对比历史数据计算
};

const STATUS_LABELS: Record<string, string> = {
  applied: "Applied",
  reviewed: "Reviewed",
  interviewing: "Interviewing",
  technicalAssessment: "Technical Assessment",
  offered: "Offered",
};

const calculatePercentages = (counts: Record<string, number>): FunnelStatus[] => {
  const total = counts.applied || 1; // 避免除以0

  return Object.entries(counts).map(([key, count]) => ({
    status: STATUS_LABELS[key],
    count,
    percentage: Math.round((count / total) * 100),
    change: 0, // 暂时使用固定值，后续可以通过对比历史数据计算
  }));
};

export const useApplicationFunnel = () => {
  return useQuery({
    queryKey: ["applicationFunnel"],
    queryFn: async () => {
      const data = await statisticsApi.getStatusCounts();
      return calculatePercentages(data);
    },
  });
};
