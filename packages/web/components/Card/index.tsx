import React from 'react'

import styles from './index.module.css'

interface CardProps {
  className?: string
  title?: string
  subTitle?: string
  children?: React.ReactNode
}

export default function Card({ title, subTitle, children, className }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <span>{title}</span>
        <span className={styles.subTitle}>{subTitle}</span>
      </div>
      <div className={className}>{children}</div>
    </div>
  )
}
