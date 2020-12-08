import React, { useCallback, useState } from 'react'

export const SvgContext = React.createContext<{
  width: number
  height: number
}>({
  width: 0,
  height: 0,
})

interface SvgProps {
  children?: React.ReactNode
}

const Svg = React.forwardRef<SVGSVGElement, SvgProps>(({ children }: SvgProps, ref: React.Ref<SVGSVGElement>) => {
  const [[width, height], setSize] = useState([0, 0])

  const divRef = useCallback((e: HTMLDivElement) => {
    if (!e) {
      return
    }
    const rect = e.getBoundingClientRect()
    setSize([rect.width, rect.height])
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }} ref={divRef}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} ref={height > 0 && width > 0 ? ref : undefined}>
        <SvgContext.Provider value={{ width, height }}>{children}</SvgContext.Provider>
      </svg>
    </div>
  )
})

export default Svg
