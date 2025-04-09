/* eslint-disable @typescript-eslint/no-unused-vars */

import { CodeResponse } from '@/lib/constants'
import {
  applicationApi,
  CreateApplicationParams,
  UpdateApplicationParams,
} from './api'

export async function fetchApplications() {
  try {
    const { data: response } = await applicationApi.getApplications()
    if (response.code !== CodeResponse.SUCCESS) {
      throw response
    }

    return response.data?.applications
  } catch (error) {
    return Promise.reject('Failed to fetch applications')
  }
}

export async function addApplication(params: CreateApplicationParams) {
  try {
    const { data: response } = await applicationApi.createApplication(params)
    if (response.code !== CodeResponse.SUCCESS) {
      throw response
    }
    return response?.data
  } catch (error) {
    return Promise.reject('Failed to create application')
  }
}

export async function updateApplication(params: UpdateApplicationParams) {
  try {
    const { data: response } = await applicationApi.updateApplication(params)
    if (response.code !== CodeResponse.SUCCESS) {
      throw response
    }
    return response?.data
  } catch (error) {
    return Promise.reject('Failed to update application')
  }
}

export async function deleteApplication(client_id: string) {
  try {
    const { data: response } = await applicationApi.deleteApplication(client_id)
    if (response.code !== CodeResponse.SUCCESS) {
      throw response
    }
    return response?.data
  } catch (error) {
    return Promise.reject('Failed to delete application')
  }
}
