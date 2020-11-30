import { Games } from './enums'

export type MapSet = {
  id: string
  name: string
  cover: string
  mapPixelSize: [number, number]
  // 现有地图对应游戏世界的坐标系，当游戏世界坐标系未知的情况下，使用像素坐标系
  mapBoundingBox: [number, number, number, number]
  tile: {
    size: number
    prefix: string
  }
}

export type Game = {
  id: Games
  name: string
  cover: string
  logo: string
  maps: MapSet[]
}
