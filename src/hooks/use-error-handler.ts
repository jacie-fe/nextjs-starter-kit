/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner'

export const useErrorHandler = () => {
  const showErrorToast = ({
    error,
  }: {
    error: any
  }) => {
    toast.error(error?.response?.data?.message || error?.message || 'Something went wrong')
  }

  const handleFormError = ({
    err,
    errMsgBuilder,
    setError,
  }: {
    err: any
    errMsgBuilder: Record<string, { field: string; message: string }>
    setError: any
  }) => {
    const error = errMsgBuilder?.[err?.code]

    if (error) {
      setError?.(error.field, { message: error.message })
    } else {
      showErrorToast({ error: err })
    }
  }

  return {
    showErrorToast,
    handleFormError,
  }
}
