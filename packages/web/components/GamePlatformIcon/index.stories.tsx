import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import GamePlatformIcon from './index'
import { GamePlatforms } from '../../../constants'

export default {
  title: 'UI组件/游戏平台图标',
  component: GamePlatformIcon,
  argTypes: {
    platform: {
      control: {
        type: 'inline-radio',
        options: [GamePlatforms.PSN, GamePlatforms.XBOX, GamePlatforms.STEAM],
      },
      defaultValue: GamePlatforms.STEAM,
    },
  },
} as Meta

export function Basic(args) {
  return <GamePlatformIcon {...args} />
}
