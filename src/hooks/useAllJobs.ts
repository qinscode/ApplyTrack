import { useJobList } from './useJobList'

export function useAllJobs() {
  return useJobList({
    apiEndpoint: '/JobsTable/search'
  })
}
