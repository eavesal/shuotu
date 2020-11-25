import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import SoloTable from './solo-table'
import Card from '../Card'

export default {
  title: 'UI组件/单表格',
  component: SoloTable,
} as Meta

const mockData = [
  {
    name: '项目1',
    text: '内容1',
  },
  {
    name: '项目2',
    text: '内容2',
  },
]

export function Basic() {
  return (
    <Card title="一般用于卡片中">
      <SoloTable items={mockData} />
    </Card>
  )
}
