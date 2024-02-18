import { useEffect } from 'react'
import { ImageFeed } from 'components/ImageFeed/ImageFeed.tsx'
import { ImagePreview } from 'components/ImagePreview/ImagePreview.tsx'
import { SelectedImageModal } from 'components/SelectedImageModal/SelectedImageModal.tsx'
import { galleryStore } from 'store'
import type { FC } from 'react'
import './Gallery.scss'

export const Gallery: FC = () => {
  useEffect(() => {
    galleryStore.fetchPhotos()
  }, [])

  return (
    <>
      <div className={'gallery'}>
        <ImagePreview />
        <ImageFeed count={7} />
      </div>
      <SelectedImageModal />
    </>
  )
}
