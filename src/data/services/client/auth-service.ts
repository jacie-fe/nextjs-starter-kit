'use client'
import { CodeResponse } from '@/lib/constants'

interface RegisterUserParams {
  email: string
  password: string
  organization_name: string
}

export interface SigninUserParams {
  email: string
  password: string
}

async function signin(params: SigninUserParams) {
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

async function checkEmailExists(params: { email: string }) {
  try {
    const response = await fetch('/api/check-email-exists', {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
    })

    const { data, code, message } = await response.json()
    if (code !== CodeResponse.SUCCESS) {
      throw new Error(message || 'Email check failed')
    }
    return data
  } catch (error) {
    return Promise.reject(error)
  }
}

async function signup(params: RegisterUserParams) {
  try {
    const response = await fetch('/api/signup', {
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

export { signin, checkEmailExists, signup }
