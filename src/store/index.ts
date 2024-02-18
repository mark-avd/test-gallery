import { makeAutoObservable } from 'mobx'
import { getPhotos } from 'api/slingacademyApi/getPhotos.ts'
import type { PhotoDto } from 'api/slingacademyApi/model.ts'
import type { Direction } from 'types'

class Store {
  images: PhotoDto[] = []
  currentImage: PhotoDto | undefined
  currentImageIndex = 0
  imageOffset = 0
  totalImages = 0

  showModal = false

  limit = 10

  constructor() {
    makeAutoObservable(this)
  }

  get isLowestOffset() {
    return this.imageOffset === 0
  }

  get isHighestOffset() {
    return this.limit + this.imageOffset >= this.totalImages
  }

  get isFirstImage() {
    return this.currentImageIndex === 0
  }

  get isLastImage() {
    return this.currentImageIndex === this.totalImages - 1
  }

  get isFirstVisibleImage() {
    return this.imageOffset === this.currentImageIndex
  }

  get isLastVisibleImage() {
    return this.imageOffset + this.limit === this.currentImageIndex + 1
  }

  get requestOffset() {
    return this.imageOffset + this.limit
  }

  setImages = (images: PhotoDto[]) => {
    this.images = images
  }

  setTotalImages = (totalImages: number) => {
    this.totalImages = totalImages
  }

  setCurrentImage = (image: PhotoDto) => {
    this.currentImage = image
    this.currentImageIndex = this.images.findIndex((image) => image.id === this.currentImage?.id)
  }

  setImageOffset = async (direction: Direction) => {
    if (direction === 'prev' && !this.isLowestOffset) {
      this.imageOffset = this.imageOffset - 1
    } else if (direction === 'next' && !this.isHighestOffset) {
      this.imageOffset = this.imageOffset + 1
      await this.fetchNextPhoto()
    }
  }

  switchCurrentImage = async (direction: Direction) => {
    const getImageByDirection = (direction: Direction) =>
      this.images[direction === 'prev' ? this.currentImageIndex - 1 : this.currentImageIndex + 1]

    if (direction === 'prev' && !this.isFirstVisibleImage) {
      this.setCurrentImage(getImageByDirection('prev'))
    } else if (direction === 'next' && !this.isLastVisibleImage) {
      this.setCurrentImage(getImageByDirection('next'))
    } else if (this.isLastVisibleImage) {
      await this.setImageOffset('next')
      this.setCurrentImage(getImageByDirection('next'))
    }
  }

  setRequestLimit = (limit: number) => {
    this.limit = limit
  }

  openModal = () => {
    this.showModal = true
  }

  closeModal = () => {
    this.showModal = false
  }

  fetchPhotos = async () => {
    const { data } = await getPhotos({ offset: 0, limit: this.limit })
    if (data.success) {
      this.setImages(data.photos)
      this.setTotalImages(data.total_photos)
      if (!this.currentImage) {
        this.setCurrentImage(data.photos[0])
      }
    }
  }

  fetchNextPhoto = async () => {
    const { data } = await getPhotos({ offset: this.requestOffset, limit: 1 })
    if (data.success) {
      this.setImages([...this.images, ...data.photos])
    }
  }
}

export const store = new Store()
