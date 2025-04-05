"use client"

import { forwardRef, ReactNode } from 'react'

import { DialogProps } from '@radix-ui/react-dialog'
import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDialog, UseDialogRef } from '@/hooks/use-dialog'

interface ConfirmationDialogProps extends DialogProps {
  title: ReactNode
  description?: ReactNode
  isConfirming?: boolean
  onConfirm?: () => void
  onCancel?: () => void
}

const ConfirmationDialog = forwardRef<UseDialogRef, ConfirmationDialogProps>(
  (
    {
      title,
      description,
      isConfirming = false,
      onConfirm,
      onCancel,
      onOpenChange,
      ...props
    }: ConfirmationDialogProps,
    ref
  ) => {
    const { open, setOpen } = useDialog(ref, { onOpenChange })
    const handleCancelClick = () => {
      setOpen(false)
      onCancel?.()
    }

    return (
      <Dialog {...props} open={open} onOpenChange={setOpen}>
        <DialogContent className='max-h-screen overflow-auto sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          {description && (
            <p className='text-muted-foreground'>{description}</p>
          )}

          <DialogFooter className='flex-row-reverse'>
            <DialogClose asChild>
              <Button className='w-1/2 sm:w-auto' variant='outline' onClick={() => handleCancelClick()}>
                Cancel
              </Button>
            </DialogClose>
            <Button className='w-1/2 sm:w-auto' loading={isConfirming} onClick={() => onConfirm?.()}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
)

ConfirmationDialog.displayName = 'ConfirmationDialog'
export default ConfirmationDialog
