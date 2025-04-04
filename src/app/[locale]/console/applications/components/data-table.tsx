import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { DataTableToolbar } from './data-table-toolbar'
import { DataTablePagination } from '@/components/custom/table/data-table-pagination'
import { DataTableView } from '@/components/custom/table/data-table-view'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loading?: boolean
  total?: number
  openAddDialog: () => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
  openAddDialog,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable(
    {
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    }
  )
    
  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} openAddDialog={openAddDialog} />
      <DataTableView table={table} loading={loading} />
      <DataTablePagination table={table} />
    </div>
  )
}
