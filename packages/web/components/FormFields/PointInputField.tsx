import React from 'react'
import { UseFormMethods, useFieldArray } from 'react-hook-form'

import Field from './Field'
import styles from './PointInputField.module.scss'

interface PointInputFieldProps {
  name: string
  label?: string
  control: UseFormMethods['control']
  register: UseFormMethods['register']
}

export default function PointInputField({ name, label, control, register }: PointInputFieldProps) {
  const { fields } = useFieldArray({
    control,
    name,
    keyName: 'id',
  })
  return (
    <Field label={label}>
      <div className={styles.field}>
        {fields.map((field, i) => (
          <input key={field.id} type="number" name={`${name}[${i}].value`} ref={register()} defaultValue={field.value} />
        ))}
      </div>
    </Field>
  )
}
