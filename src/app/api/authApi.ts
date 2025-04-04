import { ApiResponse } from '@/types/api'
import serverApi from './serverApi'
import { UserProfile } from '@/types/global'

interface SigninUserParams {
  email: string
  password: string
}

const authApi = () => {
  const baseUrl = process.env.VITE_API_URL || 'http://localhost:30000'
  const baseApi = serverApi(baseUrl)

  const login = (params: SigninUserParams) =>
    baseApi.post<
      ApiResponse<{
        token: {
          access_token: string
          refresh_token: string
        } & UserProfile
      }>
    >('/signin', params)

  const checkEmailExists = (params: { email: string }) =>
    baseApi.post<ApiResponse<{ exists: boolean }>>(
      '/check-email-exists',
      params
    )

  const register = (params: {
    email: string
    password: string
    organization_name: string
  }) => baseApi.post<ApiResponse<{ message: string }>>('/register', params)

  const verifySigupOtp = (params: { email: string; otp: string }) =>
    baseApi.post<
      ApiResponse<{
        email: string
        organization_name: string
      }>
    >('/register/otp/verify', params)

  const resendOtp = (params: { email: string }) =>
    baseApi.post<ApiResponse<{ message: string }>>('/resend-otp', params)

  const forgotPassword = (params: { email: string }) => {
    return baseApi.post<ApiResponse<unknown>>('/forgot-password', params)
  }

  const resetPassword = (params: {
    email: string
    password: string
    password_confirmation: string
    otp: string
  }) =>
    baseApi.post<ApiResponse<{ message: string }>>(
      '/forgot-password/otp/verify',
      params
    )

  const getUserInfo = () => baseApi.get<ApiResponse<UserProfile>>('/user-info')

  return {
    login,
    checkEmailExists,
    register,
    verifySigupOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    getUserInfo,
  }
}

export default authApi()
