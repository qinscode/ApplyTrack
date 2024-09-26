import { Layout } from "@/components/custom/layout.tsx";
import ThemeSwitch from "@/components/theme-switch.tsx";
import { UserNav } from "@/components/user-nav.tsx";
import { DataTable } from "../../components/data-table.tsx";
import { columns } from "../../components/columns.tsx";
import { Job } from "@/types";
import api from "@/api/axios.ts";
import { useEffect, useState } from "react";

const PAGE_SIZE = 20;

export default function AllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(
        `/Jobs?pageNumber=${currentPage}&pageSize=${PAGE_SIZE}`
      );

      const validJobs = response.data.jobs.filter(
        (job: any) =>
          job.job_id &&
          job.job_title &&
          job.business_name &&
          job.work_type &&
          job.job_type &&
          job.pay_range &&
          job.status &&
          job.posted_date &&
          job.job_description
      );

      console.log(validJobs);
      console.log(response);

      setJobs(validJobs);
      setTotalPages(Math.ceil(response.data.totalCount / PAGE_SIZE));
    } catch (err) {
      setError("Failed to fetch jobs. Please try again later.");
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your job applications!
            </p>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable data={jobs} columns={columns} />
        </div>
      </Layout.Body>
    </Layout>
  );
}
