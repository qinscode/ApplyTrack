import type { Job } from '@/types/schema'
import api from '@/api/axios'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const DEFAULT_PAGE_SIZE = 50

interface UseJobListConfig {
  apiEndpoint: string
  hideStatus?: boolean
  extraParams?: Record<string, any>
  onDataChange?: () => void
}

type SortingState = {
  id: string
  desc: boolean
}[]

export function useJobList({
  apiEndpoint,
  hideStatus = false,
  extraParams = {},
  onDataChange
}: UseJobListConfig) {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageSize = Number.parseInt(searchParams.get('pageSize') || DEFAULT_PAGE_SIZE.toString(), 10)
  const currentPage = Number.parseInt(searchParams.get('pageNumber') || '1', 10)
  const searchTerm = searchParams.get('searchTerm') || ''
  const sortBy = searchParams.get('sortBy') || ''
  const sortDescending = searchParams.get('sortDescending') === 'true'

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalJobsCount, setTotalJobsCount] = useState(0)

  const totalPages = Math.ceil(totalJobsCount / pageSize)

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.get(apiEndpoint, {
        params: {
          searchTerm: searchTerm || '',
          pageNumber: currentPage,
          pageSize,
          sortBy: sortBy || '',
          sortDescending: sortDescending || false,
          includeStatus: !hideStatus,
          ...extraParams
        }
      })

      const processedJobs = hideStatus
        ? response.data.jobs.map((job: any) => {
            const { status, ...rest } = job
            return rest
          })
        : response.data.jobs

      setJobs(processedJobs)
      setTotalJobsCount(response.data.totalCount)
    } catch (err) {
      console.error('Error fetching jobs:', err)
      setError('Failed to fetch jobs')
    } finally {
      setLoading(false)
    }
  }, [
    apiEndpoint,
    currentPage,
    pageSize,
    searchTerm,
    sortBy,
    sortDescending,
    hideStatus,
    extraParams
  ])

  useEffect(() => {
    fetchJobs()
  }, [currentPage, pageSize, searchTerm, sortBy, sortDescending, apiEndpoint])

  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams)
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, value)
        }
      })
      setSearchParams(newSearchParams)
    },
    [searchParams, setSearchParams]
  )

  const handlePageChange = useCallback(
    (page: number) => {
      updateSearchParams({
        pageNumber: page.toString(),
        pageSize: pageSize.toString()
      })
    },
    [updateSearchParams, pageSize]
  )

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      updateSearchParams({
        pageSize: newPageSize.toString(),
        pageNumber: '1'
      })
    },
    [updateSearchParams]
  )

  const handleSearch = useCallback(
    (term: string) => {
      updateSearchParams({
        searchTerm: term || null,
        pageNumber: '1'
      })
    },
    [updateSearchParams]
  )

  const handleSort = useCallback(
    (column: string, descending: boolean) => {
      updateSearchParams({
        sortBy: column,
        sortDescending: descending.toString(),
        pageNumber: '1'
      })
    },
    [updateSearchParams]
  )

  const handleDataChange = useCallback(
    (updatedData: Job[]) => {
      setJobs(updatedData)
      onDataChange?.()
    },
    [onDataChange]
  )

  return {
    jobs,
    loading,
    error,
    totalJobsCount,
    totalPages,
    pageSize,
    currentPage,
    searchTerm,
    sortBy,
    sortDescending,
    handlePageChange,
    handleDataChange,
    handlePageSizeChange,
    handleSearch,
    handleSort,
    fetchJobs
  }
}
