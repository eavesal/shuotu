import React from 'react'
import { UseFormMethods } from 'react-hook-form'
import styles from './Field.module.css'

interface SelectFieldProps {
  name: string
  options: Option[]
  register: UseFormMethods['register']
  autoFocus?: boolean
}

export interface Option {
  id: string
  name: string
}

export default function SelectField({ options, register, autoFocus, name }: SelectFieldProps) {
  return (
    <div className={styles.field}>
      <select
        name={name}
        autoFocus={autoFocus}
        ref={register({
          required: true,
        })}
      >
        {options.map(x => (
          <option value={x.id} key={x.id}>
            {x.name}
          </option>
        ))}
      </select>
    </div>
  )
}
