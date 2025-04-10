/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from '@/lib/errors'
import { toast } from 'sonner'

export const useErrorHandler = () => {
  const handleRootFormError = ({
    error,
    setErrorFn,
    fallbackErrorMessage,
  }: {
    error: unknown
    setErrorFn?: any
    fallbackErrorMessage?: string
  }) => {
    const errorMessage =
      error instanceof ApiError
        ? error.message
        : fallbackErrorMessage || 'Something went wrong'
    if (setErrorFn) {
      setErrorFn?.('root', { message: errorMessage })
    } else {
      toast.error(errorMessage)
    }
  }

  return {
    handleRootFormError,
  }
}
