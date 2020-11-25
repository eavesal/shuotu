import React from 'react'
import { RomaNumberMap } from '../../../constants'
import { PUBGInsigniasIconMap, PUBGInsigniasMap, PUBGRankGameMode, PUBGRankGameModeMap } from '../../../constants/pubg'
import { PUBGTier } from '../../../services/pubg/player'

import styles from './index.module.css'

interface PUBGUserSectionProps {
  nickname: string
  avatar?: string
  seasons: string[]
  tier: PUBGTier
  mode: PUBGRankGameMode
  season: string
  onModeChanged?(mode: PUBGRankGameMode): void
  onSeasonChanged?(id: string): void
}

const DEFAULT_AVATAR = 'https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg'

type Season = {
  title: string
  id: string
}

// function formatSeasons(seasons: string[]) {
//   let results: Season[] = []
//   seasons.forEach(x => {
//     const season = last(x.split('.'))!
//     const match = season.match(/^(\d{4})-(\d{2})$/)
//     if (match && match[1] && match[2]) {
//       results.push({
//         title: `${match[1]}年第${parseInt(match[2], 10)}赛季`,
//         id: x,
//       })
//     }
//   })
//   return results
// }

export default function PUBGUserSection({
  avatar,
  nickname,
  mode,
  season,
  tier,
  seasons,
  onModeChanged,
  onSeasonChanged,
}: PUBGUserSectionProps) {
  const tierIconKey = tier.subTier ? `${tier.tier}-${tier.subTier}` : tier.tier
  return (
    <div className={styles.main}>
      <img src={avatar || DEFAULT_AVATAR} alt="" />
      <div className={styles.info}>
        <div className={styles.nickname}>{nickname}</div>
        <div className={styles.seasons}>
          <select name="season" value={season} onChange={e => onSeasonChanged && onSeasonChanged(e.target.value)}>
            {seasons.map(x => (
              <option value={x} key={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.insignias}>
          <img className={styles.icon} src={PUBGInsigniasIconMap[tierIconKey]} alt={tierIconKey} />
          {PUBGInsigniasMap[tier.tier] + (tier.subTier ? RomaNumberMap[tier.subTier] : '')}
          <select name="mode" value={mode} onChange={e => onModeChanged && onModeChanged(e.target.value as PUBGRankGameMode)}>
            {Object.keys(PUBGRankGameModeMap).map(x => (
              <option value={x} key={x}>
                {PUBGRankGameModeMap[x]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
