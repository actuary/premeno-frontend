import {
  Paper,
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  Grid,
  Button
} from "@mui/material"

import { ReactComponent as Logo } from "../images/alt_logo_full.svg"
import AssignmentIcon from "@mui/icons-material/Assignment"
import PsychologyIcon from "@mui/icons-material/Psychology"
import Disclaimer from "./Disclaimer"

import { teal } from "@mui/material/colors"

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: "#f9f6ee",
    }
  }
})

const Home = () => {
  const boldText = (text) => <span style={{fontWeight: "bold"}}>{text}</span>

  return (
    <ThemeProvider theme={theme}>
      <Disclaimer/>
      <Container maxWidth="md">
        <Paper
          style={{padding: 5, border: "1px solid teal", "marginTop": 10}}
        >
          <Grid container justifyItems="center">
            <Grid item xs={12} md={8}>
              <Logo width="100%" height="100%"/>
            </Grid>
          </Grid>
          <Typography
            component="p"
            color="primary"
          >
            {boldText("MAsCoT")} has been built to communicate
            the risks and benefits of taking menopausal hormone therapy (MHT), also known as
            hormone replacement therapy (HRT). It&apos;s aimed at women who are experiencing
            menopausal symptoms and are considering their options.

          </Typography>
          <br/>
          <Typography
            component="p"
            color="primary"
          >
            We aim to take a personalised approach to communicating how MHT. This means we
            will ask you to answer some questions about yourself. We do not store these details,
            we throw them away as soon as we finish calculating your results.
          </Typography>
          <br/>
          <Typography
            component="p"
            color="primary"
          >
            This tool {boldText("does not replace your doctor's advice")}, however, it might help
            you to bring the results to your doctor so you can discuss whether MHT is right for you.
          </Typography>
          <br/>
          <Typography
            component="p"
            color="primary"
          >
            Please use the buttons below to start your assessment.
          </Typography>
          <Grid container justifyContent="space-evenly">
            <Grid item xs={4}>
              <Button
                href="/questionnaire"
                style={{background: teal[500], padding: 5, border: "1px solid teal", marginTop: 10, textTransform: "none", height: "90%"}}
                fullWidth
              >
                <Grid container alignItems="center">
                  <AssignmentIcon color="secondary" fontSize="large"/>
                  <Typography color="white" align="center">
                    Assess my risk
                  </Typography>
                </Grid>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                style={{background: teal[500], padding: 5, border: "1px solid teal", marginTop: 10, textTransform: "none", height: "90%"}}
                href="/symptoms"
                fullWidth
              >
                <Grid container alignItems="center">
                  <PsychologyIcon color="secondary" fontSize="large"/>
                  <Typography color="white" align="center">
                    Assess my symptoms
                  </Typography>
                </Grid>
              </Button>
            </Grid>
          </Grid>
          <br/>
        </Paper>
      </Container>
    </ThemeProvider>
  )

}

export default Home
