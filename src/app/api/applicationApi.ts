import { ApiResponse } from '@/types/api'
import serverApi from './serverApi'
import { Application } from '@/types/application'

const applicationApi = () => {
  const baseUrl = process.env.VITE_API_URL || 'http://localhost:30000'
  const baseApi = serverApi(baseUrl)

  const getApplications = () =>
    baseApi.get<ApiResponse<{ applications: Application[] }>>('/applications')

  return {
    getApplications,
  }
}

export default applicationApi()
