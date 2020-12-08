import React, { CSSProperties, ReactNode, useCallback, useEffect, useState } from 'react'
import cx from 'classnames'

import styles from './index.module.css'

export enum AnchorPosition {
  TOP,
  RIGHT,
  LEFT,
  BOTTOM,
}

const DEFAULT_GAP = 5

function getCss(position: AnchorPosition, rect: DOMRect): CSSProperties {
  const { x, y, width, height } = rect
  switch (position) {
    case AnchorPosition.TOP:
      return {
        left: x + width / 2,
        top: y - DEFAULT_GAP,
        transform: 'translate(-50%, -100%)',
      }
    case AnchorPosition.RIGHT:
      return {
        left: x + width + DEFAULT_GAP,
        top: y + height / 2,
        transform: 'translate(0, -50%)',
      }
    case AnchorPosition.LEFT:
      return {
        left: x - DEFAULT_GAP,
        top: y + height / 2,
        transform: 'translate(-100%, -50%)',
      }
    case AnchorPosition.BOTTOM:
      return {
        left: x + width / 2,
        top: y + height + DEFAULT_GAP,
        transform: 'translate(-50%, 0)',
      }
    default:
      return {}
  }
}

export function useTooltip(position: AnchorPosition, timeout = Infinity) {
  const [css, setCss] = useState<CSSProperties | undefined>()

  const onTrigger = useCallback(
    (e: React.MouseEvent<Element, MouseEvent>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      setCss({
        display: 'inline-block',
        ...getCss(position, rect),
      })
    },
    [setCss, position],
  )

  const onMouseLeave = useCallback(() => {
    setCss(undefined)
  }, [setCss])

  useEffect(() => {
    const fn = setTimeout(() => {
      if (css) {
        setCss(undefined)
      }
    }, timeout)
    return () => clearTimeout(fn)
  }, [timeout, css])

  return [css, { onTrigger, onMouseLeave }] as const
}

interface ToolTipProps {
  className?: string
  children?: ReactNode
  style?: CSSProperties
}

export default function ToolTip({ children, style, className }: ToolTipProps) {
  return (
    <div className={cx(styles.tooltip, className)} style={style}>
      {children}
    </div>
  )
}
