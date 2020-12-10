import { equals } from 'ramda'
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { stratify } from 'd3-hierarchy'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import cx from 'classnames'

import Sidebar from '../Sidebar'
import UpdateLocationForm from '../UpdateLocationForm'
import { MapLocation } from '../../types'
import { useApplyPoints, useInvertPointsFn } from './hooks'

import styles from './TextLocationLayer.module.scss'
import { DepthToClassName } from './TextLocationLayer'

interface ActiveTextLocationProps {
  activeLocationId?: string
  locations: MapLocation[]
  onSubmit?(id: string, data: Partial<MapLocation>): void
  onCancel?(): void
  onDelete?(): void
}

const toTree = stratify<MapLocation>()

export default function ActiveTextLocation({
  activeLocationId,
  locations,
  onSubmit,
  onCancel,
  onDelete,
}: ActiveTextLocationProps) {
  const ref = useRef<SVGTextElement>(null)
  const [location, setLocation] = useState<MapLocation>(locations.find(x => x.id === activeLocationId))
  const { parentId, id } = location
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const root = useMemo(() => toTree([...locations.filter(x => x.id !== id), location]), [parentId, locations])
  const depth = useMemo(() => root.find(x => x.id === id).depth, [id, root])
  const invert = useInvertPointsFn()

  const [[x, y]] = useApplyPoints(location.pos)

  const handleModify = useCallback(
    (_id: string, data: Partial<MapLocation>) => {
      const newLocation = { ...location, ...data }
      if (!equals(location, newLocation)) {
        setLocation(newLocation)
      }
    },
    [location],
  )

  useLayoutEffect(() => {
    if (ref.current) {
      const handleDrag = drag().subject(() => ({
        x,
        y,
      }))

      handleDrag.on('start', () => {
        ref.current.style.cursor = 'grabbing'
      })
      handleDrag.on('drag', e => {
        ref.current.setAttribute('x', e.x)
        ref.current.setAttribute('y', e.y)
      })
      handleDrag.on('end', e => {
        ref.current.style.cursor = 'grab'
        handleModify(id, {
          pos: invert([e.x, e.y])[0],
        })
      })

      select(ref.current).call(handleDrag)
    }
  }, [id, x, y, invert, handleModify])

  return (
    <>
      <text
        ref={ref}
        x={x}
        y={y}
        className={cx(styles.text, DepthToClassName[depth], styles.active)}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {location.label}
      </text>
      <Sidebar title="新增/修改地名" onDelete={onDelete}>
        <UpdateLocationForm
          location={location}
          locations={root}
          onChange={handleModify}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </Sidebar>
    </>
  )
}
