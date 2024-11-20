"use client";

import type { Job } from "@/types";
import { adaptJob } from "@/adapters/jobAdapter";
import api from "@/api/axios";
import { columns } from "@/app/(admin)/jobs/components/columns";
import DataTable from "@/app/(admin)/jobs/components/dataTable";
import Loading from "@/app/(admin)/jobs/components/loading";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useCallback, useEffect, useState } from "react";

const DEFAULT_PAGE_SIZE = 20;

function JobsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParams = useCallback(
    (updater: (prev: URLSearchParams) => URLSearchParams) => {
      const newParams = updater(new URLSearchParams(searchParams));
      const newSearch = newParams.toString();
      router.push(`${pathname}${newSearch ? `?${newSearch}` : ""}`);
    },
    [searchParams, router, pathname],
  );

  const pageSize = Number.parseInt(
    searchParams.get("pageSize") || DEFAULT_PAGE_SIZE.toString(),
    10,
  );
  const currentPage = Number.parseInt(
    searchParams.get("pageNumber") || "1",
    10,
  );
  const searchTerm = searchParams.get("searchTerm") || "";
  const jobTitle = searchParams.get("jobTitle") || "";
  const companyName = searchParams.get("companyName") || "";
  const sortBy = searchParams.get("sortBy") || "posted_date";
  const sortDescending = searchParams.get("sortDescending") || "true";

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

      const adaptedJobs = response.data.jobs.map((job: never) => {
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
  }, [fetchJobs]);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("pageNumber", page.toString());
      newParams.set("pageSize", pageSize.toString());
      newParams.set("sortBy", sortBy);
      newParams.set("sortDescending", sortDescending);
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
        } else {
          newParams.delete("searchTerm");
        }
        return newParams;
      });
    },
    [setSearchParams],
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
              onPageSizeChange={handleperPageChange}
            />
          )}
    </div>
  );
}

export default function AllJobs() {
  return (
    <Suspense fallback={<Loading />}>
      <JobsContent />
    </Suspense>
  );
}
