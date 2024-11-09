import { JobListLayout } from "@/components/jobs/job-list-layout";
import { useJobByStatus } from "@/hooks/useJobByStatus";

export default function ArchivedJobs() {
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
  } = useJobByStatus("Archived");

  return (
    <JobListLayout
      title="Archived Jobs"
      description="Here's a list of your archived job applications!"
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
