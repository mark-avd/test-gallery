import { createPortal } from 'react-dom'
import { observer } from 'mobx-react-lite'
import { galleryStore } from 'store'
import type { FC } from 'react'
import './SelectedImageModal.scss'

export const SelectedImageModal: FC = observer(() => {
  const { showModal, selectedImageUrl, closeModal } = galleryStore
  return showModal
    ? createPortal(
        <div className={'modal__overlay'} onClick={() => closeModal()}>
          <div className={'modal'}>
            <div className={'modal__backgroundImage'} style={{ backgroundImage: `url(${selectedImageUrl})` }} />
            <img className={'modal__image'} src={selectedImageUrl} alt="image" />
          </div>
        </div>,
        document.body,
      )
    : null
})
