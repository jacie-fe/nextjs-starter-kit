import { Column } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { cn } from '@/lib/utils'
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDown } from 'lucide-react'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn('text-xs', className)}>{title}</div>
  }

  const handleClickSort = () => {
    const isSorted = column.getIsSorted()

    if (isSorted === false) column.toggleSorting(true)
    if (isSorted === 'asc') column.toggleSorting(true)
    if (isSorted === 'desc') column.toggleSorting(false)
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant='ghost'
        size='sm'
        className='data-[state=open]:bg-accent -ml-3 h-8'
        onClick={handleClickSort}
      >
        <span className='font-bold'>{title}</span>
        {column.getIsSorted() === 'desc' ? (
          <ArrowDownIcon className='ml-2 h-3 w-3' />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUpIcon className='ml-2 h-3 w-3' />
        ) : (
          <ChevronsUpDown className='ml-2 h-3 w-3' />
        )}
      </Button>
    </div>
  )
}
