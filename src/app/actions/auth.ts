/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { authApi } from '@/services/api'
import { cookies } from 'next/headers'

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  removeToken,
  setToken,
} from '@/lib/cookies'
import { CodeResponse, ErrorMessages } from '@/lib/constants'
import { ApiResponse } from '@/types/api'
import { ApiError } from '@/lib/errors'

export const getTokenAction = async () => {
  const cookieStore = await cookies()
  return {
    access_token: cookieStore.get(ACCESS_TOKEN_KEY)?.value || '',
    refresh_token: cookieStore.get(REFRESH_TOKEN_KEY)?.value || '',
  }
}

export const setAccessToken = async (token: string) => {
  return setToken(ACCESS_TOKEN_KEY, token)
}

export const removeAccessToken = async () => {
  return removeToken('access_token')
}

export const removeRefreshToken = async () => {
  return removeToken('refresh_token')
}

function processApiError(error: unknown) {
  if (error instanceof ApiError) {
    return Promise.reject(error.message)
  }
  return Promise.reject('An unexpected error occurred')
}

export const signInAction = async (data: {
  email: string
  password: string
}) => {
  try {
    const { data: response } = await authApi.login(data)

    if (response.code === CodeResponse.SUCCESS) {
      await setToken(ACCESS_TOKEN_KEY, response.data.token.access_token)
      await setToken(REFRESH_TOKEN_KEY, response.data.token.refresh_token)
      return response
    }
    if (ErrorMessages[response.code]) {
      throw new ApiError(ErrorMessages[response.code])
    }
    throw response
  } catch (error) {
    if (error instanceof ApiError) {
      return Promise.reject(error.message)
    }
    return Promise.reject('Username or password is incorrect')
  }
}

export const logoutAction = async () => {
  await removeAccessToken()
  await removeRefreshToken()
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

    const uri = `${process.env.NEXT_PUBLIC_API_URL}/refresh-token`

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
    return Promise.reject('Failed to refresh token')
  }
}

export async function checkEmailExists(params: {
  email: string
}): Promise<ApiResponse<{ exists: boolean }>> {
  try {
    const { data: response } = await authApi.checkEmailExists(params)
    if (response.code !== CodeResponse.SUCCESS) {
      throw response
    }

    return response as ApiResponse<{ exists: boolean }>
  } catch (error) {
    return Promise.reject('Failed to check email existence')
  }
}

export async function register(params: {
  email: string
  password: string
  organization_name: string
}) {
  try {
    const { data: response } = await authApi.register(params)
    if (response.code === CodeResponse.SUCCESS) {
      return response
    }
    throw response
  } catch (error) {
    return Promise.reject('Failed to register')
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
    const { data: response } = await authApi.verifySigupOtp(params)
    if (response.code !== CodeResponse.SUCCESS) {
      throw response
    }
    return response
  } catch (error) {
    return Promise.reject('Failed to verify OTP')
  }
}

export async function resendOtp(params: { email: string }) {
  try {
    const { data: response } = await authApi.resendOtp(params)
    if (response.code !== CodeResponse.SUCCESS) {
      throw response
    }
    return response
  } catch (error) {
    return Promise.reject('Failed to resend OTP')
  }
}

export async function forgotPassword(params: { email: string }) {
  try {
    const { data: response } = await authApi.forgotPassword(params)
    if (response.code !== CodeResponse.SUCCESS) {
      throw new ApiError('Email not found')
    }

    return response
  } catch (error) {
    return processApiError(error)
  }
}

export async function resetPassword(params: {
  email: string
  password: string
  password_confirmation: string
  otp: string
}) {
  try {
    const { data: response } = await authApi.resetPassword(params)
    if (response.code !== CodeResponse.SUCCESS) {
      throw response
    }

    return response
  } catch (error) {
    return Promise.reject('Failed to reset password')
  }
}

export async function getUserInfoAction() {
  try {
    const { data: response } = await authApi.getUserInfo()
    if (response.code !== CodeResponse.SUCCESS) {
      throw response
    }
    if (!response.data) {
      throw response
    }
    return response.data
  } catch (error) {
    return Promise.reject('Failed to fetch user info')
  }
}
