import axios from "axios"
import { useState, useEffect } from "react"
import { saveAs } from "file-saver"

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
  ThemeProvider,
  LinearProgress
} from "@mui/material"

import { TabPanel, TabContext, TabList } from "@mui/lab"

import { teal } from "@mui/material/colors"
import { Woman } from "@mui/icons-material"

import { getLocalData } from "./forms/utils"

import IconArray from "./IconArray"
import questions from "./forms/questions"

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
      being diagnosed with breast cancer over the next 5 years, without the
      use of MHT.
    </Typography>
    <Typography
      component="p"
      color="primary"
    >
      <strong>Relative risk:</strong> This how using MHT will affect your background
      risk of cancer over the subsequent 5 years.
    </Typography>
    <Typography
      component="p"
      color="primary"
    >
      <strong>Risk with MHT use:</strong> This shows the estimated chance of
      being diagnosed with breast cancer over the next 5 years, if you decide
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

const RiskTextDisplay = ({ baseline, total_risk }) => (
  <Paper style={{padding: 5, border: "1px solid teal", "marginTop": 10}}>
    <Stack direction="row" spacing={3} justifyContent="space-between">
      <Grid container align="center" alignItems="center">
        <Grid item component={Card} xs={12} md={6}>
          <CardContent>
            <Typography
              variant="h6"
              component="p"
              color="primary"
            >
              5 year background risk
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
        <Grid item component={Card} xs={12} md={6}>
          <CardContent>
            <Typography
              variant="h6"
              component="p"
              color="primary"
            >
              5 year risk with MHT use
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
    <Grid item component={Card} xs={12} md={4}>
      <CardContent>
        <Woman fontSize="large" style={{ color: "teal" }}/>
        <Typography
          variant="h8"
          component="p"
          color="teal"
          fontFamily="monospace"
        >
          {no_risk} are likely not to get breast cancer whether they
          used menopausal hormone therapy or not
        </Typography>
      </CardContent>
    </Grid>
    <Grid item component={Card} xs={12} md={4}>
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
    <Grid item component={Card} xs={12} md={4}>
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
      </> : <>No answers available</>
    }
  </Paper>
)

