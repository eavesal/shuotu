import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import PUBGUser from './index'
import { GamePlatforms } from '../../../../constants'

export default {
  title: 'PUBG/用户基本信息',
  component: PUBGUser,
} as Meta

export function Basic() {
  return <PUBGUser platform={GamePlatforms.STEAM} nickname="这里是昵称" />
}
