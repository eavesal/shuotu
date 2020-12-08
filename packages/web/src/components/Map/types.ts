import { Selection } from 'd3-selection'

export type SvgSelection = Selection<SVGSVGElement, null, null, undefined> | null
export type Point = [number, number]
export type Transform = {
  k: number
  x: number
  y: number
}
