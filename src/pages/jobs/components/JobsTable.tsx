import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Column, ColumnDef, Row, RowSelectionState, Table } from '@tanstack/react-table'
import {
  DataGrid,
  DataGridColumnHeader,
  DataGridColumnVisibility,
  DataGridRowSelect,
  DataGridRowSelectAll,
  KeenIcon,
  useDataGrid
} from '@/components'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'
import type { Job } from '@/types/schema.ts'

interface IColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

interface JobsTableProps {
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

const formatTechStack = (techStack: string[]) => {
  if (!techStack || !Array.isArray(techStack)) return []
  return techStack.map((tech) => tech.replace(/[[\]"\\]/g, '').trim())
}

const TechStackCell = ({ techStack }: { techStack: string[] }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const displayTechs = isExpanded ? techStack : techStack.slice(0, 5)
  const remainingCount = techStack.length - 5

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {displayTechs.map((tech, index) => (
        <span
          key={index}
          className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {tech}
        </span>
      ))}
      {!isExpanded && remainingCount > 0 && (
        <button
          onClick={() => setIsExpanded(true)}
          className="text-xs text-primary hover:text-primary-600 font-medium cursor-pointer"
        >
          +{remainingCount} more
        </button>
      )}
      {isExpanded && techStack.length > 5 && (
        <button
          onClick={() => setIsExpanded(false)}
          className="text-xs text-primary hover:text-primary-600 font-medium cursor-pointer"
        >
          Show less
        </button>
      )}
    </div>
  )
}

const JobsTable = ({
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
}: JobsTableProps) => {
  const ColumnInputFilter = <TData, TValue>({ column }: IColumnFilterProps<TData, TValue>) => {
    return (
      <Input
        placeholder="Filter..."
        value={(column.getFilterValue() as string) ?? ''}
        onChange={(event) => {
          column.setFilterValue(event.target.value)
          handleSearch(event.target.value)
        }}
        className="h-9 w-full max-w-40"
      />
    )
  }

  const columns = useMemo<ColumnDef<Job>[]>(() => {
    const baseColumns: ColumnDef<Job>[] = [
      {
        accessorKey: 'id',
        header: () => <DataGridRowSelectAll />,
        cell: ({ row }: { row: Row<Job> }) => <DataGridRowSelect row={row} />,
        enableSorting: false,
        enableHiding: false,
        meta: {
          headerClassName: 'w-0'
        }
      },
      {
        accessorKey: 'jobTitle',
        header: ({ column }: { column: Column<Job> }) => (
          <DataGridColumnHeader
            title="Job Title"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        cell: ({ row, getValue }: { row: Row<Job>; getValue: () => unknown }) => {
          console.log('Job row original data:', row.original)

          return (
            <div className="flex flex-col justify-center min-h-[40px]">
              <Link
                className="leading-normal font-medium text-sm text-gray-900 hover:text-primary line-clamp-2 text-center"
                to={`/details/${row.original.id}`}
              >
                {truncateText(getValue() as string, 50)}
              </Link>
            </div>
          )
        },
        meta: {
          headerClassName: 'min-w-[100px]'
        }
      },
      {
        accessorKey: 'businessName',
        header: ({ column }: { column: Column<Job> }) => (
          <DataGridColumnHeader
            title="Company"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        cell: ({ row, getValue }: { row: Row<Job>; getValue: () => unknown }) => (
          <div className="flex flex-col gap-1">
            <span className="text-gray-900 truncate block font-medium">
              {truncateText(getValue() as string, 30)}
            </span>
            <span className="text-gray-500 text-xs truncate block">
              {truncateText(
                `${row.original.suburb || ''}, ${row.original.area || ''}`.replace(
                  /(^,\s*|\s*,\s*$)/,
                  ''
                ),
                30
              )}
            </span>
          </div>
        ),
        meta: {
          headerClassName: 'min-w-[200px]'
        }
      },
      {
        accessorKey: 'jobDescription',
        header: ({ column }: { column: Column<Job> }) => (
          <DataGridColumnHeader
            title="Description"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        cell: ({ getValue }: { getValue: () => unknown }) => (
          <div className="text-gray-700 text-xs line-clamp-2 leading-normal">
            {truncateText(htmlToPlainText(getValue() as string) as string, 150)}
          </div>
        ),
        meta: {
          headerClassName: 'min-w-[300px]'
        }
      },
      {
        accessorKey: 'techStack',
        header: ({ column }: { column: Column<Job> }) => (
          <DataGridColumnHeader
            title="Tech Stack"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        cell: ({ getValue }: { getValue: () => unknown }) => {
          const techStack = formatTechStack(getValue() as string[])
          return <TechStackCell techStack={techStack} />
        },
        meta: {
          headerClassName: 'min-w-[200px]'
        }
      },
      {
        accessorKey: 'workType',
        header: ({ column }: { column: Column<Job> }) => (
          <DataGridColumnHeader title="Work Type" column={column} />
        ),
        cell: ({ getValue }: { getValue: () => unknown }) => {
          const workType = getValue() as string
          const getWorkTypeColor = (type: string) => {
            switch (type.toLowerCase()) {
              case 'full time':
                return 'bg-purple-100 text-purple-800'
              case 'part time':
                return 'bg-teal-100 text-teal-800'
              case 'contract':
              case 'contract/temp':
                return 'bg-orange-100 text-orange-800'
              case 'casual':
                return 'bg-pink-100 text-pink-800'
              case 'internship':
                return 'bg-green-100 text-green-800'
              default:
                return 'bg-gray-100 text-gray-800'
            }
          }
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkTypeColor(workType)}`}
            >
              {workType || 'N/A'}
            </span>
          )
        },
        meta: {
          headerClassName: 'min-w-[150px]'
        }
      },
      {
        accessorKey: 'payRange',
        header: ({ column }: { column: Column<Job> }) => (
          <DataGridColumnHeader title="Pay Range" column={column} />
        ),
        cell: ({ getValue }: { getValue: () => unknown }) => (
          <div className="text-gray-700 text-xs line-clamp-2 leading-normal">
            {truncateText(getValue() as string, 60)}
          </div>
        ),
        meta: {
          headerClassName: 'min-w-[150px]'
        }
      },
      {
        accessorKey: 'postedDate',
        header: ({ column }: { column: Column<Job> }) => (
          <DataGridColumnHeader title="Posted Date" column={column} />
        ),
        meta: {
          headerClassName: 'min-w-[150px]'
        }
      }
    ]

    if (!hideStatus) {
      baseColumns.push({
        accessorKey: 'status',
        header: ({ column }: { column: Column<Job> }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ getValue }: { getValue: () => unknown }) => {
          const status = getValue() as string | undefined
          const getStatusColor = (status: string | undefined) => {
            if (!status) return 'bg-gray-100 text-gray-800'
            switch (status.toLowerCase()) {
              case 'applied':
                return 'bg-blue-100 text-blue-800'
              case 'rejected':
                return 'bg-red-100 text-red-800'
              case 'interviewing':
                return 'bg-yellow-100 text-yellow-800'
              case 'pending':
                return 'bg-gray-100 text-gray-800'
              default:
                return 'bg-gray-100 text-gray-800'
            }
          }
          return status ? (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}
            >
              {status}
            </span>
          ) : null
        },
        meta: {
          headerClassName: 'min-w-[120px]'
        }
      })
    }

    baseColumns.push({
      id: 'actions',
      header: () => <></>,
      enableSorting: false,
      cell: ({ row }: { row: Row<Job> }) => {
        console.log('Action row original data:', row.original)

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="btn btn-sm btn-icon btn-clear btn-light">
                <KeenIcon icon="dots-horizontal" className="text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link to={`/details/${row.original.id}`}>
                  <KeenIcon icon="eye" className="mr-2 h-4 w-4" />
                  <span>View Details</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <KeenIcon icon="notepad-edit" className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <KeenIcon icon="trash" className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      meta: {
        headerClassName: 'w-[50px]'
      }
    })

    return baseColumns
  }, [hideStatus])

  const handleRowSelection = (state: RowSelectionState) => {
    const selectedRowIds = Object.keys(state)

    if (selectedRowIds.length > 0) {
      toast(`Total ${selectedRowIds.length} are selected.`, {
        description: `Selected row IDs: ${selectedRowIds}`,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo')
        }
      })
    }
  }

  const Toolbar = () => {
    const { table }: { table: Table<Job> } = useDataGrid()

    return (
      <div className="card-header px-5 py-5 border-b-0">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-6">
            <div className="relative">
              <KeenIcon
                icon="magnifier"
                className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3"
              />
              <input
                type="text"
                placeholder="Search JobsTable"
                className="input input-sm ps-8"
                value={(table.getColumn('jobTitle')?.getFilterValue() as string) ?? ''}
                onChange={(event) => {
                  table.getColumn('jobTitle')?.setFilterValue(event.target.value)
                  handleSearch(event.target.value)
                }}
              />
            </div>
          </div>
          <DataGridColumnVisibility table={table} />
          <label className="switch switch-sm">
            <input name="check" type="checkbox" value="1" className="order-2" readOnly />
            <span className="switch-label order-1">Only Show Active Jobs</span>
          </label>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <DataGrid
      columns={columns}
      data={jobs}
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
      toolbar={<Toolbar />}
      layout={{ card: true }}
      serverSide={false}
      onFetchData={async ({ pageIndex, pageSize: size }) => {
        handlePageChange(pageIndex + 1)
        return { data: jobs, totalCount: totalJobsCount }
      }}
    />
  )
}

const htmlToPlainText = (html: string) => {
  const temp = document.createElement('div')
  temp.innerHTML = html
  const text = temp.textContent || ''
  return text.replace(/\s+/g, ' ').trim()
}

export { JobsTable }
