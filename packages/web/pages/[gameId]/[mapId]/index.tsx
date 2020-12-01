import React, { useCallback, useMemo, useState } from 'react'
import { EventEmitter } from 'events'
import { InferGetStaticPropsType } from 'next'
import { MapEventEmitter } from '../../../components/Map/context'
import { MapEvents } from '../../../components/Map/enum'
import StaticMap from '../../../components/Map/StaticMap'
import TextLocationLayer from '../../../components/Map/TextLocationLayer'
import useInstance from '../../../hooks/useInstance'
import { Game } from '../../../types'
import { getAll, getGameById } from '../../api/game'
import ClickCapture, { CaptureModes } from '../../../components/Map/ClickCapture'

import styles from './index.module.scss'
import { max } from 'ramda'
import { Point } from '../../../components/Map/types'

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
  const [mode, setMode] = useState<CaptureModes | undefined>(undefined)
  const ee = useInstance<EventEmitter>(() => new EventEmitter())
  const [locations, setLocations] = useState(map.locations)
  // const [activeLocation, setActiveLocation] = useState(undefined)
  const getLocationId = useMemo(
    () =>
      (function* () {
        const maxId = map.locations.reduce((prev, x) => max(prev, x.id), 0)
        while (true) {
          yield maxId
        }
      })(),
    [map.locations],
  )
  const handleAddLocation = useCallback(
    (e: React.MouseEvent, p: Point) => {
      const id = getLocationId.next().value
      setLocations([
        ...locations,
        {
          id,
          label: '新地点',
          sig: 1,
          pos: p,
        },
      ])
      // setActiveLocation(id)
      setMode(undefined)
    },
    [getLocationId, locations],
  )

  return (
    <div className={styles.main}>
      <MapEventEmitter.Provider value={ee}>
        <StaticMap tilePrefix={map.tile.prefix} mapPixelSize={map.mapPixelSize} mapBoundingBox={map.mapBoundingBox}>
          {mode === CaptureModes.TEXT && <ClickCapture mode={mode} onClick={handleAddLocation} />}
          <TextLocationLayer locations={locations} />
        </StaticMap>
      </MapEventEmitter.Provider>
      <div className={styles.ops}>
        <span
          className={mode === CaptureModes.TEXT ? styles.active : undefined}
          onClick={() => (mode === undefined ? setMode(CaptureModes.TEXT) : setMode(undefined))}
        >
          A
        </span>
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
