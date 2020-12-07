import React from 'react'
import cx from 'classnames'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

export default function JoinPage() {
  return (
    <div>
      <NavBar />
      <div className={cx('view')} style={{ minHeight: '75vh' }}>
        <h4>关于项目</h4>
        <p>该项目致力于在不破坏游戏乐趣的前提下，帮助玩家更便捷地探索游戏世界，管理游戏目标，健康、合理、科学地进行游戏。</p>
        <h4>加入我们</h4>
        <p>该项目目前没有产生盈利，也没有开放招聘。如果您对该项目有兴趣，欢迎在Github上进行讨论，或通过下方邮箱联系我。</p>
      </div>
      <Footer />
    </div>
  )
}
