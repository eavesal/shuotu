import React from 'react'
import { FieldError, UseFormMethods } from 'react-hook-form'

import { onChangeMatch } from '../../utils/form'
import Field from './Field'
import FieldMessage, { FieldMessageType } from './FieldMessage'

import styles from './Field.module.css'

const required = true
const PHONE_NUMBER_MAX_LENGTH = 11
const PHONE_NUMBER_REG = /\d{0,11}/
const phoneNumberMaxLengthModifier = onChangeMatch(PHONE_NUMBER_REG)

interface PhonenumberInputFieldProps {
  name: string
  label: string
  placeholder: string
  register: UseFormMethods['register']
  error?: Error
  fieldError?: FieldError
}

export default function PhonenumberInputField({
  label,
  name,
  placeholder,
  fieldError,
  error,
  register,
}: PhonenumberInputFieldProps) {
  return (
    <Field label={label} error={error}>
      <input
        className={styles.hideSpin}
        name={name}
        type="number"
        placeholder={placeholder}
        onChange={phoneNumberMaxLengthModifier}
        ref={register({
          required,
          maxLength: PHONE_NUMBER_MAX_LENGTH,
          minLength: PHONE_NUMBER_MAX_LENGTH,
        })}
      />
      {fieldError && fieldError.type === 'required' && (
        <FieldMessage type={FieldMessageType.WARN} msg="请在上方输入您的手机号" />
      )}
      {fieldError && fieldError.type !== 'required' && <FieldMessage type={FieldMessageType.WARN} msg="手机号为11个数字" />}
    </Field>
  )
}
