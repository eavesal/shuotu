import { Games } from './enums'

export type MapSet = {
  id: string
  name: string
  cover: string
  tile: {
    size: number
    maxExtent: [number, number]
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
