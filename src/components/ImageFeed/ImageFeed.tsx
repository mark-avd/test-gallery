import { useEffect, useRef, useState } from 'react'
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
  const imageFeedRef = useRef<HTMLDivElement>(null)
  const [maxFeedWidth, setMaxFeedWidth] = useState<number>()

  const {
    images,
    isLowestOffset,
    isHighestOffset,
    isFetched,
    limit,
    imageOffset,
    setCurrentImage,
    setRequestLimit,
    scrollFeed,
  } = store

  const scrollOffset = maxFeedWidth ? Math.ceil(maxFeedWidth / limit) + 1 : 0

  useEffect(() => {
    setRequestLimit(count)
  }, [count, setRequestLimit])

  useEffect(() => {
    if (isFetched) {
      setMaxFeedWidth(imageFeedRef.current?.clientWidth)
    }
  }, [isFetched, setMaxFeedWidth])

  return (
    <div className={'image-feed__container'}>
      <LeftArrow style={getArrowStyles(isLowestOffset)} onClick={() => scrollFeed('prev')} />
      <div className={'image-feed__wrapper'}>
        <div
          className={'image-feed'}
          ref={imageFeedRef}
          style={{ maxWidth: maxFeedWidth, transform: `translateX(-${scrollOffset * imageOffset}px)` }}
        >
          {images.map((photo) => (
            <img
              key={photo.id}
              className={'image-feed__image-preview'}
              src={photo.url}
              onClick={() => setCurrentImage(photo)}
              alt="image preview"
            />
          ))}
        </div>
      </div>
      <RightArrow style={getArrowStyles(isHighestOffset)} onClick={() => scrollFeed('next')} />
    </div>
  )
})
