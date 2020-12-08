import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import ProgressBar from './index'

export default {
  title: 'UI组件/进度条',
  component: ProgressBar,
} as Meta

export function Basic() {
  return <ProgressBar total={500} amont={400} styleType="error" />
}
