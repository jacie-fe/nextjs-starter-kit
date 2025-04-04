'use client'
import { forwardRef } from 'react'

import { DialogProps } from '@radix-ui/react-dialog'
import ApplicationForm from './application-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useDialog } from '@/hooks/use-dialog'
import { Application } from '@/types/application'

interface ApplicationFormDialogProps extends DialogProps {
  application: Application | null
}

export interface ApplicationFormDialogRef {
  openDialog: () => void
  closeDialog: () => void
}

const ApplicationFormDialog = forwardRef<
  ApplicationFormDialogRef,
  ApplicationFormDialogProps
>(
  (
    { application, onOpenChange, ...props }: ApplicationFormDialogProps,
    ref
  ) => {
    const { open, setOpen } = useDialog(ref, { onOpenChange })

    const handleSubmitSuccess = () => {
      setOpen(false)
    }

    return (
      <Dialog {...props} open={open} onOpenChange={setOpen}>
        <DialogContent className='max-h-screen overflow-auto sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>
              {application?.client_id ? 'Edit Application' : 'Add Application'}
            </DialogTitle>
          </DialogHeader>

          <div className='mt-4'>
            <ApplicationForm
              application={application}
              onCloseClick={() => setOpen(false)}
              onSuccess={handleSubmitSuccess}
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  }
)

ApplicationFormDialog.displayName = 'ApplicationFormDialog'
export default ApplicationFormDialog
