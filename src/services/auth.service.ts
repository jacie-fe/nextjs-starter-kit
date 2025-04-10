import { authApi } from "@/app/api"
import { CodeResponse } from "@/lib/constants"

export async function getUserInfoService() {
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
    return Promise.reject(error)
  }
}
