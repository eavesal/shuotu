import { InferGetStaticPropsType } from 'next'
import React from 'react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import NavBar from '../../components/NavBar'
import { Game } from '../../types'
import { getAll, getGameById } from '../api/game'

import styles from './index.module.scss'
import Footer from '../../components/Footer'
import { getScreenshot } from '../api/util'

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
                <li key={x.id}>
                  <Link
                    href={{
                      pathname: `/${data.id}/${x.id}`,
                      query: x.transform,
                    }}
                    passHref
                  >
                    <a>
                      <div className={styles.wrapper}>
                        <img className={styles.cover} src={getScreenshot(data.id, x.id)} />
                        <span>{x.name}</span>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
