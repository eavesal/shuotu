import React from 'react'
import cx from 'classnames'

import styles from './FieldMessage.module.css'

export enum FieldMessageType {
  ERROR = 'error',
  WARN = 'warn',
}

const MAP = {
  [FieldMessageType.ERROR]: 'icon-tanhao',
  [FieldMessageType.WARN]: 'icon-warning',
}

interface FieldMessageProps {
  type?: FieldMessageType
  msg?: string
}

export default function FieldMessage({ type, msg }: FieldMessageProps) {
  return <p className={cx('iconfont', styles.msg, ...(type ? [styles[type], MAP[type]] : []))}>{msg || ' '}</p>
}
