import { theme as chakraTheme } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { mode } from "@chakra-ui/theme-tools"


// Config
const config = {
  mode:{
      initialColorMode: "light",
      useSystemColorMode: false,
    },
    cssVarPrefix: "linkme",
}

// Fonts
const fonts = {
  ...chakraTheme.fonts,
  body: `'Roboto', sans-serif`,
  heading: `'Baloo_Bhai'`
}

// Overrides
const overrides = {
    ...chakraTheme,
    fonts,
    config
}

// 3. extend the theme
const customTheme = extendTheme(overrides)

export default customTheme;