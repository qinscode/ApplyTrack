import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";
import { useState } from "react";
import { statuses } from "../../../../components/jobs/data";
import { AddJobDialog } from "./addJobDialog";
import { DataTableFacetedFilter } from "./dataTableFacetedFilter";
import { DataTableViewOptions } from "./dataTableViewOptions";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  onSearch: (term: string) => void;
  onAddNewJob?: (jobData: any) => void;
};

export function DataTableToolbar<TData>({
  table,
  onSearch,
  onAddNewJob,
}: DataTableToolbarProps<TData>) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (jobData: any) => {
    onAddNewJob?.(jobData);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search jobs..."
            value={table.getState().globalFilter}
            onChange={event => onSearch(event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="mr-2 size-4" />
            Add New Job
          </Button>
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
          <DataTableViewOptions table={table} />
        </div>
      </div>

      <AddJobDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
}
