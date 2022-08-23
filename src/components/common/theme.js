import { createTheme } from "@mui/material"
import { amber, teal } from "@mui/material/colors"

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: teal[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f9f6ee",
    },
    reset: {
      main: amber[500],
      contrastText: "#ffffff",
    }
  }
})

export default theme
