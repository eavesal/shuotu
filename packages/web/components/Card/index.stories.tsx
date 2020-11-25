import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import Card from './index'

export default {
  title: 'UI组件/卡片',
  component: Card,
} as Meta

export function Basic(args) {
  return (
    <Card {...args} title="这里是标题" subTitle="这里是副标题">
      这里是卡片内容
    </Card>
  )
}
