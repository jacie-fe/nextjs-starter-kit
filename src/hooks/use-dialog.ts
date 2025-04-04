"use client"

import { Ref, useImperativeHandle, useState } from 'react'

import { DialogProps } from '@radix-ui/react-dialog'

export interface UseDialogRef {
  openDialog: () => void
  closeDialog: () => void
}

export function useDialog(
  ref: Ref<UseDialogRef>,
  { onOpenChange }: { onOpenChange: DialogProps['onOpenChange'] }
) {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    onOpenChange?.(open)
    setOpen(open)
  }

  useImperativeHandle(ref, () => ({
    openDialog: () => handleOpenChange(true),
    closeDialog: () => handleOpenChange(false),
  }))

  return {
    open,
    setOpen: handleOpenChange,
  }
}
