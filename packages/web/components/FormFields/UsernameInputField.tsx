import React from 'react'
import { FieldError, UseFormMethods } from 'react-hook-form'
import Field from './Field'
import FieldMessage, { FieldMessageType } from './FieldMessage'

const required = true
export const USERNAME_MIN_LENGTH = 4
export const USERNAME_MAX_LENGTH = 20
const USERNAME_REG = /[\u4e00-\u9fa5a-zA-Z\d]{0,20}/

interface UsernameInputFieldProps {
  label: string
  placeholder: string
  register: UseFormMethods['register']
  error?: Error
  fieldError?: FieldError
  autoFocus?: boolean
}

export default function UsernameInputField({
  label,
  placeholder,
  fieldError,
  error,
  register,
  autoFocus,
}: UsernameInputFieldProps) {
  return (
    <Field label={label} error={error} fieldError={fieldError}>
      <input
        type="text"
        name="username"
        placeholder={placeholder}
        maxLength={USERNAME_MAX_LENGTH}
        autoFocus={autoFocus}
        ref={register({
          required,
          maxLength: USERNAME_MAX_LENGTH,
          minLength: USERNAME_MIN_LENGTH,
          pattern: USERNAME_REG,
        })}
      />
      {fieldError && fieldError.type === 'required' && (
        <FieldMessage type={FieldMessageType.WARN} msg="请在上方输入您的用户名" />
      )}
      {fieldError && fieldError.type !== 'required' && (
        <FieldMessage type={FieldMessageType.WARN} msg="用户名为4-20个字符，仅支持汉字、英文和数字" />
      )}
    </Field>
  )
}
