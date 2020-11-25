import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { useForm } from 'react-hook-form'

import OtpCodeInputField from './OtpCodeInputField'
import { noop } from '../../../utils'

export default {
  title: '表单/验证码输入框',
  component: OtpCodeInputField,
} as Meta

type FormValues = {
  otpCode: string
}

export function Basic() {
  const { register, handleSubmit, errors } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
  })
  return (
    <form onSubmit={handleSubmit(noop)}>
      <OtpCodeInputField
        name="otpCode"
        register={register}
        label="验证码"
        placeholder="输入您的验证码"
        fieldError={errors.otpCode}
        onFetchOptCodeClicked={async () => true}
      />
    </form>
  )
}
