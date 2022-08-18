import { useState, useEffect } from "react"

import { useForm } from "react-hook-form"

import { Button, Box, Typography, Grid } from "@mui/material"

import SelectFormControl from "./controls/SelectFormControl"
import NumberFormControl from "./controls/NumberFormControl"
import CheckboxFormControl from "./controls/CheckboxFormControl"

import { getLocalData } from "./utils"

const ReproductiveHealthForm = ({ prevStep, nextStep, age }) => {

  const { handleSubmit, control, formState, getValues, watch } = useForm({
    mode: "all",
    defaultValues: getLocalData("reproductive_health")
  })

  const onSubmit = data => {
    console.log(data)
    localStorage.setItem("reproductive_health", JSON.stringify(data))
    nextStep()
  }

  const [ disableAgeAtFirstChild, setDisableAgeAtFirstChild ] = useState(false)
  const watchNoChildCheckbox = watch("no_children")

  useEffect( () => {
    const no_children = getValues("no_children")
    setDisableAgeAtFirstChild(no_children)
  }, [watchNoChildCheckbox])

  return (
    <form id="reproductive_health" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h6" variant="h6" align="left" color="teal">
        Have you had a hysterectomy, or do you have a Mirena coil (IUS) in situ?
      </Typography>
      <SelectFormControl
        key="mht"
        name="mht"
        control={control}
        label="Have you had a hysterectomy, or do you have a Mirena coil (IUS) in situ?"
        choices = {[
          {value: "e", label: "Yes"},
          {value: "e+p", label: "No"}
        ]}
        rules= {{required: "Required"}}
      />
      <Typography component="h6" variant="h6" align="left" color="teal">
        What age (years) did you have your first period?
      </Typography>
      <NumberFormControl
        key="age_at_menarche"
        name="age_at_menarche"
        control={control}
        label="What age (years) did you have your first period?"
        rules={{
          required: "Required",
          min: {value: 5, message: "Invalid age"},
          max: {value: age, message: "Must have had period before current age."}
        }}
      />
      <Typography component="h6" variant="h6" align="left" color="teal">
        What age did you have your first child?
      </Typography>
      <Grid container spacing= {{xs: 2 }} alignItems="center">
        <Grid item xs={8}>
          <NumberFormControl
            key="age_at_first_child"
            name="age_at_first_child"
            control={control}
            label="What age did you have your first child?"
            disabled={disableAgeAtFirstChild}
            rules={{
              validate: {
                required: value => {
                  if (!value && !disableAgeAtFirstChild) {
                    return "Required"
                  }

                  return true
                }},
              min: {
                value: (!disableAgeAtFirstChild ? parseInt(getValues("age_at_menarche")) : 0),
                message: "Must have had child after menarche."
              },
              max: {
                value: (!disableAgeAtFirstChild ? age : Infinity),
                message: "Must have had first child before current age."
              }
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <CheckboxFormControl
            key="no_children"
            name="no_children"
            control={control}
            label="I have not had children"
            rules={{
              validate: () => {
                //to ensure next updates on change
                console.log("formState.isValid", formState.isValid)
                return true
              }
            }}
          />
        </Grid>
      </Grid>
      <Typography component="h6" variant="h6" align="left" color="teal">
        Have you ever used oral contraception?
      </Typography>
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
      />
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={prevStep}>
          Back
        </Button>
        <Button
          form="reproductive_health"
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

export default ReproductiveHealthForm
