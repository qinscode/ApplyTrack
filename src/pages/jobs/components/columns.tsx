import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

import { Job } from "@/types";
import { statuses } from "@/pages/jobs/data/data.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export const columns: ColumnDef<Job>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <div className="w-[40px]">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
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
            to={`/job/${row.original.job_id}`}
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
          {row.original.suburb} {row.original.area}
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
        (status) => status.value === (row.getValue("status") as Job["status"])
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[10px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
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
    cell: ({ row }) => (
      <div className="line-clamp-1 max-w-[180px]">
        {row.getValue("job_description")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
