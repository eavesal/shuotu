import { InferGetStaticPropsType } from 'next'
import React from 'react'

import NavBar from '../../components/NavBar'
import { Game } from '../../types'
import { getAll, getGameById } from '../api/game'

import styles from './index.module.scss'
import Link from 'next/link'

export const getStaticPaths = async () => {
  const games: Game[] = getAll()
  return {
    paths: games.map(x => ({
      params: {
        gameId: x.id,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const { gameId } = params
  const game = getGameById(gameId)

  return {
    props: {
      data: game,
    },
  }
}

export default function MapSets({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.main}>
      <div className={styles.bg} style={{ backgroundImage: `url(${data.cover})` }}>
        <NavBar />
        <h1>{data.name} 地图集</h1>
      </div>
      <div className={styles.content}>
        <div className="view">
          <ul className={styles.maps}>
            {data.maps.map(x => (
              <Link href={`/${data.id}/${x.id}`} key={x.id}>
                <li>
                  <div className={styles.wrapper}>
                    <img className={styles.cover} src={x.cover} />
                    <span>{x.name}</span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
