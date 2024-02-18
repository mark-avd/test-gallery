import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { store } from 'store'
import { ReactComponent as LeftArrow } from 'assets/left-arrow-svgrepo-com.svg'
import { ReactComponent as RightArrow } from 'assets/right-arrow-svgrepo-com.svg'
import type { FC, CSSProperties } from 'react'
import './ImageFeed.scss'

interface ImageFeedProps {
  count: number
}

const getArrowStyles = (notAllowed: boolean): CSSProperties => ({
  cursor: notAllowed ? 'not-allowed' : 'pointer',
  width: '32px',
  fill: notAllowed ? 'rgba(0,0,0,0)' : '#fff',
})

export const ImageFeed: FC<ImageFeedProps> = observer(({ count }) => {
  const { images, isLowestOffset, isHighestOffset, setCurrentImage, setRequestLimit, setImageOffset } = store

  useEffect(() => {
    setRequestLimit(count)
  }, [count, setRequestLimit])

  return (
    <div className={'image-feed'}>
      <LeftArrow style={getArrowStyles(isLowestOffset)} onClick={() => setImageOffset('prev')} />
      {images.map((photo) => (
        <img
          key={photo.id}
          className={'image-feed__image-preview'}
          src={photo.url}
          onClick={() => setCurrentImage(photo)}
          alt="image preview"
        />
      ))}
      <RightArrow style={getArrowStyles(isHighestOffset)} onClick={() => setImageOffset('next')} />
    </div>
  )
})
