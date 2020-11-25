import React, { useContext, useMemo } from 'react'
import { tile } from 'd3-tile'

import { ZoomContext } from './Zoom'
import { SvgContext } from '../Svg/Svg'

export function useTile(tileSize: number) {
  const { width, height } = useContext(SvgContext)

  return useMemo(
    () =>
      tile()
        .extent([
          [0, 0],
          [width, height],
        ])
        .tileSize(tileSize),
    [height, tileSize, width],
  )
}

interface TileProps {
  tileSize: number
  tilePrefix: string
}

export default function Tile({ tileSize, tilePrefix }: TileProps) {
  const T = useContext(ZoomContext)
  const tiler = useTile(tileSize)
  const tiles = tiler(T)

  return (
    <g>
      {tiles.map(([x, y, z]: [number, number, number]) => (
        <image
          key={`${z}-${x}-${y}`}
          xlinkHref={`${tilePrefix}/${z}-${x}-${y}.png`}
          x={(x + tiles.translate[0]) * tiles.scale}
          y={(y + tiles.translate[1]) * tiles.scale}
          width={tiles.scale}
          height={tiles.scale}
        />
      ))}
    </g>
  )
}
