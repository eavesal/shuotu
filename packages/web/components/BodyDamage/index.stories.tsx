import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import BodyDamage from './index'
import { PUBGDDamageReason } from '../../../constants/pubg'

export default {
  title: 'UI组件/人体图',
  component: BodyDamage,
} as Meta

const mockData = {
  [PUBGDDamageReason.HeadShot]: 100,
  [PUBGDDamageReason.LegShot]: 20,
  [PUBGDDamageReason.ArmShot]: 1000,
}

export function Basic() {
  return <BodyDamage damages={mockData} />
}
