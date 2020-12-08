import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { useForm } from 'react-hook-form'

import SelectField from './SelectField'
import { noop } from '../../utils'

export default {
  title: '表单/选择框',
  component: SelectField,
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
  })
  return (
    <form onSubmit={handleSubmit(noop)}>
      <SelectField label="" name="value" register={register} options={mockOptions} />
    </form>
  )
}
