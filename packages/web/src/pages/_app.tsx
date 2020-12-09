import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'

import '../styles/globals.scss'

import SEO from '../seo.config'
import { trackPageView } from '../utils/gtag'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const onChange = (url: URL) => {
      trackPageView(url)
    }

    router.events.on('routeChangeComplete', onChange)
    return () => router.events.off('routeChangeComplete', onChange)
  }, [router.events])

  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default App
