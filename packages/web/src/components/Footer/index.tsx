import Link from 'next/link'
import React from 'react'

import styles from './index.module.scss'

export default function Footer() {
  return (
    <div>
      <ul className={styles.ul}>
        <li>
          <Link href="mailto:lijingyu68@gmail.com" passHref>
            <a>建议与反馈</a>
          </Link>
        </li>
        <li>
          <Link href="/about" passHref>
            <a>关于我们</a>
          </Link>
        </li>
        <li>
          <Link href="http://beian.miit.gov.cn" passHref>
            <a>蜀ICP备2020034853</a>
          </Link>
        </li>
        <li>
          <Link href="https://github.com/eavesal/shuotu" passHref>
            <a>查阅源码（Github）</a>
          </Link>
        </li>
        <li>
          <Link href="https://github.com/eavesal/shuotu/issues/new" passHref>
            <a>提交Issue</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
