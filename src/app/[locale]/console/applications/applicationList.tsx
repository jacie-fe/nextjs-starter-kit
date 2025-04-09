'use client'

import { useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import ApplicationFormDialog, {
  ApplicationFormDialogRef,
} from './components/application-form-dialog'
import { getColumns } from './components/columns'
import { DataTable } from './components/data-table'
import ConfirmationDialog from '@/components/custom/confirmation-dialog'
import { Layout } from '@/components/custom/layout'
import {
  applicationKeys,
  useDeleteApplication,
  useQueryApplications,
} from '@/hooks/use-application'
import { UseDialogRef } from '@/hooks/use-dialog'
import { Application } from '@/types/application'
import { toast } from 'sonner'

const ApplicationList = () => {
  const { data: applications = [], isFetching } = useQueryApplications()

  const appVersionFormDialogRef = useRef<ApplicationFormDialogRef | null>(null)
  const confirmationDialogRef = useRef<UseDialogRef | null>(null)

  const [currentApplication, setCurrentApplication] =
    useState<Application | null>(null)
  const queryClient = useQueryClient()

  const { mutate: deleteApplication, isPending: isDeletingApp } =
    useDeleteApplication({
      onSuccess(_, id) {
        queryClient.setQueryData<Application[]>(
          applicationKeys.lists(),
          (oldData = []) => {
            return oldData.filter((item) => item.client_id !== id)
          }
        )
        toast.success('Application deleted successfully')

        setCurrentApplication(null)
        confirmationDialogRef.current?.closeDialog()
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError(err: any) {
        toast.error(err.message || 'Failed to delete application')
      },
    })
  const handleOpenAddDialog = () => {
    setCurrentApplication(null)
    appVersionFormDialogRef.current?.openDialog()
  }

  const handleEditAppClick = (app: Application) => {
    setCurrentApplication(app)
    appVersionFormDialogRef.current?.openDialog()
  }

  const handleDeleteAppClick = (app: Application) => {
    setCurrentApplication(app)
    confirmationDialogRef.current?.openDialog()
  }

  const handleConfirmDialog = () => {
    if (currentApplication) deleteApplication(currentApplication.client_id)
  }

  const handleOpenChangeDialog = (open: boolean) => {
    if (!open) setCurrentApplication(null)
  }

  return (
    <Layout className='m-auto'>
      <Layout.Header sticky>
        <h2 className='text-xl font-bold tracking-tight'>Your Applications</h2>
      </Layout.Header>

      <Layout.Body>
        <div className='overflow-auto'>
          <DataTable
            data={applications}
            columns={getColumns({
              openEditDialog: handleEditAppClick,
              openDeleteConfirmation: handleDeleteAppClick,
            })}
            loading={isFetching}
            openAddDialog={handleOpenAddDialog}
          />
        </div>
        <ApplicationFormDialog
          ref={appVersionFormDialogRef}
          application={currentApplication}
        />
        <ConfirmationDialog
          ref={confirmationDialogRef}
          title='Delete Application'
          description={`Are you sure you want to delete application ’${currentApplication?.application_name}’`}
          isConfirming={isDeletingApp}
          onConfirm={handleConfirmDialog}
          onOpenChange={handleOpenChangeDialog}
        />
      </Layout.Body>
    </Layout>
  )
}

export default ApplicationList
