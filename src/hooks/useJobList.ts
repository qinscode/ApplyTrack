"use client";
import type { Job } from "@/types/schema";
import api from "@/api/axios";
import { adaptJob } from "@/utils/jobAdapter";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_PAGE_SIZE = 20;

type UseJobListConfig = {
  apiEndpoint: string;
  defaultStatus?: Job["status"];
  extraParams?: Record<string, any>;
  onDataChange?: () => void;
};

export function useJobList({
  apiEndpoint,
  extraParams = {},
  onDataChange,
}: UseJobListConfig) {
  const searchParams = useSearchParams();
  const pageSize = Number.parseInt(
    searchParams.get("pageSize") || DEFAULT_PAGE_SIZE.toString(),
    10,
  );
  const currentPage = Number.parseInt(
    searchParams.get("pageNumber") || "1",
    10,
  );
  const searchTerm = searchParams.get("searchTerm") || "";
  const sortBy = searchParams.get("sortBy") || "";
  const sortDescending = searchParams.get("sortDescending") === "true";

  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalJobsCount, setTotalJobsCount] = useState(0);

  const fetchJobs = useCallback(async () => {
    setError(null);

    try {
      const response = await api.get(apiEndpoint, {
        params: {
          searchTerm,
          pageNumber: currentPage,
          pageSize,
          sortBy,
          sortDescending,
          ...extraParams,
        },
      });

      const adaptedJobs = response.data.jobs.map((job: any) => {
        const adaptedJob = adaptJob(job);
        return adaptedJob;
      });

      setJobs(adaptedJobs);
      setTotalJobsCount(response.data.totalCount);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs");
    }
  }, [
    apiEndpoint,
    currentPage,
    pageSize,
    searchTerm,
    sortBy,
    sortDescending,
    extraParams,
  ]);

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  const handlePageChange = useCallback(
    (page: number) => {
      const url = new URL(window.location.href);
      url.searchParams.set("pageNumber", page.toString());
      url.searchParams.set("pageSize", pageSize.toString());
      window.history.pushState({}, "", url);
    },
    [pageSize],
  );

  const handleDataChange = useCallback(
    (updatedData: Job[]) => {
      setJobs(updatedData);
      fetchJobs();
      onDataChange?.();
    },
    [fetchJobs, onDataChange],
  );

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("pageSize", newPageSize.toString());
    url.searchParams.set("pageNumber", "1");
    window.history.pushState({}, "", url);
  }, []);

  const handleSearch = useCallback((term: string) => {
    const url = new URL(window.location.href);
    if (term) {
      url.searchParams.set("searchTerm", term);
    } else {
      url.searchParams.delete("searchTerm");
    }
    window.history.pushState({}, "", url);
  }, []);

  const handleSort = useCallback((column: string, descending: boolean) => {
    const url = new URL(window.location.href);
    url.searchParams.set("sortBy", column);
    url.searchParams.set("sortDescending", String(descending));
    window.history.pushState({}, "", url);
  }, []);

  return {
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
  };
}
