import { useMemo } from 'react'

import {
  ColumnDef,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table'

import { generateSortByString, generateSorting } from '@/lib/utils'

interface UseSecurityKeyTable<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryParams: any
  setQueryParams: (data: unknown) => void
}

export const useTable = <TData, TValue>(
  {
    data,
    columns,
    total,
    queryParams,
    setQueryParams,
  }: UseSecurityKeyTable<TData, TValue>,
  options?: Omit<TableOptions<TData>, 'data' | 'columns' | 'getCoreRowModel'>
) => {
  const pagination = useMemo(
    () => ({
      pageIndex: queryParams.page - 1,
      pageSize: queryParams.per_page,
    }),
    [queryParams]
  )
  const sorting = useMemo(
    () => generateSorting(queryParams.sort_by),
    [queryParams]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
    },
    pageCount: Math.ceil(total / queryParams.per_page),
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    onPaginationChange(updater) {
      const newPagination =
        typeof updater === 'function' ? updater(pagination) : updater

      setQueryParams({
        page: String(newPagination.pageIndex + 1),
        per_page: String(newPagination.pageSize),
      })
    },
    onSortingChange(updater) {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater

      setQueryParams({
        sort_by: generateSortByString(newSorting[0]),
      })
    },
    getCoreRowModel: getCoreRowModel(),
    ...options,
  })

  return table
}
