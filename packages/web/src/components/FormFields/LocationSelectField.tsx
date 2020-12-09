import React, { useMemo } from 'react'
import { UseFormMethods, Controller } from 'react-hook-form'
import { stratify, HierarchyNode } from 'd3-hierarchy'

import { MapLocation } from '../../types'
import Field from './Field'

import styles from './LocationSelectField.module.scss'
import { LOCATION_MAX_DEPTH } from '../../constants'

const toTree = stratify<MapLocation>()

function getAncestors(tree: HierarchyNode<MapLocation>, parentId: string) {
  const node = tree.find(x => x.id === parentId) || tree
  return node
    .ancestors()
    .reverse()
    .slice(0, LOCATION_MAX_DEPTH - 2)
}

interface LocationSelectFieldProps {
  activeId: string
  name: string
  locations: HierarchyNode<MapLocation>
  label: string
  control: UseFormMethods['control']
}

export default function LocationSelectField({ locations, control, name, label, activeId }: LocationSelectFieldProps) {
  return (
    <Field label={label}>
      <div className={styles.selects}>
        <Controller
          control={control}
          name={name}
          render={({ onBlur, onChange, value = '0' }) => {
            const nodes = getAncestors(locations, value)
            return (
              <>
                {nodes.map((node, i) => (
                  <select
                    key={node.id}
                    name={name}
                    value={nodes[i + 1] ? nodes[i + 1].id : undefined}
                    onChange={onChange}
                    onBlur={onBlur}
                  >
                    <option value={node.id} key={node.id}>
                      -
                    </option>
                    {node.children &&
                      node.children.map(x =>
                        activeId === x.id ? null : (
                          <option value={x.id} key={x.id}>
                            {x.data.label}
                          </option>
                        ),
                      )}
                  </select>
                ))}
              </>
            )
          }}
        />
      </div>
    </Field>
  )
}
