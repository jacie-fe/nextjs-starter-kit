import { UserProfile } from '@/types/global'
import { api } from './fetch-client'
import { ApiResponse } from '@/types/api'

interface RegisterUserProps {
  username: string
  password: string
  email: string
}

export interface LoginUserParams {
  email: string
  password: string
}

const baseUrl = `${process.env.VITE_API_URL}`

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL('/api/auth/local/register', baseUrl)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData }),
      cache: 'no-cache',
    })

    return response.json()
  } catch (error) {
    console.error('Registration Service Error:', error)
  }
}

export async function loginUserService(userData: LoginUserParams) {
  const url = new URL('/console-api/api/v1/signin', baseUrl)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData }),
      cache: 'no-cache',
    })

    return response.json()
  } catch (error) {
    console.error('Login Service Error:', error)
    throw error
  }
}

export async function signin(params) {
  const res = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(params),
    cache: 'no-cache',
    headers: { 'Content-Type': 'application/json' },
  })
  const resData = await res.json()

  console.log(resData);
  return resData

}

export async function getUserInfoService() {
  const url = new URL('/console-api/api/v1/user-info', baseUrl)
  return api.get<ApiResponse<UserProfile>>(url.toString())
}
