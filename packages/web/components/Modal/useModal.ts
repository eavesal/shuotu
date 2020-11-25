import { useCallback, useState } from 'react'

export default function useModal(initial = false) {
  const [visiable, setVisiable] = useState(initial)
  const display = useCallback(() => setVisiable(true), [setVisiable])
  const hide = useCallback(() => setVisiable(false), [setVisiable])
  const toggle = useCallback(() => setVisiable(!visiable), [visiable, setVisiable])

  return {
    visiable,
    display,
    hide,
    toggle,
  }
}
