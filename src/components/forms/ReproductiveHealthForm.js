import { useState, useEffect } from "react"

import { useForm } from "react-hook-form"

import { Button, Box, Typography, Grid } from "@mui/material"

import SelectFormControl from "./controls/SelectFormControl"
import NumberFormControl from "./controls/NumberFormControl"
import CheckboxFormControl from "./controls/CheckboxFormControl"

import { getSavedData, setSavedData } from "../common/utils"
import questions from "./questions"

const defaultValues = {
  nulliparous: true,
  age_at_menarche: "",
  age_at_first_child: ""
}
const ReproductiveHealthForm = ({ prevStep, nextStep, age }) => {

  const { handleSubmit, control, getValues, watch } = useForm({
    mode: "all",
    defaultValues: getSavedData("reproductive_health", defaultValues)
  })

  const onSubmit = data => {
    console.log(data)
    setSavedData("reproductive_health", data)
    nextStep()
  }

  const [ disableAgeAtFirstChild, setDisableAgeAtFirstChild ] = useState(false)
  const watchNulliparous = watch("nulliparous")

  useEffect( () => {
    setDisableAgeAtFirstChild(getValues("nulliparous"))
  }, [watchNulliparous])

  return (
    <form id="reproductive_health" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h6" variant="h6" align="left" color="teal">
        {questions["mht"]["question"]}
      </Typography>
      <SelectFormControl
        key="mht"
        name="mht"
        control={control}
        label={questions["mht"]["label"]}
        choices = {[
          {value: "e", label: questions["mht"]["choices"]["e"]},
          {value: "e+p", label: questions["mht"]["choices"]["e+p"]}
        ]}
        rules= {{required: "Required"}}
      />
      <Typography component="h6" variant="h6" align="left" color="teal">
        {questions["age_at_menarche"]["question"]}
      </Typography>
      <NumberFormControl
        key="age_at_menarche"
        name="age_at_menarche"
        control={control}
        label={questions["age_at_menarche"]["label"]}
        rules={{
          required: "Required",
          min: {value: 5, message: "Invalid age"},
          max: {value: age, message: "Must have had period before current age."}
        }}
      />
      <Typography component="h6" variant="h6" align="left" color="teal">
        {questions["age_at_first_child"]["question"]}
      </Typography>
      <Grid container spacing= {{xs: 2 }} alignItems="center">
        <Grid item xs={8}>
          <NumberFormControl
            key="age_at_first_child"
            name="age_at_first_child"
            control={control}
            label={questions["age_at_first_child"]["question"]}
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
            key="nulliparous"
            name="nulliparous"
            control={control}
            label={questions["nulliparous"]["label"]}
            rules={{
              validate: () => {
                //to ensure next updates on change
                return true
              }
            }}
          />
        </Grid>
      </Grid>
      <Typography component="h6" variant="h6" align="left" color="teal">
        {questions["oral_contraception_use"]["question"]}
      </Typography>
      <SelectFormControl
        key="oral_contraception_use"
        name="oral_contraception_use"
        control={control}
        label={questions["oral_contraception_use"]["label"]}
        choices = {[
          {value: "n", label: questions["oral_contraception_use"]["choices"]["n"]},
          {value: "y", label:questions["oral_contraception_use"]["choices"]["y"]}
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
