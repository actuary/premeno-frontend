import { useForm } from "react-hook-form"
import axios from "axios"
import { saveAs } from "file-saver"

import {
  ThemeProvider, 
  createTheme,
  Container, 
  Grid,
  Paper, 
  Typography, 
  Button, 
  Box
} from "@mui/material"

import SymptomSlider from "./controls/SymptomSlider"
import { getLocalData } from "./utils"

import { teal, amber } from "@mui/material/colors"

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: teal[500],
    },
    reset: {
      main: amber[500],
      contrastText: "#ffffff",
    }
  },
})

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

const symptomQuestions = [
  { title: "Heart beating quickly or strongly", key: "heart_beat", scale: "psychological"},
  { title: "Feeling tense or nervous", key: "tense", scale: "psychological"},
  { title: "Difficulty sleeping", key: "sleep", scale: "psychological"},
  { title: "Excitable", key: "excitable", scale: "psychological"},
  { title: "Attacks of anxiety, panic", key: "anxiety", scale: "psychological"},
  { title: "Difficulty in concentrating", key: "concentration", scale: "psychological"},
  { title: "Feeling tired or lacking in energy", key: "tiredness", scale: "psychological"},
  { title: "Loss of interest in most things", key: "loss_of_interest", scale: "psychological"},
  { title: "Feeling unhappy or depressed", key: "depressed", scale: "psychological"},
  { title: "Crying spells", key: "crying", scale: "psychological"},
  { title: "Irritability", key: "irritable", scale: "psychological"},
  { title: "Feeling dizzy or faint", key: "dizzy", scale: "somatic"},
  { title: "Pressure or tightness in head", key: "pressure_in_head", scale: "somatic"},
  { title: "Parts of body feel numb", key: "numbness", scale: "somatic"},
  { title: "Headaches", key: "headaches", scale: "somatic"},
  { title: "Muscle and joint pains", key: "joint_pains", scale: "somatic"},
  { title: "Loss of feeling in hands or feet", key: "loss_of_feeling", scale: "somatic"},
  { title: "Breathing difficulties", key: "breathing", scale: "somatic"},
  { title: "Hot flushes", key: "hot_flushes", scale: "vasomotor"},
  { title: "Sweating at night", key: "night_sweats", scale: "vasomotor"},
  { title: "Loss of interest in sex", key: "sex", scale: "sex"}
]

const boldText = (text) => <span style={{fontWeight: "bold"}}>{text}</span>
const italiciseText = (text) => <span style={{fontStyle: "italic"}}>{text}</span>

const symptomRatings = {
  0: "Not at all",
  1: "A little",
  2: "Quite a bit",
  3: "Extremely"
}

const SymptomQuestionnaire = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: getLocalData("symptoms")
  })
  
  const addRatings = data => ( 
    symptomQuestions.map( (val, idx) => ({
      title:`${idx+1}. ${val.title}`, 
      scale: val.scale,
      value: data[val.key],
      rating: symptomRatings[data[val.key]]
    }))
  )

  const onSubmit = data => {
    const request_data = {symptoms: addRatings(data)}
    
    axios
      .post(process.env.REACT_APP_API_URL + "/api/symptoms/questionnaire/", 
        request_data, 
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob"
        })
      .then(response => {
        const file = new Blob([response.data], { type: "application/pdf" })
        saveAs(file, "SymptomQuestionnaire.pdf")
      })
      .catch(error => {
        console.log(error.response)
      })
    localStorage.setItem("symptoms", JSON.stringify(data))
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Paper style={{padding: 5, border: "1px solid teal", "marginTop": 10}}>
          <Typography
            component="p"
            color="primary"
          >
            {boldText("What is this?")} <br/> 
            This questionnaire will assess your menopausal symptoms and give you a score. The results
            can be discussed with your GP to see if Menopausal Hormone Therapy is right 
            for you. It is based on the Greene Climacteric Scale [1].
          </Typography>
          <br/>
          <Typography
            component="p"
            color="primary"
          >
            {boldText("What do I do with it?")} <br/> 
            Fill out the questionnaire, download the PDF and bring it with you when seeing your GP.
          </Typography>
          <br/>
          <Typography
            component="p"
            color="primary"
          >
            {boldText("References")} <br/>
            [1] {italiciseText("Greene. (2008). Constructing a standard climacteric scale. Maturitas, 61(1), 78–84. https://doi.org/10.1016/j.maturitas.2008.09.011")}
          </Typography>
        </Paper>
        <Paper style={{padding: 5, border: "1px solid teal", "marginTop": 10}}>
          <Typography component="h6" variant="h6" align="center" color="teal">
            Please indicate the extent to which you are bothered at the moment by any of 
            these symptoms by dragging the slider to the appropriate score.
          </Typography>
          <form id="symptoms" onSubmit={handleSubmit(onSubmit)} style={{padding: 40}}>
            {symptomQuestions.map( (val, idx) => (
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
        </Paper> 
      </Container>
    </ThemeProvider>
  )
}

export default SymptomQuestionnaire
