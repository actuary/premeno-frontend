import { useState } from "react"
import QuestionSet from "./QuestionSet"
import SelectAnswer from "./SelectAnswer"
import DateAnswer from "./DateAnswer"
import NumberAnswer from "./NumberAnswer"

const PersonalDetailsForm = ({ formValues, setFormValues}) => {
  const [step, setStep] = useState(1)

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
      (formValues.biopsy.value === "n" ? <div></div> :
        <NumberAnswer 
          key="number_of_biopsies"
          values={formValues}
          name="number_of_biopsies"
          handleFormChange={handleFormChange}
        />
      ),
      (formValues.biopsy.value === "n" ? <div></div> :
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

  switch (step) {
  case 1: 
    return (
      <QuestionSet 
        nextStep={nextStep} 
        title="About you"
        formControls = {questionInputs.about}
      />
    )
  case 2:
    return (
      <QuestionSet 
        prevStep={prevStep}
        nextStep={nextStep} 
        title="Reproductive health"
        formControls = {questionInputs.menopause}
      />
    )
  case 3:
    return (
      <QuestionSet 
        prevStep={prevStep}
        nextStep={nextStep} 
        title="Background breast cancer risk"
        formControls = {questionInputs.cancer}
      />
    )
  default:
    console.log("Finished.")
  }
}

export default PersonalDetailsForm
