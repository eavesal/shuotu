import React from 'react'

import styles from './index.module.css'

export enum PUBGSeasonStatCardStyle {
  SMALL = 's',
  LARGE = 'l',
}

type Datum = {
  name: string
  text: string
  style: PUBGSeasonStatCardStyle
}

type Item = {
  title: string
  nodes: Datum[]
}

interface PUBGSeasonStatProps {
  items: Item[]
}

interface PUBGStatCardProps {
  item: Item
}

export function PUBGStatCard({ item }: PUBGStatCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.items}>
        {item.nodes.map(node => (
          <span className={styles[node.style]} title={node.name} key={node.name}>
            {node.text}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function PUBGSeasonStat({ items }: PUBGSeasonStatProps) {
  return (
    <div className={styles.main}>
      {items.map(x => (
        <PUBGStatCard item={x} key={x.title} />
      ))}
    </div>
  )
}
