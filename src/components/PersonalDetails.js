import { useState } from "react"
import Questionnaire from "./forms/Questionnairev2"

import { Container } from "@mui/material"

const defaultValues = {
  date_of_birth: {
    name: "date_of_birth",
    inputLabel: "DOB",
    value: new Date(1970, 1, 1),
    label: "What is your date of birth?",
  },
  height: {
    name: "height",
    inputLabel: "Height",
    value: "",
    label: "What your height in cm?",
  },
  weight: {
    name: "weight",
    inputLabel: "Weight",
    value: "",
    label: "What your weight in kg?",
  },
  ethnic_group: {
    name: "ethnic_group",
    inputLabel: "Ethnicity",
    value: "",
    label: "What is your ethnicity?",
    choices: [
      {value: "white", label: "White"},
      {value: "other", label: "Other"}
    ]
  },
  education: {
    name: "education",
    inputLabel: "Education level",
    value: "",
    label: "What is your highest level of educational achievment?",
    choices: [
      {value: "primary", label: "Primary school"},
      {value: "secondary", label: "Secondary school"},
      {value: "college", label: "College/A-levels"},
      {value: "uni", label: "University"}
    ]
  },
  smoking: {
    name: "smoking",
    inputLabel: "Smoking status",
    value: "",
    label: "Are you a smoker, or have you smoked in the past?",
    choices: [
      {value: "never", label: "Never smoked"},
      {value: "past", label: "Past smoker"},
      {value: "current", label: "Current smoker"},
    ]
  },
  alcohol: {
    name: "alcohol",
    inputLabel: "Units per week",
    value: "",
    label: "How many standard units of alcohol do you consume a week on average?",
  },
  mht: {
    name: "mht",
    inputLabel: "MHT formulation",
    value: "",
    label: "What MHT formulation will you be taking?",
    choices: [
      {value: "e+p", label: "Oestrogen-progesterone"},
      {value: "e", label: "Oestrogen only"}
    ]
  },
  age_at_first_child: {
    name: "age_at_first_child",
    inputLabel: "Age at 1st child",
    value: "",
    label: "What age did you have your first child?"
  },
  age_at_menarche: {
    name: "age_at_menarche",
    inputLabel: "Age at menarche",
    value: "",
    label: "What age (years) did you have your first period?",
  },
  time_since_last_period: {
    name: "time_since_last_period",
    inputLabel: "Months",
    value: "",
    label: "How long (months) has it been since your last period"
  },
  oral_contra: {
    name: "oral_contra",
    inputLabel: "Oral contraception",
    value: "",
    label: "Have you ever used oral contraception?",
    choices: [
      {value: "n", label: "Never used"},
      {value: "y", label: "Used at least once"}
    ]
  },
  hysterectomy: {
    name: "hysterectomy",
    inputLabel: "Hysterectomy",
    value: "",
    label: "Have you had a hysterectomy",
    choices: [
      {value: "n", label: "No"},
      {value: "y", label: "Yes"}
    ]
  },
  family_history: {
    name: "family_history",
    inputLabel: "Number of close relatives",
    value: "",
    label: "How many of your close relatives have been diagnosed with breast cancer?",
  },
  biopsy: {
    name: "biopsy",
    inputLabel: "Breast biopsy",
    value: "",
    label: "Have you had a breast biopsy?",
    choices: [
      {value: "n", label: "No"},
      {value: "y", label: "Yes"}
    ]
  },
  number_of_biopsies: {
    name: "number_of_biopsies",
    inputLabel: "Number of biopsies",
    value: "",
    label: "How many breast biopsies have you had?",
  },
  hyperplasia: {
    name: "hyperplasia",
    inputLabel: "Hyperplasia",
    value: "",
    label: "Have you had a biopsy with atypical hyperplasia?",
    choices: [
      {value: "0", label: "No"},
      {value: "1", label: "Yes"}
    ]
  },
}

const PersonalDetails = () => {
  const [formValues, setFormValues] = useState(defaultValues)
  return (
    <Container maxWidth="md">
      <Questionnaire formValues={formValues} setFormValues={setFormValues} />
    </Container>
  )
}

export default PersonalDetails
