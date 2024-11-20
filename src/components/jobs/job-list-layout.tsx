import type { Job } from "@/types";
import { columns } from "@/app/(admin)/jobs/components/columns";
import DataTable from "@/app/(admin)/jobs/components/dataTable";
import React from "react";

type JobListLayoutProps = {
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
  onAddNewJob?: () => void;
};

export function JobListLayout({
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
  onRetry,
}: JobListLayoutProps) {
  const handleAddNewJob = async () => {
    // 处理添加新工作的逻辑
    try {
      // 调用 API 保存新工作
      // 刷新数据
      // 显示成功消息
    } catch (error) {
      // 处理错误
      console.error(error);
    }
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
                onClick={onRetry}
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
              onSearch={onSearch}
              onSort={onSort}
              onPageChange={onPageChange}
              onDataChange={onDataChange}
              onPageSizeChange={onPageSizeChange}
              onAddNewJob={handleAddNewJob}
            />
          )}
    </div>

  );
}
