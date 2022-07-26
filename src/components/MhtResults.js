import axios from "axios"
import { useState, useEffect } from "react"
import { toPng } from "html-to-image"
import { jsPDF } from "jspdf"

import {
  Paper,
  Container,
  Typography,
  Grid,
  Stack,
  Card,
  CardContent,
  Button,
  Divider,
  AppBar, Tab,
  createTheme,
  ThemeProvider
} from "@mui/material"

import { TabPanel, TabContext, TabList } from "@mui/lab"

import { teal } from "@mui/material/colors"
import { Woman } from "@mui/icons-material"

import { getLocalData } from "./forms/utils"

import IconArray from "./IconArray"

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

const DefinitionExplainer = () => (
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
)

const RiskTextDisplay = ({ baseline, relative_risk, total_risk }) => (
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
              {(baseline * 100).toFixed(1)}%
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
              {relative_risk.toFixed(1)}x
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
              {(total_risk*100).toFixed(1)}%
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Stack>
  </Paper>
)

const RiskExplainer = ({ anyway_risk, extra_risk, no_risk }) => (
  <Grid container align="center" spacing={1}>
    <Grid item component={Card} xs={12}>
      <CardContent>
        <Woman fontSize="large" style={{ color: "teal" }}/>
        <Typography
          variant="h8"
          component="p"
          color="teal"
          fontFamily="monospace"
        >
          {no_risk} are likely not to get breast cancer whether they
          used menopausal homrone therapy or not
        </Typography>
      </CardContent>
    </Grid>
    <Grid item component={Card} xs={12}>
      <CardContent>
        <Woman fontSize="large" style={{ color: "black" }}/>
        <Typography
          variant="h8"
          component="p"
          color="black"
          fontFamily="monospace"
        >
          {anyway_risk} would have likely gotten breast cancer
          whether they used menopausal hormone therapy or not
        </Typography>
      </CardContent>
    </Grid>
    <Grid item component={Card} xs={12}>
      <CardContent>
        <Woman fontSize="large" style={{ color: "red" }}/>
        <Typography
          variant="h8"
          component="p"
          color="red"
          fontFamily="monospace"
        >
          {extra_risk} more are likely to get breast cancer
          due to menopausal hormone therapy who wouldn&apos;t have otherwise
        </Typography>
      </CardContent>
    </Grid>
  </Grid>
)

const Questions = ({ values }) => (
  <Paper style={{padding: 5, border: "1px solid teal", marginTop: 10}}>
    {Object.keys(values).length > 0 ?
      <>
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
      </> : <>No answers avaiable</>
    }
  </Paper>
)

const MhtResults = () => {
  const [risk, setRisk] = useState({})

  const retrieveFormData = () => {
    const about = getLocalData("about_you")
    const repro = getLocalData("reproductive_health")
    const bcr = getLocalData("breast_cancer_risk")
    return {...about, ...repro, ...bcr}
  }

  const length = 20
  const width = 25
  const total = length * width

  useEffect(() => {
    const data = {
      "username": process.env.REACT_APP_API_USER,
      "password": process.env.REACT_APP_API_PSWD
    }

    axios
      .post("/auth-token/", data).then(response => {
        const data = retrieveFormData()
        const payload = {
          headers: {"Authorization": "Token " + response.data.token,
            "Content-Type": "application/json"},
          params: data
        }
        return axios.get("/api/risk", payload)
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

  const [value, setValue] = useState("bc")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

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

  const downloadPDF = () => {
    console.log("Downloading pdf")

    toPng(document.getElementById("results_bc"), { quality: 0.95 })
      .then(function (dataUrl) {
        const pdf = new jsPDF()

        const {width, height} = pdf.getImageProperties(dataUrl)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (height * pdfWidth) / width

        pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight)

        pdf.save("results.pdf")
      })
  }

  const riskWithMHT = Math.min(risk.relative_risk * risk.baseline_risk, 1)
  const values = JSON.parse(localStorage.getItem("formValues"))

  return (
    <ThemeProvider theme={theme}>
      <Container style={{padding: 5}}>
        <TabContext value={value}>
          <AppBar position="static">
            <TabList
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab value="bc" label="Breast Cancer" />
              <Tab value="vte" label="VTE / Clot" />
              <Tab value="cvd" label="Stroke / CHD" />
              <Tab value="vs" label="Benefits" />
            </TabList>
          </AppBar>
          <TabPanel id="results_bc" value="bc" index={0}>
            <DefinitionExplainer/>
            <RiskTextDisplay
              baseline={risk.baseline_risk}
              relative_risk={risk.relative_risk}
              total_risk={riskWithMHT}
            />
            <Paper style={{padding: 5, border: "1px solid teal", marginTop: 10}}>
              <Typography
                variant="h6"
                component="p"
                color="teal"
              >
                For {total} women with your attributes over 10 years
              </Typography>
              <Grid container align="center">
                <Grid item component={Card} xs={8}>
                  <IconArray
                    Icon={Woman}
                    length={length}
                    width={length}
                    black={risk.baseline_risk}
                    red={riskWithMHT}
                  />
                </Grid>
                <Grid item component={Card} xs={4}>
                  <RiskExplainer
                    no_risk={Math.round((1 - riskWithMHT) * total)}
                    extra_risk={Math.round((riskWithMHT - risk.baseline_risk) * total)}
                    anyway_risk={Math.round(risk.baseline_risk * total)}
                  />
                </Grid>
              </Grid>
            </Paper>
          </TabPanel>
        </TabContext>
        <Paper style={{padding: 5, border: "1px solid teal", marginTop: 10}}>
          <Stack justify="center" spacing={2}>
            <Button variant="contained" color="primary" onClick={downloadPDF}>
              Download results PDF
            </Button>
            <Button href="/questionnaire" style={{border: "1px solid teal"}}>
              Take questionnaire again
            </Button>
          </Stack>
        </Paper>
        <Questions values={values} />
      </Container>
    </ThemeProvider>
  )
}

export default MhtResults
