import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import BarChart from './index'

export default {
  title: 'UI组件/进度图表',
  component: BarChart,
} as Meta

const mockData = [
  {
    name: '0-30米',
    value: 7,
  },
  {
    name: '30-150米',
    value: 10,
  },
  {
    name: '150-350米',
    value: 0,
  },
  {
    name: '350-1000米',
    value: 0,
  },
  {
    name: '1000米以上',
    value: 0,
  },
]

export function Basic() {
  return <BarChart items={mockData} />
}
