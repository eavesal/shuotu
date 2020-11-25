import React, { useEffect, useState } from 'react'

interface AnchorTabItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string
  children?: React.ReactNode
}

export function AnchorTabItem({ id, children, ...rest }: AnchorTabItemProps) {
  return (
    <div id={id} {...rest}>
      {children}
    </div>
  )
}

interface AnchorTabProps {
  items: { id: string; name: string }[]
  className?: string
  activeClassName?: string
}

export default function AnchorTab({ items, className, activeClassName }: AnchorTabProps) {
  const [activeId, setActiveId] = useState(items[0].id)

  useEffect(() => {
    window.location.hash = activeId
  }, [activeId])

  return (
    <ul className={className}>
      {items.map(x => (
        <li key={x.id} className={activeId === x.id ? activeClassName : undefined} onClick={() => setActiveId(x.id)}>
          {x.name}
        </li>
      ))}
    </ul>
  )
}
