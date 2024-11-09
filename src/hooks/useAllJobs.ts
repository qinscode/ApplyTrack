import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Job, JobSearchParams } from "@/types";
import api from "@/api/axios";
import { adaptJob } from "@/adapters/jobAdapter";

const DEFAULT_PAGE_SIZE = 20;

export function useAllJobs() {
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
    
    const searchParams: JobSearchParams = {
      searchTerm,
      jobTitle,
      companyName,
      pageNumber: currentPage,
      pageSize,
      sortBy,
      sortDescending
    };
    
    try {
      const response = await api.get("/Jobs/search", { 
        params: searchParams
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
  }, [currentPage, pageSize, searchTerm, jobTitle, companyName, sortBy, sortDescending]);

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  const handlePageChange = useCallback((page: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("pageNumber", page.toString());
      newParams.set("pageSize", pageSize.toString());
      return newParams;
    });
  }, [pageSize, setSearchParams]);

  const handleDataChange = useCallback((updatedData: Job[]) => {
    setJobs(updatedData);
    fetchJobs();
  }, [fetchJobs]);

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("pageSize", newPageSize.toString());
      newParams.set("pageNumber", "1");
      return newParams;
    });
  }, [setSearchParams]);

  const handleSearch = useCallback((term: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (term) {
        newParams.set("searchTerm", term);
        // 可以根据需要设置其他搜索相关参数
        newParams.set("jobTitle", term);
        newParams.set("companyName", term);
      } else {
        newParams.delete("searchTerm");
        newParams.delete("jobTitle");
        newParams.delete("companyName");
      }
      return newParams;
    });
  }, [setSearchParams]);

  const handleSort = useCallback((column: string, descending: boolean) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sortBy", column);
      newParams.set("sortDescending", String(descending));
      return newParams;
    });
  }, [setSearchParams]);

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
    fetchJobs
  };
} 