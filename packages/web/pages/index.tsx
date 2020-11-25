import NavBar from '../components/NavBar'
import styles from './index.module.scss'

export default function Home() {
  return (
    <div className={styles.main}>
      <NavBar />
      <h1>图说您的游戏旅程</h1>
      <h6>传奇装备、未知宝藏、会心彩蛋，一切皆可图说</h6>
      <div className="view">
        <ul className={styles.games}>
          <li>
            <img src="https://ys.mihoyo.com/main/_nuxt/img/47f71d4.jpg" />
            <span>原神</span>
          </li>
          <li>
            <img src="https://ys.mihoyo.com/main/_nuxt/img/47f71d4.jpg" />
            <span>塞尔达 旷野之息</span>
          </li>
          <li>
            <img src="https://ys.mihoyo.com/main/_nuxt/img/47f71d4.jpg" />
            <span>刺客信条 英灵殿</span>
          </li>
          <li>
            <img src="https://ys.mihoyo.com/main/_nuxt/img/47f71d4.jpg" />
            <span>使命召唤 战区</span>
          </li>
          <li>
            <img src="https://ys.mihoyo.com/main/_nuxt/img/47f71d4.jpg" />
            <span>绝地求生</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
