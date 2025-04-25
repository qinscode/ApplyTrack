import { statisticsApi } from '@/api'
import { useQuery } from '@tanstack/react-query'
import { StatusCounts } from '@/api/statistics.ts'

interface FunnelStatus {
  status: string
  count: number
  percentage: number
  change: number
}

const STATUS_LABELS = {
  applied: 'Applied',
  reviewed: 'Viewed',
  interviewing: 'Interviewed',
  // technicalAssessment: 'Assessment',
  rejected: 'Rejected',
  offered: 'Offer'
} as const

const calculatePercentages = (counts: StatusCounts): FunnelStatus[] => {
  const total = counts.applied || 1

  return Object.entries(counts)
    .filter((entry): entry is [keyof typeof STATUS_LABELS, number] => {
      return entry[0] in STATUS_LABELS
    })
    .map(([key, count]) => ({
      status: STATUS_LABELS[key],
      count,
      percentage: Math.round((count / total) * 100),
      change: 0
    }))
}

export const useApplicationFunnel = () => {
  return useQuery({
    queryKey: ['applicationFunnel'],
    queryFn: async () => {
      const data = await statisticsApi.getStatusCounts()
      return calculatePercentages(data)
    }
  })
}
