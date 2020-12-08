import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import Loading from './index'

export default {
  title: 'UI组件/Loading',
  component: Loading,
} as Meta

export function Small() {
  return <Loading type="small" />
}

export function Large() {
  return <Loading type="large" />
}