const MhtResults = () => {
  const [risk, setRisk] = useState({})
  const [spinner, setSpinner] = useState(true)

  const retrieveFormData = () => {
    const about = getLocalData("about_you")

    if (about["height_unit"] != "cm") {
      const val = Math.round(parseInt(about["height_in"])/12.0 + parseInt(about["height_ft"])*30.48)
      about["height"] = val.toString()
      about["height_unit"] = "cm"
    }

    if (about["weight_unit"] != "kg") {
      const val = Math.round(parseInt(about["weight"])/2.205)
      about["weight"] = val.toString()
      about["weight_unit"] = "kg"
    }

    const repro = getLocalData("reproductive_health")

    if (repro["no_children"] === true) {
      repro["age_at_first_child"] = ""
    }


    const bcr = getLocalData("breast_cancer_risk")

    if (bcr["biopsy"] === "n") {
      bcr["number_of_biopsies"] = ""
      bcr["hyperplasia"] = ""
    }

    if (bcr["mother_has_cancer"] === "0") {
      bcr["mother_age_at_diagnosis"] = ""
    }

    console.log(parseInt(bcr["number_of_sisters"]))
    for (let i = 0; i < 5 - parseInt(bcr["number_of_sisters"]); i++) {
      bcr[`sister_age_at_diagnosis_${4-i}`] = ""
    }

    return {...about, ...repro, ...bcr}
  }

  const length = 25
  const width = 40
  const total = length * width

  useEffect(() => {
    const data = {
      "username": process.env.REACT_APP_API_USER,
      "password": process.env.REACT_APP_API_PSWD
    }

    axios
      .post(process.env.REACT_APP_API_URL + "/auth-token/", data, 
        { "Content-Type": "application/json" }).then(response => {
        const data = retrieveFormData()
        const payload = {
          headers: {"Authorization": "Token " + response.data.token,
            "Content-Type": "application/json"},
          params: data
        }
        return axios.get(process.env.REACT_APP_API_URL + "/api/risk", payload)
      })
      .then(response => {
        setSpinner(false)
        setRisk(response.data)
        console.log(response.data)
      })
      .catch(error => {
        setSpinner(false)
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
          <Paper
            style={{padding: 20, border: "1px solid teal", "margin": 10}}
          >
            { spinner ?
              <LinearProgress color="primary" sx={{height: 20}}/> :
              <Stack justify="center" spacing={2}>
                <Typography
                  component="p"
                  color="primary"
                >
                  No results available.
                </Typography>
                <Button href="/questionnaire" style={{border: "1px solid teal"}}>
                  Take questionnaire again
                </Button>
              </Stack>
            }
          </Paper>
        </Container>
      </ThemeProvider>
    )
  }

  const riskWithMHT = Math.min(risk.relative_risk * risk.baseline_risk, 1)
  const values = JSON.parse(localStorage.getItem("formValues"))

  const downloadPDF = () => {
    console.log("Downloading pdf")

    const formData = retrieveFormData()

    const combineQnA = (qs) => (
      qs.map(val => {
        var answer = formData[val]
        if (val === "date_of_birth") {
          answer = new Date(formData[val]).toLocaleDateString()
        }
        return {
          question: questions[val]["question"], 
          answer: (
            questions[val].choices === undefined ? 
              answer : 
              questions[val]["choices"][formData[val]]
          )
        }
      })
    )

    const about = [
      "date_of_birth", "height", "weight", "ethnic_group", 
      "education", "alcohol", "smoking"
    ]

    const reproductive_health = [
      "mht", "age_at_menarche", "age_at_first_child", "oral_contra", 
    ]

    const cancer_risk = [
      "biopsy", "number_of_biopsies", "hyperplasia", "mother_has_cancer",
      "mother_age_at_diagnosis", "number_of_sisters", "sister_age_at_diagnosis_0",
      "sister_age_at_diagnosis_1", "sister_age_at_diagnosis_2",
      "sister_age_at_diagnosis_3", "sister_age_at_diagnosis_4"
    ]
    
    const data = {
      about: combineQnA(about),
      repro: combineQnA(reproductive_health),
      bcrisk: combineQnA(cancer_risk),
      baseline_risk: (risk.baseline_risk * 100).toFixed(1),
      total_risk: (riskWithMHT * 100).toFixed(1),
      no_cancer: 1000 - Math.round(riskWithMHT * 1000),
      cancer: Math.round(risk.baseline_risk * 1000),
      cancer_with_mht: Math.round((riskWithMHT - risk.baseline_risk) * 1000)
    }

    axios
      .post(process.env.REACT_APP_API_URL + "/api/symptoms/risk_report/", 
        data, 
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob"
        })
      .then(response => {
        const file = new Blob([response.data], { type: "application/pdf" })
        saveAs(file, "RiskResults.pdf")
      })
      .catch(error => {
        console.log(error.response)
      })

  }


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
              <Tab value="frac" label="Fracture Risk" />
              <Tab value="vte" label="VTE" />
              <Tab value="cvd" label="CVD" />
              <Tab value="vs" label="Symptoms" />
            </TabList>
          </AppBar>
          <TabPanel id="results_bc" value="bc" index={0}>
            <DefinitionExplainer/>
            <RiskTextDisplay
              baseline={risk.baseline_risk}
              total_risk={riskWithMHT}
            />
            <Paper style={{padding: 5, border: "1px solid teal", marginTop: 10}}>
              <Typography
                variant="h6"
                component="p"
                color="teal"
              >
                For {total} women with your attributes over 5 years
              </Typography>
              <Grid container align="center">
                <Grid item component={Card} xs={12} md={12}>
                  <RiskExplainer
                    no_risk={Math.round((1 - riskWithMHT) * total)}
                    extra_risk={Math.round((riskWithMHT - risk.baseline_risk) * total)}
                    anyway_risk={Math.round(risk.baseline_risk * total)}
                  />
                </Grid>
                <Grid item component={Card} xs={12} md={12}>
                  <IconArray
                    Icon={Woman}
                    length={length}
                    width={width}
                    black={risk.baseline_risk}
                    red={riskWithMHT}
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
