"use client"

import { useRef, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'use-intl'

import ApplicationFormDialog, {
  ApplicationFormDialogRef,
} from './components/application-form-dialog'
import { getColumns } from './components/columns'
import { DataTable } from './components/data-table'
import ConfirmationDialog from '@/components/custom/confirmation-dialog'
import { Layout } from '@/components/custom/layout'
import {
  applicationKeys,
//   useDeleteApplication,
  useQueryApplications,
} from '@/hooks/use-application'
import { UseDialogRef } from '@/hooks/use-dialog'
import { useErrorHandler } from '@/hooks/use-error-handler'
import { Application } from '@/types/application'
import { useRouter } from '@/i18n/navigation'

const ApplicationList = () => {
  const { data: applications = [], isFetching } = useQueryApplications()

  const appVersionFormDialogRef = useRef<ApplicationFormDialogRef | null>(null)
  const confirmationDialogRef = useRef<UseDialogRef | null>(null)

  const [currentApplication, setCurrentApplication] =
    useState<Application | null>(null)
  const queryClient = useQueryClient()

  const { showErrorToast } = useErrorHandler()
//   const { mutate: deleteApplication, isPending: isDeletingApp } =
//     useDeleteApplication({
//       onSuccess(_, id) {
//         queryClient.setQueryData<Application[]>(
//           applicationKeys.lists(),
//           (oldData = []) => {
//             return oldData.filter((item) => item.client_id !== id)
//           }
//         )
//         // toast({
//         //   title: t('delete_application_success'),
//         //   variant: 'success',
//         // })

//         setCurrentApplication(null)
//         confirmationDialogRef.current?.closeDialog()
//       },
//       onError(err) {
//         showErrorToast({ err })
//       },
//     })
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

//   const handleConfirmDialog = () => {
//     if (currentApplication) deleteApplication(currentApplication.client_id)
//   }

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
        {/* <ConfirmationDialog
          ref={confirmationDialogRef}
          title={t('delete_application_title')}
          description={t('delete_application_desc', {
            app: currentApplication?.application_name || '',
          })}
          isConfirming={isDeletingApp}
          onConfirm={handleConfirmDialog}
          onOpenChange={handleOpenChangeDialog}
        /> */}
      </Layout.Body>
    </Layout>
  )
}

export default ApplicationList
