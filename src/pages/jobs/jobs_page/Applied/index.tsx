import { Layout } from "@/components/custom/layout.tsx";
import ThemeSwitch from "@/components/theme-switch.tsx";
import { UserNav } from "@/components/user-nav.tsx";
import { DataTable } from "../../components/data-table.tsx";
import { columns } from "../../components/columns.tsx";
import { Job } from "@/types";
import { useSearchParams } from "react-router-dom";
import { useJobCountByStatus } from "@/hooks/useTotalJobsCount.ts";
import { useEffect, useCallback } from "react";
import { useJobStatusCounts } from "@/hooks/useTotalJobsCount.ts";

const DEFAULT_PAGE_SIZE = 20;

export default function AppliedJobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = parseInt(
    searchParams.get("pageSize") || DEFAULT_PAGE_SIZE.toString(),
    10
  );
  const currentPage = parseInt(searchParams.get("pageNumber") || "1", 10);

  const { Jobs, loading, error, totalJobsCount, setJobs, refetch } =
    useJobCountByStatus("Applied", currentPage, pageSize);

  const { refetch: refetchJobStatusCounts } = useJobStatusCounts();

  const handlePageChange = (page: number) => {
    setSearchParams({
      pageSize: pageSize.toString(),
      pageNumber: page.toString(),
    });
  };

  const handleDataChange = useCallback(
    (updatedData: Job[]) => {
      setJobs(updatedData);
      refetch(); // Refetch current page data
      refetchJobStatusCounts(); // Refetch all job status counts
    },
    [setJobs, refetch, refetchJobStatusCounts]
  );

  useEffect(() => {
    console.log("Current page:", currentPage);
    console.log("Jobs:", Jobs);
    console.log("Total count:", totalJobsCount);
  }, [currentPage, Jobs, totalJobsCount]);

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your applied job applications!
            </p>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <DataTable
              data={Jobs as Job[]}
              columns={columns}
              pageSize={pageSize}
              currentPage={currentPage}
              totalCount={totalJobsCount}
              onPageChange={handlePageChange}
              onDataChange={handleDataChange}
            />
          )}
        </div>
      </Layout.Body>
    </Layout>
  );
}
