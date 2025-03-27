import { CodeResponse } from '@/lib/constants'
import {
  ACCESS_TOKEN_KEY,
  getToken,
  REFRESH_TOKEN_KEY,
  removeToken,
  setToken,
} from './token-service'

async function fetchClient<T>(
  url: string,
  options: RequestInit = {},
  shouldRefresh = true
): Promise<T> {
  await refreshAccessToken()
  const accessToken = await getToken(ACCESS_TOKEN_KEY)

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  }

  const response = await fetch(url, { ...options, headers })

  if (!response.ok) {
    if (response.status === 401 && shouldRefresh) {
      await refreshAccessToken() // Refresh token and retry once
      return fetchClient<T>(url, options, false)
    }

    const errorData = await response.json()

    throw new Error(errorData.message || 'Something went wrong')
  }

  const responseData = await response.json()

  if (responseData.code !== CodeResponse.SUCCESS) {
    throw new Error(responseData.message || 'Something went wrong')
  }

  return responseData
}

// Refresh Access Token and store it in cookies
async function refreshAccessToken() {
  try {
    const refreshToken = await getToken(REFRESH_TOKEN_KEY)

    if (!refreshToken) throw new Error('No refresh token available')

    const res = await fetch(
      `${process.env.VITE_API_URL}/console-api/api/v1/refresh-token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      }
    )

    if (!res.ok) throw new Error('Failed to refresh token')

    const data = await res.json()

    if (data.code !== CodeResponse.SUCCESS) throw new Error(data.message)

    await setToken(ACCESS_TOKEN_KEY, data.data.access_token)
    await setToken(REFRESH_TOKEN_KEY, data.data.refresh_token)
    return data

  } catch (error) {
    await removeToken(ACCESS_TOKEN_KEY)
    await removeToken(REFRESH_TOKEN_KEY)
    return Promise.reject(error)
  }
}

// Exported API functions
export const api = {
  get: <T>(url: string, options?: RequestInit) =>
    fetchClient<T>(url, { ...options, method: 'GET' }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: <T>(url: string, body: any, options?: RequestInit) =>
    fetchClient<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: <T>(url: string, body: any, options?: RequestInit) =>
    fetchClient<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  delete: <T>(url: string, options?: RequestInit) =>
    fetchClient<T>(url, { ...options, method: 'DELETE' }),
}
