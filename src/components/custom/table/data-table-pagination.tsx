import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

const getPagination = (
  currentPage: number,
  totalPage: number,
  maxVisiblePages: number = 5
) => {
  if (totalPage === 0) return [1]

  if (totalPage <= maxVisiblePages) {
    return Array.from({ length: totalPage }, (_, i) => 1 + i)
  }

  if (totalPage - currentPage + 1 < maxVisiblePages) {
    return Array.from(
      { length: maxVisiblePages },
      (_, i) => totalPage - (maxVisiblePages - 1) + i
    )
  }

  const startPages = Array.from(
    { length: maxVisiblePages - 2 },
    (_, i) => (currentPage === 1 ? currentPage : currentPage - 1) + i
  )

  return [...startPages, '...', totalPage]
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const renderPageList = () => {
    const pageIndex = table.getState().pagination.pageIndex
    const totalPages = table.getPageCount()
    const pages = getPagination(pageIndex + 1, totalPages)

    return (
      <>
        {pages.map((page, index) => (
          <Button
            key={index}
            variant={pageIndex + 1 === page ? 'default' : 'ghost'}
            className={cn(
              'h-8 min-w-8 px-1 py-0',
              pageIndex + 1 === page && 'bg-[#1890FF]'
            )}
            disabled={page === '...'}
            onClick={() => {
              if (typeof page === 'number') {
                table.setPageIndex(page - 1)
              }
            }}
          >
            <span className='sr-only'>Go to previous page</span>
            {page}
          </Button>
        ))}
      </>
    )
  }

  return (
    <div className='flex items-center justify-end overflow-auto px-2'>
      <div className='flex items-center space-x-5 py-1'>
        <div className='flex items-center space-x-2'>
          <Button
            variant='ghost'
            className='h-8 w-8 bg-[#F5F5F5] p-0 hover:bg-[#F5F5F5]/80'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>

          {renderPageList()}

          <Button
            variant='ghost'
            className='h-8 w-8 bg-[#F5F5F5] p-0 hover:bg-[#F5F5F5]/80'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
        </div>

        <div className='flex items-center space-x-2'>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-auto min-w-[104px] border-[#BFBFBF] bg-[#FFFFFF]'>
              <SelectValue asChild>
                <div>{table.getState().pagination.pageSize} / Page</div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
