"use client"

import { Table } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, SearchIcon } from 'lucide-react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  openAddDialog: () => void
}

export function DataTableToolbar<TData>({
  table,
  openAddDialog,
}: DataTableToolbarProps<TData>) {
  return (
    <div className='flex flex-col-reverse items-center justify-between gap-2 sm:flex-row'>
      <div className='relative w-full lg:w-[280px]'>
        <Input
          placeholder="Search by application name"
          value={String(table.getColumn('application_name')?.getFilterValue() ?? '')}
          onChange={(e) => {
            table.getColumn('application_name')?.setFilterValue(e.target.value)
          }}
          className='h-10 w-full pr-[50px] sm:mt-1 sm:ml-1'
        />
        <SearchIcon className='absolute top-3 right-2 w-[20px] text-gray-600' />
      </div>
      <Button
        className='w-full sm:w-auto'
        leftSection={<PlusIcon size={18} />}
        onClick={openAddDialog}
      >
        Add Application
      </Button>
    </div>
  )
}
