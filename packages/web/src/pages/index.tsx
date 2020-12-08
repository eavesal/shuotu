import React from 'react'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import NavBar from '../components/NavBar'
import { getAll } from './api/game'
import Footer from '../components/Footer'

import styles from './index.module.scss'

export const getStaticProps = async () => {
  return {
    props: {
      games: getAll(),
    },
  }
}

export default function Home({ games }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo title="首页" />
      <div className={styles.main}>
        <NavBar />
        <h1>图说您的游戏</h1>
        <h6>传奇装备、未知宝藏、会心彩蛋，皆可图说</h6>
        <div className="view">
          <ul className={styles.games}>
            {games.map(x => (
              <Link href={`/${x.id}`} key={x.id}>
                <li>
                  <div className={styles.wrapper}>
                    <img className={styles.cover} src={x.cover} />
                    {x.logo && <img className={styles.logo} src={x.logo} />}
                    <span>{x.name}</span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    </>
  )
}
