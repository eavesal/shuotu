import React from 'react'
import { UseFormMethods } from 'react-hook-form'
import cx from 'classnames'

import styles from './Field.module.css'

interface TabRadioFieldProps {
  name: string
  options: Option[]
  register: UseFormMethods['register']
}

export interface Option {
  id: string | number
  name: string
}

export default function TabRadioField({ options, register, name }: TabRadioFieldProps) {
  return (
    <div className={cx(styles.field, styles.tabRadio)}>
      {options.map(x => (
        <div className={styles.tabRadioItem} key={x.id}>
          <input
            type="radio"
            id={`${x.id}`}
            name={name}
            value={x.id}
            ref={register({
              required: true,
            })}
          />
          <label htmlFor={`${x.id}`}>{x.name}</label>
        </div>
      ))}
    </div>
  )
}
