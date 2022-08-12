import { useState, useEffect } from "react"

import { useForm } from "react-hook-form"

import { Button, Box, Typography } from "@mui/material"

import SelectFormControl from "./controls/SelectFormControl"
import NumberFormControl from "./controls/NumberFormControl"
import FamilyHistory from "./FamilyHistory"

import { getLocalData } from "./utils"

const BreastCancerRiskForm = ({ prevStep, nextStep }) => {
  const { handleSubmit, control, getValues, watch } = useForm({
    mode: "all",
    defaultValues: getLocalData("breast_cancer_risk")
  })

  const onSubmit = data => {
    console.log(data)
    localStorage.setItem("breast_cancer_risk", JSON.stringify(data))
    nextStep()
  }

  const [ showBiopsy, setShowBiopsy ] = useState(false)
  const watchBiopsy = watch("biopsy")

  useEffect( () => {
    setShowBiopsy(getValues("biopsy") == "y")
  }, [watchBiopsy])

  return (
    <form id="breast_cancer_risk" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h6" variant="h6" align="left" color="teal">
        Have you had a breast biopsy?
      </Typography>
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
      />
      {showBiopsy && (
        <>
          <Typography component="h6" variant="h6" align="left" color="teal">
            How many breast biopsies have you had?
          </Typography>
          <NumberFormControl
            key="number_of_biopsies"
            name="number_of_biopsies"
            control={control}
            label="How many breast biopsies have you had?"
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
          <Typography component="h6" variant="h6" align="left" color="teal">
            Have you had a biopsy with atypical hyperplasia?
          </Typography>
          <SelectFormControl
            key="hyperplasia"
            name="hyperplasia"
            control={control}
            label="Have you had a biopsy with atypical hyperplasia?"
            choices = {[
              {value: "0", label: "No"},
              {value: "1", label: "Yes"}
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
        <Button onClick={prevStep}>
          Back
        </Button>
        <Button
          form="breast_cancer_risk"
          variant="contained"
          color="primary"
          type="submit"
        >
          Next
        </Button>
      </Box>
    </form>
  )
}

export default BreastCancerRiskForm
