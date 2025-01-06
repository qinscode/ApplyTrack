import api from '@/api/axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'

interface RecentJob {
  jobId: string
  jobTitle: string
  status: number
  createdAt: string
  updatedAt: string
  businessName: string
}

export function RecentlyAppliedJobs() {
  const [recentlyAppliedJobs, setRecentlyAppliedJobs] = useState<RecentJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<RecentJob[]>('/UserJobs/recent')
        const latestJobs = response.data.slice(0, 4)
        setRecentlyAppliedJobs(latestJobs)
      } catch (error) {
        console.error('Error fetching recently applied jobs:', error)
        setError('Failed to fetch recently applied jobs. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            Loading recently applied jobs...
          </div>
        ) : error ? (
          <div className="flex flex-1 items-center justify-center text-red-500">{error}</div>
        ) : recentlyAppliedJobs.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            No recently applied jobs found.
          </div>
        ) : (
          <div className="space-y-4">
            {recentlyAppliedJobs.map((job) => (
              <div
                key={job.jobId}
                className="flex items-center justify-between rounded-lg bg-card p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{job.jobTitle}</p>
                  <p className="text-xs text-muted-foreground">{job.businessName}</p>
                </div>

                <div className="space-y-1 text-right">
                  <p className="text-sm font-medium leading-none">{job.status}</p>
                  <p className="text-xs text-muted-foreground">
                    Applied on: {new Date(job.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
