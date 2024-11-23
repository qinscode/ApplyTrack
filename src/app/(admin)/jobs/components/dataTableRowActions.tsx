"use client";
import type { Job } from "@/types";
import type { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useJobStatusUpdate } from "@/hooks/useTotalJobsCount";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { labels } from "../../../../components/jobs/data";
import { jobSchema } from "../../../../types/schema";

type DataTableRowActionsProps<TData> = {
  row: Row<TData>;
  onStatusChange: (jobId: number, newStatus: Job["status"]) => void;
};

export function DataTableRowActions<TData>({
  row,
  onStatusChange,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const job = jobSchema.parse(row.original) as Job;
  const { status, updateJobStatus } = useJobStatusUpdate(job.status);

  const handleStatusChange = async (newStatus: string) => {
    await updateJobStatus(job.job_id, newStatus);
    onStatusChange(job.job_id, newStatus as Job["status"]);
  };

  const handleEdit = () => {
    router.push(`/job/${job.job_id}/edit`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={status}
              onValueChange={handleStatusChange}
            >
              {labels.map(label => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
