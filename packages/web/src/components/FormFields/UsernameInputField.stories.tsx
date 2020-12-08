import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { useForm } from 'react-hook-form'

import UsernameInputField from './UsernameInputField'
import { noop } from '../../utils'

export default {
  title: '表单/用户名输入框',
  component: UsernameInputField,
} as Meta

type FormValues = {
  username: string
}

export function Basic() {
  const { register, handleSubmit, errors } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
  })
  return (
    <form onSubmit={handleSubmit(noop)}>
      <UsernameInputField register={register} label="开个大用户名" placeholder="输入您的用户名" fieldError={errors.username} />
    </form>
  )
}
