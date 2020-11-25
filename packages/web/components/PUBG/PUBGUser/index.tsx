import React from 'react'
import { GamePlatforms } from '../../../../constants'
import GamePlatformIcon from '../../GamePlatformIcon'

import styles from './index.module.css'

interface PUBGUserProps {
  platform: GamePlatforms
  nickname: string
}

export default function PUBGUser({ platform, nickname }: PUBGUserProps) {
  return (
    <div className={styles.main}>
      <GamePlatformIcon platform={platform} />
      <p className={styles.nickname}>{nickname}</p>
    </div>
  )
}
