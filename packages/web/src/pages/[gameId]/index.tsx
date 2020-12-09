import { InferGetStaticPropsType } from 'next'
import React from 'react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import NavBar from '../../components/NavBar'
import { Game } from '../../types'
import { getAll, getGameById } from '../api/game'

import styles from './index.module.scss'
import Footer from '../../components/Footer'

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
    <>
      <NextSeo title={data.name} />
      <div className={styles.main}>
        <div className={styles.bg} style={{ backgroundImage: `url(${data.cover})` }}>
          <NavBar />
          <h3>{data.name} 地图集</h3>
        </div>
        <div className={styles.content}>
          <div className="view" style={{ minHeight: '60vh' }}>
            <ul className={styles.maps}>
              {data.maps.map(x => (
                <Link
                  href={{
                    pathname: `/${data.id}/${x.id}`,
                    query: x.transform,
                  }}
                  key={x.id}
                >
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
        <Footer />
      </div>
    </>
  )
}
