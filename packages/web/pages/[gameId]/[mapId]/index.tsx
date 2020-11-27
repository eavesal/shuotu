import { InferGetStaticPropsType } from 'next'
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
  const { gameId } = params
  const game = getGameById(gameId)

  return {
    props: {
      game,
    },
  }
}

export default function MapSets({ game }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div className={styles.main}>hello</div>
}
