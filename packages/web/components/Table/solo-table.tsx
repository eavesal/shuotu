import React from 'react'

import styles from './solo-table.module.css'

type TableRow = {
  name: string
  text: string
}

interface SoloTableProps {
  items: TableRow[]
}

export default function SoloTable({ items }: SoloTableProps) {
  return (
    <table className={styles.table}>
      <tbody>
        {items.map(x => (
          <tr key={x.name}>
            <td>{x.name}</td>
            <td>{x.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
