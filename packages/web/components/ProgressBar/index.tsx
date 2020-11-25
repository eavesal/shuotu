import React, { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import cx from 'classnames'

import styles from './index.module.css'

interface ProgressBarProps {
  styleType: 'success' | 'info' | 'warn ' | 'error'
  total: number
  amont: number
  fixed?: number
  className?: string
}

export default function ProgressBar({ amont, total, styleType, fixed = 0, className }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    if (ref && ref.current) {
      setWidth((amont / total) * ref.current.scrollWidth)
    }
  }, [amont, total, setWidth])

  return (
    <div className={cx(styles.main, className)} ref={ref}>
      <motion.div
        className={cx(styles.front, styles[styleType])}
        animate={{ width }}
        transition={{ ease: 'easeOut', duration: 0.6 }}
      />
      <div className={styles.text}>{amont.toFixed(fixed)}</div>
    </div>
  )
}
