import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import UserNavCard from './index'

export default {
  title: '全局/导航栏用户卡片',
  component: UserNavCard,
} as Meta

function Basic() {
  return <UserNavCard username="qwertyuioasdfghjkzxcvbnm" />
}

export { Basic }
