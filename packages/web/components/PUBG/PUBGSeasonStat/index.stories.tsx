import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import PUBGSeasonStat, { PUBGSeasonStatCardStyle } from './index'

export default {
  title: 'UI组件/数据卡片',
  component: PUBGSeasonStat,
} as Meta

const mockData = [
  {
    title: '总场数',
    nodes: [
      {
        name: '总场数',
        text: '200',
        style: PUBGSeasonStatCardStyle.LARGE,
      },
    ],
  },
  {
    title: '吃鸡数',
    nodes: [
      {
        name: '吃鸡数',
        text: '64',
        style: PUBGSeasonStatCardStyle.LARGE,
      },
      {
        name: '吃鸡比例',
        text: '1.0%',
        style: PUBGSeasonStatCardStyle.SMALL,
      },
    ],
  },
]

export function Basic() {
  return <PUBGSeasonStat items={mockData} />
}
