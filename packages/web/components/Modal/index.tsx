import React from 'react'
import ReactDOM from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

import PageModal from './PageModal'
import styles from './index.module.css'

export { PageModal }

const MODAL_ROOT = document.getElementById('modal')!

export interface ModalProps {
  title: string
  visiable: boolean
  children?: React.ReactNode
  onMaskClicked?: () => void
}

export default function Modal({ children, visiable, onMaskClicked, title }: ModalProps) {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {visiable && (
        <motion.div
          key="mask"
          className={styles.mask}
          initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
          animate={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
          transition={{ duration: 0.4 }}
          onMouseDown={onMaskClicked}
        >
          <motion.div
            key="dialog"
            className="dialog"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.4 }}
            onMouseDown={e => e.stopPropagation()}
          >
            <h5 className={styles.title}>
              {title}
              <div className={styles.close} onClick={onMaskClicked}></div>
            </h5>
            <div className={styles.content}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    MODAL_ROOT,
  )
}
