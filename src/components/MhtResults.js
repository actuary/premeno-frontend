import axios from "axios"
import { useState, useEffect } from "react"

import {
  Paper,
  Container,
  Typography,
  Grid, Box,
  Stack,
  Card, CardContent,
  Button, Divider,
  createTheme, ThemeProvider
} from "@mui/material"

import { teal } from "@mui/material/colors"
import { Woman } from "@mui/icons-material"

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: teal[500],
    }
  }
})

const MhtResults = () => {
  const [risk, setRisk] = useState({})

  useEffect(() => {
    const data = {
      "username": process.env.REACT_APP_API_USER,
      "password": process.env.REACT_APP_API_PSWD
    }

    axios
      .post("/auth-token/", data).then(response => {
        const headers = { headers: {"Authorization": "Token " + response.data.token}}
        return axios.get("/api/risk", headers)
      })
      .then(response => {
        setRisk(response.data)
        console.log(response.data)
      })
      .catch(error => {
        setRisk({})
        console.log(error.response)
      })
  }, [])

  if (Object.keys(risk).length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Paper style={{padding: 5, border: "1px solid teal", "marginTop": 10}}>
            <Typography
              component="p"
              color="primary"
            >
              No results available.
            </Typography>
          </Paper>
        </Container>
      </ThemeProvider>
    )
  }

  const riskWithMHT = Math.min(risk.relative_risk * risk.baseline_risk, 1)
  const values = JSON.parse(localStorage.getItem("formValues"))
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Paper style={{padding: 5, border: "1px solid teal", "marginTop": 10}}>
          <Typography
            component="p"
            color="primary"
          >
            <strong>Background risk:</strong> This shows the estimated chance of
            being diagnosed with breast cancer over the next 10 years, without the
            use of MHT.
          </Typography>
          <Typography
            component="p"
            color="primary"
          >
            <strong>Relative risk:</strong> This how using MHT will affect your background
            risk of cancer over the subsequent 10 years.
          </Typography>
          <Typography
            component="p"
            color="primary"
          >
            <strong>Risk with MHT use:</strong> This shows the estimated chance of
            being diagnosed with breast cancer over the next 10 years, if you decide
            to take MHT.
          </Typography>
          <br />
          <Typography
            component="p"
            color="primary"
          >
            <strong>Please note</strong> that these estimates are only a guide and should
            be discussed with your doctor.
          </Typography>
        </Paper>
        <Paper style={{padding: 5, border: "1px solid teal", "marginTop": 10}}>
          <Stack direction="row" spacing={3} justifyContent="space-between">
            <Grid container align="center" alignItems="center">
              <Grid item component={Card} xs={3.9}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="p"
                    color="primary"
                  >
                    10 year background risk
                  </Typography>
                  <Typography
                    variant="h3"
                    component="p"
                    color="primary"
                  >
                    {(risk.baseline_risk * 100).toFixed(1)}%
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item component={Card} xs={3.9}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="p"
                    color="primary"
                  >
                    Relative risk of MHT use
                  </Typography>
                  <Typography
                    variant="h3"
                    component="p"
                    color="primary"
                  >
                    {risk.relative_risk.toFixed(1)}x
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item component={Card} xs={3.9}>
                <CardContent>
                  <Typography
                    variant="h6"
                    component="p"
                    color="primary"
                  >
                    10 year risk with MHT use
                  </Typography>
                  <Typography
                    variant="h3"
                    component="p"
                    color="primary"
                  >
                    {(riskWithMHT*100).toFixed(1)}%
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Stack>
        </Paper>
        <Paper style={{padding: 5, border: "1px solid teal", marginTop: 10}}>
          <Typography
            variant="h6"
            component="p"
            color="teal"
          >
            For 100 woman with your attributes over 10 years
          </Typography>
          <Grid container>
            <Grid item component={Card} xs={6}>
              <Box container>
                <Grid container>
                  {[...Array(100)].map((x, i) => {
                    const color = (i < Math.ceil(risk.baseline_risk*100) ?
                      "black" :
                      (i < Math.ceil(riskWithMHT*100) ?
                        "red" :
                        "teal"))
                    return (
                      <Grid key={i} item>
                        <Woman fontSize="small" style={{ color: color }}/>
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </Grid>
            <Grid item component={Card} xs={6}>
              <Box container>
                <Grid container  align="center">
                  <Grid item component={Card} xs={4}>
                    <CardContent>
                      <Woman fontSize="large" style={{ color: "black" }}/>
                      <Typography
                        variant="h8"
                        component="p"
                        color="black"
                        fontFamily="monospace"
                      >
                        Normal rate of cancer cases
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Grid item component={Card} xs={4}>
                    <CardContent>
                      <Woman fontSize="large" style={{ color: "red" }}/>
                      <Typography
                        variant="h8"
                        component="p"
                        color="red"
                        fontFamily="monospace"
                      >
                        Extra cases of cancer due to MHT use
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Grid item component={Card} xs={4}>
                    <CardContent>
                      <Woman fontSize="large" style={{ color: "teal" }}/>
                      <Typography
                        variant="h8"
                        component="p"
                        color="teal"
                        fontFamily="monospace"
                      >
                        No cancer
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Paper style={{padding: 5, border: "1px solid teal", marginTop: 10}}>
          <Stack justify="center" spacing={2}>
            <Button variant="contained" color="primary">
              Download results PDF
            </Button>
            <Button href="/questionnaire" style={{border: "1px solid teal"}}>
              Take questionnaire again
            </Button>
          </Stack>
        </Paper>
        {Object.keys(values).length > 0 ?
          <Paper style={{padding: 5, border: "1px solid teal", marginTop: 10}}>
            <Grid container>
              <Grid item xs={8}>
                <Typography
                  variant="h4"
                  component="p"
                  color="primary"
                >
                  Question:
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant="h4"
                  component="p"
                  color="primary"
                >
                  Answer:
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              {Object.keys(values).map(question =>
                <Grid key={values[question].label} item xs={12}>
                  <div>
                    <Grid container>
                      <Grid item xs={8}>
                        <Typography
                          component="p"
                          color="primary"
                        >
                          {values[question].label}
                        </Typography>
                      </Grid>
                      <Grid key={values[question].label + "_1"} item xs={3}>
                        <Typography
                          component="p"
                          color="primary"
                        >
                          {values[question].value}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider />
                  </div>
                </Grid>
              )}
            </Grid>
          </Paper> : <></>
        }
      </Container>
    </ThemeProvider>
  )
}

export default MhtResults
