import React from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.css'

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>页面未找到</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </div>
        <p className={styles.p}>Page not found.</p>
      </div>
    </>
  )
}
