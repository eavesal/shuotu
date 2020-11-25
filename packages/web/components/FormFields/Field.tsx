import React from 'react'
import { FieldError } from 'react-hook-form'
import cx from 'classnames'

import styles from './Field.module.css'
import FieldMessage, { FieldMessageType } from './FieldMessage'

interface FieldProps {
  label?: string
  children: React.ReactNode
  fieldError?: FieldError
  error?: Error
  className?: string
}

export default function Field({ label, fieldError, error, children, className }: FieldProps) {
  return (
    <div className={cx(styles.field, className)}>
      {label && <label>{label}</label>}
      {children}
      {!fieldError && !error && <FieldMessage />}
      {error && <FieldMessage type={FieldMessageType.ERROR} msg={error.message} />}
    </div>
  )
}
