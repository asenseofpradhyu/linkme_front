// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react"
import  NextDocument, { Html, Head, Main, NextScript } from "next/document"
import Document from "next/document"
import { extractCritical } from "@emotion/server";
import { resetServerContext } from "react-beautiful-dnd";
import customTheme from "../theme/customTheme"

export default class MyDocument extends NextDocument {

  static async getInitialProps(ctx) {
    const page = await ctx.renderPage();
    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(page.html);
    resetServerContext();
    return { ...initialProps, ...page, ...styles };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        <style
            data-emotion-css={this.props.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
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