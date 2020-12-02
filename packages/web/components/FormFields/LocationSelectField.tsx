import React, { useMemo } from 'react'
import { UseFormMethods, Controller } from 'react-hook-form'
import { stratify, HierarchyNode } from 'd3-hierarchy'
import { prepend } from 'ramda'

import { MapLocation } from '../../types'
import { Point } from '../Map/types'
import Field from './Field'

import styles from './LocationSelectField.module.scss'
import { LOCATION_MAX_DEPTH } from '../../constants'

const StaticHead = {
  id: '0',
  label: 'root',
  parentId: undefined,
  pos: [0, 0] as Point,
}

const toTree = stratify<MapLocation>()

function getAncestors(tree: HierarchyNode<MapLocation>, parentId: string) {
  const node = tree.find(x => x.id === parentId) || tree
  return node
    .ancestors()
    .reverse()
    .slice(0, LOCATION_MAX_DEPTH - 1)
}

interface LocationSelectFieldProps {
  activeId: string
  name: string
  options: MapLocation[]
  label: string
  control: UseFormMethods['control']
}

export default function LocationSelectField({ options, control, name, label, activeId }: LocationSelectFieldProps) {
  // change hierarchy when relationship changed
  const relationship = useMemo(() => options.map(x => `${x.id}${x.parentId}`).join(), [options])
  const tree = useMemo(() => {
    const data = prepend(
      StaticHead,
      options.filter(x => x.id !== activeId),
    )
    return toTree(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relationship])

  return (
    <Field label={label}>
      <div className={styles.selects}>
        <Controller
          control={control}
          name={name}
          render={({ onBlur, onChange, value = '0' }) => (
            <>
              {getAncestors(tree, value).map(node => (
                <select key={node.id} name={name} onChange={onChange} onBlur={onBlur}>
                  <option value={node.id} key={node.id}>
                    -
                  </option>
                  {node.children &&
                    node.children.map(x => (
                      <option value={x.id} key={x.id}>
                        {x.data.label}
                      </option>
                    ))}
                </select>
              ))}
            </>
          )}
        />
      </div>
    </Field>
  )
}
