import React, { useContext, useMemo } from 'react'
import { tile } from 'd3-tile'

import { ZoomContext } from './Zoom'
import { SvgContext } from '../Svg/Svg'
import { MapContext } from './context'
import { tileSizeGetter } from './utils'

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
    [width, height, tileSize],
  )
}

const deltas = [-100, -4, -1, 0]

interface TileProps {
  tileSize: number
  tilePrefix: string
}

export default function Tile({ tileSize, tilePrefix }: TileProps) {
  const { mapPixelSize } = useContext(MapContext)
  const getTileSize = useMemo(() => tileSizeGetter(mapPixelSize), [mapPixelSize])
  const T = useContext(ZoomContext)
  const tiler = useTile(tileSize)

  return (
    <>
      {deltas.map(delta => {
        const tiles = tiler.zoomDelta(delta)(T)
        return (
          <g key={delta}>
            {tiles.map(([x, y, z]: [number, number, number]) => {
              const size = getTileSize(z, x, y)

              if (size[0] <= 0 || size[1] <= 0) {
                return null
              }

              return (
                <image
                  key={`${z}-${x}-${y}`}
                  xlinkHref={`${tilePrefix}/${z}-${x}-${y}.png`}
                  x={(x + tiles.translate[0]) * tiles.scale}
                  y={(y + tiles.translate[1]) * tiles.scale}
                  width={(tiles.scale * size[0]) / 256}
                  height={(tiles.scale * size[1]) / 256}
                />
              )
            })}
          </g>
        )
      })}
    </>
  )
}
