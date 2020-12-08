import React from 'react'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import '../styles/globals.scss'

import SEO from '../seo.config'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default App
