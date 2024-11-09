import { JobListLayout } from "@/components/jobs/job-list-layout";
import { useJobByStatus } from "@/hooks/useJobByStatus";

export default function InterviewingJobs() {
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
  } = useJobByStatus("Interviewing");

  return (
    <JobListLayout
      title="Interviewing Jobs"
      description="Here's a list of your jobs in interview process!"
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
