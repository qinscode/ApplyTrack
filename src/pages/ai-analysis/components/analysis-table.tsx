import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/pages/jobs/components/data-table-pagination";
import { DataTableToolbar } from "@/pages/jobs/components/data-table-toolbar";
import { useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize: number;
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onDataChange: (updatedData: TData[]) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearch: (term: string) => void;
  onSort: (column: string, descending: boolean) => void;
}

export function AnalysisTable<TData, TValue>({
  columns,
  data,
  pageSize,
  currentPage,
  totalCount,
  onPageChange,
  onDataChange,
  onPageSizeChange,
  onSearch,
  onSort,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / pageSize),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageSize: pageSize,
        pageIndex: currentPage - 1,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        const newSorting = updater(sorting);
        const sortingState = newSorting[0];
        if (sortingState) {
          onSort(sortingState.id, sortingState.desc);
        }
      }
      setSorting(updater);
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPaginationState = updater(table.getState().pagination);
        onPageChange(newPaginationState.pageIndex + 1);
      }
    },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
  });

  useEffect(() => {
    table.setPageIndex(currentPage - 1);
    table.setPageSize(pageSize);
  }, [currentPage, pageSize, table]);

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} onSearch={onSearch} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} onPageSizeChange={onPageSizeChange} />
    </div>
  );
} 