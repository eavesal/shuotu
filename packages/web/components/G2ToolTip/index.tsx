import React, { CSSProperties } from 'react'
import cx from 'classnames'

import styles from './index.module.css'

interface ToolTipItem<T> {
  color: string
  data: T
  marker: boolean
  name: string
  title: string
  value: string
}

interface G2ToolTipProps<T> {
  title?: string
  items: ToolTipItem<T>[]
  children?: React.ReactChild
  listStyle?: CSSProperties
}

export default function G2ToolTip<T>({ title, items, children, listStyle }: G2ToolTipProps<T>) {
  return (
    <div className={cx('g2-tooltip', styles.tooltip)}>
      {title && <div className={styles.title}>{title}</div>}
      {children && <div className={styles.content}>{children}</div>}
      <ul className={styles.list} style={listStyle}>
        {items.map(x => (
          <li className={styles.item} key={x.name}>
            <span className={styles.marker} style={{ background: x.color }}></span>
            <span className={styles.name}>{x.name}</span>
            <span className={styles.value}>{x.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
