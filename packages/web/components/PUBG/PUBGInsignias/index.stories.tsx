import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import PUBGInsignias from './index'
import { PUBGInsigniasTier } from '../../../../constants/pubg'

export default {
  title: 'PUBG/段位',
  component: PUBGInsignias,
} as Meta

const mockStats = {
  currentRankPoint: 1000,
  currentTier: { tier: PUBGInsigniasTier.PLATINUM, subTier: '1' as const },
  roundsPlayed: 262,
}

export function Basic() {
  return <PUBGInsignias stats={mockStats} />
}
