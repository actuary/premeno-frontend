import { useState } from "react"
import {
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  ThemeProvider, createTheme,
  Stack, Box
} from "@mui/material"
import { teal } from "@mui/material/colors"

import QuestionSet from "./QuestionSet"
import SelectAnswer from "./SelectAnswer"
import DateAnswer from "./DateAnswer"
import NumberAnswer from "./NumberAnswer"

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: teal[500],
    }
  },
})

const PersonalDetailsForm = ({ formValues, setFormValues}) => {
  const [step, setStep] = useState(0)

  const stepNames = ["About you", "Reproductive health", "Breast cancer risk"]
  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleFormChange = input => (e) => {
    const {value} = e.target

    setFormValues(prevState => ({
      ...prevState,
      [input]: {...prevState[input], value: value}
    }))

    localStorage.setItem("formValues", JSON.stringify(formValues))
  }

  const questionInputs = {
    "about": [
      <DateAnswer
        key="date_of_birth"
        values={formValues}
        name="date_of_birth"
        handleFormChange={handleFormChange}
      />,
      <NumberAnswer
        key="height"
        values={formValues}
        name="height"
        handleFormChange={handleFormChange}
      />,
      <NumberAnswer
        key="weight"
        values={formValues}
        name="weight"
        handleFormChange={handleFormChange}
      />,
      <SelectAnswer
        key="ethnic_group"
        values={formValues}
        name="ethnic_group"
        handleFormChange={handleFormChange}
      />,
      <SelectAnswer
        key="education"
        values={formValues}
        name="education"
        handleFormChange={handleFormChange}
      />,
      <NumberAnswer
        key="alcohol"
        values={formValues}
        name="alcohol"
        handleFormChange={handleFormChange}
      />,
      <SelectAnswer
        key="smoking"
        values={formValues}
        name="smoking"
        handleFormChange={handleFormChange}
      />,
    ],
    "menopause": [
      <SelectAnswer
        key="mht"
        values={formValues}
        name="mht"
        handleFormChange={handleFormChange}
      />,
      <NumberAnswer
        key="age_at_menarche"
        values={formValues}
        name="age_at_menarche"
        handleFormChange={handleFormChange}
      />,
      <NumberAnswer
        key="time_since_last_period"
        values={formValues}
        name="time_since_last_period"
        handleFormChange={handleFormChange}
      />,
      <SelectAnswer
        key="oral_contra"
        values={formValues}
        name="oral_contra"
        handleFormChange={handleFormChange}
      />,
      <NumberAnswer
        key="age_at_first_child"
        values={formValues}
        name="age_at_first_child"
        handleFormChange={handleFormChange}
      />
    ],
    "cancer": [
      <SelectAnswer
        key="biopsy"
        values={formValues}
        name="biopsy"
        handleFormChange={handleFormChange}
      />,
      (formValues.biopsy.value === "y" ?
        <NumberAnswer
          key="number_of_biopsies"
          values={formValues}
          name="number_of_biopsies"
          handleFormChange={handleFormChange}
        /> : <div key="number_of_biopsies"></div>
      ),
      (formValues.biopsy.value === "y" ?
        <SelectAnswer
          key="hyperplasia"
          values={formValues}
          name="hyperplasia"
          handleFormChange={handleFormChange}
        /> : <div key="hyperplasia"></div>
      ),
      <NumberAnswer
        key="family_history"
        values={formValues}
        name="family_history"
        handleFormChange={handleFormChange}
      />,
    ]
  }

  const getQuestionSet = () => {
    switch (step) {
    case 0:
      return (
        <QuestionSet
          nextStep={nextStep}
          title={stepNames[step]}
          formControls = {questionInputs.about}
        />
      )
    case 1:
      return (
        <QuestionSet
          nextStep={nextStep}
          title={stepNames[step]}
          formControls = {questionInputs.menopause}
        />
      )
    case 2:
      return (
        <QuestionSet
          nextStep={nextStep}
          title={stepNames[step]}
          formControls = {questionInputs.cancer}
        />
      )
    default:
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
          {stepNames.map(name => (
            <Step key={name}>
              <StepLabel>{name}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {step === stepNames.length ? (
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
              {getQuestionSet(step)}
              <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                {step !== 0 && (
                  <Button onClick={prevStep}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={nextStep}
                >
                  {step === stepNames.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </>
      </Paper>
    </ThemeProvider>
  )
}

export default PersonalDetailsForm
