import { JobListLayout } from "@/components/jobs/job-list-layout";
import { useJobByStatus } from "@/hooks/useJobByStatus";

export default function ReviewedJobs() {
  const {
    jobs,
    error,
    totalJobsCount,
    pageSize,
    currentPage,
    handlePageChange,
    handleDataChange,
    handlePageSizeChange,
    handleSearch,
    handleSort,
    fetchJobs
  } = useJobByStatus("Reviewed");

  return (
    <JobListLayout
      title="Reviewed Jobs"
      description="Here's a list of your reviewed job applications!"
      jobs={jobs}
      error={error}
      totalJobsCount={totalJobsCount}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      onDataChange={handleDataChange}
      onPageSizeChange={handlePageSizeChange}
      onSearch={handleSearch}
      onSort={handleSort}
      onRetry={fetchJobs}
    />
  );
}
