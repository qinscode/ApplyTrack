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
import { toast } from "@/components/ui/use-toast";

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

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, user might not be logged in");
  }
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const handleStatusChange = async (newStatus: string) => {
    if (isValidJobStatus(newStatus)) {
      try {
        await api.put(`/UserJobs/${job.job_id}/status/${newStatus}`);
        setStatus(newStatus);
        onStatusChange(job.job_id, newStatus);
        toast({
          title: "Status updated",
          description: `Job status has been updated to ${newStatus}`,
        });
      } catch (error: any) {
        console.error("Failed to update job status:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("UserJob not found")) {
            try {
              await api.post(
                "/UserJobs",
                {
                  jobId: job.job_id,
                  status: newStatus,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              // After creating the relationship, update the local state
              setStatus(newStatus);
              onStatusChange(job.job_id, newStatus);
              toast({
                title: "Job Added and Status Updated",
                description: `This job has been added to your account with the status ${newStatus}`,
              });
            } catch (createError) {
              console.error(
                "Failed to create UserJob relationship:",
                createError
              );
              toast({
                title: "Error",
                description:
                  "Failed to add this job to your account. Please try again.",
                variant: "destructive",
              });
            }
          } else {
            toast({
              title: "Error",
              description: "Failed to update job status. Please try again.",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
            variant: "destructive",
          });
        }
      }
    } else {
      console.error("Invalid status:", newStatus);
      toast({
        title: "Error",
        description: "Invalid job status selected.",
        variant: "destructive",
      });
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
