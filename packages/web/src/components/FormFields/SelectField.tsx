import React from 'react'
import { UseFormMethods } from 'react-hook-form'
import Field from './Field'
import styles from './Field.module.css'

interface SelectFieldProps {
  name: string
  label: string
  options: Option[]
  register: UseFormMethods['register']
  autoFocus?: boolean
  error?: Error
}

export interface Option {
  id: string | number
  name: string
}

export default function SelectField({ options, register, autoFocus, name, label, error }: SelectFieldProps) {
  return (
    <Field label={label} error={error}>
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
    </Field>
  )
}
