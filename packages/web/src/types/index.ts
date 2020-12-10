import { Point } from '../components/Map/types'
import { Games } from './enums'

export type Transform = {
  x: number
  y: number
  k: number
}

export type MapLocation = {
  id: string
  label: string
  // 根结点无parentId
  parentId?: string
  pos: Point
}

export type MapSet = {
  id: string
  name: string
  mapPixelSize: [number, number]
  // 现有地图对应游戏世界的坐标系，当游戏世界坐标系未知的情况下，使用像素坐标系
  mapBoundingBox: [number, number, number, number]
  tile: {
    size: number
    prefix: string
  }
  locations: MapLocation[]
  transform?: Transform
}

export type Game = {
  id: Games
  name: string
  cover: string
  logo?: string
  maps: MapSet[]
}
