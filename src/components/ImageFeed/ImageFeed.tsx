import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { galleryStore } from 'store'
import type { FC } from 'react'
import './ImageFeed.scss'

interface ImageFeedProps {
  count: number
}

export const ImageFeed: FC<ImageFeedProps> = observer(({ count }) => {
  const { images, setSelectedImageUrl, setLimit } = galleryStore

  useEffect(() => {
    setLimit(count)
  }, [count, setLimit])

  return (
    <div className={'image-feed'}>
      {images.map((photo) => (
        <img
          key={photo.id}
          className={'image-feed__image-preview'}
          src={photo.url}
          onClick={() => setSelectedImageUrl(photo.url)}
          alt="image preview"
        />
      ))}
    </div>
  )
})
