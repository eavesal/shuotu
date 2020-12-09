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
export const DepthToClassName = {
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
  return last(scaleArray)
}

// this could be optimized
function getNodesByDepth<T>(root: HierarchyNode<T>, depth: number) {
  const nodes: HierarchyNode<T>[] = []
  root.each(x => {
    if (x.depth <= depth && x.depth !== 0) {
      nodes.push(x)
    }
  })
  return nodes
}

interface TextLocationLayerProps {
  locations: MapLocation[]
  activeLocationId?: string
  onClick?(id: string): void
  // onActiveIdHide?(id: string, transform: { x: number; y: number; k: number })
}

export default function TextLocationLayer({ locations, activeLocationId, onClick }: TextLocationLayerProps) {
  const root = useMemo(() => toTree(locations), [locations])
  const depthArray = useMemo(() => DepthArray.slice(0, root.height), [root.height])
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

  // design changed, comment for now
  // make zoom transform when active location not in the view (through k)
  // useEffect(() => {
  //   if (!activeLocationId) {
  //     return
  //   }

  //   const activeNode = root.find(x => x.id === activeLocationId)
  //   if (!nodes.includes(activeNode)) {
  //     const k = (scaleArray[activeNode.depth] + scaleArray[activeNode.depth - 1]) / 2
  //     onActiveIdHide(activeNode.id, { k, x: activeNode.data.pos[0], y: activeNode.data.pos[1] })
  //   }
  // }, [activeLocationId, nodes, onActiveIdHide, root, scaleArray])

  if (depth === 0) {
    return null
  }

  return (
    <>
      {nodes.map(
        (x, i) =>
          x.id !== activeLocationId && (
            <text
              key={x.id}
              x={points[i][0]}
              y={points[i][1]}
              className={cx(styles.text, DepthToClassName[x.depth], onClick ? styles.clickable : undefined)}
              onClick={() => onClick && onClick(x.id)}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {x.data.label}
            </text>
          ),
      )}
    </>
  )
}
