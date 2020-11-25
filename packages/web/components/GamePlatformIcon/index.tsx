import React from 'react'
import { GamePlatforms } from '../../../constants'

import styles from './index.module.css'

const ICON_MAP = {
  [GamePlatforms.PSN]: require('./icons/psn-50.svg'),
  [GamePlatforms.XBOX]: require('./icons/xbox-128.png'),
  [GamePlatforms.STEAM]: require('./icons/steam-128.png'),
}

interface GamePlatformIconProps {
  platform: GamePlatforms
}

export default function GamePlatformIcon({ platform }: GamePlatformIconProps) {
  return <img className={styles.main} src={ICON_MAP[platform]} alt={platform} />
}
