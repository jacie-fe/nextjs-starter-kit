import { Button } from '@/components/custom/button'
import { EditIcon, TrashIcon } from 'lucide-react'

type DataTableRowActionsProps = {
  onClickEdit: () => void
  onClickDelete: () => void
}
export function DataTableRowActions({
  onClickEdit,
  onClickDelete,
}: DataTableRowActionsProps) {
  return (
    <div className='flex flex-nowrap justify-end gap-2'>
      <Button
        variant='ghost'
        className='flex h-8 w-8 p-0'
        onClick={onClickEdit}
      >
        <EditIcon className='h-5 w-5' />
      </Button>
      <Button
        variant='ghost'
        className='flex h-8 w-8 p-0 text-red-600'
        onClick={onClickDelete}
      >
        <TrashIcon className='h-5 w-5' />
      </Button>
    </div>
  )
}
