import React from 'react'

import Loading from '../Loading'
import styles from './index.module.css'

interface ScrollLoadingProps {
  loading: boolean
  hasMore: boolean
}

export default function ScrollLoading({ loading, hasMore }: ScrollLoadingProps) {
  if (loading) {
    return (
      <div className={styles.loading}>
        加载更多数据中
        <Loading type="small" />
      </div>
    )
  }
  return <div className={styles.loading}>{hasMore ? '上滑页面，以便加载更多数据' : '暂无更多数据'}</div>
}
