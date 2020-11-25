import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import ScrollTab, { ScrollTabItem } from './index'

export default {
  title: 'UI组件/滚动TAB',
  component: ScrollTab,
} as Meta

const TabMockData = [
  {
    id: '0',
    title: '枪械',
    subTitle: '123伤害/2击杀',
  },
  {
    id: '1',
    title: '投掷物',
    subTitle: '123伤害/2击杀',
  },
  {
    id: '2',
    title: '特殊武器',
    subTitle: '123伤害/2击杀',
  },
]

export function Basic() {
  return (
    <ScrollTab items={TabMockData}>
      <ScrollTabItem id={TabMockData[0].id}>枪械</ScrollTabItem>
      <ScrollTabItem id={TabMockData[1].id}>投掷物</ScrollTabItem>
      <ScrollTabItem id={TabMockData[2].id}>特殊武器</ScrollTabItem>
    </ScrollTab>
  )
}
