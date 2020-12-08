import React, { ReactNode, useContext, useState } from 'react'

import styles from './index.module.css'

export type ScrollTabOption = {
  id: string
  title: string
  subTitle?: string
}

const ScrollTabContext = React.createContext({
  id: '',
})

interface ScrollTabItemProps {
  id: string
  children?: ReactNode
}

export function ScrollTabItem({ id, children }: ScrollTabItemProps) {
  const { id: activeId } = useContext(ScrollTabContext)

  if (id !== activeId) {
    return null
  }

  return <div className={styles.item}>{children}</div>
}

interface ScrollTabProps {
  items: ScrollTabOption[]
  children?: ReactNode
}

export default function ScrollTab({ items, children }: ScrollTabProps) {
  const [activeId, setActiveId] = useState(items[0].id)
  return (
    <div>
      <ul className={styles.tabs}>
        {items.map(x => (
          <li key={x.id} className={activeId === x.id ? styles.active : undefined} onClick={() => setActiveId(x.id)}>
            <div className={styles.title}>{x.title}</div>
            {x.subTitle && <div className={styles.subTitle}>{x.subTitle}</div>}
          </li>
        ))}
      </ul>
      <div className={styles.content}>
        <ScrollTabContext.Provider value={{ id: activeId }}>{children}</ScrollTabContext.Provider>
      </div>
    </div>
  )
}
