import React from 'react'
import cx from 'classnames'

import styles from './Field.module.css'
import FieldMessage, { FieldMessageType } from './FieldMessage'

interface FieldProps {
  label?: string
  children: React.ReactNode
  error?: Error
  className?: string
}

export default function Field({ label, error, children, className }: FieldProps) {
  return (
    <div className={cx(styles.field, className)}>
      {label && <label>{label}</label>}
      {children}
      {error && <FieldMessage type={FieldMessageType.ERROR} msg={error.message} />}
    </div>
  )
}
