import type { Job } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { statuses } from "@/components/jobs/data";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useJobStatusUpdate } from "@/hooks/useTotalJobsCount";
import Link from "next/link";
import React from "react";
import { DataTableColumnHeader } from "./dataTableColumnHeader";
import { DataTableRowActions } from "./dataTableRowActions";

export const columns: ColumnDef<Job>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
          || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <div className="w-[40px]">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px] "
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "job_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex max-w-[300px] flex-col">
          <Link
            href={`/details/${row.original.job_id}`}
            className="line-clamp-1 font-medium hover:underline"
          >
            {row.getValue("job_title")}
          </Link>
          <span className="line-clamp-1 text-xs font-medium text-muted-foreground">
            {row.original.job_type}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "business_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[190px]  flex-col">
        <span className="line-clamp-1 font-medium">
          {row.getValue("business_name")}
        </span>
        <span className="line-clamp-1 text-xs font-medium  text-muted-foreground">
          {row.original.suburb}
          {" "}
          {row.original.area}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "work_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Work Type" />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("work_type")}</Badge>
    ),
  },
  {
    accessorKey: "pay_range",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pay Range" />
    ),
    cell: ({ row }) => <div>{row.getValue("pay_range") || "N/A"}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      // const status = row.getValue('status') as Job['status']

      const status = statuses.find(
        status => status.value === (row.getValue("status") as Job["status"]),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[10px] items-center">
          {status.icon && (
            <status.icon className="mr-2 size-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );

      // return <Badge variant='outline'>{status}</Badge>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "posted_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posted Date" />
    ),
    cell: ({ row }) => <div>{row.getValue("posted_date") || "N/A"}</div>,
  },

  {
    accessorKey: "job_description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Description" />
    ),
    cell: ({ row }) => {
      const htmlContent = row.getValue("job_description");
      const plainText = htmlToPlainText(htmlContent);
      return <div className="line-clamp-1 max-w-[180px]">{plainText}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // Create a proper React component to use the hook
      const CellComponent = () => {
        const { updateJobStatus } = useJobStatusUpdate(row.original.status);

        const handleStatusChange = (
          jobId: number,
          newStatus: Job["status"],
        ) => {
          updateJobStatus(jobId, newStatus);
        };

        return (
          <DataTableRowActions row={row} onStatusChange={handleStatusChange} />
        );
      };

      // Render the component
      return <CellComponent />;
    },
  },
];

const htmlToPlainText = (html) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const text = temp.textContent || "";
  return text.replace(/\s+/g, " ").trim();
};
