import {
  keepPreviousData,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'

import { Application } from '@/types/application'
import { addApplication, deleteApplication, fetchApplications, updateApplication } from '@/app/actions/applications'
import { CreateApplicationParams, UpdateApplicationParams } from '@/app/api/applicationApi'

export const applicationKeys = {
  all: ['application-keys'] as const,
  lists: () => [...applicationKeys.all, 'list'] as const,
  list: <TFilters>(filters: TFilters) =>
    [...applicationKeys.lists(), { filters }] as const,
}

export const useQueryApplications = (): UseQueryResult<
  Application[],
  Error
> => {
  return useQuery({
    queryKey: applicationKeys.lists(),
    staleTime: 5000,
    queryFn: () => fetchApplications(),
    placeholderData: keepPreviousData,
  })
}

export const useAddApplication = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    { client_id: string },
    TError,
    CreateApplicationParams,
    TContext
  >
) => {
  const queryClient = useQueryClient()
  const mutation = useMutation<
    { client_id: string },
    TError,
    CreateApplicationParams,
    TContext
  >({
    mutationFn: (params) => {
      return addApplication(params)
    },
    onSuccess(data) {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: applicationKeys.lists(),
        })
      }
    },
    ...options,
  })

  return mutation
}

export const useUpdateApplication = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Application,
    TError,
    UpdateApplicationParams,
    TContext
  >
) => {
  const queryClient = useQueryClient()
  const mutation = useMutation<
    Application,
    TError,
    UpdateApplicationParams,
    TContext
  >({
    mutationFn: (params) => {
      return updateApplication(params)
    },
    onSuccess(data) {
      if (data) {
        queryClient.setQueryData<Application[]>(
          applicationKeys.lists(),
          (oldData = []) => {
            return oldData.map((item) =>
              item.client_id === data.client_id ? data : item
            )
          }
        )
      }
    },
    ...options,
  })

  return mutation
}

export const useDeleteApplication = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<null, TError, string, TContext>
) => {
  const queryClient = useQueryClient()
  const mutation = useMutation<null, TError, string, TContext>({
    mutationFn: (id) => {
      return deleteApplication(id)
    },
    onSuccess(_, id) {
      queryClient.setQueryData<Application[]>(
        applicationKeys.lists(),
        (oldData = []) => {
          return oldData.filter((item) => item.client_id !== id)
        }
      )
    },
    ...options,
  })
  return mutation
}
