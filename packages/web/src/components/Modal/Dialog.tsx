import React from 'react'
import Modal, { ModalProps } from './index'
import styles from './Dialog.module.css'
import Button, { ButtonApperance, ButtonSize } from '../Button'

interface DialogProps extends ModalProps {
  confirmText?: string
  onConfirmClicked?(): any
  onCancelClicked?(): any
}

export default function Dialog({
  title,
  visiable,
  confirmText = '确认',
  onMaskClicked,
  onConfirmClicked,
  onCancelClicked,
  children,
}: DialogProps) {
  return (
    <Modal title={title} visiable={visiable} onMaskClicked={onMaskClicked}>
      {children}
      <div className={styles.ops}>
        <Button size={ButtonSize.S} apperance={ButtonApperance.SECONDARY} onClick={onCancelClicked}>
          取消
        </Button>
        <Button size={ButtonSize.S} apperance={ButtonApperance.PRIMARY} onClick={onConfirmClicked}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  )
}
