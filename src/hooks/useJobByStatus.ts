import type { Job } from '@/types/schema'
import { useJobList } from './useJobList'
import { useJobStatusCounts } from './useTotalJobsCount'

export function useJobByStatus(status: Job['status']) {
  const { refetch: refetchJobStatusCounts } = useJobStatusCounts()

  return useJobList({
    apiEndpoint: `/UserJobs/status/${status}`,
    onDataChange: refetchJobStatusCounts
  })
}
