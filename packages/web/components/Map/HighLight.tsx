import React from 'react'

export function highlight(x: React.MouseEvent<SVGGElement, MouseEvent>) {
  x.currentTarget.setAttribute('filter', 'url(#highlight)')
}

export function lowlight(x: React.MouseEvent<SVGGElement, MouseEvent>) {
  x.currentTarget.removeAttribute('filter')
}

export default function HighLight() {
  return (
    <filter id="highlight">
      <feColorMatrix
        in="SourceGraphic"
        type="matrix"
        values="1 0 0 0 0.2
          0 1 0 0 0.2
          0 0 1 0 0.2
          0 0 0 1 0"
      />
    </filter>
  )
}
