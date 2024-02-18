import { makeAutoObservable } from 'mobx'
import { getPhotos } from 'api/slingacademyApi/getPhotos.ts'
import type { PhotoDto } from 'api/slingacademyApi/model.ts'

class Index {
  images: PhotoDto[] = []
  selectedImageUrl: string | undefined

  showModal = false

  // request params
  offset = 0
  limit = 10

  constructor() {
    makeAutoObservable(this)
  }

  setImages = (images: PhotoDto[]) => {
    this.images = images
  }

  setSelectedImageUrl = (imageUrl: string) => {
    this.selectedImageUrl = imageUrl
  }

  setOffset = (offset: number) => {
    this.offset = offset
  }

  setLimit = (limit: number) => {
    this.limit = limit
  }

  openModal = () => {
    this.showModal = true
  }

  closeModal = () => {
    this.showModal = false
  }

  fetchPhotos = async () => {
    const { data } = await getPhotos({ offset: this.offset, limit: this.limit })
    if (data.success) {
      this.setImages(data.photos)
      if (!this.selectedImageUrl) {
        this.setSelectedImageUrl(data.photos[0].url)
      }
    }
  }
}

export const galleryStore = new Index()
