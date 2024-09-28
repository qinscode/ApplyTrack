import { Layout } from "@/components/custom/layout.tsx";
import ThemeSwitch from "@/components/theme-switch.tsx";
import { UserNav } from "@/components/user-nav.tsx";
import { DataTable } from "../../components/data-table.tsx";
import { columns } from "../../components/columns.tsx";
import { Job } from "@/types";
import { useSearchParams } from "react-router-dom";
import api from "@/api/axios.ts";
import { adaptJob } from "@/adapters/jobAdapter.ts";
import { useEffect, useState } from "react";

const DEFAULT_PAGE_SIZE = 20;

export default function NewJobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = parseInt(
    searchParams.get("pageSize") || DEFAULT_PAGE_SIZE.toString(),
    10
  );
  const currentPage = parseInt(searchParams.get("pageNumber") || "1", 10);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalJobsCount, setTotalJobsCount] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, [currentPage, pageSize]);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(
        `/Jobs/new?pageNumber=${currentPage}&pageSize=${pageSize}`
      );

      const adaptedJobs = response.data.jobs.map(adaptJob);
      console.log("Adapted jobs:", adaptedJobs);

      // Log each job's posted_date to check for empty values
      adaptedJobs.forEach((job) => {
        console.log(`Job ID: ${job.job_id}, Posted Date: ${job.posted_date}`);
      });

      const validJobs = adaptedJobs.filter(
        (job: Job) =>
          job.job_id &&
          job.job_title !== null &&
          job.business_name !== null &&
          job.work_type !== null &&
          job.job_type !== null &&
          job.pay_range !== null &&
          job.status !== null &&
          job.posted_date !== null &&
          job.job_description !== null
      );

      console.log("Valid jobs:", validJobs);
      console.log("Total jobs count:", response.data.totalCount);

      setJobs(validJobs);
      setTotalJobsCount(response.data.totalCount);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page: number) => {
    setSearchParams({
      pageSize: pageSize.toString(),
      pageNumber: page.toString(),
    });
  };

  const handleDataChange = () => {};
  const handleperPageChange = (newPageSize: number) => {
    setSearchParams({
      pageSize: newPageSize.toString(),
      pageNumber: "1",
    });
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your new job applications!
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
              data={jobs}
              columns={columns}
              pageSize={pageSize}
              currentPage={currentPage}
              totalCount={totalJobsCount}
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
