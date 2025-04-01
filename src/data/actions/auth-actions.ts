'use server'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import {
  registerUserService,
  loginUserService,
  getUserInfoService,
  LoginUserParams,
} from '@/data/services/auth-service'
import {
  ACCESS_TOKEN_KEY,
  clearTokens,
  getToken,
  REFRESH_TOKEN_KEY,
  setToken,
} from '@/data/services/token-service'
import {
  clearCachedUserInfo,
  getCachedUserInfo,
  setCachedUserInfo,
} from '@/data/services/user-info-service'
import { CodeResponse } from '@/lib/constants'

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  domain: process.env.HOST ?? 'localhost',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
}

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: 'Username must be between 3 and 20 characters',
  }),
  password: z.string().min(6).max(100, {
    message: 'Password must be between 6 and 100 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    email: formData.get('email'),
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: 'Missing Fields. Failed to Register.',
    }
  }

  const responseData = await registerUserService(validatedFields.data)

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: 'Ops! Something went wrong. Please try again.',
    }
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: 'Failed to Register.',
    }
  }

  const cookieStore = await cookies()
  cookieStore.set(
    'access_token',
    responseData.data?.token?.access_token,
    config
  )

  redirect('/')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginUserAction(prevState: any, params: LoginUserParams) {
  try {
    const responseData = await loginUserService(params)

    console.log('Login response:', responseData)
    if(responseData.code !== CodeResponse.SUCCESS) {
      console.log('Login failed:', responseData?.message);
      
      throw new Error(responseData?.message || 'Login failed')
    }

    const token = responseData.data?.token?.access_token
    const refreshToken = responseData.data?.token?.refresh_token

    await setToken(ACCESS_TOKEN_KEY, token)
    await setToken(REFRESH_TOKEN_KEY, refreshToken)

    // console.log('Access token222:', token)

    // redirect('/')

    return {
      ...prevState,
      strapiErrors: null,
      message: null,
      submitSuccess: true,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      ...prevState,
      strapiErrors: error?.response?.data?.message || error?.message,
      message: 'Failed to Login.',
    }
  }
}

export async function getUserProfile() {
  try {
    const accessToken = await getToken(ACCESS_TOKEN_KEY)
    if (!accessToken) {
      return null
    }

    const cachedUserInfo = getCachedUserInfo(accessToken)
    if (cachedUserInfo) {
      return cachedUserInfo
    }
    // If not cached, fetch user info from the service
    const responseData = await getUserInfoService()

    if (!responseData?.data) {
      return null
    }

    const userInfo = responseData.data
    // Cache the user info
    setCachedUserInfo(accessToken, userInfo)
    return responseData.data
  } catch (error) {
    console.error('Failed to fetch user info:', error)
    return null
  }
}

export async function logoutAction() {
  // Clear tokens from the cache
  const accessToken = await getToken(ACCESS_TOKEN_KEY)
  if (accessToken) {
    clearCachedUserInfo(accessToken)
  }
  // Clear tokens from cookies
  await clearTokens()

  // Redirect to the login page
  redirect('/signin')
}
