import React, { useContext, useMemo } from 'react'
import { select } from 'd3-selection'
import { zoom, zoomIdentity } from 'd3-zoom'
import { tile } from 'd3-tile'
import { min } from 'ramda'

import styles from './index.module.css'
import HighLight from './HighLight'

type MapProps = typeof Map.defaultProps & {
  tilePrefix: string
  tileSize: number
  mapPixelSize: number
  mapSize: number
  children?: React.ReactChild
}

interface MapState {
  width: number
  height: number
  transform?: Transform
}

type Point = [number, number]

interface Transform {
  k: number
  x: number
  y: number
  apply([x, y]: Point): Point | undefined
  scale(x: number): number | undefined
}

export const MapContext = React.createContext<{
  transform?: Transform
  size: number
}>({
  size: 1,
})

export function useApply([x, y]: Point) {
  const { transform, size } = useContext(MapContext)
  if (transform && transform.apply) {
    return transform.apply([x / size - 0.5, y / size - 0.5])
  }
}

export function useMultiApply(...p: Point[]) {
  const { transform, size } = useContext(MapContext)
  if (transform && transform.apply) {
    return p.map(x => transform.apply([x[0] / size - 0.5, x[1] / size - 0.5]))
  }
}

export function useScale(r: number) {
  const { transform, size } = useContext(MapContext)
  if (transform && transform.scale) {
    return (r / size) * transform.k
  }
}

export function useStaticPosition([x, y]: Point) {
  const { size } = useContext(MapContext)
  return useMemo(() => [x / size - 0.5, y / size - 0.5], [size, x, y])
}

interface StaticLayerProps {
  children?: React.ReactChild
}

export function StaticLayer({ children }: StaticLayerProps) {
  const { transform } = useContext(MapContext)
  if (!transform) {
    return null
  }
  return <g transform={transform.toString()}>{children}</g>
}

export default class Map extends React.Component<MapProps, MapState> {
  tileGroup: any = null
  onZoomIn: (() => void) | undefined = undefined
  onZoomOut: (() => void) | undefined = undefined
  onZoomCover: (() => void) | undefined = undefined

  static defaultProps = {
    tileSize: 256,
    mapPixelSize: 8192,
  }

  constructor(props: MapProps) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
    }
  }

  refCallback = (node: HTMLElement | null) => {
    if (node) {
      const { width, height } = node.getBoundingClientRect()
      this.setState({ width, height })
    }
  }

  svgRefCallback = (node: SVGSVGElement | null) => {
    const { tileSize, mapPixelSize } = this.props
    const { width, height } = this.state
    const minExtentSize = min(width, height)

    if (node) {
      const svg = select<SVGSVGElement, null>(node)
      const tiler = tile()
        .extent([
          [0, 0],
          [width, height],
        ])
        .tileSize(tileSize)

      const zoomer = zoom<SVGSVGElement, null>()
        .scaleExtent([minExtentSize, mapPixelSize])
        .extent([
          [0, 0],
          [width, height],
        ])
        .on('zoom', event => this.onZoom(tiler, event.transform))

      this.tileGroup = svg.select('#tile')

      svg
        .call(zoomer)
        .call(zoomer.transform, zoomIdentity.translate(width >> 1, height >> 1).scale(minExtentSize))
        .on('wheel', e => e.preventDefault())

      this.onZoomIn = () => zoomer.scaleBy(svg, 1.5)
      this.onZoomOut = () => zoomer.scaleBy(svg, 1 / 1.5)
      this.onZoomCover = () => {
        svg.call(zoomer.transform, zoomIdentity.translate(width >> 1, height >> 1).scale(minExtentSize))
      }
    }
  }

  onZoom(tiler, transform) {
    const { tilePrefix } = this.props
    const tiles = tiler(transform)

    this.tileGroup
      .selectAll('image')
      .data(tiles, d => d)
      .join('image')
      .attr('xlink:href', ([x, y, z]) => `${tilePrefix}/${z}-${x}-${y}.png`)
      .attr('x', ([x]) => (x + tiles.translate[0]) * tiles.scale)
      .attr('y', ([, y]) => (y + tiles.translate[1]) * tiles.scale)
      .attr('width', tiles.scale)
      .attr('height', tiles.scale)
    this.setState({
      transform,
    })
  }

  render() {
    const { children, mapSize } = this.props
    const { width, height, transform } = this.state
    return (
      <div className={styles.main} ref={this.refCallback}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          cursor="crosshair"
          ref={width > 0 && height > 0 ? this.svgRefCallback : undefined}
        >
          <HighLight />
          <g id="tile" pointerEvents="none" />
          <MapContext.Provider value={{ transform, size: mapSize }}>{children}</MapContext.Provider>
        </svg>
        <div className={styles.ops}>
          <span className="iconfont" onClick={this.onZoomIn}>
            &#xe664;
          </span>
          <span className="iconfont" onClick={this.onZoomOut}>
            &#xe67a;
          </span>
          <span className="iconfont" onClick={this.onZoomCover}>
            &#xe600;
          </span>
        </div>
      </div>
    )
  }
}
