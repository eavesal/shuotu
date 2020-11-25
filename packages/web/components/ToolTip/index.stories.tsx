import React from 'react'
import { Meta } from '@storybook/react/types-6-0'

import ToolTip, { AnchorPosition, useTooltip } from './index'
import Button from '../Button'

export default {
  title: 'UI组件/ToolTip',
  component: ToolTip,
} as Meta

export function Basic() {
  const [style, { onTrigger, onMouseLeave }] = useTooltip(AnchorPosition.RIGHT)
  return (
    <div>
      <Button onMouseEnter={onTrigger} onMouseLeave={onMouseLeave}>
        触发按钮
      </Button>
      <ToolTip style={style}>浮层内容</ToolTip>
    </div>
  )
}
