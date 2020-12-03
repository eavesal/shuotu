import React, { useCallback, useMemo, useState } from 'react'
import { EventEmitter } from 'events'
import { InferGetStaticPropsType } from 'next'
import { equals, find, findIndex, max, update } from 'ramda'
import { motion } from 'framer-motion'

import { MapEventEmitter } from '../../../components/Map/context'
import { MapEvents } from '../../../components/Map/enum'
import StaticMap from '../../../components/Map/StaticMap'
import TextLocationLayer from '../../../components/Map/TextLocationLayer'
import useInstance from '../../../hooks/useInstance'
import { Game, MapLocation } from '../../../types'
import { getAll, getGameById } from '../../api/game'
import ClickCapture, { CaptureModes } from '../../../components/Map/ClickCapture'

import styles from './index.module.scss'
import { Point } from '../../../components/Map/types'
import Sidebar from '../../../components/Sidebar'
import UpdateLocationForm from '../../../components/UpdateLocationForm'

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

const OpsBarVariants = {
  normal: {
    right: 5,
  },
  sidebar: {
    right: 395,
  },
}

export default function MapSets({ map }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [mode, setMode] = useState<CaptureModes | undefined>(undefined)
  const ee = useInstance<EventEmitter>(() => new EventEmitter())
  const [locations, setLocations] = useState(map.locations)
  const [activeLocationId, setActiveLocation] = useState(undefined)
  const getLocationId = useMemo(
    () =>
      (function* () {
        let maxId = map.locations.reduce((prev, x) => max(prev, parseInt(x.id)), 1) || 1
        while (true) {
          yield maxId++
        }
      })(),
    [map.locations],
  )
  const handleAddLocation = useCallback(
    (e: React.MouseEvent, p: Point) => {
      const id = getLocationId.next().value.toString()
      setLocations([
        ...locations,
        {
          id,
          label: '未命名的地点',
          pos: p,
          parentId: '0',
        },
      ])
      setActiveLocation(id)
      setMode(undefined)
    },
    [getLocationId, locations],
  )

  const handleModify = useCallback(
    (id: string, data: Partial<MapLocation>) => {
      const i = findIndex(x => x.id === id, locations)
      const location = locations[i]
      if (i >= 0) {
        const newLocation = { ...location, ...data }
        if (!equals(location, newLocation)) {
          setLocations(update(i, newLocation, locations))
        }
      }
    },
    [locations],
  )

  const handleDelete = useCallback(
    (id: string) => {
      setActiveLocation(undefined)
      setLocations(locations.filter(x => x.id !== id))
    },
    [locations],
  )

  const handleClickLocation = useCallback((id: string) => {
    setActiveLocation(id)
  }, [])

  return (
    <div className={styles.main}>
      <MapEventEmitter.Provider value={ee}>
        <StaticMap tilePrefix={map.tile.prefix} mapPixelSize={map.mapPixelSize} mapBoundingBox={map.mapBoundingBox}>
          {mode === CaptureModes.TEXT && <ClickCapture mode={mode} onClick={handleAddLocation} />}
          <TextLocationLayer
            locations={locations}
            activeLocationId={activeLocationId}
            onClick={process.env.NEXT_PUBLIC_ENABLE_MOD_TEXT_LOCATION === 'true' ? handleClickLocation : undefined}
          />
        </StaticMap>
      </MapEventEmitter.Provider>
      <motion.div
        className={styles.ops}
        animate={activeLocationId !== undefined ? 'sidebar' : 'normal'}
        variants={OpsBarVariants}
        transition={{ duration: 0.4 }}
      >
        {process.env.NEXT_PUBLIC_ENABLE_MOD_TEXT_LOCATION === 'true' && (
          <span
            className={mode === CaptureModes.TEXT ? styles.active : undefined}
            onClick={() => (mode === undefined ? setMode(CaptureModes.TEXT) : setMode(undefined))}
          >
            A
          </span>
        )}
        <span className="iconfont" onClick={() => ee.emit(MapEvents.ZOOM_IN)}>
          &#xe664;
        </span>
        <span className="iconfont" onClick={() => ee.emit(MapEvents.ZOOM_OUT)}>
          &#xe67a;
        </span>
        <span className="iconfont" onClick={() => ee.emit(MapEvents.ZOOM_INITIAL)}>
          &#xe709;
        </span>
      </motion.div>
      <Sidebar title="新增地名" visiable={activeLocationId !== undefined}>
        {activeLocationId !== undefined && (
          <UpdateLocationForm
            key={activeLocationId}
            location={find(x => x.id === activeLocationId, locations)}
            locations={locations}
            onChange={handleModify}
            onConfirm={() => setActiveLocation(undefined)}
            onDelete={handleDelete}
          />
        )}
      </Sidebar>
    </div>
  )
}
