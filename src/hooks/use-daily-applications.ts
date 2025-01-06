import { statisticsApi } from '@/api'
import { useQuery } from '@tanstack/react-query'

interface FormattedDailyCount {
  day: string
  applications: number
}

const formatDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase()
}

export const useDailyApplications = () => {
  return useQuery({
    queryKey: ['dailyApplications'],
    queryFn: async () => {
      const data = await statisticsApi.getDailyApplicationCounts()
      return data.map(
        (item): FormattedDailyCount => ({
          day: formatDayOfWeek(item.date),
          applications: item.count
        })
      )
    }
  })
}
