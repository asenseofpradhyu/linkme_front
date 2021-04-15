// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react"

// 2. Add your color mode config
const config = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
    mode:{
      initialColorMode: "light",
    useSystemColorMode: false,
    }
  }

// 3. extend the theme
const customTheme = extendTheme({ config })

export default customTheme;