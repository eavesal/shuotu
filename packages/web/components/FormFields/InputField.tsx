import React from 'react'
import { FieldError, UseFormMethods } from 'react-hook-form'
import Field from './Field'
import FieldMessage, { FieldMessageType } from './FieldMessage'

interface InputFieldProps {
  type: 'text'
  name: string
  label: string
  placeholder: string
  register: UseFormMethods['register']
  error?: Error
  fieldError?: FieldError
  autoFocus?: boolean
  required?: boolean
  requiredMsg?: string
  warningMsg?: string
}

export default function InputField({
  label,
  placeholder,
  fieldError,
  error,
  register,
  autoFocus,
  type,
  name,
  required,
  requiredMsg,
  warningMsg,
}: InputFieldProps) {
  return (
    <Field label={label} error={error} fieldError={fieldError}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        ref={register({
          required,
        })}
      />
      {fieldError && fieldError.type === 'required' && <FieldMessage type={FieldMessageType.WARN} msg={requiredMsg} />}
      {fieldError && fieldError.type !== 'required' && <FieldMessage type={FieldMessageType.WARN} msg={warningMsg} />}
    </Field>
  )
}
