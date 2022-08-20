import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

import { Typography, Button, Box, Grid } from "@mui/material"

import SelectFormControl from "./controls/SelectFormControl"
import DateFormControl from "./controls/DateFormControl"
import NumberFormControl from "./controls/NumberFormControl"
import RadioFormControl from "./controls/RadioFormControl"

import { getAge, getLocalData } from "./utils"
import questions from "./questions"

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
        {questions["date_of_birth"]["question"]}
      </Typography>
      <DateFormControl
        key="date_of_birth"
        name="date_of_birth"
        control={control}
        label={questions["date_of_birth"]["label"]}
        rules={{required: "Required.", validate: isValidAge }}
      />
      <Typography component="h6" variant="h6" align="left" color="teal">
        {questions["height"]["question"]}
      </Typography>
      <Grid container spacing= {{xs: 2 }} alignItems="center">
        { !showFeetInches ?
          <Grid item xs={8}>
            <NumberFormControl
              key="height"
              name="height"
              control={control}
              label={questions["height"]["label"]}
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
                label={questions["height_ft"]["label"]}
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
                label={questions["height_in"]["label"]}
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
            label={questions["height_unit"]["label"]}
            choices = {[
              {value: "cm", label: "cm"},
              {value: "ft", label: "Feet/Inches"},
            ]}
            rules={{}}
          />
        </Grid>
      </Grid>
      <Typography component="h6" variant="h6" align="left" color="teal">
        {questions["weight"]["question"]}
      </Typography>
      <Grid container spacing= {{xs: 2 }} alignItems="center">
        <Grid item xs={8}>
          <NumberFormControl
            key="weight"
            name="weight"
            control={control}
            label={questions["weight"]["label"]}
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
            label={questions["weight_unit"]["label"]}
            rules={{}}
            choices = {[
              {value: "kg", label: "Kilograms (kg)"},
              {value: "lbs", label: "Pounds (lbs)"},
            ]}
          />
        </Grid>
      </Grid>
      <Typography component="h6" variant="h6" align="left" color="teal">
        {questions["ethnic_group"]["question"]}
      </Typography>
      <SelectFormControl
        key="ethnic_group"
        name="ethnic_group"
        control={control}
        label={questions["ethnic_group"]["label"]}
        choices = {[
          {value: "white", label: questions["ethnic_group"]["choices"]["white"]},
          {value: "other", label: questions["ethnic_group"]["choices"]["other"]}
        ]}
        rules= {{required: "Required"}}
      />
      <Typography component="h6" variant="h6" align="left" color="teal">
        {questions["education"]["question"]}
      </Typography>
      <SelectFormControl
        key="education"
        name="education"
        control={control}
        label={questions["education"]["label"]}
        choices = {[
          {value: "primary", label: questions["education"]["choices"]["primary"]},
          {value: "secondary", label: questions["education"]["choices"]["secondary"]},
          {value: "college", label: questions["education"]["choices"]["college"]},
          {value: "uni", label: questions["education"]["choices"]["uni"]}
        ]}
        rules= {{required: "Required"}}
      />
      <Typography component="h6" variant="h6" align="left" color="teal">
        {questions["alcohol"]["question"]}
      </Typography>
      <NumberFormControl
        key="alcohol"
        name="alcohol"
        control={control}
        label={questions["alcohol"]["label"]}
        rules={{
          required: "Required",
          min: {value: 0, message: "Invalid units"},
          max: {value: 100, message: "Enter up to a max of 100 units"}
        }}
      />
      <Typography component="h6" variant="h6" align="left" color="teal">
        {questions["smoking"]["question"]}
      </Typography>
      <SelectFormControl
        key="smoking"
        name="smoking"
        control={control}
        label={questions["smoking"]["label"]}
        choices = {[
          {value: "never", label: questions["smoking"]["choices"]["never"]},
          {value: "past", label: questions["smoking"]["choices"]["past"]},
          {value: "current", label: questions["smoking"]["choices"]["current"]},
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
