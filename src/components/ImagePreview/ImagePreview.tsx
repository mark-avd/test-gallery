import { observer } from 'mobx-react-lite'
import { galleryStore } from 'store'
import type { FC } from 'react'
import './ImagePreview.scss'

export const ImagePreview: FC = observer(() => {
  const { selectedImageUrl, openModal } = galleryStore
  return (
    <div className={'image-preview__wrapper'} onClick={() => openModal()}>
      <img src={selectedImageUrl} className={'image-preview'} alt={'selected image'} />
    </div>
  )
})
