import { useForm } from "react-hook-form"
import { Grid, Typography, Button, Box } from "@mui/material"

import { getSavedData, setSavedData } from "../common/utils"
import { getSymptomPDF } from "../common/api"
import SymptomSlider from "./controls/SymptomSlider"

const SymptomQuestion = ({ control, title, name }) => (
  <>
    <Grid container alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography component="h6" variant="h6" align="left" color="teal">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <SymptomSlider
          name={name}
          control={control}
        />
      </Grid>
    </Grid>
    <hr/>
  </>
)

const SymptomsForm = ({ questions, ratings}) => {
  const { handleSubmit, control } = useForm({
    defaultValues: getSavedData("symptoms")
  })
  
  const augmentWithRatings = data => ( 
    questions.map( (val, idx) => ({
      title:`${idx+1}. ${val.title}`, 
      scale: val.scale,
      value: data[val.key],
      rating: ratings[data[val.key]]
    }))
  )

  const onSubmit = data => {
    const request_data = {symptoms: augmentWithRatings(data)}
    getSymptomPDF(request_data)
    setSavedData("symptoms", data)
  }

  return (
    <form id="symptoms" onSubmit={handleSubmit(onSubmit)} style={{padding: 40}}>
      {questions.map( (val, idx) => (
        <SymptomQuestion 
          control={control} 
          title={`${idx+1}. ${val.title}`} 
          name={val.key}
          key={val.key} 
        />
      ))
      }
      <Box display="flex" justifyContent="flex-end">
        <Button
          form="symptoms"
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </form>
  )
}

export default SymptomsForm
