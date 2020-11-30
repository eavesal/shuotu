import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { zoom, zoomIdentity } from 'd3-zoom'
import { Point, SvgSelection, Transform } from './types'
import { max, min } from 'ramda'
import { SvgContext } from '../Svg/Svg'
import { MapEventEmitter } from './context'
import { MapEvents } from './enum'

const DEFAULT_TRANSFORM = {
  k: 0,
  x: 0,
  y: 0,
}
export const ZoomContext = createContext<Transform>(DEFAULT_TRANSFORM)

const getInitialTransform = (size: Point, scaleExtent: Point, transform?: Transform): Transform => {
  if (transform) {
    return transform
  }

  const [width, height] = size
  return {
    x: width >> 1,
    y: height >> 1,
    k: scaleExtent[0],
  }
}

function cleanEvent(svg: SvgSelection) {
  svg && svg.on('.zoom', null)
  svg && svg.on('wheel', null)
}

// 绑定SVG事件，并返回Transform
export function useZoom(svg: SvgSelection, scaleExtent: Point, transform?: Transform, disabled = false) {
  const { width, height } = useContext(SvgContext)
  const [minExtentSize, maxExtentSize] = scaleExtent
  const [T, setT] = useState(DEFAULT_TRANSFORM)
  const ee = useContext(MapEventEmitter)

  const zoomer = useMemo(() => {
    return zoom<SVGSVGElement, null>()
      .scaleExtent([minExtentSize, maxExtentSize])
      .extent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', event =>
        setT({
          x: event.transform.x,
          y: event.transform.y,
          k: event.transform.k,
        }),
      )
  }, [width, height, minExtentSize, maxExtentSize])

  useEffect(() => {
    if (!svg) {
      return
    }

    const initialTransform = getInitialTransform([width, height], scaleExtent, transform)
    svg.call(zoomer)
    svg.call(zoomer.transform, zoomIdentity.translate(initialTransform.x, initialTransform.y).scale(initialTransform.k))
    svg.on('wheel', e => e.preventDefault())

    disabled && cleanEvent(svg)

    return () => {
      cleanEvent(svg)
    }
  }, [zoomer, svg, width, height, scaleExtent, transform, disabled])

  const onZoomIn = useCallback(() => zoomer.scaleBy(svg, 1.5), [zoomer, svg])
  const onZoomOut = useCallback(() => zoomer.scaleBy(svg, 1 / 1.5), [zoomer, svg])
  const onZoomInitial = useCallback(
    () => svg.call(zoomer.transform, zoomIdentity.translate(width >> 1, height >> 1).scale(minExtentSize)),
    [zoomer, svg, width, height, minExtentSize],
  )

  useEffect(() => {
    if (!ee) {
      return
    }

    ee.on(MapEvents.ZOOM_IN, onZoomIn)
    ee.on(MapEvents.ZOOM_OUT, onZoomOut)
    ee.on(MapEvents.ZOOM_INITIAL, onZoomInitial)

    return () => {
      ee.off(MapEvents.ZOOM_IN, onZoomIn)
      ee.off(MapEvents.ZOOM_OUT, onZoomOut)
      ee.off(MapEvents.ZOOM_INITIAL, onZoomInitial)
    }
  }, [zoomer, ee, onZoomIn, onZoomOut, onZoomInitial])

  return T
}

function calcDefaultExtentSize(size: Point, minExtentSize?: number, maxExtentSize?: number): Point {
  const minSize = min(...size)
  const maxSize = max(...size)
  return [
    typeof minExtentSize === 'number' ? minExtentSize : minSize,
    typeof maxExtentSize === 'number' ? maxExtentSize : maxSize,
  ]
}

interface ZoomProps {
  svg: SvgSelection
  minScaleExtent?: number
  maxScaleExtent?: number
  transform?: Transform
  children?: React.ReactNode
}

export default function Zoom({ svg, minScaleExtent, maxScaleExtent, transform, children }: ZoomProps) {
  const { width, height } = useContext(SvgContext)
  const scaleExtent = useMemo(() => calcDefaultExtentSize([width, height], minScaleExtent, maxScaleExtent), [
    maxScaleExtent,
    minScaleExtent,
    width,
    height,
  ])
  const T = useZoom(svg, scaleExtent, transform)
  return <ZoomContext.Provider value={T}>{children}</ZoomContext.Provider>
}
