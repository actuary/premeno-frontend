import { useState, useLayoutEffect } from "react"

import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Grid, 
  IconButton, 
  Drawer,
  Toolbar,
  Typography, 
  Container, 
  Button,
  AppBar
} from "@mui/material"
import { 
  Menu, Assignment, Info, Analytics 
} from "@mui/icons-material"

import { Link } from "react-router-dom"

import { ReactComponent as LogoSmall } from "../../images/alt_logo_small_circle.svg"

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
            sx={{ my: 2, color: "primary.contrastText", display: "block" }}
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
        <Menu />
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
                <ListItemButton variant="empty">
                  <Grid container alignItems="center">
                    <Grid item>
                      <ListItemIcon><page.Icon fontSize="small"/></ListItemIcon>
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
    { label: "About", route: "/about", Icon: Info},
    { label: "Risk Questionnaire", route: "/questionnaire", Icon: Assignment},
    { label: "Risk Assessment", route: "/results", Icon: Analytics},
    { label: "Symptom Questionnaire", route: "/symptoms", Icon: Assignment}
  ]

  const [bigScreen, setBigScreen] = useState(false)

  useLayoutEffect(() => {
    const checkSmall = () => setBigScreen(window.innerWidth >= 900)
    window.addEventListener("resize", checkSmall)
    checkSmall()
    return () => window.removeEventListener("resize", checkSmall)
  }, [])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        {bigScreen ? <BigNavbar pages={pages} /> : <SmallNavbar pages={pages} />}
      </Container>
    </AppBar>
  )
}
export default Navbar
