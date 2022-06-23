import { useState } from "react"
import Questionnaire from "./forms/Questionnaire"

import { Container } from "@mui/material"

const defaultValues = {
  mht: {  
    name: "mht",
    value: "",
    label: "What MHT formulation will you be taking?",
    choices: [
      {value: "e+p", label: "Oestrogen-progesterone"},
      {value: "e", label: "Oestrogen only"}
    ]
  },
  age: {  
    name: "age",
    value: "",
    label: "What age bracket are you in?",
    choices: [
      {value: "45_49", label: "45-49 years"},
      {value: "50_54", label: "50-54 years"},
      {value: "55_59", label: "55-59 years"},
      {value: "60_64", label: "60-64 years"},
      {value: "65_90", label: "65+ years"}
    ]
  },
  biopsy: {  
    name: "biopsy",
    value: "",
    label: "Have you had a breast biopsy?",
    choices: [
      {value: "0", label: "None"},
      {value: "1", label: "1"},
      {value: "2+", label: "2 or more"},
    ]
  },
  hyperplasia: {  
    name: "hyperplasia",
    value: "",
    label: "Have you had a biopsy with atypical hyperplasia?",
    choices: [
      {value: "0", label: "No"},
      {value: "1", label: "Yes"},
      {value: "NA", label: "N/A"},
    ]
  },
  age_at_first_child: {  
    name: "age_at_first_child",
    value: "",
    label: "What age did you have your first child?",
    choices: [
      {value: "0_19", label: "<20 years"},
      {value: "20_24", label: "20-24 years"},
      {value: "25_29", label: "25-29 years"},
      {value: "30+", label: "30+ years"},
      {value: "NA", label: "No children"},
    ]
  },
  age_at_menarche: {  
    name: "age_at_menarche",
    value: "",
    label: "What age did you have your first period?",
    choices: [
      {value: "0_13", label: "<13 years"},
      {value: "14+", label: "13+ years"},
    ]
  },
  age_at_diagnosis: {  
    name: "age_at_diagnosis",
    value: "",
    label: "What age were you when diagnosed with menopause?",
    choices: [
      {value: "0_55", label: "<55 years"},
      {value: "55_65", label: "55-65 years"},
      {value: "NA", label: "I am not yet menopausal"},
    ]
  },
  bmi: {  
    name: "bmi",
    value: "",
    label: "What is your BMI?",
    choices: [
      {value: "0_25", label: "<25 kg/m2"},
      {value: "25_29", label: "25-29 kg/m2"},
      {value: "30+", label: ">30 kg/m2"},
    ]
  },
  height: {  
    name: "height",
    value: "",
    label: "What is your height in centimetres?",
    choices: [
      {value: "0_165", label: "<165 cm"},
      {value: "165+", label: "165+ cm"}
    ]
  },
  family_history: {  
    name: "family_history",
    value: "",
    label: "How many of your close relatives have been diagnosed with breast cancer?",
    choices: [
      {value: "0", label: "None"},
      {value: "1", label: "1"},
      {value: "2+", label: "2 or more"},
    ]
  },
  ethnic_group: {  
    name: "ethnic_group",
    value: "",
    label: "What is your ethnicity?",
    choices: [
      {value: "white", label: "White"},
      {value: "other", label: "Other"}
    ]
  },
  education: {  
    name: "education",
    value: "",
    label: "education",
    choices: [
      {value: "0_12", label: "<13 years"},
      {value: "13+", label: "13+ years"}
    ]
  },
  oral_contra: {  
    name: "oral_contra",
    value: "",
    label: "Have you ever used oral contraception?",
    choices: [
      {value: "n", label: "Never used"},
      {value: "y", label: "Used at least once"}
    ]
  },
  alcohol: {  
    name: "alcohol",
    value: "",
    label: "alcohol",
    choices: [
      {value: "0_10", label: "10+ grams a week"},
      {value: "10+", label: "<10 grams a week"}
    ]
  },
  smoking: {  
    name: "smoking",
    value: "",
    label: "smoking",
    choices: [
      {value: "n", label: "Never smoked"},
      {value: "y", label: "Have smoked"},
    ]
  },
}

const PersonalDetails = () => {
  const [formValues, setFormValues] = useState(defaultValues)
  return (
    <Container maxWidth="sm">
      <Questionnaire formValues={formValues} setFormValues={setFormValues} />
    </Container>
  )
}

export default PersonalDetails
