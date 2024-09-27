import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/custom/button";
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

import { labels } from "../data/data";
import { jobSchema } from "../data/schema";
import api from "@/api/axios";
import { Job } from "@/types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onStatusChange: (jobId: number, newStatus: Job["status"]) => void;
}

export function DataTableRowActions<TData>({
  row,
  onStatusChange,
}: DataTableRowActionsProps<TData>) {
  const job = jobSchema.parse(row.original) as Job;
  const [status, setStatus] = useState<Job["status"]>(job.status);

  const handleStatusChange = async (newStatus: string) => {
    // Type guard to ensure newStatus is a valid Job["status"]
    if (isValidJobStatus(newStatus)) {
      try {
        await api.put(`/UserJobs/${job.job_id}/status/${newStatus}`);
        setStatus(newStatus);
        onStatusChange(job.job_id, newStatus);
      } catch (error) {
        console.error("Failed to update job status:", error);
        // You might want to show an error message to the user here
      }
    } else {
      console.error("Invalid status:", newStatus);
    }
  };

  // Type guard function
  function isValidJobStatus(status: string): status is Job["status"] {
    return [
      "New",
      "Pending",
      "Applied",
      "Archived",
      "Reviewed",
      "Interviewing",
      "TechnicalAssessment",
      "Offered",
      "Ghosting",
      "Rejected",
    ].includes(status);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
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
              {labels.map((label) => (
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
