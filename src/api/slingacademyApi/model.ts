export interface PhotoDto {
  id: number
  user: number
  url: string
  title: string
  description: string
}

export interface PhotosResponse {
  success: boolean
  message: string
  offset: number
  limit: number
  total_photos: number
  photos: PhotoDto[]
}

export interface PhotosRequestParams {
  offset?: number
  limit?: number
}
