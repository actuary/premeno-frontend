import {
  Stack,
} from "@mui/material"

const QuestionSet = ({ nextStep, formControls}) => {
  const submitFormData = (e) => {
    e.preventDefault()
    nextStep()
  }

  return (
    <form onSubmit={submitFormData}>
      <Stack justifyContent="space-between" spacing={2}>
        {formControls.map( (control) => control)}
      </Stack>
    </form>
  )
}

export default QuestionSet
