import { 
    defineStyle,
    defineStyleConfig,
    extendTheme } from "@chakra-ui/react";

//extending the theme
const xl = defineStyle({
    fontSize: 'xl',
    px: '6',
    h: '100',
    w: '60',
    borderRadius: 'md'
  })

const buttonTheme = defineStyleConfig({
sizes: {xl},
})

  
const theme = {
  config: {
    intialColorMode: "light",
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        margin: 0,
        "font-family":
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      },

      code: {
        "font-family":
          "source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace",
      },
    },
  },

  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    // gray: 

  },

};

export default extendTheme({theme, buttonTheme});