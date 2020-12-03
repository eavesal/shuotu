import React, { useContext, useMemo } from 'react'
import { stratify, HierarchyNode } from 'd3-hierarchy'
import { last, max } from 'ramda'
import cx from 'classnames'

import { useApplyPoints } from './hooks'
import { MapLocation } from '../../types/index'
import { MapContext } from './context'
import { ZoomContext } from './Zoom'

import styles from './TextLocationLayer.module.scss'

const toTree = stratify<MapLocation>()
enum Depths {
  L = 1,
  M = 2,
  S = 3,
}
const DepthArray = [Depths.L, Depths.M, Depths.S]
const DepthToClassName = {
  [Depths.L]: styles.l,
  [Depths.M]: styles.m,
  [Depths.S]: styles.s,
}

function findDepth(scaleArray: number[], k: number) {
  for (let i = 1; i < scaleArray.length; i++) {
    const cur = scaleArray[i]
    const prev = scaleArray[i - 1]
    if (k <= cur && k > prev) {
      return i
    }
  }
  return 0
}

// this could be optimized
function getNodesByDepth<T>(root: HierarchyNode<T>, depth: number) {
  const nodes: HierarchyNode<T>[] = []
  root.each(x => {
    if (x.depth === depth) {
      nodes.push(x)
    }
  })
  return nodes
}

interface TextLocationLayerProps {
  locations: MapLocation[]
  activeLocationId?: string
  onClick?(id: string): void
}

export default function TextLocationLayer({ locations, activeLocationId, onClick }: TextLocationLayerProps) {
  const root = useMemo(() => toTree(locations), [locations])
  const depthArray = DepthArray.slice(0, root.height)
  const { mapPixelSize } = useContext(MapContext)
  const [width, height] = mapPixelSize

  const scaleArray = useMemo(() => {
    const maxSize = max(width, height)
    const total = depthArray.reduce((prev, cur) => prev + cur, 0)
    return depthArray.reduce((prev, cur) => [...prev, last(prev) + (cur / total) * maxSize], [0])
  }, [depthArray, height, width])

  const { k } = useContext(ZoomContext)
  const depth = findDepth(scaleArray, k)
  const nodes = useMemo(() => getNodesByDepth(root, depth), [root, depth])

  const worldPoints = useMemo(() => nodes.map(x => x.data.pos), [nodes])
  const points = useApplyPoints(...worldPoints)

  if (depth === 0) {
    return null
  }

  return (
    <>
      {nodes.map((x, i) => (
        <text
          key={x.id}
          x={points[i][0]}
          y={points[i][1]}
          className={cx(
            styles.text,
            DepthToClassName[depth],
            onClick ? styles.clickable : undefined,
            activeLocationId === x.id ? styles.active : undefined,
          )}
          onClick={() => onClick && onClick(x.id)}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {x.data.label}
        </text>
      ))}
    </>
  )
}
