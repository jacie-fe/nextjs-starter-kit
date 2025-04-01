'use client'
import { CodeResponse } from '@/lib/constants'

interface RegisterUserProps {
  username: string
  password: string
  email: string
}

export interface SigninUserParams {
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

export async function signin(params: SigninUserParams) {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    })
    const { data, code, message } = await response.json()

    if (code !== CodeResponse.SUCCESS) {
      if (code === CodeResponse.INTERNAL_SERVER_ERROR) {
        throw new Error('Username or password is incorrect')
      }
      throw new Error(message || 'Login failed')
    }

    return data
  } catch (error) {
    throw error
  }
}
