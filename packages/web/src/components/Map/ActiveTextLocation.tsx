import { equals } from 'ramda'
import React, { useCallback, useMemo, useState } from 'react'
import { stratify } from 'd3-hierarchy'
import cx from 'classnames'

import Sidebar from '../Sidebar'
import UpdateLocationForm from '../UpdateLocationForm'
import { MapLocation } from '../../types'
import { useApplyPoints } from './hooks'

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
  const [location, setLocation] = useState<MapLocation>(locations.find(x => x.id === activeLocationId))
  const { parentId, id } = location
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const root = useMemo(() => toTree([...locations.filter(x => x.id !== id), location]), [parentId, locations])
  const depth = useMemo(() => root.find(x => x.id === id).depth, [id, root])

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

  return (
    <>
      <text
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
