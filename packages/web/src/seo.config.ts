import { DefaultSeoProps } from 'next-seo'
import { ENV } from './constants'

export default {
  title: '说图坊',
  titleTemplate: '%s | 说图坊',
  description:
    '说图坊是一个由游戏爱好者创办的，致力于在不破坏游戏乐趣的前提下，帮助玩家更便捷地探索游戏世界，管理游戏目标，健康、合理、科学地进行游戏。',
  canonical: 'http://shuotu.fun',
  dangerouslySetAllPagesToNoFollow: process.env.ENV !== ENV.PROD,
  dangerouslySetAllPagesToNoIndex: process.env.ENV !== ENV.PROD,
} as DefaultSeoProps
