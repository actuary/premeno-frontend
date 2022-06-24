import {
  FormControl, 
  Divider,
  TextField,
} from "@mui/material"


const NumberAnswer = ({ values, name, handleFormChange }) => (
  <div>
    <h2>{values[name].label}</h2>
    <FormControl fullWidth margin="normal">
      <TextField
        name={name}
        type="number"
        value={values[name].value}
        onChange={handleFormChange(name)}
        label={values[name].label}
      >
      </TextField>
    </FormControl>
    <Divider/>
  </div>
)

export default NumberAnswer
