import React, { useCallback, useMemo, useState } from 'react'
import { EventEmitter } from 'events'
import { InferGetStaticPropsType } from 'next'
import { equals, findIndex, max, update } from 'ramda'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

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
import { downloadJSON } from '../../../utils'
import ActiveTextLocation from '../../../components/Map/ActiveTextLocation'

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

const isExportBarEnabled = process.env.NEXT_PUBLIC_ENABLE_MOD_TEXT_LOCATION === 'true'

function removeRecursively(ids: Set<string>, locations: MapLocation[]) {
  const nextIds = new Set(locations.filter(x => ids.has(x.parentId)).map(x => x.id))
  const nextLocations = locations.filter(x => !ids.has(x.id))
  if (nextIds.size > 0) {
    return removeRecursively(nextIds, nextLocations)
  }
  return nextLocations
}

export default function MapSets({ map }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { query } = useRouter()
  const [mode, setMode] = useState<CaptureModes | undefined>(undefined)
  const ee = useInstance<EventEmitter>(() => new EventEmitter())
  const [locations, setLocations] = useState(map.locations)
  const [activeLocationId, setActiveLocation] = useState(undefined)
  const getLocationId = useMemo(
    () =>
      (function* () {
        let maxId = map.locations.reduce((prev, x) => max(prev, parseInt(x.id)), 0) || 0
        while (true) {
          yield ++maxId
        }
      })(),
    [map.locations],
  )
  const transform = useMemo(() => {
    if (query.x && query.y && query.k) {
      return {
        x: parseFloat(query.x as string),
        y: parseFloat(query.y as string),
        k: parseFloat(query.k as string),
      }
    }
    return undefined
  }, [query])

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

  const handleSubmit = useCallback(
    (id: string, data: Partial<MapLocation>) => {
      const i = findIndex(x => x.id === id, locations)
      const location = locations[i]
      if (i >= 0) {
        const newLocation = { ...location, ...data }
        if (!equals(location, newLocation)) {
          setLocations(update(i, newLocation, locations))
        }
      }
      setActiveLocation(undefined)
    },
    [locations],
  )

  const handleDelete = useCallback(() => {
    setActiveLocation(undefined)
    setLocations(removeRecursively(new Set([activeLocationId]), locations))
  }, [activeLocationId, locations])

  const handleClickLocation = useCallback((id: string) => {
    setActiveLocation(id)
  }, [])

  return (
    <>
      <NextSeo
        title={map.name}
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
          },
        ]}
      />
      <div className={styles.main}>
        <MapEventEmitter.Provider value={ee}>
          <StaticMap
            tilePrefix={map.tile.prefix}
            mapPixelSize={map.mapPixelSize}
            mapBoundingBox={map.mapBoundingBox}
            transform={transform}
          >
            {mode === CaptureModes.TEXT && <ClickCapture mode={mode} onClick={handleAddLocation} />}
            <TextLocationLayer
              locations={locations}
              activeLocationId={activeLocationId}
              onClick={process.env.NEXT_PUBLIC_ENABLE_MOD_TEXT_LOCATION === 'true' ? handleClickLocation : undefined}
            />
            <AnimatePresence>
              {activeLocationId && (
                <ActiveTextLocation
                  key={activeLocationId}
                  activeLocationId={activeLocationId}
                  locations={locations}
                  onSubmit={handleSubmit}
                  onDelete={handleDelete}
                  onCancel={() => setActiveLocation(undefined)}
                />
              )}
            </AnimatePresence>
          </StaticMap>
        </MapEventEmitter.Provider>
        {isExportBarEnabled && (
          <motion.div
            className={styles.export}
            animate={activeLocationId !== undefined ? 'sidebar' : 'normal'}
            variants={OpsBarVariants}
            transition={{ duration: 0.4 }}
          >
            {process.env.NEXT_PUBLIC_ENABLE_MOD_TEXT_LOCATION === 'true' && (
              <span
                className={mode === CaptureModes.TEXT ? styles.active : undefined}
                onClick={() => downloadJSON(locations, map.id)}
              >
                A
              </span>
            )}
          </motion.div>
        )}
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
      </div>
    </>
  )
}
