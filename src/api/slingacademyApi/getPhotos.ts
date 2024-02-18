import { axiosClient } from 'api/axiosClient.ts'
import type { AxiosError } from 'axios'
import type { PhotosRequestParams, PhotosResponse } from './model.ts'

export const getPhotos = async (params?: PhotosRequestParams) => {
  try {
    const queryString = params ? `?${new URLSearchParams(params as never).toString()}` : ''

    return await axiosClient.get<PhotosResponse>(`https://api.slingacademy.com/v1/sample-data/photos${queryString}`)
  } catch (error) {
    throw error as AxiosError
  }
}
