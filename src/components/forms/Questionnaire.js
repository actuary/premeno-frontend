import { useState } from "react"
import QuestionSet from "./QuestionSet"
import SelectAnswer from "./SelectAnswer"

import {
  FormControl, 
  Divider,
  TextField,
} from "@mui/material"


import AdapterDateFns from "@mui/lab/AdapterDateFns"

import { 
  LocalizationProvider, 
  MobileDatePicker
} from "@mui/x-date-pickers"

const DateAnswer = ({ values, name, handleFormChange }) => (
  <div>
    <h2>{values[name].label}</h2>
    <FormControl fullWidth margin="normal">
      <LocalizationProvider dateAdapter={ AdapterDateFns }>
        <MobileDatePicker
          label="dd/MM/yyyy"
          inputFormat="dd/MM/yyyy"
          value={"01/01/1975"}
          onChange={handleFormChange}
          renderInput={(params) => <TextField {...params} />}
        >
        </MobileDatePicker>
      </LocalizationProvider>
    </FormControl>
    <Divider/>
  </div>
)

const NumberAnswer = ({ values, name, handleFormChange }) => (
  <div>
    <h2>{values[name].label}</h2>
    <FormControl fullWidth margin="normal">
      <TextField
        name={name}
        type="number"
        value={100}
        onChange={handleFormChange(name)}
        label={values[name].label}
      >
      </TextField>
    </FormControl>
    <Divider/>
  </div>
)

const PersonalDetailsForm = ({ formValues, setFormValues}) => {
  const [step, setStep] = useState(1)

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleFormChange = input => e => {
    const {value } = e.target

    setFormValues(prevState => ({
      ...prevState,
      [input]: {...prevState[input], value: value}
    }))
  }

  const questions = [
    "mht",
    "age",
    "biopsy",
    "hyperplasia",
    "age_at_first_child",
    "age_at_menarche",
    "age_at_diagnosis",
    "bmi",
    "family_history",
    "height",
    "ethnic_group",
    "education",
    "alcohol",
    "smoking"
  ]

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
      <SelectAnswer 
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
      />
    ],
    "cancer": [
      <NumberAnswer 
        key="biopsy"
        values={formValues}
        name="biopsy"
        handleFormChange={handleFormChange}
      />,
      (formValues.biopsy.value === 0 ? <div></div> :
        <NumberAnswer 
          key="hyperplasia"
          values={formValues}
          name="hyperplasia"
          handleFormChange={handleFormChange}
        />
      ),
      <NumberAnswer 
        key="family_history"
        values={formValues}
        name="family_history"
        handleFormChange={handleFormChange}
      />,
    ]
  }

  console.log(questionInputs)

  if (step <= questions.length) {
    return (
      <QuestionSet 
        prevStep={step !== 1 ? prevStep : undefined} 
        nextStep={nextStep} 
        title="About you"
        formControls = {[
          <SelectAnswer 
            key={questions[step-1]} 
            values={formValues} 
            name={questions[step-1]} 
            handleFormChange={handleFormChange}
          />,
          <DateAnswer 
            key="A"
            values={formValues} 
            name={questions[step-1]} 
            handleFormChange={handleFormChange}
          />,
          <NumberAnswer 
            key="B"
            values={formValues} 
            name={questions[step-1]} 
            handleFormChange={handleFormChange}
          />
        ]}
      />
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default PersonalDetailsForm
