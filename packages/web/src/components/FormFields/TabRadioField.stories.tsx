import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { useForm } from 'react-hook-form'

import TabRadioField from './TabRadioField'
import { noop } from '../../utils'

export default {
  title: '表单/TAB选择框',
  component: TabRadioField,
} as Meta

type FormValues = {
  value: string
}

const mockOptions = [
  {
    id: '1',
    name: '选项1',
  },
  {
    id: '2',
    name: '选项2',
  },
]

export function Basic() {
  const { register, handleSubmit } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      value: mockOptions[0].id,
    },
  })
  return (
    <form onSubmit={handleSubmit(noop)}>
      <TabRadioField name="value" register={register} options={mockOptions} />
    </form>
  )
}
