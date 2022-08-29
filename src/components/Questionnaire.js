import { useState } from "react"

import {
  Typography,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Stack
} from "@mui/material"

import AboutYouForm from "./forms/AboutYouForm"
import ReproductiveHealthForm from "./forms/ReproductiveHealthForm"
import BreastCancerRiskForm from "./forms/BreastCancerRiskForm"

import { getAge } from "./common/utils"

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
    <Container maxWidth="md">
      <Paper variant="main">
        <Typography component="h1" variant="h4" align="center" color="primary">
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
              <Button href="/results" variant="full">
                View results
              </Button>
              <Button variant="empty" onClick={prevStep}>
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
    </Container>
  )
}

export default Questionnaire
