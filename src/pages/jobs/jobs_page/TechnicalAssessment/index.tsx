import { JobListLayout } from "@/components/jobs/job-list-layout";
import { useJobByStatus } from "@/hooks/useJobByStatus";

export default function TechnicalAssessmentJobs() {
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
  } = useJobByStatus("TechnicalAssessment");

  return (
    <JobListLayout
      title="Technical Assessment Jobs"
      description="Here's a list of your jobs in technical assessment!"
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
