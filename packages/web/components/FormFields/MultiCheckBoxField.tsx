import React from 'react'
import { Controller, UseFormMethods } from 'react-hook-form'
import cx from 'classnames'

import styles from './Field.module.css'
import { includes } from 'ramda'

interface MultiCheckBoxFieldProps {
  name: string
  label?: string
  options: Option[]
  control: UseFormMethods['control']
  colors?: { [name: string]: string }
}

export interface Option {
  id: string | number
  name: string
}

export default function MultiCheckBoxField({ options, control, name, colors }: MultiCheckBoxFieldProps) {
  return (
    <div className={cx(styles.field, styles.tabRadio)}>
      <Controller
        control={control}
        name={name}
        render={({ onBlur, onChange, value = [] }) => (
          <ul className={styles.multiCheckBox}>
            {options.map(({ id, name }) => (
              <li
                key={id}
                onClick={() => {
                  onChange(includes(id, value) ? value.filter(x => x !== id) : [...value, id])
                  onBlur()
                }}
                style={colors && colors[id] ? { color: colors[id] } : undefined}
              >
                <input type="checkbox" checked={includes(id, value)} readOnly />
                {name}
              </li>
            ))}
          </ul>
        )}
      />
    </div>
  )
}
