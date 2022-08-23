import { useState, useEffect } from "react"

import {
  Paper,
  Container,
  Typography,
  Grid,
  Stack,
  Button,
  Divider,
  AppBar, Tab,
  LinearProgress
} from "@mui/material"
import { TabPanel, TabContext, TabList } from "@mui/lab"

import Disclaimer from "./common/Disclaimer"
import { getLocalData } from "./common/utils"
import { getRiskResultsPDF } from "./common/api"
import { getRiskCalculation } from "./common/api"
import RiskGraphicDisplay from "./risk/RiskGraphicDisplay"
import RiskTextDisplay from "./risk/RiskTextDisplay"
import questions from "./forms/questions"

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
      be discussed with your doctor. These estimates may not be accurate if you have 
      certain genes or heritage. Please see the <a href="/about">about</a> page 
      for details on how these estimates were calculated.
    </Typography>
  </Paper>
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

  for (let i = 0; i < 5 - parseInt(bcr["number_of_sisters"]); i++) {
    bcr[`sister_age_at_diagnosis_${4-i}`] = ""
  }

  return {...about, ...repro, ...bcr}
}

const ResultsDownloader = ({ baselineRisk, mhtRisk }) => {

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
      baseline_risk: (baselineRisk * 100).toFixed(1),
      total_risk: (mhtRisk * 100).toFixed(1),
      no_cancer: 1000 - Math.round(mhtRisk * 1000),
      cancer: Math.round(baselineRisk * 1000),
      cancer_with_mht: Math.round((mhtRisk - baselineRisk) * 1000)
    }
  
    getRiskResultsPDF(data)
  }

  return (
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
  )
}

const MhtResults = () => {
  const [risk, setRisk] = useState({})
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    const data = retrieveFormData()
    getRiskCalculation(data)
      .then(response => {
        setSpinner(false)
        setRisk(response)
      })
  }, [])

  const [value, setValue] = useState("bc")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  if (Object.keys(risk).length === 0) {
    return (
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
    )
  }

  const riskWithMHT = Math.min(risk.relative_risk * risk.baseline_risk, 1)
  const values = JSON.parse(localStorage.getItem("formValues"))

  return (
    <>
      <Disclaimer/>
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
              years={5}
            />
            <RiskGraphicDisplay 
              baselineRisk={risk.baseline_risk}
              mhtRisk={riskWithMHT}
            />
          </TabPanel>
        </TabContext>
        <ResultsDownloader baselineRisk={risk.baseline_risk} mhtRisk={riskWithMHT} />
        <Questions values={values}/>
      </Container>
    </>
  )
}

export default MhtResults
