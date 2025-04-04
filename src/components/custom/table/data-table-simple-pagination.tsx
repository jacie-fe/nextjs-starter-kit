import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { useTranslations } from 'use-intl'

import { Button } from '@/components/custom/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTableSimplePaginationProps<TData> {
  table: Table<TData>
}

export function DataTableSimplePagination<TData>({
  table,
}: DataTableSimplePaginationProps<TData>) {
  const t = useTranslations('table')
  const allRows = table.getRowModel().rows.map((row) => row.original)
  const pageSize = table.getState().pagination.pageSize

  const disableNextPage = allRows.length < pageSize

  return (
    <div className='flex items-center justify-end overflow-auto px-2'>
      <div className='flex items-center space-x-5 py-1'>
        <div className='flex items-center space-x-2'>
          <Button
            variant='ghost'
            className='bg-[#F5F5F5] px-4 hover:bg-[#F5F5F5]/80'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>{t('go_to_previous_page')}</span>
            <ChevronLeftIcon className='h-4 w-4' />
            {t('previous_page')}
          </Button>

          <Button
            variant='ghost'
            className='bg-[#F5F5F5] px-4 hover:bg-[#F5F5F5]/80'
            onClick={() => table.nextPage()}
            disabled={disableNextPage}
          >
            {t('next_page')}
            <span className='sr-only'>{t('go_to_next_page')}</span>
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
                <div>
                  {t('per_page', {
                    page: table.getState().pagination.pageSize,
                  })}
                </div>
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
