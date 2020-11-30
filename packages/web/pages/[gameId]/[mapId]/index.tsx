import React from 'react'
import { EventEmitter } from 'events'
import { InferGetStaticPropsType } from 'next'
import { MapEventEmitter } from '../../../components/Map/context'
import { MapEvents } from '../../../components/Map/enum'
import StaticMap from '../../../components/Map/StaticMap'
import useInstance from '../../../hooks/useInstance'
import { Game } from '../../../types'
import { getAll, getGameById } from '../../api/game'

import styles from './index.module.scss'

export const getStaticPaths = async () => {
  const games: Game[] = getAll()
  return {
    paths: games.reduce((arr, game) => {
      return [
        ...arr,
        ...game.maps.map(m => ({
          params: {
            gameId: game.id,
            mapId: m.id,
          },
        })),
      ]
    }, [] as string[]),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const { gameId, mapId } = params
  const game = getGameById(gameId)
  const map = game.maps.find(x => x.id === mapId)

  return {
    props: {
      game,
      map,
    },
  }
}

export default function MapSets({ map }: InferGetStaticPropsType<typeof getStaticProps>) {
  const ee = useInstance<EventEmitter>(() => new EventEmitter())

  return (
    <div className={styles.main}>
      <MapEventEmitter.Provider value={ee}>
        <StaticMap tilePrefix={map.tile.prefix} mapPixelSize={map.mapPixelSize} mapBoundingBox={map.mapBoundingBox} />
      </MapEventEmitter.Provider>
      <div className={styles.ops}>
        <span className="iconfont" onClick={() => ee.emit(MapEvents.ZOOM_IN)}>
          &#xe664;
        </span>
        <span className="iconfont" onClick={() => ee.emit(MapEvents.ZOOM_OUT)}>
          &#xe67a;
        </span>
        <span className="iconfont" onClick={() => ee.emit(MapEvents.ZOOM_INITIAL)}>
          &#xe709;
        </span>
      </div>
    </div>
  )
}
