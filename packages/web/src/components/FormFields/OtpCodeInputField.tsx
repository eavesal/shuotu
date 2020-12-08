import React, { useCallback } from 'react'
import { FieldError, UseFormMethods } from 'react-hook-form'
import { onChangeMatch } from '../../utils/form'
import Field from './Field'
import FieldMessage, { FieldMessageType } from './FieldMessage'
import useCountDown from './useCountDown'

import styles from './Field.module.css'
import Button, { ButtonApperance } from '../Button'

const required = true
const CODE_MAX_LENGTH = 6
const CODE_REG = /\d{0,6}/
const codeMaxLengthModifier = onChangeMatch(CODE_REG)

interface OptCodeInputFieldProps {
  name: string
  label: string
  placeholder: string
  register: UseFormMethods['register']
  fieldError?: FieldError
  error?: Error
  loading?: boolean
  onFetchOptCodeClicked: () => Promise<boolean>
}

export default function OptCodeInputField({
  name,
  label,
  placeholder,
  register,
  error,
  loading,
  fieldError,
  onFetchOptCodeClicked,
}: OptCodeInputFieldProps) {
  const [isCounting, countDown, startCountDown] = useCountDown(60)
  const onFetchCodeButtonClicked = useCallback(async () => {
    const isValid = await onFetchOptCodeClicked()
    isValid && startCountDown()
  }, [onFetchOptCodeClicked, startCountDown])

  return (
    <Field label={label} error={error}>
      <div className="golden-ratio">
        <input
          className={styles.hideSpin}
          name={name}
          type="number"
          maxLength={CODE_MAX_LENGTH}
          placeholder={placeholder}
          onChange={codeMaxLengthModifier}
          ref={register({
            required,
            maxLength: CODE_MAX_LENGTH,
            minLength: CODE_MAX_LENGTH,
          })}
        />
        <Button
          type="button"
          apperance={ButtonApperance.SECONDARY}
          onClick={onFetchCodeButtonClicked}
          disabled={isCounting}
          loading={loading}
          enableLoading
        >
          {isCounting ? `${countDown}s后重新获取验证码` : '获取验证码'}
        </Button>
      </div>
      {fieldError && fieldError.type === 'required' && <FieldMessage type={FieldMessageType.WARN} msg="请在上方输入验证码" />}
      {fieldError && fieldError.type !== 'required' && <FieldMessage type={FieldMessageType.WARN} msg="验证码为6个数字" />}
    </Field>
  )
}
