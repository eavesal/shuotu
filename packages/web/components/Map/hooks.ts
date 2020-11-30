import { useContext } from 'react'
import { MapContext } from './StaticMap'
import { Point } from './types'
import { ZoomContext } from './Zoom'

export function useApplyPoints(...points: Point[]) {
  const { mapBoundingBox } = useContext(MapContext)
  const { k, x, y } = useContext(ZoomContext)
  const [bx, by, mapWidth, mapHeight] = mapBoundingBox

  return points.map(([px, py]) => [((px - bx) / mapWidth - 0.5) * k + x, ((py - by) / mapHeight - 0.5) * k + y])
}

export function useInvertPoints(...points: Point[]) {
  const { mapBoundingBox } = useContext(MapContext)
  const { k, x, y } = useContext(ZoomContext)
  const [bx, by, mapWidth, mapHeight] = mapBoundingBox

  return points.map(([px, py]) => [((px - x) / k + 0.5) * mapWidth + bx, ((py - y) / k + 0.5) * mapHeight + by])
}
