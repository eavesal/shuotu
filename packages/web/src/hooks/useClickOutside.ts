import { useEffect, useRef } from 'react'

export default function useClickOutside(fn: (e: globalThis.MouseEvent) => void) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref || !ref.current) {
      return
    }

    function handleClickOutside(event: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn(event)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [fn, ref])

  return { ref }
}
