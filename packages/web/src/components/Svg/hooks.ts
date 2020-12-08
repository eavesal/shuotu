import { useContext, useMemo } from 'react'
import { tree, hierarchy } from 'd3-hierarchy'
import { SvgContext } from './Svg'

type BasicNode = {
  id: string | number
  name: string
  children: BasicNode[]
}

export function useTidyTree<T extends BasicNode>(data: T) {
  const { width, height } = useContext(SvgContext)

  const root = useMemo(() => hierarchy<T>(data), [data])

  return useMemo(() => {
    const instance = tree<T>()

    // 一个节点的高度
    const dx = 20
    // 一个节点的宽度
    const dy = width / (root.height + 1)
    instance.size([height - 20, width - dy])

    return [instance(root), dx, dy] as const
  }, [root, width, height])
}
