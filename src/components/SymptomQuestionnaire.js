import { Container, Paper, Typography, } from "@mui/material"

import SymptomsForm from "./forms/SymptomsForm"

import { boldText, italicize } from "./common/utils"

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

const symptomRatings = {
  0: "Not at all",
  1: "A little",
  2: "Quite a bit",
  3: "Extremely"
}

const SymptomQuestionnaire = () => (
  <Container maxWidth="md">
    <Paper variant="main">
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
        [1] {italicize("Greene. (2008). Constructing a standard climacteric scale. Maturitas, 61(1), 78–84. https://doi.org/10.1016/j.maturitas.2008.09.011")}
      </Typography>
    </Paper>
    <Paper variant="main">
      <Typography component="h6" variant="h6" align="center" color="primary">
        Please indicate the extent to which you are bothered at the moment by any of 
        these symptoms by dragging the slider to the appropriate score.
      </Typography>
      <SymptomsForm questions={symptomQuestions} ratings={symptomRatings}/>
    </Paper> 
  </Container>
)

export default SymptomQuestionnaire
