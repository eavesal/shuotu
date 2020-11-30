import { EventEmitter } from 'events'
import React from 'react'

export interface MapContextType {
  mapPixelSize: [number, number]
  mapBoundingBox: [number, number, number, number]
}

export const MapContext = React.createContext<MapContextType>({
  mapPixelSize: [0, 0],
  mapBoundingBox: [0, 0, 0, 0],
})

export const MapEventEmitter = React.createContext<EventEmitter | undefined>(undefined)
