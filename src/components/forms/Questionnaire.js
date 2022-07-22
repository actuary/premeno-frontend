import { useState } from "react"

import {
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  ThemeProvider, createTheme,
  Stack
} from "@mui/material"
import { teal, amber } from "@mui/material/colors"

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: teal[500],
    },
    reset: {
      main: amber[500],
      contrastText: "#ffffff",
    }
  },
})

import AboutYouForm from "./AboutYouForm"
import ReproductiveHealthForm from "./ReproductiveHealthForm"
import BreastCancerRiskForm from "./BreastCancerRiskForm"

import { getAge } from "./utils"

const Questionnaire = () => {
  const steps = ["About you", "Reproductive health", "Breast cancer risk"]

  const [step, setStep] = useState(0)
  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const getForm = (index) => {
    if (index == 0) {
      return <AboutYouForm nextStep={nextStep} />
    } else if (index == 1) {
      console.log(JSON.parse(localStorage.getItem("about_you")).date_of_birth)
      const age = getAge(JSON.parse(localStorage.getItem("about_you")).date_of_birth)
      return <ReproductiveHealthForm prevStep={prevStep} nextStep={nextStep} age={age} />
    } else if (index == 2) {
      return <BreastCancerRiskForm prevStep={prevStep} nextStep={nextStep} />
    }
    if (index >= steps.length) {
      return ( <div>Submitted</div> )
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{padding: 5, border: "1px solid teal", "marginTop": 10}}>
        <Typography component="h1" variant="h4" align="center" color="teal">
          MHT Risk Questionnaire
        </Typography>
        <Stepper activeStep={step} style={{marginTop: "10px", marginBottom: "10px"}}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {step === steps.length ? (
          <>
            <Stack justify="center" spacing={2}>
              <Typography variant="h5">
                Thank you for completing the questionnaire.
              </Typography>
              <Button href="/results" variant="contained" color="primary">
                View results
              </Button>
              <Button onClick={prevStep}>
                Back
              </Button>
            </Stack>
          </>
        ) : (
          <>
            {getForm(step)}
          </>
        )}
        <>
        </>
      </Paper>
    </ThemeProvider>
  )
}

export default Questionnaire
