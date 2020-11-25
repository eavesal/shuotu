import React from 'react'
import cx from 'classnames'

import styles from './index.module.css'

interface Option {
  title: string
  value: string
}

interface OptionProps extends Option {
  onClick?: (value: string) => void
}

export function Option({ title, value, onClick }: OptionProps) {
  return (
    <div
      className={styles.option}
      onClick={e => {
        e.stopPropagation()
        onClick && onClick(value)
      }}
    >
      {title}
    </div>
  )
}

interface OptionGroupProps {
  items: Option[]
  onItemClicked?: (value: string) => void
}

export function OptionGroup({ items, onItemClicked }: OptionGroupProps) {
  return (
    <div className={styles.optgroup}>
      {items.map(x => (
        <Option {...x} key={x.value} onClick={onItemClicked} />
      ))}
    </div>
  )
}

interface DropdownMenuProps {
  items: Option[][]
  onItemClicked?: (value: string) => void
}

export default function DropdownMenu({ items, onItemClicked }: DropdownMenuProps) {
  return (
    <div className={cx(styles.main, styles.tr)}>
      {items.map((x, i) => (
        <OptionGroup items={x} key={i} onItemClicked={onItemClicked} />
      ))}
    </div>
  )
}
