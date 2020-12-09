import React from 'react'
import cx from 'classnames'

import styles from './index.module.css'
import Loading from '../Loading'

export enum ButtonSize {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
  XXL = 'xxl',
}

export enum ButtonApperance {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size?: ButtonSize
  apperance?: ButtonApperance
  enableLoading?: boolean
  loading?: boolean
}

export default function Button({
  size = ButtonSize.S,
  apperance = ButtonApperance.PRIMARY,
  children,
  enableLoading = false,
  loading = false,
  disabled = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cx(styles.button, styles[size], styles[apperance], enableLoading ? styles.loadingBtn : undefined, className)}
      disabled={loading || disabled}
      {...rest}
    >
      {children}
      {enableLoading && loading && <Loading type="small" apperance="white" className={styles.loading} />}
    </button>
  )
}
