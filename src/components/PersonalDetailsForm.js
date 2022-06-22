import { useState } from "react"
import {
  Button, 
  FormControl, 
  Select, 
  InputLabel, 
  MenuItem,
  Paper
} from "@mui/material"

const DetailInput = ({ info, handleChange}) => {
  const [choice, setChoice] = useState(info.value)

  const handleInputChange = (event) => {
    handleChange(event)
    setChoice(event.target.value)
  }

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id={info.name}>{info.label}</InputLabel>
      <Select
        labelId={info.name}
        name={info.name}
        value={choice}
        onChange={handleInputChange}
        label={info.label}
      >
        {info.choices.map(c => 
          <MenuItem key={c.label} value={c.value}>{c.label}</MenuItem>)}
      </Select>
    </FormControl>
  )
}

const defaultValues = {
  mht: {  
    name: "mht",
    value: "e+p",
    label: "What MHT formulation will you be taking?",
    choices: [
      {value: "e+p", label: "Oestrogen-progesterone"},
      {value: "e", label: "Oestrogen only"}
    ]
  },
  age: {  
    name: "age",
    value: "45_49",
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
    value: "0",
    label: "Have you had a breast biopsy?",
    choices: [
      {value: "0", label: "None"},
      {value: "1", label: "1"},
      {value: "2+", label: "2 or more"},
    ]
  },
  hyperplasia: {  
    name: "hyperplasia",
    value: "NA",
    label: "Have you had a biopsy with atypical hyperplasia?",
    choices: [
      {value: "0", label: "No"},
      {value: "1", label: "Yes"},
      {value: "NA", label: "N/A"},
    ]
  },
  age_at_first_child: {  
    name: "age_at_first_child",
    value: "NA",
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
    value: "0_13",
    label: "What age did you have your first period?",
    choices: [
      {value: "0_13", label: "<13 years"},
      {value: "14+", label: "13+ years"},
    ]
  },
  age_at_diagnosis: {  
    name: "age_at_diagnosis",
    value: "NA",
    label: "What age were you when diagnosed with menopause?",
    choices: [
      {value: "0_55", label: "<55 years"},
      {value: "55_65", label: "55-65 years"},
      {value: "NA", label: "I am not yet menopausal"},
    ]
  },
  bmi: {  
    name: "bmi",
    value: "25_29",
    label: "BMI",
    choices: [
      {value: "0_25", label: "<25 kg/m2"},
      {value: "25_29", label: "25-29 kg/m2"},
      {value: "30+", label: ">30 kg/m2"},
    ]
  },
  family_history: {  
    name: "family_history",
    value: "25_29",
    label: "BMI",
    choices: [
      {value: "0_25", label: "<25 kg/m2"},
      {value: "25_29", label: "25-29 kg/m2"},
      {value: "30+", label: ">30 kg/m2"},
    ]
  },
  ethnic_group: {  
    name: "ethnic_group",
    value: "25_29",
    label: "BMI",
    choices: [
      {value: "0_25", label: "<25 kg/m2"},
      {value: "25_29", label: "25-29 kg/m2"},
      {value: "30+", label: ">30 kg/m2"},
    ]
  },
  education: {  
    name: "education",
    value: "25_29",
    label: "BMI",
    choices: [
      {value: "0_25", label: "<25 kg/m2"},
      {value: "25_29", label: "25-29 kg/m2"},
      {value: "30+", label: ">30 kg/m2"},
    ]
  },
  oral_contra: {  
    name: "oral_contra",
    value: "25_29",
    label: "BMI",
    choices: [
      {value: "0_25", label: "<25 kg/m2"},
      {value: "25_29", label: "25-29 kg/m2"},
      {value: "30+", label: ">30 kg/m2"},
    ]
  },
  alcohol: {  
    name: "alcohol",
    value: "25_29",
    label: "BMI",
    choices: [
      {value: "0_25", label: "<25 kg/m2"},
      {value: "25_29", label: "25-29 kg/m2"},
      {value: "30+", label: ">30 kg/m2"},
    ]
  },
  smoking: {  
    name: "smoking",
    value: "25_29",
    label: "BMI",
    choices: [
      {value: "0_25", label: "<25 kg/m2"},
      {value: "25_29", label: "25-29 kg/m2"},
      {value: "30+", label: ">30 kg/m2"},
    ]
  },
}

const PersonalDetailsForm = () => {
  const [formValues, setFormValues] = useState(defaultValues)

  const submitDetails = (event) => {
    event.preventDefault()
    console.log(formValues)
  }

  const handleChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: {...formValues[name], value: value}
    })
  }

  return (
    <Paper>
      <form onSubmit={submitDetails}>
        <DetailInput info={formValues.mht} handleChange={handleChange}/>
        <DetailInput info={formValues.age} handleChange={handleChange}/>
        <DetailInput info={formValues.biopsy} handleChange={handleChange}/>
        <DetailInput info={formValues.hyperplasia} handleChange={handleChange}/>
        <DetailInput info={formValues.age_at_first_child} handleChange={handleChange}/>
        <DetailInput info={formValues.age_at_menarche} handleChange={handleChange}/>
        <DetailInput info={formValues.age_at_diagnosis} handleChange={handleChange}/>
        <DetailInput info={formValues.bmi} handleChange={handleChange}/>
        <DetailInput info={formValues.family_history} handleChange={handleChange}/>
        <DetailInput info={formValues.ethnic_group} handleChange={handleChange}/>
        <DetailInput info={formValues.education} handleChange={handleChange}/>
        <DetailInput info={formValues.alcohol} handleChange={handleChange}/>
        <DetailInput info={formValues.smoking} handleChange={handleChange}/>
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </Paper>
  )

}

export default PersonalDetailsForm
