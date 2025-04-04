import { ColumnDef } from '@tanstack/react-table'
import { DataTableRowActions } from './data-table-row-actions'
import ClipboardCopyButton from '@/components/custom/clipboard-copy-button'
import { StatusBadge } from '@/components/custom/status-badge'
import { DataTableColumnHeader } from '@/components/custom/table/data-table-column-header'
import { Application } from '@/types/application'

export const getColumns = ({
  openDeleteConfirmation,
  openEditDialog,
}: {
  openDeleteConfirmation?: (data: Application) => void
  openEditDialog?: (data: Application) => void
}): ColumnDef<Application>[] => [
  {
    id: 'no',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='#'
        className='w-10 text-center'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='w-10 text-center'>
          {row.index + 1}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'client_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client Id" />
    ),
    cell: ({ row }) =>
      row.getValue('api_key') && (
        <div className='flex items-center gap-2'>
          <div className='w-[200px] overflow-hidden text-ellipsis whitespace-nowrap'>
            {row.getValue('client_id')}
          </div>
          <ClipboardCopyButton value={row.getValue('client_id')} />
        </div>
      ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'application_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application" />
    ),
    cell: ({ row }) => <div>{row.getValue('application_name')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'ip',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="IP" />
    ),
    cell: ({ row }) => (
      <div className='w-[150px] overflow-hidden text-ellipsis'>
        {row.getValue('ip')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'domain',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Domain" />
    ),
    cell: ({ row }) => (
      <div className='w-[150px] overflow-hidden text-ellipsis'>
        {row.getValue('domain')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'callback_url',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Callback URL" />
    ),
    cell: ({ row }) => <div className=''>{row.getValue('callback_url')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'api_key',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="API key"/>
    ),
    cell: ({ row }) =>
      row.getValue('api_key') && (
        <div className='flex w-[250px] items-center gap-2'>
          <div className='overflow-hidden text-ellipsis'>
            {row.getValue('api_key')}
          </div>
          <ClipboardCopyButton value={row.getValue('api_key')} />
        </div>
      ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className='min-w-[150px] whitespace-normal'>{row.getValue('description')}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <div className='w-[40px]'>
        {row.getValue('is_active') ? (
          <StatusBadge variant='success'>Active</StatusBadge>
        ) : (
          <StatusBadge variant='secondary'>Inactive</StatusBadge>
        )}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        onClickDelete={() => openDeleteConfirmation?.(row.original)}
        onClickEdit={() => openEditDialog?.(row.original)}
      />
    ),
  },
]
