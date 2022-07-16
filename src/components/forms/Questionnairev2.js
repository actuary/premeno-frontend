import { useState, useEffect } from "react"

import {
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  ThemeProvider, createTheme,
  Stack,
  Box
} from "@mui/material"
import { teal } from "@mui/material/colors"

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
import { useForm } from "react-hook-form"

//import { Input } from "@mui/material"
import SelectFormControl from "./SelectFormControl"
import DateFormControl from "./DateFormControl"
import NumberFormControl from "./NumberFormControl"

const PersonalDetailsForm = () => {
  const { handleSubmit, control, reset, trigger, getValues, formState, getFieldState} = useForm({ mode: "onChange" })
  const onSubmit = data => {
    console.log(data)
  }
  const [isReset, setReset] = useState(false)

  const steps = ["About you", "Reproductive health", "Breast cancer risk"]

  const [step, setStep] = useState(0)
  const nextStep = () => {
    setStep(step + 1)
    trigger()
  }

  const prevStep = () => {
    setStep(step - 1)
    trigger()
  }

  useEffect( () => {
    reset({})
    setReset(true)
  }, [reset])

  useEffect( () => {
    isReset && trigger()
  }, [trigger, isReset])

  const getAge = (date) => {
    const selectedYear = new Date(date).getFullYear()
    const selectedMonth = new Date(date).getMonth()
    const nowYear = new Date().getFullYear()
    const nowMonth = new Date().getMonth()

    var age = nowYear - selectedYear
    const monthsDiff = nowMonth - selectedMonth
    if (monthsDiff < 0 || (monthsDiff == 0 && new Date() < date)) {
      age--
    }

    return age
  }

  const isValidAge = (date) => {
    const age = getAge(date) || 0
    return (age <= 75 && age >= 35) || "You must be between 35 and 75 years old to use this tool"
  }


  const questions = {
    "About you": ["date_of_birth", "height", "weight", "ethnic_group", "education", "alcohol", "smoking"],
    "Reproductive health": ["mht", "age_at_menarche", "age_at_first_child", "oral_contra"],
    "Breast cancer risk": ["number_of_biopsies", "hyperplasia"]
  }
  const questionInputs = {
    "About you": [
      <DateFormControl
        key="date_of_birth"
        name="date_of_birth"
        control={control}
        label="Date of Birth"
        rules={{required: true, validate: isValidAge }}
      />,
      <NumberFormControl
        key="height"
        name="height"
        control={control}
        label="What is your height (cm)?"
        rules={{
          required: "Required",
          min: {value: 50, message: "Invalid height"},
          max: {value: 250, message: "Invalid height"}
        }}
      />,
      <NumberFormControl
        key="weight"
        name="weight"
        control={control}
        label="What is your weight (kg)?"
        rules={{
          required: "Required",
          min: {value: 10, message: "Invalid weight"},
          max: {value: 700, message: "Invalid weight"}
        }}
      />,
      <SelectFormControl
        key="ethnic_group"
        name="ethnic_group"
        control={control}
        label="What is your ethnicity?"
        choices = {[
          {value: "white", label: "White"},
          {value: "other", label: "Other"}
        ]}
        rules= {{required: "Required"}}
      />,
      <SelectFormControl
        key="education"
        name="education"
        control={control}
        label="What is your highest level of educational achievement?"
        choices = {[
          {value: "primary", label: "Primary school"},
          {value: "secondary", label: "Secondary school"},
          {value: "college", label: "College/A-levels"},
          {value: "uni", label: "University"}
        ]}
        rules= {{required: "Required"}}
      />,
      <NumberFormControl
        key="alcohol"
        name="alcohol"
        control={control}
        label="How many standard units of alcohol do you consume a week on average?"
        rules={{
          required: "Required",
          min: {value: 0, message: "Invalid units"},
          max: {value: 100, message: "Enter up to a max of 100 units"}
        }}
      />,
      <SelectFormControl
        key="smoking"
        name="smoking"
        control={control}
        label="Are you a smoker, or have you smoked in the past?"
        choices = {[
          {value: "never", label: "Never smoked"},
          {value: "past", label: "Past smoker"},
          {value: "current", label: "Current smoker"},
        ]}
        rules= {{required: "Required"}}
      />,
    ],
    "Reproductive health": [
      <SelectFormControl
        key="mht"
        name="mht"
        control={control}
        label="What MHT formulation will you be taking?"
        choices = {[
          {value: "e+p", label: "Oestrogen-progesterone"},
          {value: "e", label: "Oestrogen only"}
        ]}
        rules= {{required: "Required"}}
      />,
      <NumberFormControl
        key="age_at_menarche"
        name="age_at_menarche"
        control={control}
        label="What age (years) did you have your first period?"
        rules={{
          required: "Required",
          min: {value: 5, message: "Invalid age"},
          max: {value: getAge(getValues("date_of_birth")), message: "Must have had period before current age."}
        }}
      />,
      <NumberFormControl
        key="age_at_first_child"
        name="age_at_first_child"
        control={control}
        label="What age did you have your first child?"
        rules={{
          required: "Required",
          min: {value: parseInt(getValues("age_at_menarche") || 0), message: "Must have had child before menarche."},
          max: {value: getAge(getValues("date_of_birth")), message: "Must have had first child before current age."}
        }}
      />,
      <SelectFormControl
        key="oral_contra"
        name="oral_contra"
        control={control}
        label="Have you ever used oral contraception?"
        choices = {[
          {value: "n", label: "Never used"},
          {value: "y", label: "Used at least once"}
        ]}
        rules= {{required: "Required"}}
      />,
    ],
    "Breast cancer risk": [
      <SelectFormControl
        key="biopsy"
        name="biopsy"
        control={control}
        label="Have you had a breast biopsy?"
        choices = {[
          {value: "n", label: "No"},
          {value: "y", label: "Yes"}
        ]}
        rules= {{required: "Required"}}
      />,
      getValues("biopsy") === "y" &&
        <NumberFormControl
          key="number_of_biopsies"
          name="number_of_biopsies"
          control={control}
          label="How many breast biopsies have you had?"
          rules={{
            min: {value: 1, message: "Select no if you have not had a breast biopsy."},
            max: {value: 2, message: "Allows up to two biopsies."}
          }}
        />
      ,
      getValues("biopsy") === "y" &&
        <SelectFormControl
          key="hyperplasia"
          name="hyperplasia"
          control={control}
          label="Have you had a biopsy with atypical hyperplasia?"
          choices = {[
            {value: "0", label: "No"},
            {value: "1", label: "Yes"}
          ]}
        />
      ,
      <NumberFormControl
        key="family_history"
        name="family_history"
        control={control}
        label="How many of your close relatives have been diagnosed with breast cancer?"
        rules={{
          required: "Required. Enter 0 if no relatives have been diagnosed or if unknown",
          min: {value: 0, message: "Enter 0 if no relatives have been diagnosed or if unknown"},
          max: {value: 2, message: "Enter up to two relatives."}
        }}
      />,
    ]
  }

  const getQuestionSet = (index) => {
    if (index >= steps.length) {
      return ( <div>Submitted</div> )
    }

    return <> {questionInputs[steps[index]].map(e => e)} </>
  }

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(
      questions[steps[step]].map(e => getFieldState(e) || false).some(e => e.invalid)
    )
  }, [formState.dirtyFields])

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{padding: 5, border: "1px solid teal", "marginTop": 10}}>
        <Typography component="h1" variant="h4" align="center" color="teal">
          MHT Risk Questionnaire
        </Typography>
        <form id="myForm" onSubmit={handleSubmit(onSubmit)}>
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
              {getQuestionSet(step)}
              <Box display="flex" justifyContent="flex-end">
                {step !== 0 && (
                  <Button onClick={prevStep}>
                    Back
                  </Button>
                )}
                <Button
                  form="myForm"
                  variant="contained"
                  color="primary"
                  onClick={nextStep}
                  disabled={disabled}
                  type="submit"
                >
                  {step === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </>
          )}
        </form>
        <>
        </>
      </Paper>
    </ThemeProvider>
  )
}

export default PersonalDetailsForm
