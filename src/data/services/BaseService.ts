import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { routePaths } from '@/constants/routePaths'
import { CookieKeys, getCookie, setToken } from '@/lib/cookie'
import { resetStore } from '@/store'
import { ApiResponse, CodeResponse } from '@/types/api'

type RequestConfig = InternalAxiosRequestConfig & { _retry?: boolean }

type AxiosErrorResponse = AxiosError<{ code?: string }> & {
  config: RequestConfig
}

export const defaultConfig: CreateAxiosDefaults = {
  headers: {
    'Content-Type': 'application/json',
  },
}

const refreshToken = (params: { refresh_token: string }) => {
  return axios.post<
    ApiResponse<{ access_token: string; refresh_token: string }>
  >('/refresh-token', params, {
    ...(defaultConfig as AxiosRequestConfig),
    baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  })
}

let isRefreshing = false
let failedQueue: {
  reject: PromiseConstructor['reject']
  resolve: PromiseConstructor['resolve']
}[] = []

const processQueue = (error: unknown, token: null | string = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

class BaseService {
  protected axiosInstance: AxiosInstance
  static defaultConfig: CreateAxiosDefaults = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  constructor(config?: CreateAxiosDefaults) {
    this.axiosInstance = axios.create({ ...defaultConfig, ...config })
    this.axiosInstance.interceptors.request.use(
      this.handleRequestFulfilled.bind(this)
    )
    this.axiosInstance.interceptors.response.use(
      this.handleResponseFulfilled.bind(this),
      this.handleResponseRejected.bind(this)
    )
  }

  private handleRequestFulfilled(config: InternalAxiosRequestConfig) {
    const accessToken = getCookie(CookieKeys.AccessToken)

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

    return config
  }

  private handleResponseFulfilled(response: AxiosResponse) {
    return response
  }

  private async handleRefreshToken(originalRequest: RequestConfig) {
    const refresh_token = getCookie(CookieKeys.RefreshToken) || ''

    try {
      const { data } = await refreshToken({ refresh_token })
      const newAccessToken = data?.data?.access_token || ''
      const newRefreshToken = data?.data?.refresh_token || ''

      setToken(CookieKeys.AccessToken, newAccessToken)
      setToken(CookieKeys.RefreshToken, newRefreshToken)

      axios.defaults.headers.common['Authorization'] =
        `Bearer ${newAccessToken}`
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

      processQueue(null, newAccessToken)
      return axios(originalRequest)
    } catch (err) {
      processQueue(err, null)
      Cookies.remove(CookieKeys.AccessToken)
      Cookies.remove(CookieKeys.RefreshToken)
      resetStore()

      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }

  private handleSessionExpiredError(error: AxiosErrorResponse) {
    const status = error?.response?.status
    const responseCode = error?.response?.data?.code
    const router = useRouter()
    const routePath = router.pathname

    const ignoredPaths: string[] = [
      routePaths.private.u2fAuth.authenticate,
      routePaths.private.u2fAuth.register,
      routePaths.private.forceChangePassword,
    ]
    if (
      status === HttpStatusCode.Forbidden &&
      responseCode === CodeResponse.SESSION_EXPIRED &&
      !ignoredPaths.includes(routePath)
    ) {
      const { pathname, search } = window.location
      const redirectPath = `${pathname}${search}`
      const authenticateRoute = routePaths.private.u2fAuth.authenticate.replace(':redirect', redirectPath)

      window.location.href = authenticateRoute
    }

    return Promise.reject(error)
  }

  private handleUnauthorizedError(error: AxiosErrorResponse) {
    const originalRequest = error.config

    if (
      error.response?.status === HttpStatusCode.Unauthorized &&
      !originalRequest?._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          // @ts-ignore
          failedQueue.push({ resolve, reject })
        })
          .then((newAccessToken) => {
            originalRequest.headers['Authorization'] =
              `Bearer ${newAccessToken}`
            return axios(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true
      return this.handleRefreshToken(originalRequest)
    }

    return Promise.reject(error)
  }

  private async handleResponseRejected(error: AxiosErrorResponse) {
    const status = error?.response?.status
    const responseCode = error?.response?.data?.code

    if (
      status === HttpStatusCode.Forbidden &&
      responseCode === CodeResponse.SESSION_EXPIRED
    ) {
      return await this.handleSessionExpiredError(error)
    }

    if (error.response?.status === HttpStatusCode.Unauthorized) {
      return await this.handleUnauthorizedError(error)
    }

    return Promise.reject(error)
  }
}

export default BaseService
