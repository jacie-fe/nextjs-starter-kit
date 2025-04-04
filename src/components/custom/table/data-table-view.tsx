import { Table as TableType } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'

import Loader from '@/components/custom/loader'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DataTableViewProps<TData> {
  table: TableType<TData>
  loading?: boolean
  onRowClick?: (data: TData) => void
}

export function DataTableView<TData>({
  table,
  loading,
  onRowClick,
}: DataTableViewProps<TData>) {
  return (
    <div className='relative rounded-md border'>
      {loading && (
        <Loader className='absolute top-0 left-0 z-10 h-full w-full bg-white/50 [&>svg]:h-8 [&>svg]:w-8' />
      )}
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
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={(e) => {
                  e.stopPropagation()
                  onRowClick?.(row.original)
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className='h-24 text-center'
              >
                {!loading ? 'No result' : ''}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
