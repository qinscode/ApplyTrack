import { Layout } from "@/components/custom/layout";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { DataTable } from "@/pages/jobs/components/data-table";
import { columns } from "@/pages/jobs/components/columns";
import { Job } from "@/types";

interface JobListLayoutProps {
  title: string;
  description: string;
  jobs: Job[];
  error: string | null;
  totalJobsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onDataChange: (updatedData: Job[]) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearch: (term: string) => void;
  onSort: (column: string, descending: boolean) => void;
  onRetry: () => void;
}

export function JobListLayout({
  title,
  description,
  jobs,
  error,
  totalJobsCount,
  pageSize,
  currentPage,
  onPageChange,
  onDataChange,
  onPageSizeChange,
  onSearch,
  onSort,
  onRetry
}: JobListLayoutProps) {
  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {error ? (
            <div>
              <p>Error: {error}</p>
              <button
                onClick={onRetry}
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
              onSearch={onSearch}
              onSort={onSort}
              onPageChange={onPageChange}
              onDataChange={onDataChange}
              onPageSizeChange={onPageSizeChange}
            />
          )}
        </div>
      </Layout.Body>
    </Layout>
  );
} 