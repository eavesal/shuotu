import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './index.module.scss'
import { GlobalPortals } from '../../constants'
import { Portal } from '../Portal'
import Button, { ButtonApperance } from '../Button'

export enum SidebarPosition {
  RIGHT,
  LEFT,
}

export interface ModalProps {
  title: string
  position?: SidebarPosition
  children?: React.ReactNode
  onDelete?(): void
}

export default function Sidebar({ children, title, onDelete }: ModalProps) {
  return (
    <Portal id={GlobalPortals.SIDEBAR}>
      <motion.div
        className={styles.sidebar}
        initial={{ transform: 'translateX(100%)' }}
        animate={{ transform: 'translateX(0%)' }}
        exit={{ transform: 'translateX(100%)' }}
        transition={{ duration: 0.4 }}
      >
        <h5 className={styles.title}>
          {title}
          {onDelete && (
            <Button apperance={ButtonApperance.SECONDARY} className="iconfont" onClick={onDelete}>
              &#xe62a;
            </Button>
          )}
        </h5>
        <div className={styles.content}>{children}</div>
      </motion.div>
    </Portal>
  )
}
