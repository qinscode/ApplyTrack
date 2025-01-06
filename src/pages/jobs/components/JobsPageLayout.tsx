import { Fragment } from 'react'

import { Container } from '@/components/container'
import { PageNavbar } from '@/pages/account'
import { JobsTable } from '@/pages/jobs/components/JobsTable'
import { useJobList } from '@/hooks/useJobList'

interface JobsPageLayoutProps {
  apiEndpoint: string
  hideStatus?: boolean
}

const JobsPageLayout = ({ apiEndpoint, hideStatus = false }: JobsPageLayoutProps) => {
  const {
    jobs,
    loading,
    error,
    totalJobsCount,
    pageSize,
    currentPage,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    handleSort,
    fetchJobs,
    totalPages
  } = useJobList({
    apiEndpoint,
    hideStatus
  })

  return (
    <Fragment>
      <PageNavbar />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <JobsTable
            jobs={jobs}
            loading={loading}
            error={error}
            totalJobsCount={totalJobsCount}
            totalPages={totalPages}
            pageSize={pageSize}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            handlePageSizeChange={handlePageSizeChange}
            handleSearch={handleSearch}
            handleSort={handleSort}
            fetchJobs={fetchJobs}
            hideStatus={hideStatus}
          />
        </div>
      </Container>
    </Fragment>
  )
}

export { JobsPageLayout }
