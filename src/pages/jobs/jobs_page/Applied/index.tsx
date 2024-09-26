import { Layout } from "@/components/custom/layout.tsx";
import ThemeSwitch from "@/components/theme-switch.tsx";
import { UserNav } from "@/components/user-nav.tsx";
import { DataTable } from "../../components/data-table.tsx";
import { columns } from "../../components/columns.tsx";
import { Job } from "@/types";
import { useState } from "react";
import { useJobCountByStatus } from "@/hooks/useTotalJobsCount.ts";

const PAGE_SIZE = 20;
export default function AppliedJobs() {
  const [currentPage] = useState(1);

  const { Jobs, loading, error } = useJobCountByStatus(
    "Applied",
    currentPage,
    PAGE_SIZE
  );

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
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <DataTable
              data={Jobs as Job[]}
              columns={columns}
              pageSize={PAGE_SIZE}
            />
          )}
        </div>
      </Layout.Body>
    </Layout>
  );
}
