import React from 'react'
import Link from 'next/link'

import styles from './index.module.scss'

export default function NavBar() {
  return (
    <div className={styles.main}>
      <div className="view">
        <nav className={styles.nav}>
          <div className={styles.menuWrapper}>
            <Link href="/">
              <a className={styles.logo}>
                <div>说图坊</div>
                <div className={styles.sub}>MapTalks Workshop</div>
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
