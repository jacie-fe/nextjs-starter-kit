'use server'

import { cookies } from 'next/headers'

import { CodeResponse } from '@/lib/constants'
import { ACCESS_TOKEN_KEY, clearTokens, REFRESH_TOKEN_KEY, setToken } from '@/lib/cookies'
import { ApiResponse } from '@/types/api'
import authApi from '@/app/api/authApi'

export const getTokenAction = async () => {
  const cookieStore = await cookies()

  return {
    access_token: cookieStore.get(ACCESS_TOKEN_KEY)?.value || '',
    refresh_token: cookieStore.get(REFRESH_TOKEN_KEY)?.value || '',
  }
}

export const signInAction = async (data: {
  email: string
  password: string
}) => {
  try {
    const response = await authApi.login(data)
    if (response.code === CodeResponse.SUCCESS) {
      await setToken(ACCESS_TOKEN_KEY, response.data.token.access_token)
      await setToken(REFRESH_TOKEN_KEY, response.data.token.refresh_token)
      return response
    }
    if (response.code === 'USER_INACTIVE') {
      throw new Error('User is inactive')
    }
    throw new Error('Username or password is incorrect')
  } catch (error) {
    return Promise.reject(error)
  }
}

export const logoutAction = async () => {
  await clearTokens()
}

export const refreshTokenAction = async () => {
  try {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const cookieStore = await cookies()
    const refresh_token = cookieStore.get('refresh_token')?.value || ''

    if (!refresh_token) {
      throw new Error('Refresh token not found')
    }

    const uri = `${process.env.VITE_API_URL}/refresh-token`
    const response = await fetch(uri, {
      method: 'POST',
      body: JSON.stringify({ refresh_token }),
      headers,
    })

    if (response.ok) {
      const { data } = (await response.json()) as {
        data: { access_token: string; refresh_token: string }
      }
      await setToken(ACCESS_TOKEN_KEY, data.access_token)
      await setToken(REFRESH_TOKEN_KEY, data.refresh_token)

      return data
    }

    throw response
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function checkEmailExists(params: {
  email: string
}): Promise<ApiResponse<{ exists: boolean }>> {
  try {
    const responseData = await authApi.checkEmailExists(params)
    if (responseData.code !== CodeResponse.SUCCESS) {
      throw responseData
    }

    return responseData as ApiResponse<{ exists: boolean }>
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function register(params: {
  email: string
  password: string
  organization_name: string
}) {
  try {
    const response = await authApi.register(params)
    if (response.code !== CodeResponse.SUCCESS) {
      if (response.code === CodeResponse.INTERNAL_SERVER_ERROR) {
        throw new Error('Username or password is incorrect')
      }
      throw response
    }

    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function verifySigupOtp(params: {
  email: string
  otp: string
}): Promise<
  ApiResponse<{
    email: string
    organization_name: string
  }>
> {
  try {
    const response = await authApi.verifySigupOtp(params)
    if (response.code !== CodeResponse.SUCCESS) {
      throw response
    }
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function resendOtp(params: { email: string }) {
  try {
    const response = await authApi.resendOtp(params)
    if (response.code !== CodeResponse.SUCCESS) {
      throw response
    }
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function forgotPassword(params: { email: string }) {
  try {
    const responseData = await authApi.forgotPassword(params)
    if (responseData.code !== CodeResponse.SUCCESS) {
      throw new Error('Email not found')
    }

    return responseData
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function resetPassword(params: {
  email: string
  password: string
  password_confirmation: string
  otp: string
}) {
  try {
    const responseData = await authApi.resetPassword(params)
    if (responseData.code !== CodeResponse.SUCCESS) {
      throw responseData
    }

    return responseData
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getUserInfoAction() {
  try {
    const response = await authApi.getUserInfo()
    if (response.code !== CodeResponse.SUCCESS) {
      throw response
    }
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}
