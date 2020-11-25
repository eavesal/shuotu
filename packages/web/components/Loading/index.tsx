import React from 'react'
import cx from 'classnames'

import styles from './index.module.css'

interface LoadingProps {
  type: 'large' | 'small'
  apperance?: 'orange' | 'white'
  className?: string
}

export default function Loading({ type, apperance = 'orange', className }: LoadingProps) {
  return (
    <div className={cx(styles.loading, styles[type], styles[apperance], className)}>
      <div className={cx(styles.circle, styles.circle1)}></div>
      <div className={cx(styles.circle, styles.circle2)}></div>
      <div className={cx(styles.dot, styles.dot1)}></div>
      <div className={cx(styles.dot, styles.dot2)}></div>
      <div className={cx(styles.dot, styles.dot3)}></div>
      <div className={cx(styles.dot, styles.dot4)}></div>
    </div>
  )
}
