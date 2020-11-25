import React from 'react'

import styles from './index.module.css'

interface PageModalProps {
  title: string
  children: React.ReactNode
}

export default function PageModal({ title, children }: PageModalProps) {
  return (
    <div className={styles.page}>
      <h5 className={styles.title}>{title}</h5>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
