import { createPortal } from 'react-dom'
import { observer } from 'mobx-react-lite'
import { store } from 'store'
import type { FC } from 'react'
import './SelectedImageModal.scss'

export const SelectedImageModal: FC = observer(() => {
  const { showModal, currentImage, closeModal } = store
  return showModal
    ? createPortal(
        <div className={'modal__overlay'} onClick={() => closeModal()}>
          <div className={'modal'}>
            <div className={'modal__backgroundImage'} style={{ backgroundImage: `url(${currentImage?.url})` }} />
            <img className={'modal__image'} src={currentImage?.url} alt="image" />
          </div>
        </div>,
        document.body,
      )
    : null
})
