import { useForm } from "react-hook-form"

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
  { title: "Heart beating quickly or strongly", key: "heart_beat"},
  { title: "Feeling tense or nervous", key: "tense"},
  { title: "Difficulty sleeping", key: "sleep"},
  { title: "Excitable", key: "excitable"},
  { title: "Attacks of anxiety, panic", key: "anxiety"},
  { title: "Difficulty in concentrating", key: "concentration"},
  { title: "Feeling tired or lacking in energy", key: "tiredness"},
  { title: "Loss of interest in most things", key: "loss_of_interest"},
  { title: "Feeling unhappy or depressed", key: "depressed"},
  { title: "Crying spells", key: "crying"},
  { title: "Irritability", key: "irritable"},
  { title: "Feeling dizzy or faint", key: "dizzy"},
  { title: "Pressure or tightness in head", key: "pressure_in_head"},
  { title: "Parts of body feel numb", key: "numbness"},
  { title: "Headaches", key: "headaches"},
  { title: "Muscle and joint pains", key: "joint_pains"},
  { title: "Loss of feeling in hands or feet", key: "loss_of_feeling"},
  { title: "Breathing difficulties", key: "breathing"},
  { title: "Hot flushes", key: "hot_flushes"},
  { title: "Sweating at night", key: "night_sweats"},
  { title: "Loss of interest in sex", key: "sex"}

]

const boldText = (text) => <span style={{fontWeight: "bold"}}>{text}</span>
const italiciseText = (text) => <span style={{fontStyle: "italic"}}>{text}</span>

const SymptomQuestionnaire = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: getLocalData("symptoms")
  })

  const onSubmit = data => {
    console.log(data)
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
