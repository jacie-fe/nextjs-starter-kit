'use client'
import { CodeResponse } from '@/lib/constants'
import { ApiResponse } from '@/types/api'

interface RegisterUserParams {
  email: string
  password: string
  organization_name: string
}

interface SigninUserParams {
  email: string
  password: string
}

interface ForgotPassRequestParams {
  email: string
  password: string
  password_confirmation: string
  otp: string
}

async function signin(params: SigninUserParams) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    })

    const responseData = await response.json()
    const { code, message } = responseData

    if (code !== CodeResponse.SUCCESS) {
      if (code === CodeResponse.INTERNAL_SERVER_ERROR) {
        throw new Error('Username or password is incorrect')
      }
      throw new Error(message || 'Login failed')
    }

    return responseData
  } catch (error) {
    return Promise.reject(error)
  }
}

async function checkEmailExists(params: {
  email: string
}): Promise<ApiResponse<{ exists: boolean }>> {
  try {
    const response = await fetch('/api/check-email-exists', {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    })

    const responseData = await response.json()

    if (responseData.code !== CodeResponse.SUCCESS) {
      throw responseData
    }

    return responseData as ApiResponse<{ exists: boolean }>
  } catch (error) {
    return Promise.reject(error)
  }
}

async function signup(params: RegisterUserParams) {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    })
    const responseData = await response.json()
    const { data, code, message } = responseData

    if (code !== CodeResponse.SUCCESS) {
      if (code === CodeResponse.INTERNAL_SERVER_ERROR) {
        throw new Error('Username or password is incorrect')
      }
      throw new Error(message)
    }

    return responseData
  } catch (error) {
    return Promise.reject(error)
  }
}

async function verifySigupOtp(params: { email: string; otp: string }): Promise<
  ApiResponse<{
    email: string
    organization_name: string
  }>
> {
  try {
    const response = await fetch('/api/register/otp/verify', {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    })
    const responseData = await response.json()

    if (responseData.code !== CodeResponse.SUCCESS) {
      throw responseData
    }

    return responseData as ApiResponse<{
      email: string
      organization_name: string
    }>
  } catch (error) {
    return Promise.reject(error)
  }
}

async function resendOtp(params: { email: string }) {
  try {
    const response = await fetch('/api/resend-otp', {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    })
    const responseData = await response.json()

    if (responseData.code !== CodeResponse.SUCCESS) {
      throw responseData
    }

    return responseData
  } catch (error) {
    return Promise.reject(error)
  }
}

async function forgotPassword(params: { email: string }) {
  try {
    const response = await fetch('/api/forgot-password', {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    })
    const responseData = await response.json()

    if (responseData.code !== CodeResponse.SUCCESS) {
      throw responseData
    }

    return responseData
  } catch (error) {
    return Promise.reject(error)
  }
}

async function verifyForgotPasswordOtp(params: { email: string }) {
  try {
    const response = await fetch('/api/forgot-password/otp/verify', {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    })
    const responseData = await response.json()

    if (responseData.code !== CodeResponse.SUCCESS) {
      throw responseData
    }

    return responseData
  } catch (error) {
    return Promise.reject(error)
  }
}

export {
  signin,
  checkEmailExists,
  signup,
  verifySigupOtp,
  resendOtp,
  forgotPassword,
  verifyForgotPasswordOtp,
}
export type { ForgotPassRequestParams }
export type { RegisterUserParams, SigninUserParams }
