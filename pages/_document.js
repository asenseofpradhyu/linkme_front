// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import customTheme from "../theme/customTheme"

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
      <Head>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
        </Head>
        <body>
          <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}