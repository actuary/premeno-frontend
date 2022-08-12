import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

import { Typography, Button, Box, Grid } from "@mui/material"

import SelectFormControl from "./controls/SelectFormControl"
import DateFormControl from "./controls/DateFormControl"
import NumberFormControl from "./controls/NumberFormControl"
import RadioFormControl from "./controls/RadioFormControl"

import { getAge, getLocalData } from "./utils"

const AboutYouForm = ({ nextStep }) => {
  const { handleSubmit, control, formState, watch, getValues } = useForm({
    mode: "all",
    defaultValues: getLocalData("about_you")
  })

  const onSubmit = data => {
    console.log(data)
    localStorage.setItem("about_you", JSON.stringify(data))
    nextStep()
  }

  const isValidAge = (date) => {
    const age = getAge(date) || 0
    return (age <= 75 && age >= 35) || "You must be between 35 and 75 years old to use this tool"
  }

  const [ showFeetInches, setShowFeetInches ] = useState(false)
  const watchHeightUnit = watch("height_unit")

  useEffect( () => {
    setShowFeetInches(getValues("height_unit") == "ft")
  }, [watchHeightUnit])

  return (
    <form id="about" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h6" variant="h6" align="left" color="teal">
        What&apos;s your date of birth?
      </Typography>
      <DateFormControl
        key="date_of_birth"
        name="date_of_birth"
        control={control}
        label="Date of Birth"
        rules={{required: true, validate: isValidAge }}
      />
      <Typography component="h6" variant="h6" align="left" color="teal">
        What height are you?
      </Typography>
      <Grid container spacing= {{xs: 2 }} alignItems="center">
        { !showFeetInches ?
          <Grid item xs={8}>
            <NumberFormControl
              key="height"
              name="height"
              control={control}
              label="What is your height?"
              rules={{
                min: {value: 50, message: "Invalid height"},
                max: {value: 250, message: "Invalid height"},
                validate: {
                  required: value => {
                    if (!value && !showFeetInches) return "Required!"
                    return true
                  }
                }
              }}
            />
          </Grid>
          :
          <>
            <Grid item xs={4}>
              <NumberFormControl
                key="height_ft"
                name="height_ft"
                control={control}
                label="Feet"
                rules={{
                  min: {value: 1, message: "Invalid height"},
                  max: {value: 9, message: "Invalid height"},
                  validate: {
                    required: value => {
                      if (!value && showFeetInches) return "Required!"
                      return true
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <NumberFormControl
                key="height_in"
                name="height_in"
                control={control}
                label="Inches"
                rules={{
                  min: {value: 0, message: "Invalid height"},
                  max: {value: 11, message: "Invalid height"},
                  validate: {
                    required: value => {
                      if (!value && showFeetInches) return "Required!"
                      return true
                    }
                  }
                }}
              />
            </Grid>
          </>
        }
        <Grid item xs={4}>
          <RadioFormControl
            key="height_unit"
            name="height_unit"
            control={control}
            label="Units"
            rules={{required: "Required" }}
            choices = {[
              {value: "cm", label: "cm"},
              {value: "ft", label: "Feet/Inches"},
            ]}
          />
        </Grid>
      </Grid>
      <Typography component="h6" variant="h6" align="left" color="teal">
        What is your weight?
      </Typography>
      <Grid container spacing= {{xs: 2 }} alignItems="center">
        <Grid item xs={8}>
          <NumberFormControl
            key="weight"
            name="weight"
            control={control}
            label="What is your weight?"
            rules={{
              required: "Required",
              min: {value: 10, message: "Invalid weight"},
              max: {value: 700, message: "Invalid weight"}
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <RadioFormControl
            key="weight_unit"
            name="weight_unit"
            control={control}
            label="Units"
            rules={{required: "Required" }}
            choices = {[
              {value: "kg", label: "Kilograms (kg)"},
              {value: "lbs", label: "Pounds (lbs)"},
            ]}
          />
        </Grid>
      </Grid>
      <Typography component="h6" variant="h6" align="left" color="teal">
        What best describes your ethnicity?
      </Typography>
      <SelectFormControl
        key="ethnic_group"
        name="ethnic_group"
        control={control}
        label="What is your ethnicity?"
        choices = {[
          {value: "white", label: "White"},
          {value: "other", label: "Other"}
        ]}
        rules= {{required: "Required"}}
      />
      <Typography component="h6" variant="h6" align="left" color="teal">
        What best describes your level of education?
      </Typography>
      <SelectFormControl
        key="education"
        name="education"
        control={control}
        label="What is your highest level of educational achievement?"
        choices = {[
          {value: "primary", label: "Primary school"},
          {value: "secondary", label: "Secondary school"},
          {value: "college", label: "College/A-levels"},
          {value: "uni", label: "University"}
        ]}
        rules= {{required: "Required"}}
      />
      <Typography component="h6" variant="h6" align="left" color="teal">
        How many standard units of alcohol do you consume a week on average?
      </Typography>
      <NumberFormControl
        key="alcohol"
        name="alcohol"
        control={control}
        label="How many standard units of alcohol do you consume a week on average?"
        rules={{
          required: "Required",
          min: {value: 0, message: "Invalid units"},
          max: {value: 100, message: "Enter up to a max of 100 units"}
        }}
      />
      <Typography component="h6" variant="h6" align="left" color="teal">
        Are you a smoker, or have you smoked in the past?
      </Typography>
      <SelectFormControl
        key="smoking"
        name="smoking"
        control={control}
        label="Are you a smoker, or have you smoked in the past?"
        choices = {[
          {value: "never", label: "Never smoked"},
          {value: "past", label: "Past smoker"},
          {value: "current", label: "Current smoker"},
        ]}
        rules= {{required: "Required"}}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          form="about"
          variant="contained"
          color="primary"
          disabled={false && !formState.isValid}
          type="submit"
        >
          Next
        </Button>
      </Box>
    </form>
  )
}

export default AboutYouForm
