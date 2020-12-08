import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { useForm } from 'react-hook-form'

import PhonenumberInputField from './PhonenumberInputField'
import { noop } from '../../utils'

export default {
  title: '表单/手机号输入框',
  component: PhonenumberInputField,
} as Meta

type FormValues = {
  phoneNumber: string
}

export function Basic() {
  const { register, handleSubmit, errors } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
  })
  return (
    <form onSubmit={handleSubmit(noop)}>
      <PhonenumberInputField
        name="phoneNumber"
        register={register}
        label="手机号（+86）"
        placeholder="输入您的手机号"
        fieldError={errors.phoneNumber}
      />
    </form>
  )
}
