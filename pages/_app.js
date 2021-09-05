import '../styles/font.css'
import '../styles/globals.css'
import { Provider } from 'next-auth/client'
import Router from 'next/router';
import { ChakraProvider } from "@chakra-ui/react"
import  customTheme  from "../theme/customTheme"
import NextNprogress from 'nextjs-progressbar';






function MyApp({ Component, pageProps }) {


  return (
    <Provider session={pageProps.session}>
      <>
        <ChakraProvider resetCSS theme={customTheme}>
        <NextNprogress
            color="#0C0B0B"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </>
    </Provider>
  )
}

export default MyApp
