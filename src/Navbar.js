import { useState, useLayoutEffect } from "react"

import { Grid, IconButton, Drawer } from "@mui/material"
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import AssignmentIcon from "@mui/icons-material/Assignment"
import InfoIcon from "@mui/icons-material/Info"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import { Link } from "react-router-dom"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@emotion/react"
import { teal } from "@mui/material/colors"

import { ReactComponent as LogoSmall } from "./images/alt_logo_small_circle.svg"

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

const BigNavbar = ({ pages }) => (
  <Toolbar  disableGutters variant = "dense">
    <LogoSmall width="40px" height="40px" style={{padding: 5}}/>
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
      MAsCoT
    </Typography>
    <>
      {pages.map((page) => (
        <Link key={page.label} style={{padding: 5, textDecoration: "none"}} to={page.route}>
          <Button
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page.label}
          </Button>
        </Link>
      ))}
    </>
  </Toolbar>
)

const SmallNavbar = ({ pages }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <Toolbar style={{justifyContent:"space-between"}} variant="dense">
      <IconButton
        {...{
          edge: "start",
          color: "inherit",
          "aria-label": "menu",
          "aria-haspopup": "true",
          onClick: () => setDrawerOpen(true)
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        {...{
          anchor: "left",
          open: drawerOpen,
          onClose: () => setDrawerOpen(false),
        }}
      >
        <List>
          {pages.map((page) => (
            <ListItem key={page.label} disablePadding>
              <Link key={page.label} style={{textDecoration: "none"}} to={page.route}>
                <ListItemButton sx={{ color: "teal", display: "block" }}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <ListItemIcon><page.Icon color="teal" fontSize="small"/></ListItemIcon>
                    </Grid>
                    <Grid item>
                      <ListItemText primary={page.label} />
                    </Grid>
                  </Grid>
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <LogoSmall width="40px" height="40px"/>
      <Typography
        variant="h4"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 300,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        MASCOT
      </Typography>
    </Toolbar>
  )
}

const Navbar = () => {
  const pages = [
    { label: "About", route: "/about", Icon: InfoIcon},
    { label: "Risk Questionnaire", route: "/questionnaire", Icon: AssignmentIcon},
    { label: "Risk Assessment", route: "/results", Icon: AnalyticsIcon},
    { label: "Symptom Questionnaire", route: "/symptoms", Icon: AssignmentIcon}
  ]

  const [bigScreen, setBigScreen] = useState(false)

  useLayoutEffect(() => {
    const checkSmall = () => setBigScreen(window.innerWidth >= 900)
    window.addEventListener("resize", checkSmall)
    checkSmall()
    return () => window.removeEventListener("resize", checkSmall)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          {bigScreen ? <BigNavbar pages={pages} /> : <SmallNavbar pages={pages} />}
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}
export default Navbar
