import { observer } from 'mobx-react-lite'
import { store } from 'store'
import type { FC } from 'react'
import './ImagePreview.scss'

export const ImagePreview: FC = observer(() => {
  const { currentImage, isFirstImage, isLastImage, openModal, switchCurrentImage } = store

  return (
    <div className={'image-preview__wrapper'}>
      <div
        className={
          isFirstImage ? 'image-preview__controls image-preview__controls_not-allowed' : 'image-preview__controls'
        }
        onClick={() => switchCurrentImage('prev')}
      />
      <img src={currentImage?.url} onClick={() => openModal()} className={'image-preview'} alt={'selected image'} />
      <div
        className={
          isLastImage ? 'image-preview__controls image-preview__controls_not-allowed' : 'image-preview__controls'
        }
        onClick={() => switchCurrentImage('next')}
      />
    </div>
  )
})
