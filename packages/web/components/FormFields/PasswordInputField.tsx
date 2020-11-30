import React from 'react'
import { FieldError, UseFormMethods } from 'react-hook-form'
import Field from './Field'
import FieldMessage, { FieldMessageType } from './FieldMessage'

const required = true
export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 20

interface PasswordInputFieldProps {
  name: string
  label: string
  placeholder: string
  register: UseFormMethods['register']
  fieldError?: FieldError
  error?: Error
  autofocus?: boolean
}

function passwordValidator(password: string) {
  const numbers = password.match(/\d+/)
  const isOnlyNumbers = numbers && numbers[0].length === password.length

  const alphabet = password.match(/[a-zA-Z]+/)
  const isOnlyAlphabet = alphabet && alphabet[0].length === password.length

  return !(isOnlyAlphabet || isOnlyNumbers)
}

export default function PasswordInputField({
  name,
  label,
  placeholder,
  register,
  error,
  fieldError,
  autofocus,
}: PasswordInputFieldProps) {
  return (
    <Field label={label} fieldError={fieldError} error={error}>
      <input
        type="password"
        name={name}
        placeholder={placeholder}
        minLength={PASSWORD_MIN_LENGTH}
        maxLength={PASSWORD_MAX_LENGTH}
        autoFocus={autofocus}
        ref={register({
          required,
          minLength: PASSWORD_MIN_LENGTH,
          maxLength: PASSWORD_MAX_LENGTH,
          validate: passwordValidator,
        })}
      />
      {fieldError && fieldError.type === 'required' && <FieldMessage type={FieldMessageType.WARN} msg="请在上方输入您的密码" />}
      {fieldError && fieldError.type !== 'required' && fieldError.message && (
        <FieldMessage type={FieldMessageType.WARN} msg={fieldError.message} />
      )}
      {fieldError && fieldError.type !== 'required' && !fieldError.message && (
        <FieldMessage type={FieldMessageType.WARN} msg="密码为8-20个字符，必须包含字母、数字、特殊字符中的两种" />
      )}
    </Field>
  )
}
