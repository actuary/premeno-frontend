import {
  Button, 
  Paper,
  Stack,
} from "@mui/material"

const QuestionSet = ({ prevStep, nextStep, title, formControls}) => {
  const submitFormData = (e) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <Paper style={{ height: "100%", background:"white"}}>
      <Stack justifyContent="space-evenly">
        <div>Premeno</div>
        <h1>{title}</h1>
        <form onSubmit={submitFormData}>
          <Stack justifyContent="space-between" spacing={12}>
            {formControls.map( (control) => control)}
            <div>
              <Stack direction="row" justifyContent="space-between">
                {prevStep ? <Button variant="contained" onClick={prevStep}>Previous Question</Button> : <div></div>}
                <Button variant="contained" type="submit">Next Question</Button>
              </Stack>
            </div>
          </Stack>
        </form>
      </Stack>
    </Paper>
  )
}

export default QuestionSet
