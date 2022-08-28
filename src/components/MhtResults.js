import { useState, useEffect } from "react"

import {
  Paper,
  Container,
  Typography,
  Stack,
  Button,
  AppBar, Tab,
  LinearProgress
} from "@mui/material"
import { TabPanel, TabContext, TabList } from "@mui/lab"

import QuestionsAndAnswers from "./common/QuestionsAndAnswers"
import DefinitionExplainer from "./risk/DefinitionExplainer"
import RiskGraphicDisplay from "./risk/RiskGraphicDisplay"
import RiskTextDisplay from "./risk/RiskTextDisplay"
import questions from "./forms/questions"

import { retrieveFormData, makeQuestionsAndAnswers } from "./common/utils"
import ResultsDownloader from "./risk/ResultsDownloader"
import { getRiskCalculation } from "./common/api"

const MhtResults = () => {
  const [risk, setRisk] = useState({})
  const [spinner, setSpinner] = useState(true)

  const formData = retrieveFormData()
  const mht_type = formData.mht
  const qna = makeQuestionsAndAnswers(formData, questions)
  console.log(formData)
  useEffect(() => {
    getRiskCalculation(formData)
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

  return (
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
          <DefinitionExplainer riskText="being diagnosed with breast cancer"/>
          <RiskTextDisplay
            baseline={risk.breast_cancer["none"]}
            total_risk={risk.breast_cancer[mht_type]}
            years={5}
          />
          <RiskGraphicDisplay 
            baselineRisk={risk.breast_cancer["none"]}
            mhtRisk={risk.breast_cancer[mht_type]}
            riskActionText="to get breast cancer"
          />
        </TabPanel>
      </TabContext>
      <ResultsDownloader baselineRisk={risk.breast_cancer["none"]} mhtRisk={risk.breast_cancer[mht_type]} />
      <QuestionsAndAnswers qna={qna}/>
    </Container>
  )
}

export default MhtResults
