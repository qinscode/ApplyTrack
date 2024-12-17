"use client";

import { columns } from "@/components/jobs/columns";
import DataTable from "@/components/jobs/dataTable";
import Loading from "@/components/jobs/loading";
import { useJobList } from "@/hooks/useJobList";
import { Suspense } from "react";

function JobsContent() {
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
    fetchJobs,
  } = useJobList({
    apiEndpoint: "/UserJobs/my",
  });

  return (
    <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
      {error
        ? (
            <div>
              <p>
                Error:
                {error}
              </p>
              <button
                type="button"
                onClick={fetchJobs}
                className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
              >
                Retry
              </button>
            </div>
          )
        : (
            <DataTable
              data={jobs}
              columns={columns}
              pageSize={pageSize}
              currentPage={currentPage}
              totalCount={totalJobsCount}
              onSearch={handleSearch}
              onSort={handleSort}
              onPageChange={handlePageChange}
              onDataChange={handleDataChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
    </div>
  );
}

export default function MyJobs() {
  return (
    <Suspense fallback={<Loading />}>
      <JobsContent />
    </Suspense>
  );
}
