import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { GlobalPortals } from '../constants'

class GlobalDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
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
