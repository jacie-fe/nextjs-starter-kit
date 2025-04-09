import { ApiResponse } from '@/types/api'
import { Application } from '@/types/application'
import createApiClient from './apiClient'

export type CreateApplicationParams = {
  application_name: string
  description: string
  callback_url: string
  ip: string
  is_active: boolean
  domain: string
}

export type UpdateApplicationParams = Partial<CreateApplicationParams> & {
  client_id: string
  api_key: string
}

export const createApplicationApi = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:30000'
  const baseApi = createApiClient(baseUrl)

  const getApplications = () =>
    baseApi.get<ApiResponse<{ applications: Application[] }>>('/applications')

  const createApplication = (params: CreateApplicationParams) => {
    return baseApi.post<ApiResponse<{ client_id: string }>>(
      '/applications',
      params
    )
  }

  const updateApplication = (params: UpdateApplicationParams) => {
    return baseApi.patch<ApiResponse<Application>>(
      `/applications/${params.client_id}`,
      params
    )
  }

  const deleteApplication = (client_id: string) => {
    return baseApi.delete<ApiResponse<null>>(`/applications/${client_id}`)
  }
  return {
    getApplications,
    createApplication,
    updateApplication,
    deleteApplication,
  }
}