import React, { useCallback, useState } from 'react'
import { select } from 'd3-selection'

import Svg from '../Svg/Svg'
import { SvgSelection } from './types'
import Zoom from './Zoom'
import Tile from './Tile'

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

interface StaticMapProps {
  tilePrefix: string
  mapPixelSize?: number
  tileSize?: number
  children?: React.ReactNode
}

export default function StaticMap({ mapPixelSize = 8192, tileSize = 256, tilePrefix, children }: StaticMapProps) {
  const { svg, ref } = useD3Svg()

  return (
    <Svg ref={ref}>
      <Zoom svg={svg} maxScaleExtent={mapPixelSize}>
        <Tile tileSize={tileSize} tilePrefix={tilePrefix} />
        {children}
      </Zoom>
    </Svg>
  )
}
