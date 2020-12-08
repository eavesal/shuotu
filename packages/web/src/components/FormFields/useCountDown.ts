import { useCallback, useEffect, useState } from 'react'

// 单位s
export default function useCountDown(initial: number) {
  const [countDown, setCountDown] = useState(0)

  const start = useCallback(() => {
    setCountDown(initial)
  }, [setCountDown, initial])

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (countDown > 0) {
      timer = setTimeout(() => setCountDown(countDown - 1), 1000)
    }
    return () => {
      timer && clearTimeout(timer)
    }
  }, [countDown])

  return [countDown !== 0, countDown, start] as const
}
