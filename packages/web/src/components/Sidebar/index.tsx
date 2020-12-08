import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import styles from './index.module.scss'
import { GlobalPortals } from '../../constants'
import { Portal } from '../Portal'

export enum SidebarPosition {
  RIGHT,
  LEFT,
}

export interface ModalProps {
  title: string
  visiable?: boolean
  position?: SidebarPosition
  children?: React.ReactNode
}

// {

// }

export default function Sidebar({ children, visiable, title }: ModalProps) {
  return (
    <Portal id={GlobalPortals.SIDEBAR}>
      <AnimatePresence>
        {visiable && (
          <motion.div
            className={styles.sidebar}
            initial={{ transform: 'translateX(100%)' }}
            animate={{ transform: 'translateX(0%)' }}
            exit={{ transform: 'translateX(100%)' }}
            transition={{ duration: 0.4 }}
          >
            <h5 className={styles.title}>{title}</h5>
            <div className={styles.content}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  )
}
