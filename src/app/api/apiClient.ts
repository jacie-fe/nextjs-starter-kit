import axios from 'axios'
import {
  getTokenAction,
  refreshTokenAction,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from '@/app/actions/auth'

let refreshPromise: Promise<string> | null = null

export default function createApiClient(baseURL: string) {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // -- Intercept Request: Add Token --
  instance.interceptors.request.use(
    async (config) => {
      const { access_token: accessToken } = await getTokenAction()
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // -- Intercept Response: Handle 401 and Retry --
  instance.interceptors.response.use(
    (response) => {
      if (response.status === 200) {
        return response
      }
      return Promise.reject(response)
    },
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const token = await getValidAccessToken()
          originalRequest.headers['Authorization'] = `Bearer ${token}`
          return instance(originalRequest)
        } catch (err) {
          // Clear tokens if refresh fails
          await removeAccessToken()
          await removeRefreshToken()
          refreshPromise = null
          return Promise.reject(err)
        }
      }

      return Promise.reject(error)
    }
  )

  // -- Token Refresh with Lock --
  async function getValidAccessToken(): Promise<string> {
    if (!refreshPromise) {
      refreshPromise = refreshTokenAction()
        .then(({ access_token }) => {
          return setAccessToken(access_token).then(() => access_token)
        })
        .catch((err) => {
          throw err
        })
        .finally(() => {
          refreshPromise = null
        })
    }
    return refreshPromise
  }

  return instance
}
