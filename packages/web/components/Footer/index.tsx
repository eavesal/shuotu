import Link from 'next/link'
import React from 'react'

import styles from './index.module.scss'

export default function Footer() {
  return (
    <div>
      <ul className={styles.ul}>
        <li>
          <Link href="mailto:lijingyu68@gmail.com">建议与反馈</Link>
        </li>
        <li>
          <Link href="/join">加入我们</Link>
        </li>
        <li>
          <Link href="https://github.com/eavesal/shuotu">查阅源码（Github）</Link>
        </li>
        <li>
          <Link href="https://github.com/eavesal/shuotu/issues/new">提交Issue</Link>
        </li>
      </ul>
    </div>
  )
}
