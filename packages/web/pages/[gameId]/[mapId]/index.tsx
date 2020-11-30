import { InferGetStaticPropsType } from 'next'
import StaticMap from '../../../components/Map/StaticMap'
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

export default function MapSets({ game, map }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.main}>
      <StaticMap tilePrefix={map.tile.prefix} mapPixelSize={map.mapPixelSize} mapBoundingBox={map.mapBoundingBox} />
    </div>
  )
}
