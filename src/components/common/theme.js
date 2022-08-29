import { createTheme } from "@mui/material"
import { amber, teal } from "@mui/material/colors"

export const mainTheme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: teal[500],
      contrastText: "#ffffff",
      warning: "#f5f5dc"
    },
    secondary: {
      main: "#f9f6ee",
    },
    reset: {
      main: amber[500],
      contrastText: "#ffffff",
    }
  },
})

const theme = createTheme({
  status: {
    danger: mainTheme.status.danger,
  },
  palette: {
    primary: {
      main: mainTheme.palette.primary.main,
      contrastText: mainTheme.palette.primary.contrastText,
      warning: mainTheme.palette.primary.warning
    },
    secondary: {
      main: mainTheme.palette.secondary.main,
    },
    reset: {
      main: mainTheme.palette.reset.main,
      contrastText: mainTheme.palette.reset.contrastText,
    }
  },
  components: {

    MuiButton: {
      variants: [
        {
          props: {variant: "full"},
          style: {
            background: mainTheme.palette.primary.main,
            color: mainTheme.palette.primary.contrastText,
            padding: 5, 
            border:`1px solid ${mainTheme.palette.primary.main}`, 
            marginTop: 10, 
            textTransform: "none"
          }
        },
        {
          props: {variant: "empty"},
          style: {
            background: mainTheme.palette.primary.contrastText,
            color: mainTheme.palette.primary.main,
            padding: 5, 
            border:`1px solid ${mainTheme.palette.primary.main}`, 
            marginTop: 10, 
          }
        }
      ],
      styleOverrides: {
        root: {
        },
      },
    },
    MuiPaper: {
      variants: [
        {
          props: {variant: "warning"},
          style: {
            background: mainTheme.palette.primary.warning,
            padding: 5, 
            border:`2px solid red`, 
            marginTop: 10, 
          }
        },
        {
          props: {variant: "main"},
          style: {
            background: "white",
            padding: 5, 
            border:`1px solid ${mainTheme.palette.primary.main}`, 
            marginTop: 10, 
          }
        },
        {
          props: {variant: "footer"},
          style: {
            background: mainTheme.palette.primary.main, 
            color: mainTheme.palette.primary.contrastText, 
            height: "30vh",
            marginTop: 10, 
            bottom: 0, width: "100%"
          }
        },
      ],
      styleOverrides: {
        root: {
        },
      },
    },
    MuiCard: {
      variants: [
        {
          props: {variant: "risk"},
          style: {
            background: mainTheme.palette.primary.contrastText,
            padding: 5, 
            border:`1px solid ${mainTheme.palette.primary.main}`, 
            margin: 5, 
          }
        },
      ]
    },
    MuiListItemButton: {
      variants: [
        {
          props: {variant: "empty"},
          style: {
            background: mainTheme.palette.primary.contrastText,
            color: mainTheme.palette.primary.main,
            padding: 5, 
            marginTop: 5, 
            display: "block",
          }
        }
      ]
    },
  },
})

export default theme
