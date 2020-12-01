import { useCallback, useContext } from 'react'
import { MapContext } from './context'
import { Point } from './types'
import { ZoomContext } from './Zoom'

export function useApplyPoints(...points: Point[]) {
  const { mapBoundingBox } = useContext(MapContext)
  const { k, x, y } = useContext(ZoomContext)
  const [bx, by, mapWidth, mapHeight] = mapBoundingBox

  return points.map(([px, py]) => [((px - bx) / mapWidth - 0.5) * k + x, ((py - by) / mapHeight - 0.5) * k + y])
}

export function useApplyPointsFn() {
  const { mapBoundingBox } = useContext(MapContext)
  const { k, x, y } = useContext(ZoomContext)
  const [bx, by, mapWidth, mapHeight] = mapBoundingBox

  return useCallback(
    (...points: Point[]) =>
      points.map(([px, py]) => [((px - bx) / mapWidth - 0.5) * k + x, ((py - by) / mapHeight - 0.5) * k + y]),
    [bx, by, mapHeight, mapWidth, k, x, y],
  )
}

export function useInvertPoints(...points: Point[]) {
  const { mapBoundingBox } = useContext(MapContext)
  const { k, x, y } = useContext(ZoomContext)
  const [bx, by, mapWidth, mapHeight] = mapBoundingBox

  return points.map(([px, py]) => [((px - x) / k + 0.5) * mapWidth + bx, ((py - y) / k + 0.5) * mapHeight + by])
}

export function useInvertPointsFn() {
  const { mapBoundingBox } = useContext(MapContext)
  const { k, x, y } = useContext(ZoomContext)
  const [bx, by, mapWidth, mapHeight] = mapBoundingBox

  return useCallback(
    (...points: Point[]): Point[] =>
      points.map(
        ([px, py]) =>
          [((px - x) / k + 0.5) * mapWidth + bx, ((py - y) / k + 0.5) * mapHeight + by].map(x => Math.round(x)) as Point,
      ),
    [bx, by, mapHeight, mapWidth, k, x, y],
  )
}
