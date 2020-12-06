import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { zoom, zoomIdentity } from 'd3-zoom'

import { SvgSelection, Transform } from './types'
import { SvgContext } from '../Svg/Svg'
import { MapContext, MapEventEmitter } from './context'
import { MapEvents } from './enum'
import { getScaleCenter, getScaleExtent } from './utils'

const DEFAULT_TRANSFORM = {
  k: 0,
  x: 0,
  y: 0,
}
export const ZoomContext = createContext<Transform>(DEFAULT_TRANSFORM)

function cleanEvent(svg: SvgSelection) {
  svg && svg.on('.zoom', null)
  svg && svg.on('wheel', null)
}

// 绑定SVG事件，并返回Transform
export function useZoom(svg: SvgSelection, transform?: Transform, disabled = false) {
  const { width, height } = useContext(SvgContext)
  const { mapBoundingBox, mapPixelSize } = useContext(MapContext)
  const [dx, dy, mapWidth, mapHeight] = mapBoundingBox
  const [T, setT] = useState(DEFAULT_TRANSFORM)
  const ee = useContext(MapEventEmitter)
  const scaleExtent = useMemo(() => getScaleExtent(mapPixelSize, [width, height]), [height, mapPixelSize, width])
  const scaleCenter = useMemo(() => getScaleCenter(mapPixelSize, [width, height]), [height, mapPixelSize, width])

  const zoomer = useMemo(() => {
    return zoom<SVGSVGElement, null>()
      .scaleExtent(scaleExtent)
      .extent([
        [0, 0],
        [width, height],
      ])
      .duration(400)
      .on('zoom', event =>
        setT({
          x: event.transform.x,
          y: event.transform.y,
          k: event.transform.k,
        }),
      )
  }, [scaleExtent, width, height])

  useEffect(() => {
    if (!svg) {
      return
    }

    svg.call(zoomer)
    svg.call(zoomer.transform, zoomIdentity.translate(...scaleCenter).scale(scaleExtent[0]))
    svg.on('wheel', e => e.preventDefault())

    disabled && cleanEvent(svg)

    return () => {
      cleanEvent(svg)
    }
  }, [zoomer, svg, width, height, transform, disabled, scaleExtent, scaleCenter])

  const onZoomIn = useCallback(() => svg.transition().duration(400).call(zoomer.scaleBy, 1.5), [zoomer, svg])
  const onZoomOut = useCallback(
    () =>
      svg
        .transition()
        .duration(400)
        .call(zoomer.scaleBy, 1 / 1.5),
    [zoomer, svg],
  )
  const onZoomInitial = useCallback(
    () =>
      svg
        .transition()
        .duration(400)
        .call(zoomer.transform, zoomIdentity.translate(...scaleCenter).scale(scaleExtent[0])),
    [scaleCenter, scaleExtent, svg, zoomer.transform],
  )

  const onZoomTransform = useCallback(
    (k: number, x: number, y: number) => {
      if (!svg || !zoomer) {
        return
      }

      svg
        .transition()
        .duration(400)
        .call(
          zoomer.transform,
          zoomIdentity
            .translate(width >> 1, height >> 1)
            .translate((0.5 - (x - dx) / mapWidth) * k, (0.5 - (y - dy) / mapHeight) * k)
            .scale(k),
        )
    },
    [svg, zoomer, width, height, dx, mapWidth, dy, mapHeight],
  )

  useEffect(() => {
    if (!ee) {
      return
    }

    ee.on(MapEvents.ZOOM_IN, onZoomIn)
    ee.on(MapEvents.ZOOM_OUT, onZoomOut)
    ee.on(MapEvents.ZOOM_INITIAL, onZoomInitial)
    ee.on(MapEvents.ZOOM_TRANSFORM, onZoomTransform)

    return () => {
      ee.off(MapEvents.ZOOM_IN, onZoomIn)
      ee.off(MapEvents.ZOOM_OUT, onZoomOut)
      ee.off(MapEvents.ZOOM_INITIAL, onZoomInitial)
      ee.off(MapEvents.ZOOM_TRANSFORM, onZoomTransform)
    }
  }, [zoomer, ee, onZoomIn, onZoomOut, onZoomTransform, onZoomInitial])

  return T
}

interface ZoomProps {
  svg: SvgSelection
  transform?: Transform
  children?: React.ReactNode
}

export default function Zoom({ svg, transform, children }: ZoomProps) {
  const T = useZoom(svg, transform)
  return <ZoomContext.Provider value={T}>{children}</ZoomContext.Provider>
}
