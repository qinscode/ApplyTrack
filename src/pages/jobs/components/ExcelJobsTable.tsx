import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Column, ColumnDef, Row, RowSelectionState } from '@tanstack/react-table'
import { DataGrid, DataGridRowSelect, DataGridRowSelectAll, KeenIcon } from '@/components'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input.tsx'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import type { Job } from '@/types/schema.ts'
import './ExcelJobsTable.css'

interface ExcelJobsTableProps {
  jobs: Job[]
  loading: boolean
  error: string | null
  totalJobsCount: number
  totalPages: number
  pageSize: number
  currentPage: number
  handlePageChange: (page: number) => void
  handlePageSizeChange: (newPageSize: number) => void
  handleSearch: (term: string) => void
  handleSort: (column: string, descending: boolean) => void
  fetchJobs: () => Promise<void>
  hideStatus: boolean
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

const JOB_STATUSES = [
  'New',
  'Pending',
  'Applied',
  'Archived',
  'Reviewed',
  'Interviewing',
  'TechnicalAssessment',
  'Offered',
  'Ghosting',
  'Rejected'
]

const ExcelJobsTable = ({
  jobs,
  loading,
  error,
  totalJobsCount,
  totalPages,
  pageSize,
  currentPage,
  handlePageChange,
  handlePageSizeChange,
  handleSearch,
  handleSort,
  fetchJobs,
  hideStatus = false
}: ExcelJobsTableProps) => {
  const [selectedCell, setSelectedCell] = useState<{ rowId: string; columnId: string } | null>(null)
  const [cellValue, setCellValue] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [sortColumn, setSortColumn] = useState<string>('appliedDate')
  const tableRef = useRef<HTMLDivElement>(null)
  const [columnResizing, setColumnResizing] = useState<boolean>(false)
  const [resizingColumnId, setResizingColumnId] = useState<string | null>(null)
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    jobTitle: 200,
    businessName: 150,
    location: 150,
    appliedDate: 120,
    updatedDate: 120,
    status: 150,
    notes: 200
  })
  const resizingRef = useRef<{
    startX: number
    startWidth: number
    columnId: string
  } | null>(null)

  // Handle column resize start
  const handleResizeStart = (e: React.MouseEvent, columnId: string) => {
    e.preventDefault()
    const startX = e.clientX
    const currentWidth = columnWidths[columnId] || 150

    resizingRef.current = {
      startX,
      startWidth: currentWidth,
      columnId
    }

    setColumnResizing(true)
    setResizingColumnId(columnId)

    document.addEventListener('mousemove', handleResizeMove)
    document.addEventListener('mouseup', handleResizeEnd)
  }

  // Handle column resize move
  const handleResizeMove = (e: MouseEvent) => {
    if (!resizingRef.current) return

    const { startX, startWidth, columnId } = resizingRef.current
    const diff = e.clientX - startX
    const newWidth = Math.max(50, startWidth + diff) // Minimum width of 50px

    setColumnWidths((prev) => ({
      ...prev,
      [columnId]: newWidth
    }))
  }

  // Handle column resize end
  const handleResizeEnd = () => {
    setColumnResizing(false)
    setResizingColumnId(null)
    resizingRef.current = null

    document.removeEventListener('mousemove', handleResizeMove)
    document.removeEventListener('mouseup', handleResizeEnd)
  }

  // Clean up event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
    }
  }, [])

  // Handle cell selection
  const handleCellClick = (rowId: string, columnId: string, value: string) => {
    setSelectedCell({ rowId, columnId })
    setCellValue(value)
  }

  // Handle cell value change
  const handleCellValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCellValue(e.target.value)
  }

  // Apply cell value change
  const applyCellChange = () => {
    if (!selectedCell) return

    // Here you would update the job data
    // This is a placeholder for the actual implementation
    toast.success('Cell updated successfully')
  }

  // Handle status change
  const handleStatusChange = (rowId: string, newStatus: string) => {
    // Here you would update the job status
    // This is a placeholder for the actual implementation
    toast.success(`Status updated to ${newStatus}`)
  }

  // Toggle sort direction
  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    setSortDirection(newDirection)
    handleSort(sortColumn, newDirection === 'desc')
  }

  // Set sort column
  const setSortColumnAndDirection = (columnId: string) => {
    if (sortColumn === columnId) {
      toggleSortDirection()
    } else {
      setSortColumn(columnId)
      setSortDirection('desc')
      handleSort(columnId, true)
    }
  }

  // Filter jobs by status
  const filteredJobs = useMemo(() => {
    if (statusFilter === 'all') return jobs
    return jobs.filter((job) => job.status?.toLowerCase() === statusFilter.toLowerCase())
  }, [jobs, statusFilter])

  // Get status color
  const getStatusColor = (status: string | undefined) => {
    if (!status) return 'bg-gray-100 text-gray-800'

    const statusMap: Record<string, string> = {
      new: 'bg-teal-100 text-teal-800',
      pending: 'bg-blue-100 text-blue-800',
      applied: 'bg-blue-100 text-blue-800',
      interviewing: 'bg-purple-100 text-purple-800',
      technicalassessment: 'bg-amber-100 text-amber-800',
      offered: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      archived: 'bg-gray-100 text-gray-800',
      reviewed: 'bg-purple-100 text-purple-800',
      ghosting: 'bg-pink-100 text-pink-800'
    }

    return statusMap[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
  }

  // Define columns
  const columns = useMemo<ColumnDef<Job>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => <DataGridRowSelectAll />,
        cell: ({ row }: { row: Row<Job> }) => <DataGridRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        meta: {
          headerClassName: 'w-10 er'
        }
      },
      {
        accessorKey: 'jobTitle',
        header: ({ column }: { column: Column<Job> }) => (
          <div
            className="er cursor-pointer flex items-center gap-1"
            onClick={() => setSortColumnAndDirection('jobTitle')}
            style={{ width: `${columnWidths.jobTitle}px` }}
          >
            <span>Job Title</span>
            {sortColumn === 'jobTitle' && (
              <KeenIcon
                icon={sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
                className="w-4 h-4"
              />
            )}
            <div className="resize-handle" onMouseDown={(e) => handleResizeStart(e, 'jobTitle')} />
          </div>
        ),
        cell: ({ row, getValue }: { row: Row<Job>; getValue: () => unknown }) => {
          const value = getValue() as string
          const isSelected = selectedCell?.rowId === row.id && selectedCell?.columnId === 'jobTitle'

          return (
            <div
              className={` ${isSelected ? 'selected-cell' : ''}`}
              onClick={() => handleCellClick(row.id, 'jobTitle', value)}
              style={{ width: `${columnWidths.jobTitle}px` }}
            >
              {truncateText(value, 50)}
            </div>
          )
        }
      },
      {
        accessorKey: 'businessName',
        header: ({ column }: { column: Column<Job> }) => (
          <div
            className="cursor-pointer flex items-center gap-1"
            onClick={() => setSortColumnAndDirection('businessName')}
            style={{ width: `${columnWidths.businessName}px` }}
          >
            <span>Company</span>
            {sortColumn === 'businessName' && (
              <KeenIcon
                icon={sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
                className="w-4 h-4"
              />
            )}
            <div
              className="resize-handle"
              onMouseDown={(e) => handleResizeStart(e, 'businessName')}
            />
          </div>
        ),
        cell: ({ row, getValue }: { row: Row<Job>; getValue: () => unknown }) => {
          const value = getValue() as string
          const isSelected =
            selectedCell?.rowId === row.id && selectedCell?.columnId === 'businessName'

          return (
            <div
              className={` ${isSelected ? 'selected-cell' : ''}`}
              onClick={() => handleCellClick(row.id, 'businessName', value)}
              style={{ width: `${columnWidths.businessName}px` }}
            >
              {truncateText(value, 30)}
            </div>
          )
        }
      },
      {
        accessorKey: 'appliedDate',
        header: ({ column }: { column: Column<Job> }) => (
          <div
            className="er cursor-pointer flex items-center gap-1"
            onClick={() => setSortColumnAndDirection('appliedDate')}
            style={{ width: `${columnWidths.appliedDate}px` }}
          >
            <span>Applied Date</span>
            {sortColumn === 'appliedDate' && (
              <KeenIcon
                icon={sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
                className="w-4 h-4"
              />
            )}
            <div
              className="resize-handle"
              onMouseDown={(e) => handleResizeStart(e, 'appliedDate')}
            />
          </div>
        ),
        cell: ({ row }: { row: Row<Job> }) => {
          const rawValue = row.original.createdAt || row.original.posted_date || ''
          // Format the date if it's in ISO format
          const value = rawValue.includes('T')
            ? rawValue.split('T')[0] // Extract just the date part (YYYY-MM-DD)
            : rawValue
          const isSelected =
            selectedCell?.rowId === row.id && selectedCell?.columnId === 'appliedDate'

          return (
            <div
              className={` ${isSelected ? 'selected-cell' : ''}`}
              onClick={() => handleCellClick(row.id, 'appliedDate', value)}
              style={{ width: `${columnWidths.appliedDate}px` }}
            >
              {value}
            </div>
          )
        }
      },
      {
        accessorKey: 'updatedDate',
        header: ({ column }: { column: Column<Job> }) => (
          <div
            className="er cursor-pointer flex items-center gap-1"
            onClick={() => setSortColumnAndDirection('updatedDate')}
            style={{ width: `${columnWidths.updatedDate}px` }}
          >
            <span>Updated Date</span>
            {sortColumn === 'updatedDate' && (
              <KeenIcon
                icon={sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
                className="w-4 h-4"
              />
            )}
            <div
              className="resize-handle"
              onMouseDown={(e) => handleResizeStart(e, 'updatedDate')}
            />
          </div>
        ),
        cell: ({ row }: { row: Row<Job> }) => {
          const rawValue = row.original.updatedAt || new Date().toISOString()
          // Format the date if it's in ISO format
          const value = rawValue.includes('T')
            ? rawValue.split('T')[0] // Extract just the date part (YYYY-MM-DD)
            : rawValue
          const isSelected =
            selectedCell?.rowId === row.id && selectedCell?.columnId === 'updatedDate'

          return (
            <div
              className={` ${isSelected ? 'selected-cell' : ''}`}
              onClick={() => handleCellClick(row.id, 'updatedDate', value)}
              style={{ width: `${columnWidths.updatedDate}px` }}
            >
              {value}
            </div>
          )
        }
      },
      {
        accessorKey: 'status',
        header: ({ column }: { column: Column<Job> }) => (
          <div
            className="er cursor-pointer flex items-center gap-1"
            onClick={() => setSortColumnAndDirection('status')}
            style={{ width: `${columnWidths.status}px` }}
          >
            <span>Status</span>
            {sortColumn === 'status' && (
              <KeenIcon
                icon={sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
                className="w-4 h-4"
              />
            )}
            <div className="resize-handle" onMouseDown={(e) => handleResizeStart(e, 'status')} />
          </div>
        ),
        cell: ({ row, getValue }: { row: Row<Job>; getValue: () => unknown }) => {
          const value = getValue() as string
          const statusClass = getStatusColor(value)

          return (
            <div className=" p-2" style={{ width: `${columnWidths.status}px` }}>
              <Select
                defaultValue={value}
                onValueChange={(newValue) => handleStatusChange(row.id, newValue)}
              >
                <SelectTrigger className={`w-full h-8 ${statusClass}`}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        }
      },
      {
        accessorKey: 'location',
        header: ({ column }: { column: Column<Job> }) => (
          <div
            className="er cursor-pointer flex items-center gap-1"
            onClick={() => setSortColumnAndDirection('location')}
            style={{ width: `${columnWidths.location}px` }}
          >
            <span>Location</span>
            {sortColumn === 'location' && (
              <KeenIcon
                icon={sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
                className="w-4 h-4"
              />
            )}
            <div className="resize-handle" onMouseDown={(e) => handleResizeStart(e, 'location')} />
          </div>
        ),
        cell: ({ row }: { row: Row<Job> }) => {
          const value = `${row.original.suburb || ''}, ${row.original.area || ''}`.replace(
            /(^,\s*|\s*,\s*$)/,
            ''
          )
          const isSelected = selectedCell?.rowId === row.id && selectedCell?.columnId === 'location'

          return (
            <div
              className={` ${isSelected ? 'selected-cell' : ''}`}
              onClick={() => handleCellClick(row.id, 'location', value)}
              style={{ width: `${columnWidths.location}px` }}
            >
              {truncateText(value, 30)}
            </div>
          )
        }
      },

      {
        accessorKey: 'notes',
        header: ({ column }: { column: Column<Job> }) => (
          <div className="er flex items-center gap-1" style={{ width: `${columnWidths.notes}px` }}>
            <span>Notes</span>
            <div className="resize-handle" onMouseDown={(e) => handleResizeStart(e, 'notes')} />
          </div>
        ),
        cell: ({ row }: { row: Row<Job> }) => {
          // Using job_description as notes since there's no dedicated notes field
          const value = row.original.job_description || ''
          const isSelected = selectedCell?.rowId === row.id && selectedCell?.columnId === 'notes'

          return (
            <div
              className={` ${isSelected ? 'selected-cell' : ''}`}
              onClick={() => handleCellClick(row.id, 'notes', value)}
              style={{ width: `${columnWidths.notes}px` }}
            >
              {truncateText(value, 50)}
            </div>
          )
        }
      }
    ],
    [selectedCell, sortColumn, sortDirection, columnWidths]
  )

  // Handle row selection
  const handleRowSelection = (state: RowSelectionState) => {
    const selectedRows = Object.keys(state).filter((key) => state[key])
    console.log('Selected rows:', selectedRows)
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <div
      className={`excel-table-container flex flex-col border rounded-md shadow-sm ${columnResizing ? 'resizing' : ''}`}
    >
      {/* Excel-style toolbar */}
      <div className="excel-toolbar flex items-center gap-3 border-b bg-gray-50">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <KeenIcon icon="plus" className="w-4 h-4" />
          <span>Add New</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <KeenIcon icon="trash" className="w-4 h-4" />
          <span>Delete</span>
        </Button>
        <div className="h-5 border-r border-gray-300"></div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 h-8">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {JOB_STATUSES.map((status) => (
              <SelectItem key={status} value={status.toLowerCase()}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative">
          <KeenIcon
            icon="magnifier"
            className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-2"
          />
          <Input
            type="text"
            placeholder="Search jobs"
            className="h-8 pl-7 pr-2"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={toggleSortDirection}
        >
          <KeenIcon
            icon={sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
            className="w-4 h-4"
          />
          <span>{sortDirection === 'asc' ? 'Ascending' : 'Descending'}</span>
        </Button>
        <div className="h-5 border-r border-gray-300"></div>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <KeenIcon icon="save" className="w-4 h-4" />
          <span>Save</span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <KeenIcon icon="download" className="w-4 h-4" />
          <span>Export</span>
        </Button>
      </div>

      {/* Excel-style formula bar */}
      <div className="excel-formula-bar flex items-center gaborder-b bg-gray-50">
        <div className="text-sm font-medium text-gray-500">fx</div>
        <Input
          value={cellValue}
          onChange={handleCellValueChange}
          onBlur={applyCellChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              applyCellChange()
            }
          }}
          className="h-8"
          placeholder="Edit cell value"
          disabled={!selectedCell}
        />
      </div>

      {/* Excel-style table */}
      <div ref={tableRef} className="excel-grid-container flex-grow overflow-auto">
        {columnResizing && (
          <div className="absolute inset-0 z-50 bg-transparent" style={{ cursor: 'col-resize' }} />
        )}
        <div className="excel-grid custom-cell-spacing">
          <DataGrid
            columns={columns}
            data={filteredJobs}
            rowSelection={true}
            onRowSelectionChange={handleRowSelection}
            pagination={{
              page: currentPage - 1,
              size: pageSize,
              count: totalJobsCount,
              more: currentPage < totalPages,
              moreLimit: 5,
              info: `Showing {from} to {to} of {count} entries`
            }}
            layout={{ card: false }}
            serverSide={false}
            onFetchData={async ({ pageIndex, pageSize: size }) => {
              handlePageChange(pageIndex + 1)
              return { data: filteredJobs, totalCount: totalJobsCount }
            }}
          />
        </div>
      </div>

      {/* Excel-style worksheet tabs */}
      <div className="excel-tabs flex border-t bg-gray-50">
        <div className="excel-tab px-4 py-2 border-r border-gray-200 bg-white font-medium text-sm">
          My Applications
        </div>
        <div className="excel-tab px-4 py-2 border-r border-gray-200 text-gray-500 text-sm">
          Archived
        </div>
        <div className="excel-tab px-4 py-2 border-r border-gray-200 text-gray-500 text-sm">
          + Add Sheet
        </div>
      </div>

      {/* Excel-style status bar */}
      <div className="excel-status-bar flex items-center justify-between border-t bg-gray-50 text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <div>Total: {totalJobsCount} applications</div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-100"></span>
            <span>Applied</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-purple-100"></span>
            <span>Interviewing</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-amber-100"></span>
            <span>Assessment</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-100"></span>
            <span>Offered</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-100"></span>
            <span>Rejected</span>
          </div>
        </div>
        <div>
          {currentPage} of {totalPages} pages
        </div>
      </div>
    </div>
  )
}

export { ExcelJobsTable }
