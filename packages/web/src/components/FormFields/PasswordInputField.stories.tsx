import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { useForm } from 'react-hook-form'

import PasswordInputField from './PasswordInputField'
import { noop } from '../../utils'

export default {
  title: '表单/密码输入框',
  component: PasswordInputField,
} as Meta

type FormValues = {
  password: string
}

export function Basic() {
  const { register, handleSubmit, errors } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
  })
  return (
    <form onSubmit={handleSubmit(noop)}>
      <PasswordInputField
        name="password"
        register={register}
        label="密码"
        placeholder="输入您的密码"
        fieldError={errors.password}
      />
    </form>
  )
}
