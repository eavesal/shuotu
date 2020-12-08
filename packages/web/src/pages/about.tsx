import React from 'react'
import cx from 'classnames'
import { NextSeo } from 'next-seo'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

export default function JoinPage() {
  return (
    <>
      <NextSeo title="关于我们" />
      <NavBar />
      <div className={cx('view')} style={{ minHeight: '75vh' }}>
        <h4>关于项目</h4>
        <p>该项目致力于在不破坏游戏乐趣的前提下，帮助玩家更便捷地探索游戏世界，管理游戏目标，健康、合理、科学地进行游戏。</p>
        <h4>关于数据</h4>
        <p>地图来源于匿名网友的贡献，如果您有更好的地图，欢迎随时与我联系。</p>
        <p>数据来源于作者本人从游戏或网络上的搜集与整理，其存在考据不周的可能性。若细心的您发现数据的问题，欢迎与我联系。</p>
        <h4>加入我们</h4>
        <p>该项目目前没有产生盈利，也没有开放招聘。如果您对该项目有兴趣，欢迎在Github上进行讨论，或通过下方邮箱联系我。</p>
      </div>
      <Footer />
    </>
  )
}
