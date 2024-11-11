import { Layout } from "@/components/custom/layout.tsx";
import { DataTable } from "../../components/data-table.tsx";
import { columns } from "../../components/columns.tsx";
import { Job } from "@/types";
import api from "@/api/axios.ts";
import { useCallback, useEffect, useState } from "react";
import { adaptJob } from "@/adapters/jobAdapter";
import { useSearchParams } from "react-router-dom";

const DEFAULT_PAGE_SIZE = 20;

export default function AllJobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = parseInt(
    searchParams.get("pageSize") || DEFAULT_PAGE_SIZE.toString(),
    10
  );
  const currentPage = parseInt(searchParams.get("pageNumber") || "1", 10);
  const searchTerm = searchParams.get("searchTerm") || "";
  const jobTitle = searchParams.get("jobTitle") || "";
  const companyName = searchParams.get("companyName") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const sortDescending = searchParams.get("sortDescending") === "true";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalJobsCount, setTotalJobsCount] = useState(0);

  const fetchJobs = useCallback(async () => {
    setError(null);

    try {
      const response = await api.get("/Jobs/search", {
        params: {
          searchTerm,
          jobTitle,
          companyName,
          pageNumber: currentPage,
          pageSize,
          sortBy,
          sortDescending,
        },
      });

      const adaptedJobs = response.data.jobs.map((job: any) => {
        const adaptedJob = adaptJob(job);
        if (!adaptedJob.status) {
          adaptedJob.status = "New";
        }
        return adaptedJob;
      });

      setJobs(adaptedJobs);
      setTotalJobsCount(response.data.totalCount);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs");
    }
  }, [
    currentPage,
    pageSize,
    searchTerm,
    jobTitle,
    companyName,
    sortBy,
    sortDescending,
  ]);

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("pageNumber", page.toString());
      newParams.set("pageSize", pageSize.toString());
      return newParams;
    });
  };

  const handleDataChange = (updatedData: Job[]) => {
    setJobs(updatedData);
    fetchJobs();
  };

  const handleperPageChange = (newPageSize: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("pageSize", newPageSize.toString());
      newParams.set("pageNumber", "1");
      return newParams;
    });
  };

  const handleSearch = useCallback(
    (term: string) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (term) {
          newParams.set("searchTerm", term);
          // 可以根据需要设置其他搜索相关参数
          // newParams.set("jobTitle", term);
          // newParams.set("companyName", term);
        } else {
          newParams.delete("searchTerm");
          // newParams.delete("jobTitle");
          // newParams.delete("companyName");
        }
        return newParams;
      });
    },
    [setSearchParams]
  );

  const handleSort = (column: string, descending: boolean) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sortBy", column);
      newParams.set("sortDescending", String(descending));
      return newParams;
    });
  };

  return (
    <Layout>
      <Layout.Header
        title="All Jobs"
        className="border-b bg-background/80 backdrop-blur-sm"
      ></Layout.Header>
      <Layout.Body>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {error ? (
            <div>
              <p>Error: {error}</p>
              <button
                onClick={fetchJobs}
                className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
              >
                Retry
              </button>
            </div>
          ) : (
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
              onPageSizeChange={handleperPageChange}
            />
          )}
        </div>
      </Layout.Body>
    </Layout>
  );
}
