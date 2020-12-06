import { max, memoizeWith, min, range } from 'ramda'
import { Point } from './types'

const DEPTH_TO_SIZE = range(0, 16).map(x => 2 << (x + 7))

const getScaleBias = memoizeWith(
  n => n.toString(),
  (size: number) => {
    for (let i = 0; i < DEPTH_TO_SIZE.length - 1; i++) {
      const cur = DEPTH_TO_SIZE[i]
      const next = DEPTH_TO_SIZE[i + 1]
      if (size <= next && size > cur) {
        return next
      }
    }
  },
)

// fit the size in container and keep the aspect ratio
function getFitSize(size: Point, container: Point): Point {
  const ratio = size[0] / size[1]
  if (ratio * container[1] <= container[0]) {
    return [ratio * container[1], container[1]]
  }
  return [container[0], container[0] / ratio]
}

// based on map size and container size, calc the scale extent size
export function getScaleExtent(size: Point, container: Point): Point {
  const minSize = min(...size)
  const maxSize = max(...size)
  const maxBias = getScaleBias(maxSize)
  const minBias = getScaleBias(minSize)
  console.log('fit size', getFitSize(size, container))

  // using this ratio is to make scale corrent when some map that not normalized map (2^N)
  const minExtent = (min(...getFitSize(size, container)) * minBias) / minSize
  // .49 is basicly to avoid load next depth of image but keep map can zoom bigger
  // 8 is start depth, 2^8=256=tileSize
  const maxExtent = Math.pow(2, 8.49 + DEPTH_TO_SIZE.indexOf(maxBias))
  return [minExtent, maxExtent]
}

export function getScaleCenter(size: Point, container: Point): Point {
  const fitSize = getFitSize(size, container)
  const widthRatio = size[0] / getScaleBias(size[0])
  const heightRatio = size[1] / getScaleBias(size[1])
  console.log('ratio', widthRatio, heightRatio)
  return [
    ((fitSize[0] >> 1) * (1 - widthRatio)) / widthRatio + (container[0] >> 1),
    ((fitSize[1] >> 1) * (1 - heightRatio)) / heightRatio + (container[1] >> 1),
  ]
}

// size: the pixel size of the map
// return a function that using x,y,z from tile to get the tile size
export function tileSizeGetter(size: Point) {
  const base = max(...size)
  const bias = getScaleBias(base)
  const scale: Point = [size[0] / bias, size[1] / bias]

  return (z: number, x: number, y: number): Point => {
    const expectedSize = DEPTH_TO_SIZE[z]
    const mapSize = [scale[0] * expectedSize, scale[1] * expectedSize]
    let width = DEPTH_TO_SIZE[0]
    let height = DEPTH_TO_SIZE[0]
    // the coordinate of tile
    const px = x * DEPTH_TO_SIZE[0]
    const py = y * DEPTH_TO_SIZE[0]

    // no tile for this position
    if (px >= mapSize[0] || py >= mapSize[1]) {
      return [0, 0]
    }

    // partial tile with x
    if (mapSize[0] % width !== 0 && x === Math.floor(mapSize[0] / width)) {
      width = mapSize[0] - px
    }
    // partial tile with y
    if (mapSize[1] % height !== 0 && y === Math.floor(mapSize[1] / height)) {
      height = mapSize[1] - py
    }
    return [width, height]
  }
}
