import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { GlobalPortals } from '../constants'
import { GA_TRACKING_ID } from '../utils/gtag'

class GlobalDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname
              });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {Object.values(GlobalPortals).map(x => (
            <div id={x} key={x} />
          ))}
        </body>
      </Html>
    )
  }
}

export default GlobalDocument
