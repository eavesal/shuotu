import { AnimateSharedLayout, motion } from 'framer-motion'
import { groupWith, prop } from 'ramda'
import React, { useLayoutEffect } from 'react'
import { usePrevious } from '../../../hooks/misc'

import styles from './table.module.css'

export type Header<T> = {
  align?: 'left' | 'center' | 'right'
  rowSpan?: number | ((item: T, all: T[]) => number)
  key: string
  name: string
  render: (item: T, all: T[]) => JSX.Element | string | JSX.Element[] | null
}

interface TableProps<T, P extends keyof T> {
  id: string
  items: T[]
  headers: Header<T>[]
  group?: P
  scrollTo?: any
  onItemClicked?: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, item: T) => void
}

function getRowSpan<T>(rowSpan: number | ((item: T, all: T[]) => number) = 1, item: T, all: T[]): number {
  if (typeof rowSpan === 'number') {
    return rowSpan
  }
  if (typeof rowSpan === 'function') {
    return rowSpan(item, all)
  }
  return 1
}

export default function Table<T extends { id: string }, P extends keyof T>({
  id,
  items,
  headers,
  group,
  scrollTo,
  onItemClicked,
}: TableProps<T, P>) {
  const rowSpanCounter: { [key: string]: number | undefined } = {}
  const prevItems = usePrevious(items)
  const renderTr = (item: T) => (
    <tr
      key={item.id}
      onClick={e => onItemClicked && onItemClicked(e, item)}
      className={onItemClicked ? styles.clickable : undefined}
    >
      {headers.map(x => {
        const rowSpan = getRowSpan(x.rowSpan, item, items)
        if (rowSpanCounter[x.key] === undefined) {
          rowSpanCounter[x.key] = rowSpan > 1 ? rowSpan : undefined
          return (
            <td align={x.align} key={x.key} rowSpan={rowSpanCounter[x.key]}>
              {x.render(item, items)}
            </td>
          )
        }
        rowSpanCounter[x.key]! -= 1
        if (rowSpanCounter[x.key] === 1) {
          delete rowSpanCounter[x.key]
        }
        return null
      })}
    </tr>
  )

  useLayoutEffect(() => {
    if (prevItems && items.length > prevItems.length && scrollTo) {
      setTimeout(() => {
        document.querySelector(`#${id}-${scrollTo}`)?.scrollIntoView()
      }, 100)
    }
  }, [id, prevItems, items, scrollTo])

  return (
    <AnimateSharedLayout>
      <motion.table className={styles.table} animate={{ height: 'auto' }} transition={{ duration: 0.2 }} layout>
        <thead>
          <tr>
            {headers.map(x => (
              <th align={x.align} key={x.key}>
                {x.name}
              </th>
            ))}
          </tr>
        </thead>
        {group &&
          groupWith((a, b) => prop(group, a) === prop(group, b), items).map((items, i) => (
            <tbody key={`${items[0][group]}`} id={`${id}-${items[0][group]}`}>
              {items.map(renderTr)}
            </tbody>
          ))}
        {!group && <tbody>{items.map(renderTr)}</tbody>}
      </motion.table>
    </AnimateSharedLayout>
  )
}
