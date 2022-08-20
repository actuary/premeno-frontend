import { useState, useEffect } from "react"

import { Typography } from "@mui/material"

import SelectFormControl from "./controls/SelectFormControl"
import NumberFormControl from "./controls/NumberFormControl"
import questions from "./questions"

const FamilyHistory = ( { getValues, watch, control }) => {

  const [ showMother, setShowMother ] = useState(false)
  const watchShowMother = watch("mother_has_cancer")

  useEffect( () => {
    setShowMother(getValues("mother_has_cancer"))
  }, [watchShowMother])

  const [ numberSisters, setNumberSisters ] = useState(0)
  const watchNumberOfSisters = watch("number_of_sisters")

  useEffect( () => {
    setNumberSisters(Math.min(5, parseInt(getValues("number_of_sisters"))))
    console.log(numberSisters)
  }, [watchNumberOfSisters])

  return (
    <>
      <Typography component="h6" variant="h6" align="left" color="teal">
        {questions["mother_has_cancer"]["question"]}
      </Typography>
      <SelectFormControl
        key="mother_has_cancer"
        name="mother_has_cancer"
        control={control}
        label={questions["mother_has_cancer"]["label"]}
        choices = {[
          {value: "0", label: questions["mother_has_cancer"]["choices"]["0"]},
          {value: "1", label: questions["mother_has_cancer"]["choices"]["1"]}
        ]}
        rules={{ required: "Required." }}
      />
      {showMother == "1" ?
        <NumberFormControl
          key="mother_age_at_diagnosis"
          name="mother_age_at_diagnosis"
          control={control}
          label={questions["mother_age_at_diagnosis"]["label"]}
          rules={{
            validate: {
              required: value => {
                if (!value && showMother) return "Required!"
                return true
              }
            },
            min: {value: 0, message: "Invalid age."},
            max: {value: 125, message: "Invalid age."}
          }}
        /> :
        <></>
      }
      <Typography component="h6" variant="h6" align="left" color="teal">
        {questions["number_of_sisters"]["question"]}
      </Typography>
      <NumberFormControl
        key="number_of_sisters"
        name="number_of_sisters"
        control={control}
        label={questions["number_of_sisters"]["label"]}
        rules={{
          required: "Required, enter 0 if none.",
          min: {value: 0, message: "Enter 0 for no sisters"},
          max: {value: 5, message: "Up to five sisters."}
        }}
      />
      {numberSisters > 0 ?
        [...Array(numberSisters)].map((val, index) => (
          <NumberFormControl
            key={`sister_age_at_diagnosis_${index}`}
            name={`sister_age_at_diagnosis_${index}`}
            control={control}
            label={questions[`sister_age_at_diagnosis_${index}`]["label"]}
            rules={{
              validate: {
                required: value => {
                  if (!value && numberSisters > index) return "Required!"
                  return true
                }
              },
              min: {value: 1, message: "Invalid age."},
              max: {value: 125, message: "Invalid age."}
            }}
          />
        )) :
        <></>
      }
    </>
  )
}

export default FamilyHistory
