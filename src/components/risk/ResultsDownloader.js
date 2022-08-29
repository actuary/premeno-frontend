import { Paper, Stack, Button, } from "@mui/material"

import questions from "../forms/questions"

import { retrieveFormData, makeQuestionsAndAnswers } from "../common/utils"
import { getRiskResultsPDF } from "../common/api"

const ResultsDownloader = ({ baselineRisk, mhtRisk }) => {

  const downloadPDF = () => {
    console.log("Downloading pdf")

    const formData = retrieveFormData()

    const data = {
      ...makeQuestionsAndAnswers(formData, questions),
      baseline_risk: (baselineRisk * 100).toFixed(1),
      total_risk: (mhtRisk * 100).toFixed(1),
      no_cancer: 1000 - Math.round(mhtRisk * 1000),
      cancer: Math.round(baselineRisk * 1000),
      cancer_with_mht: Math.round((mhtRisk - baselineRisk) * 1000)
    }
  
    getRiskResultsPDF(data)
  }

  return (
    <Paper variant="main">
      <Stack justify="center" spacing={2}>
        <Button variant="contained" color="primary" onClick={downloadPDF}>
          Download results PDF
        </Button>
        <Button href="/questionnaire" variant="empty">
          Take questionnaire again
        </Button>
      </Stack>
    </Paper>
  )
}

export default ResultsDownloader
