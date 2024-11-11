import { JobListLayout } from "@/components/jobs/job-list-layout";
import { useJobByStatus } from "@/hooks/useJobByStatus";
import { useRouter } from "next/router";

export default function OfferedJobs() {
  const router = useRouter();
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
  } = useJobByStatus("Offered");

  const handleAddNewJob = () => {
    router.push('/jobs/new');
  };

  return (
    <JobListLayout
      title="Job Offers"
      description="Here's a list of your job offers!"
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
      onAddNewJob={handleAddNewJob}
    />
  );
}
