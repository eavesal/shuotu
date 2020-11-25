import React from 'react'
import { RomaNumberMap } from '../../../../constants'
import { PUBGInsigniasIconMap, PUBGInsigniasMap, PUBGInsigniasTier } from '../../../../constants/pubg'
import { RankedGameModeStats } from '../../../../services/pubg/player'
import Card from '../../Card'

import styles from './index.module.css'

interface PUBGInsigniasProps {
  stats?: RankedGameModeStats
}

export default function PUBGInsignias({ stats }: PUBGInsigniasProps) {
  if (!stats) {
    return null
  }

  const { currentTier: tier, roundsPlayed, currentRankPoint } = stats
  const tierIconKey = tier.tier === PUBGInsigniasTier.MASTER ? tier.tier : `${tier.tier}-${tier.subTier}`

  return (
    <Card title="当前段位" subTitle={`共计${roundsPlayed}场竞技比赛`} className={styles.main}>
      <>
        <img className={styles.icon} src={PUBGInsigniasIconMap[tierIconKey]} alt={tierIconKey} />
        <div className={styles.text}>
          <div>{PUBGInsigniasMap[tier.tier] + (tier.tier === PUBGInsigniasTier.MASTER ? '' : RomaNumberMap[tier.subTier])}</div>
          <div className={styles.ranked}>{currentRankPoint}</div>
        </div>
      </>
    </Card>
  )
}
