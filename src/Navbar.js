import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@emotion/react"
import { teal } from "@mui/material/colors"

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: teal[500],
    }
  },
})

const ResponsiveAppBar = () => {
  const pages = [
    { label: "About", route: "/about" },
    { label: "Questionnaire", route: "/questionnaire"},
    { label: "Risk Assessment", route: "/results"},
    { label: "Symptoms", route: "/symptoms"}
  ]
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar  disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              PREMENO
            </Typography>
            <Box sx={{flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link key={page.label} style={{padding: 5, textDecoration: "none"}} to={page.route}>
                  <Button
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.label}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}
export default ResponsiveAppBar
