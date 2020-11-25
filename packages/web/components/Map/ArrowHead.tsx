import React from 'react'

interface ArrowHeadProps {
  colors?: { [id: string]: string }
}

export default function ArrowHead({ colors }: ArrowHeadProps) {
  return (
    <defs>
      <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
      {colors &&
        Object.keys(colors).map(x => (
          <marker
            id={`arrowhead-${x}`}
            key={x}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            stroke={colors[x]}
            fill={colors[x]}
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        ))}
    </defs>
  )
}
