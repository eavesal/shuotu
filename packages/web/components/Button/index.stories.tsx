import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import Button, { ButtonSize, ButtonApperance } from './index'

export default {
  title: 'UI组件/按钮',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'inline-radio',
        options: [ButtonSize.S, ButtonSize.M, ButtonSize.L, ButtonSize.XL, ButtonSize.XXL],
      },
      defaultValue: ButtonSize.S,
    },
    apperance: {
      control: {
        type: 'inline-radio',
        options: [ButtonApperance.PRIMARY, ButtonApperance.SECONDARY],
      },
      defaultValue: ButtonApperance.PRIMARY,
    },
  },
} as Meta

export function Basic(args) {
  return <Button {...args}>测试按钮</Button>
}

export function LoadingButton(args) {
  return (
    <Button {...args} enableLoading loading>
      测试按钮
    </Button>
  )
}
