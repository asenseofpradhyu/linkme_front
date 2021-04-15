import '../styles/globals.css'
import { Provider } from 'next-auth/client'
import { ChakraProvider } from "@chakra-ui/react"
import  customTheme  from "./theme/customTheme"

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <>
        <ChakraProvider theme={customTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </>
    </Provider>
  )
}

export default MyApp
