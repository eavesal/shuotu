import { max } from 'ramda'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './index.module.css'

type Item = {
  name: string
  value: number
}

interface BarChartProps<T> {
  items: T[]
}

export default function BarChart<T extends Item>({ items }: BarChartProps<T>) {
  const maxValue = items.map(x => x.value).reduce(max, -Infinity)
  return (
    <AnimatePresence>
      <ol className={styles.main}>
        {items.map(x => (
          <li key={x.name}>
            <div className={styles.name}>{x.name}</div>
            <div className={styles.wrapper}>
              <motion.div
                className={styles.bar}
                animate={{ width: `${(x.value / maxValue) * 100}%` }}
                transition={{ duration: 0.8 }}
              >
                <div className={styles.number}>{x.value}</div>
              </motion.div>
            </div>
          </li>
        ))}
      </ol>
    </AnimatePresence>
  )
}
