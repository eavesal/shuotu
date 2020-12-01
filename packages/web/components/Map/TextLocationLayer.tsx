import React, { useMemo } from 'react'
import { useApplyPoints } from './hooks'
import { MapLocation } from '../../types/index'
import styles from './TextLocationLayer.module.scss'

interface TextLocationLayerProps {
  locations: MapLocation[]
}

export default function TextLocationLayer({ locations }: TextLocationLayerProps) {
  const worldPoints = useMemo(() => locations.map(x => x.pos), [locations])
  const points = useApplyPoints(...worldPoints)

  return (
    <>
      {locations.map((x, i) => (
        <text
          key={x.id}
          x={points[i][0]}
          y={points[i][1]}
          className={styles.text}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {x.label}
        </text>
      ))}
    </>
  )
}
