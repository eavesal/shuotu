import React, { useState } from 'react'
import { Meta } from '@storybook/react/types-6-0'

import PUBGUserSection from './index'
import { PUBGInsigniasTier, PUBGRankGameMode } from '../../../constants/pubg'
import { getSeasonsByPlatform } from '../../../data/pubg/seasons'
import { GamePlatforms } from '../../../constants'

export default {
  title: 'PUBG/用户信息',
  component: PUBGUserSection,
} as Meta

// const mockSeasons = ['division.bro.official.2020-01', 'division.bro.official.2020-02', 'division.bro.official.2020-03']
const seasons = getSeasonsByPlatform(GamePlatforms.STEAM)
const mockSeasons = seasons.map(x =>
  x.endDate ? `${x.startDate.format('YYYY.MM')}-${x.endDate.format('YYYY.MM')}` : '当前赛季',
)

export function Basic() {
  const [mode, setMode] = useState(PUBGRankGameMode.SQUAD)
  const [season, setSeason] = useState(mockSeasons[0])

  return (
    <PUBGUserSection
      nickname="我的昵称"
      mode={mode}
      seasons={mockSeasons}
      season={season}
      onModeChanged={setMode}
      onSeasonChanged={setSeason}
      tier={{ tier: PUBGInsigniasTier.PLATINUM, subTier: '1' }}
    />
  )
}
