import React, { useCallback, useContext } from 'react'
import cx from 'classnames'
import { SvgContext } from '../Svg/Svg'

import styles from './ClickCapture.module.scss'
import { useInvertPointsFn } from './hooks'
import { Point } from './types'

export enum CaptureModes {
  TEXT = 'text',
}

interface ClickCaptureProps {
  mode: CaptureModes
  onClick?(e: React.MouseEvent, p: Point): void
}

export default function ClickCapture({ mode, onClick }: ClickCaptureProps) {
  const { width, height } = useContext(SvgContext)
  const invert = useInvertPointsFn()
  const handleClick = useCallback(
    (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
      const p: Point = [e.pageX, e.pageY]
      onClick && onClick(e, invert(p)[0])
    },
    [invert, onClick],
  )
  return <rect x={0} y={0} width={width} height={height} className={cx(styles.main, styles[mode])} onClick={handleClick} />
}
