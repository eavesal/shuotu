import React from 'react'
import FieldMessage, { FieldMessageType } from '../FormFields/FieldMessage'

interface FormErrorProps {
  error?: Error
}

export default function FormError({ error }: FormErrorProps) {
  if (!error) {
    return <FieldMessage />
  }

  return <FieldMessage type={FieldMessageType.ERROR} msg={error.message} />
}
