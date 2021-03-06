import React, { useCallback, useMemo, useState } from 'react'
import { select } from 'd3-selection'

import Svg from '../Svg/Svg'
import { SvgSelection } from './types'
import Zoom from './Zoom'
import Tile from './Tile'
import { MapContext, MapContextType } from './context'
import { Transform } from '../../types'

// 用户获取d3的svg实例
function useD3Svg() {
  const [svg, setSvg] = useState<SvgSelection>(null)

  const svgRefCallback = useCallback(
    (el: SVGSVGElement | null) => {
      if (el && !svg) {
        setSvg(select<SVGSVGElement, null>(el))
      }
    },
    [svg],
  )

  return { ref: svgRefCallback, svg }
}

interface StaticMapProps extends MapContextType {
  tilePrefix: string
  tileSize?: number
  transform?: Transform
  children?: React.ReactNode
}

export default function StaticMap({
  mapBoundingBox,
  mapPixelSize,
  tileSize = 256,
  transform,
  tilePrefix,
  children,
}: StaticMapProps) {
  const { svg, ref } = useD3Svg()
  const mapContextValue = useMemo(
    () => ({
      mapPixelSize,
      mapBoundingBox,
    }),
    [mapPixelSize, mapBoundingBox],
  )

  return (
    <Svg ref={ref}>
      <MapContext.Provider value={mapContextValue}>
        <Zoom svg={svg} transform={transform}>
          <Tile tileSize={tileSize} tilePrefix={tilePrefix} />
          {children}
        </Zoom>
      </MapContext.Provider>
    </Svg>
  )
}
