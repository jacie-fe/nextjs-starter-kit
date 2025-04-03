'use server'

import { cookies } from 'next/headers'

import { refreshTokenAction } from '@/app/actions/auth'

function serverApi(baseUrl: string) {
  async function getHeaders() {
    const cookieStore = await cookies()
    const access_token = cookieStore.get('access_token')?.value || ''

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    if (access_token) {
      headers.append('Authorization', `Bearer ${access_token}`)
    }

    return headers
  }

  async function request<TData>(path: string, init?: RequestInit) {
    try {
      const headers = await getHeaders()
      const response = await fetch(`${baseUrl}${path}`, {
        headers,
        ...init,
      })

      if (response.ok) {
        const data = (await response.json()) as TData

        return data
      }

      if (response.status === 401) {
        try {
          const { access_token: newAccessToken } = await refreshTokenAction()
          headers.delete('Authorization')
          headers.append('Authorization', `Bearer ${newAccessToken}`)

          const newRequest = request(path, {
            ...init,
            headers,
          }) as Promise<TData>

          return newRequest
        } catch (error) {
          throw error
        }
      }

      throw response
    } catch (error) {
      return Promise.reject(error)
    }
  }

  function get<TData>(path: string, init?: RequestInit) {
    return request<TData>(path, init)
  }

  function post<TData = unknown, TParams = unknown>(
    path: string,
    params?: TParams,
    init?: RequestInit
  ) {
    return request<TData>(path, {
      ...init,
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  function patch<TData = unknown, TParams = unknown>(
    path: string,
    params?: TParams,
    init?: RequestInit
  ) {
    return request<TData>(path, {
      ...init,
      method: 'PATCH',
      body: JSON.stringify(params),
    })
  }

  return {
    get,
    post,
    patch,
  }
}

export default serverApi
