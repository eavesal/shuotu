import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { useForm } from 'react-hook-form'

import MultiCheckBoxField from './MultiCheckBoxField'
import { noop } from '../../../utils'

export default {
  title: '表单/多重选择框',
  component: MultiCheckBoxField,
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
  const { handleSubmit, control } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
  })
  return (
    <form onSubmit={handleSubmit(noop)}>
      <MultiCheckBoxField name="value" control={control} options={mockOptions} />
    </form>
  )
}
