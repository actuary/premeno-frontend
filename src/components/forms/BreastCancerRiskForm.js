import { useState, useEffect } from "react"

import { useForm } from "react-hook-form"

import { Button, Box, Typography } from "@mui/material"

import SelectFormControl from "./controls/SelectFormControl"
import NumberFormControl from "./controls/NumberFormControl"
import FamilyHistory from "./FamilyHistory"

import { getSavedData, setSavedData } from "../common/utils"
import questions from "./questions"

const BreastCancerRiskForm = ({ prevStep, nextStep }) => {
  const { handleSubmit, control, getValues, watch } = useForm({
    mode: "all",
    defaultValues: getSavedData("breast_cancer_risk")
  })

  const onSubmit = data => {
    console.log(data)
    setSavedData("breast_cancer_risk", data)
    nextStep()
  }

  const [ showBiopsy, setShowBiopsy ] = useState(false)
  const watchBiopsy = watch("biopsy")

  useEffect( () => {
    setShowBiopsy(getValues("biopsy") == "y")
  }, [watchBiopsy])

  return (
    <form id="breast_cancer_risk" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h6" variant="h6" align="left" color="primary">
        {questions["biopsy"]["question"]}
      </Typography>
      <SelectFormControl
        key="biopsy"
        name="biopsy"
        control={control}
        label={questions["biopsy"]["label"]}
        choices = {[
          {value: "n", label: questions["biopsy"]["choices"]["n"]},
          {value: "y", label: questions["biopsy"]["choices"]["y"]}
        ]}
        rules= {{required: "Required"}}
      />
      {showBiopsy && (
        <>
          <Typography component="h6" variant="h6" align="left" color="primary">
            {questions["number_of_biopsies"]["question"]}
          </Typography>
          <NumberFormControl
            key="number_of_biopsies"
            name="number_of_biopsies"
            control={control}
            label={questions["number_of_biopsies"]["question"]}
            rules={{
              min: {value: 1, message: "Select no if you have not had a breast biopsy."},
              max: {value: 2, message: "Allows up to two biopsies."},
              validate: {
                required: value => {
                  if (!value && showBiopsy) return "Required!"
                  return true
                }
              }
            }}
          />
        </>)
      }
      {showBiopsy &&
        <>
          <Typography component="h6" variant="h6" align="left" color="primary">
            {questions["biopsies_with_hyperplasia"]["question"]}
          </Typography>
          <SelectFormControl
            key="biopsies_with_hyperplasia"
            name="biopsies_with_hyperplasia"
            control={control}
            label={questions["biopsies_with_hyperplasia"]["question"]}
            choices = {[
              {value: "0", label: questions["biopsies_with_hyperplasia"]["choices"]["0"]},
              {value: "1", label: questions["biopsies_with_hyperplasia"]["choices"]["1"]}
            ]}
            rules={{
              validate: {
                required: value => {
                  if (!value && showBiopsy) return "Required!"
                  return true
                }
              }
            }}
          />
        </>
      }
      <FamilyHistory control={control} getValues={getValues} watch={watch}/>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="empty" onClick={prevStep}>
          Back
        </Button>
        <Button
          form="breast_cancer_risk"
          variant="full"
          type="submit"
        >
          Next
        </Button>
      </Box>
    </form>
  )
}

export default BreastCancerRiskForm
